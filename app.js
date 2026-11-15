/**
 * THE PLANETARY FOOTPRINT ATLAS — CORE SYSTEMS ARCHITECTURE
 * Cleanly separated controller classes:
 *   1. AmbientCanvasController: Procedural technical background grid (Terrafab/Prescience style).
 *   2. NavigationManager: Tab switching, state synchronization, and UTC clock.
 *   3. EarthComparator: Multi-spectral before-and-after procedural canvas satellite comparator.
 *   4. HeritagePlanner: Interactive lunar/martian surface canvas and Artemis Accords rule engine.
 *   5. FleetTelemetry: Heliocentric radar and continuous light-delay calculation.
 */

// ============================================================================
// 1. PROCEDURAL NOISE & MATH UTILITIES
// ============================================================================
const MathUtils = {
  // Deterministic pseudo-random PRNG for reproducible offline procedural terrain
  prng(seed) {
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  },

  clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  },

  lerp(a, b, t) {
    return a + (b - a) * t;
  },

  dist2D(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }
};

// ============================================================================
// 2. AMBIENT BACKGROUND CONTROLLER (TERAFAB / PRESCIENCE INDUSTRIAL GRID)
// ============================================================================
class AmbientCanvasController {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Seed ambient star telemetry points
    const count = 90;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.4 + 0.1,
        speed: (Math.random() - 0.5) * 0.08,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2
      });
    }

    this.render();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  render() {
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Subtle 64px engineering grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
    ctx.lineWidth = 1;

    const gridSize = 64;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(canvas.width, y + 0.5);
      ctx.stroke();
    }

    // Floating telemetry coordinates
    const time = Date.now() * 0.001;
    this.particles.forEach((p) => {
      p.y += p.speed;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      const currentAlpha = p.alpha + Math.sin(time * p.pulseSpeed * 100 + p.phase) * 0.1;
      ctx.fillStyle = `rgba(237, 237, 237, ${Math.max(0, currentAlpha)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(() => this.render());
  }
}

// ============================================================================
// 3. NAVIGATION MANAGER (STATE & TIMING)
// ============================================================================
class NavigationManager {
  constructor() {
    this.tabs = document.querySelectorAll('.nav-tab');
    this.panels = document.querySelectorAll('.module-panel');
    this.clockEl = document.getElementById('system-clock');
    this.init();
  }

  init() {
    this.tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        const target = e.currentTarget.getAttribute('data-module');
        this.switchModule(target);
      });
    });

    // Start millisecond technical clock
    this.tickClock();
    setInterval(() => this.tickClock(), 67); // ~15Hz precision
  }

  switchModule(moduleId) {
    this.tabs.forEach((tab) => {
      const match = tab.getAttribute('data-module') === moduleId;
      tab.classList.toggle('active', match);
      tab.setAttribute('aria-selected', match ? 'true' : 'false');
    });

    this.panels.forEach((panel) => {
      const match = panel.id === `panel-${moduleId}`;
      panel.classList.toggle('active', match);
    });

    // Fire custom event for canvas viewport sync on panel reveal
    window.dispatchEvent(new CustomEvent('module-activated', { detail: { moduleId } }));
  }

  tickClock() {
    if (!this.clockEl) return;
    const now = new Date();
    const h = String(now.getUTCHours()).padStart(2, '0');
    const m = String(now.getUTCMinutes()).padStart(2, '0');
    const s = String(now.getUTCSeconds()).padStart(2, '0');
    const ms = String(Math.floor(now.getUTCMilliseconds() / 100));
    this.clockEl.textContent = `${h}:${m}:${s}.${ms}`;
  }
}

// ============================================================================
// 4. EARTH SCARS: MULTI-SPECTRAL SATELLITE COMPARATOR
// ============================================================================
class EarthComparator {
  constructor() {
    this.viewport = document.getElementById('comparator-wrapper');
    this.clip = document.getElementById('comparator-clip');
    this.divider = document.getElementById('comparator-divider');
    this.percentLabel = document.getElementById('slider-percentage');

    this.canvasBefore = document.getElementById('canvas-earth-before');
    this.canvasAfter = document.getElementById('canvas-earth-after');

    this.badgeBefore = document.getElementById('badge-before');
    this.badgeAfter = document.getElementById('badge-after');
    this.targetTitle = document.getElementById('earth-target-title');
    this.statHeadline = document.getElementById('earth-stat-headline');
    this.statBody = document.getElementById('earth-stat-body');
    this.statArea = document.getElementById('stat-area');
    this.statVolume = document.getElementById('stat-volume');
    this.statSalinity = document.getElementById('stat-salinity');
    this.statSensor = document.getElementById('stat-sensor');
    this.sensorSpecs = document.getElementById('sensor-specs');

    this.currentCase = 'aral';
    this.sliderPos = 0.5; // 50% initial
    this.isDragging = false;

    this.caseData = {
      aral: {
        title: 'ARAL SEA DESICCATION (LANDSAT 5 2000 VS. TERRA 2024)',
        badgeBefore: 'BASELINE // 2000',
        badgeAfter: 'ANTHROPOGENIC // 2024',
        headline: 'Aralkum Desertification',
        body: 'Diversion of the Syr Darya and Amu Darya rivers for intensive cotton irrigation caused the Aral Sea to shrink by more than 90% of its volume, exposing over 54,000 km² of hyper-saline, toxic dust bed known as the Aralkum Desert.',
        area: '-86.2%',
        volume: '-970 km³',
        salinity: '165 g/L',
        sensor: 'Landsat / Terra',
        specs: 'LANDSAT 5 TM &rarr; TERRA MODIS // 30M GSD'
      },
      amazon: {
        title: 'AMAZON RONDÔNIA DEFORESTATION (1984 BASELINE VS. 2022 FISHBONE)',
        badgeBefore: 'PRIMARY CANOPY // 1984',
        badgeAfter: 'FISHBONE GRID // 2022',
        headline: 'Systematic Fragmentation',
        body: 'Construction of the BR-364 highway opened the state of Rondônia to planned settlement. Settlers cut secondary access roads at right angles into primary rainforest, creating a systematic "fishbone" deforestation pattern that decimated biodiversity.',
        area: '-38.4%',
        volume: '-34,200 km²',
        salinity: '0.0 g/L',
        sensor: 'Landsat 4/5 &rarr; 8/9',
        specs: 'LANDSAT 5 TM &rarr; LANDSAT 9 OLI-2 // 30M GSD'
      },
      mead: {
        title: 'LAKE MEAD WATER ELEVATION DEFICIT (1998 FULL POOL VS. 2023 DROUGHT)',
        badgeBefore: 'FULL POOL // 1998',
        badgeAfter: 'EXPOSED RING // 2023',
        headline: 'Historic Colorado River Deficit',
        body: 'Over-allocation and climate-driven mega-drought in the Colorado River basin reduced Lake Mead to 27% capacity in 2022. The dramatic shoreline retreat left an iconic 50-meter-high brilliant white "bathtub ring" of calcium carbonate deposits.',
        area: '-68.5%',
        volume: '-18.2 MAF',
        salinity: '680 mg/L',
        sensor: 'Landsat OLI',
        specs: 'LANDSAT 5 TM &rarr; LANDSAT 8/9 TIRS // 30M GSD'
      }
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.renderCase(this.currentCase);
    this.setSliderPosition(0.5);

    // Keep clip canvas size synced to container width
    window.addEventListener('resize', () => this.syncCanvasSizes(), { passive: true });
    window.addEventListener('module-activated', (e) => {
      if (e.detail.moduleId === 'earth') this.syncCanvasSizes();
    });
  }

  bindEvents() {
    // Draggable Slider Mouse & Touch Events
    const onStart = (e) => {
      this.isDragging = true;
      this.updateDrag(e);
    };

    const onMove = (e) => {
      if (!this.isDragging) return;
      this.updateDrag(e);
    };

    const onEnd = () => {
      this.isDragging = false;
    };

    this.viewport.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    this.viewport.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);

    // Case Study Switcher Buttons
    document.querySelectorAll('.case-switcher .tool-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.case-switcher .tool-btn').forEach((b) => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const caseKey = e.currentTarget.getAttribute('data-case');
        this.renderCase(caseKey);
      });
    });
  }

  updateDrag(e) {
    if (e.cancelable && e.type.startsWith('touch')) e.preventDefault();
    const rect = this.viewport.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const normalized = (clientX - rect.left) / rect.width;
    this.setSliderPosition(normalized);
  }

  setSliderPosition(pos) {
    this.sliderPos = MathUtils.clamp(pos, 0.05, 0.95);
    const percent = Math.round(this.sliderPos * 100);

    this.divider.style.left = `${percent}%`;
    this.clip.style.width = `${percent}%`;
    this.percentLabel.textContent = `${percent}%`;
    this.viewport.setAttribute('aria-valuenow', percent);

    this.syncCanvasSizes();
  }

  syncCanvasSizes() {
    const width = this.viewport.clientWidth;
    const height = this.viewport.clientHeight;

    this.canvasBefore.style.width = `${width}px`;
    this.canvasBefore.style.height = `${height}px`;
    this.canvasAfter.style.width = `${width}px`;
    this.canvasAfter.style.height = `${height}px`;
  }

  renderCase(caseKey) {
    this.currentCase = caseKey;
    const data = this.caseData[caseKey];

    // Update UI telemetry
    this.targetTitle.textContent = data.title;
    this.badgeBefore.textContent = data.badgeBefore;
    this.badgeAfter.textContent = data.badgeAfter;
    this.statHeadline.textContent = data.headline;
    this.statBody.textContent = data.body;
    this.statArea.textContent = data.area;
    this.statVolume.textContent = data.volume;
    this.statSalinity.textContent = data.salinity;
    this.statSensor.textContent = data.sensor;
    this.sensorSpecs.innerHTML = data.specs;

    const w = this.canvasBefore.width;
    const h = this.canvasBefore.height;
    const ctxB = this.canvasBefore.getContext('2d');
    const ctxA = this.canvasAfter.getContext('2d');

    ctxB.clearRect(0, 0, w, h);
    ctxA.clearRect(0, 0, w, h);

    if (caseKey === 'aral') {
      this.drawAralSea(ctxB, ctxA, w, h);
    } else if (caseKey === 'amazon') {
      this.drawAmazon(ctxB, ctxA, w, h);
    } else if (caseKey === 'mead') {
      this.drawLakeMead(ctxB, ctxA, w, h);
    }
  }

  // --- PROCEDURAL CASE 1: ARAL SEA ---
  drawAralSea(ctxB, ctxA, w, h) {
    // 1. BASELINE 2000 (Before)
    // Sandy Kyzylkum desert background
    ctxB.fillStyle = '#b89b70';
    ctxB.fillRect(0, 0, w, h);

    // Desert dunes texture
    ctxB.fillStyle = '#aa8f64';
    for (let i = 0; i < 400; i++) {
      const rx = (Math.sin(i * 1.7) * 0.5 + 0.5) * w;
      const ry = (Math.cos(i * 2.3) * 0.5 + 0.5) * h;
      ctxB.fillRect(rx, ry, (i % 20) + 10, 2);
    }

    // Lush Delta Vegetation (Amu Darya)
    ctxB.fillStyle = '#2d5a27';
    ctxB.beginPath();
    ctxB.ellipse(w * 0.45, h * 0.78, w * 0.18, h * 0.12, -0.2, 0, Math.PI * 2);
    ctxB.fill();

    // Expansive Historical Sea (Eastern + Western Basins)
    const seaGradient = ctxB.createRadialGradient(w * 0.5, h * 0.45, 40, w * 0.5, h * 0.45, w * 0.35);
    seaGradient.addColorStop(0, '#0c3859'); // Deep cobalt
    seaGradient.addColorStop(0.7, '#1b5a8c');
    seaGradient.addColorStop(1, '#2c7fb8');

    ctxB.fillStyle = seaGradient;
    ctxB.beginPath();
    ctxB.ellipse(w * 0.42, h * 0.42, w * 0.22, h * 0.32, -0.15, 0, Math.PI * 2);
    ctxB.ellipse(w * 0.62, h * 0.5, w * 0.16, h * 0.26, 0.1, 0, Math.PI * 2);
    ctxB.fill();

    // North Aral Sea body
    ctxB.beginPath();
    ctxB.ellipse(w * 0.52, h * 0.16, w * 0.11, h * 0.08, 0.1, 0, Math.PI * 2);
    ctxB.fill();

    // 2. ANTHROPOGENIC 2024 (After)
    // Bleached, toxic Aralkum salt bed
    ctxA.fillStyle = '#dcd5c9';
    ctxA.fillRect(0, 0, w, h);

    // Ghost outline of desiccated basin (white salt crust)
    ctxA.fillStyle = '#f0ece1';
    ctxA.beginPath();
    ctxA.ellipse(w * 0.42, h * 0.42, w * 0.22, h * 0.32, -0.15, 0, Math.PI * 2);
    ctxA.ellipse(w * 0.62, h * 0.5, w * 0.16, h * 0.26, 0.1, 0, Math.PI * 2);
    ctxA.fill();

    // Salt crust fissures
    ctxA.strokeStyle = 'rgba(160, 145, 125, 0.35)';
    ctxA.lineWidth = 1;
    for (let j = 0; j < 30; j++) {
      ctxA.beginPath();
      ctxA.moveTo(w * 0.35 + j * 12, h * 0.25);
      ctxA.lineTo(w * 0.4 + j * 10, h * 0.7);
      ctxA.stroke();
    }

    // Surviving narrow western strip sliver (hyper-saline)
    ctxA.fillStyle = '#0a2e47';
    ctxA.beginPath();
    ctxA.ellipse(w * 0.28, h * 0.48, w * 0.024, h * 0.24, -0.12, 0, Math.PI * 2);
    ctxA.fill();

    // Preserved North Aral (due to Kokaral Dam)
    ctxA.fillStyle = '#1b5a8c';
    ctxA.beginPath();
    ctxA.ellipse(w * 0.52, h * 0.16, w * 0.1, h * 0.065, 0.1, 0, Math.PI * 2);
    ctxA.fill();
  }

  // --- PROCEDURAL CASE 2: AMAZON RONDÔNIA ---
  drawAmazon(ctxB, ctxA, w, h) {
    // 1. BASELINE 1984 (Before: Virgin Canopy)
    ctxB.fillStyle = '#0f3818'; // Deep rainforest green
    ctxB.fillRect(0, 0, w, h);

    // Natural meandering river
    ctxB.strokeStyle = '#2b6e8a';
    ctxB.lineWidth = 14;
    ctxB.beginPath();
    ctxB.moveTo(0, h * 0.3);
    ctxB.bezierCurveTo(w * 0.3, h * 0.2, w * 0.6, h * 0.6, w, h * 0.4);
    ctxB.stroke();

    // Canopy texture
    ctxB.fillStyle = '#14461f';
    for (let k = 0; k < 600; k++) {
      const rx = (Math.sin(k * 3.7) * 0.5 + 0.5) * w;
      const ry = (Math.cos(k * 4.1) * 0.5 + 0.5) * h;
      ctxB.beginPath();
      ctxB.arc(rx, ry, (k % 8) + 4, 0, Math.PI * 2);
      ctxB.fill();
    }

    // 2. ANTHROPOGENIC 2022 (After: Fishbone Corridors)
    ctxA.fillStyle = '#0f3818';
    ctxA.fillRect(0, 0, w, h);

    // Same river
    ctxA.strokeStyle = '#2b6e8a';
    ctxA.lineWidth = 14;
    ctxA.beginPath();
    ctxA.moveTo(0, h * 0.3);
    ctxA.bezierCurveTo(w * 0.3, h * 0.2, w * 0.6, h * 0.6, w, h * 0.4);
    ctxA.stroke();

    // Highway BR-364 Spine (diagonal arterial road)
    ctxA.strokeStyle = '#a6824b';
    ctxA.lineWidth = 6;
    ctxA.beginPath();
    ctxA.moveTo(w * 0.1, h);
    ctxA.lineTo(w * 0.85, 0);
    ctxA.stroke();

    // Perpendicular "fishbone" logging spurs & clear-cut clearings
    const angle = Math.atan2(-h, w * 0.75);
    const perp = angle + Math.PI / 2;

    for (let step = 0; step < 24; step++) {
      const t = step / 24;
      const sx = w * 0.1 + t * w * 0.75;
      const sy = h - t * h;

      // Draw perpendicular clearings
      [-1, 1].forEach((dir) => {
        const len = 90 + ((step * 17) % 60);
        const ex = sx + Math.cos(perp) * len * dir;
        const ey = sy + Math.sin(perp) * len * dir;

        ctxA.strokeStyle = '#d4b37d'; // Clear-cut pasture
        ctxA.lineWidth = 10;
        ctxA.beginPath();
        ctxA.moveTo(sx, sy);
        ctxA.lineTo(ex, ey);
        ctxA.stroke();

        ctxA.strokeStyle = '#8f6e3c'; // Road track
        ctxA.lineWidth = 2;
        ctxA.beginPath();
        ctxA.moveTo(sx, sy);
        ctxA.lineTo(ex, ey);
        ctxA.stroke();
      });
    }
  }

  // --- PROCEDURAL CASE 3: LAKE MEAD ---
  drawLakeMead(ctxB, ctxA, w, h) {
    // 1. BASELINE 1998 (Full Pool)
    ctxB.fillStyle = '#6e5d48'; // Desert rock
    ctxB.fillRect(0, 0, w, h);

    // Deep Reservoir Water
    ctxB.fillStyle = '#103d63';
    ctxB.beginPath();
    ctxB.moveTo(w * 0.15, h * 0.1);
    ctxB.bezierCurveTo(w * 0.35, h * 0.25, w * 0.4, h * 0.75, w * 0.7, h * 0.85);
    ctxB.bezierCurveTo(w * 0.85, h * 0.6, w * 0.75, h * 0.2, w * 0.5, h * 0.3);
    ctxB.closePath();
    ctxB.fill();

    // 2. ANTHROPOGENIC 2023 (Bathtub Ring)
    ctxA.fillStyle = '#6e5d48';
    ctxA.fillRect(0, 0, w, h);

    // Brilliant White "Bathtub Ring" (Exposed Carbonate Shoreline)
    ctxA.strokeStyle = '#f2efe9';
    ctxA.lineWidth = 18;
    ctxA.beginPath();
    ctxA.moveTo(w * 0.15, h * 0.1);
    ctxA.bezierCurveTo(w * 0.35, h * 0.25, w * 0.4, h * 0.75, w * 0.7, h * 0.85);
    ctxA.bezierCurveTo(w * 0.85, h * 0.6, w * 0.75, h * 0.2, w * 0.5, h * 0.3);
    ctxA.closePath();
    ctxA.stroke();

    // Shrinking Deep Water Channel
    ctxA.fillStyle = '#13354f';
    ctxA.beginPath();
    ctxA.moveTo(w * 0.22, h * 0.2);
    ctxA.bezierCurveTo(w * 0.35, h * 0.3, w * 0.42, h * 0.65, w * 0.65, h * 0.75);
    ctxA.bezierCurveTo(w * 0.75, h * 0.55, w * 0.68, h * 0.3, w * 0.48, h * 0.35);
    ctxA.closePath();
    ctxA.fill();
  }
}

// ============================================================================
// 5. MOON & MARS HERITAGE PLANNER (ARTEMIS ACCORDS SIMULATOR)
// ============================================================================
class HeritagePlanner {
  constructor() {
    this.canvas = document.getElementById('canvas-heritage');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.reticle = document.getElementById('target-reticle');
    this.cursorTelemetry = document.getElementById('canvas-cursor-telemetry');
    this.bodyTitle = document.getElementById('heritage-body-title');

    this.hudLatLon = document.getElementById('hud-latlon');
    this.hudNearest = document.getElementById('hud-nearest-relic');
    this.hudNearestId = document.getElementById('hud-nearest-id');
    this.hudDistance = document.getElementById('hud-distance');
    this.hudPlumeVel = document.getElementById('hud-plume-vel');

    this.verdictBanner = document.getElementById('verdict-banner');
    this.verdictIcon = document.getElementById('verdict-icon');
    this.verdictStatus = document.getElementById('verdict-status');
    this.verdictDetail = document.getElementById('verdict-detail');
    this.matrixBody = document.getElementById('relic-matrix-body');

    this.currentBody = 'moon';
    this.target = { x: 580, y: 320 }; // Initial touchdown

    // Calibrated Planetary Scales
    this.scales = {
      moon: 3.5, // km per canvas pixel
      mars: 6.8  // km per canvas pixel
    };

    // Pre-populated Historic Relics with Precise Physical Landing Sites
    this.relics = {
      moon: [
        { id: '1969-059C', name: 'Apollo 11 Descent Stage', lat: 0.67, lon: 23.47, nx: 0.56, ny: 0.48 },
        { id: '1969-099C', name: 'Apollo 12 / Surveyor 3', lat: -3.01, lon: -23.42, nx: 0.43, ny: 0.51 },
        { id: '1972-096C', name: 'Apollo 17 Challenger', lat: 20.19, lon: 30.77, nx: 0.58, ny: 0.38 },
        { id: '1959-014A', name: 'Luna 2 Impact Site', lat: 29.1, lon: 0.0, nx: 0.50, ny: 0.33 },
        { id: '2018-103A', name: 'Chang’e 4 (Von Kármán)', lat: -45.45, lon: 177.58, nx: 0.88, ny: 0.75 }
      ],
      mars: [
        { id: '1975-075C', name: 'Viking 1 Lander', lat: 22.48, lon: -47.97, nx: 0.36, ny: 0.37 },
        { id: '2003-038A', name: 'Opportunity (Meridiani)', lat: -1.95, lon: -5.53, nx: 0.48, ny: 0.51 },
        { id: '2011-070A', name: 'Curiosity (Gale Crater)', lat: -4.59, lon: 137.44, nx: 0.88, ny: 0.53 },
        { id: '2020-097A', name: 'Perseverance & Ingenuity', lat: 18.38, lon: 77.58, nx: 0.71, ny: 0.40 }
      ]
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.render();
    this.evaluateTouchdown();

    window.addEventListener('module-activated', (e) => {
      if (e.detail.moduleId === 'heritage') this.render();
    });
  }

  bindEvents() {
    // Body switch tabs
    document.querySelectorAll('.body-switcher .tool-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.body-switcher .tool-btn').forEach((b) => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentBody = e.currentTarget.getAttribute('data-body');
        this.bodyTitle.textContent = `${this.currentBody.toUpperCase()} SURFACE TARGETING GRID // ${this.scales[this.currentBody]} KM/PX`;
        this.render();
        this.evaluateTouchdown();
      });
    });

    // Canvas click to target
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;

      this.target.x = (e.clientX - rect.left) * scaleX;
      this.target.y = (e.clientY - rect.top) * scaleY;

      this.render();
      this.evaluateTouchdown();
    });

    // Canvas hover coordinates readout
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
      const coords = this.pixelToLatLon(x, y);
      this.cursorTelemetry.textContent = `CURSOR // ${coords.latStr}, ${coords.lonStr} [${Math.round(x)}, ${Math.round(y)}]`;
    });

    // Preset Action 1: Replay 1969 Surveyor 3 Sandblast Event
    const btnSurveyor = document.getElementById('btn-demo-surveyor');
    if (btnSurveyor) {
      btnSurveyor.addEventListener('click', () => {
        // Switch to moon
        this.currentBody = 'moon';
        document.querySelectorAll('.body-switcher .tool-btn').forEach((b) => {
          b.classList.toggle('active', b.getAttribute('data-body') === 'moon');
        });
        this.bodyTitle.textContent = `LUNA SURFACE TARGETING GRID // ${this.scales.moon} KM/PX`;

        // Position 3 pixels away from Apollo 12 / Surveyor 3 (~10 km in canvas scale, triggering breach)
        const ap12 = this.relics.moon.find((r) => r.id === '1969-099C');
        this.target.x = ap12.nx * this.canvas.width + 5;
        this.target.y = ap12.ny * this.canvas.height + 4;

        this.render();
        this.evaluateTouchdown();
      });
    }

    // Preset Action 2: Plot Compliant Vector (>= 80km)
    const btnCompliant = document.getElementById('btn-demo-compliant');
    if (btnCompliant) {
      btnCompliant.addEventListener('click', () => {
        this.target.x = this.canvas.width * 0.22;
        this.target.y = this.canvas.height * 0.72;
        this.render();
        this.evaluateTouchdown();
      });
    }
  }

  pixelToLatLon(px, py) {
    const lon = ((px / this.canvas.width) * 360 - 180).toFixed(2);
    const lat = (90 - (py / this.canvas.height) * 180).toFixed(2);
    const latStr = lat >= 0 ? `${lat}° N` : `${Math.abs(lat)}° S`;
    const lonStr = lon >= 0 ? `${lon}° E` : `${Math.abs(lon)}° W`;
    return { lat, lon, latStr, lonStr };
  }

  evaluateTouchdown() {
    const list = this.relics[this.currentBody];
    const scale = this.scales[this.currentBody];

    let nearest = null;
    let minKm = Infinity;

    const evaluated = list.map((relic) => {
      const rx = relic.nx * this.canvas.width;
      const ry = relic.ny * this.canvas.height;
      const distPx = MathUtils.dist2D(this.target.x, this.target.y, rx, ry);
      const distKm = distPx * scale;

      if (distKm < minKm) {
        minKm = distKm;
        nearest = relic;
      }

      return {
        ...relic,
        distKm,
        isBreach: distKm < 80.0
      };
    });

    // Update Telemetry HUD
    const coords = this.pixelToLatLon(this.target.x, this.target.y);
    this.hudLatLon.textContent = `${coords.latStr}, ${coords.lonStr}`;
    this.hudNearest.textContent = nearest ? nearest.name : 'None';
    this.hudNearestId.textContent = nearest ? `NSSDCA ${nearest.id}` : '—';
    this.hudDistance.textContent = `${minKm.toFixed(1)} km`;

    // Calculate exhaust gas plume velocity (~2,400 m/s rocket efflux)
    const plumeVel = 2420;
    this.hudPlumeVel.textContent = `${plumeVel.toLocaleString()} m/s`;

    // ARTEMIS ACCORDS RULE ENGINE
    const isViolation = minKm < 80.0;
    if (isViolation) {
      this.verdictBanner.className = 'verdict-banner verdict-violation';
      this.verdictIcon.textContent = '▲';
      this.verdictStatus.textContent = 'CRITICAL VIOLATION // ARTEMIS ACCORDS SEC. 9';
      this.verdictDetail.innerHTML = `
        <strong>WARNING: HIGH-VELOCITY EXHAUST SANDBLASTING.</strong> Touchdown at ${minKm.toFixed(1)} km violates the 80.0 km standoff buffer for <em>${nearest.name}</em>. Lunar descent rocket plumes accelerate regolith to &gt;2,000 m/s, causing catastrophic optical pitting and destructive surface erosion to historic hardware.
      `;
      this.hudDistance.className = 'stat-num mono-digits metric-red';
    } else {
      this.verdictBanner.className = 'verdict-banner verdict-safe';
      this.verdictIcon.textContent = '●';
      this.verdictStatus.textContent = 'APPROVED // HERITAGE COMPLIANT';
      this.verdictDetail.textContent = `
        Proposed touchdown coordinates maintain safe standoff distance (${minKm.toFixed(1)} km &ge; 80.0 km). Supersonic plume regolith ejecta will not erode historical human heritage relics.
      `;
      this.hudDistance.className = 'stat-num mono-digits metric-green';
    }

    // Populate Proximity Matrix Table
    this.matrixBody.innerHTML = '';
    evaluated.forEach((item) => {
      const tr = document.createElement('tr');
      if (item.isBreach) tr.classList.add('breach-row');
      tr.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.distKm.toFixed(1)} km</td>
        <td>${item.isBreach ? '<span class="metric-red">VIOLATION</span>' : '<span class="metric-green">SAFE</span>'}</td>
      `;
      this.matrixBody.appendChild(tr);
    });
  }

  render() {
    const { ctx, canvas } = this;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // 1. Procedural Celestial Surface Background
    if (this.currentBody === 'moon') {
      this.drawMoonTerrain(ctx, w, h);
    } else {
      this.drawMarsTerrain(ctx, w, h);
    }

    // 2. Draw Historical Relic Markers & Exclusion Buffer Rings
    const list = this.relics[this.currentBody];
    const scale = this.scales[this.currentBody];
    const bufferRadiusPx = 80.0 / scale; // 80 km plume exclusion zone in canvas pixels

    list.forEach((relic) => {
      const rx = relic.nx * w;
      const ry = relic.ny * h;

      // 80 km Ballistic Plume Buffer Ring
      ctx.strokeStyle = 'rgba(255, 152, 0, 0.35)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(rx, ry, bufferRadiusPx, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // 2.0 km Statutory Core Heritage Zone
      ctx.strokeStyle = '#ff9800';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(rx, ry, Math.max(4, 2.0 / scale), 0, Math.PI * 2);
      ctx.stroke();

      // Golden Relic Marker
      ctx.fillStyle = '#ff9800';
      ctx.beginPath();
      ctx.arc(rx, ry, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Relic Label Tag
      ctx.fillStyle = '#ededed';
      ctx.font = '10px "Geist Mono", monospace';
      ctx.fillText(relic.name, rx + 8, ry - 6);
      ctx.fillStyle = '#949494';
      ctx.fillText(`NSSDCA ${relic.id}`, rx + 8, ry + 6);
    });

    // 3. Draw Proposed Landing Vector & Plume Standoff Vector
    ctx.strokeStyle = '#00e5ff';
    ctx.lineWidth = 1.5;

    // Crosshairs on proposed landing site
    const tx = this.target.x;
    const ty = this.target.y;

    ctx.beginPath();
    ctx.arc(tx, ty, 8, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(tx - 14, ty);
    ctx.lineTo(tx + 14, ty);
    ctx.moveTo(tx, ty - 14);
    ctx.lineTo(tx, ty + 14);
    ctx.stroke();

    // Connecting line to nearest artifact
    const nearest = list.reduce((best, curr) => {
      const dist = MathUtils.dist2D(tx, ty, curr.nx * w, curr.ny * h);
      return dist < best.dist ? { relic: curr, dist } : best;
    }, { relic: list[0], dist: Infinity }).relic;

    const nx = nearest.nx * w;
    const ny = nearest.ny * h;
    const isBreach = (MathUtils.dist2D(tx, ty, nx, ny) * scale) < 80.0;

    ctx.strokeStyle = isBreach ? '#ff3d57' : 'rgba(0, 229, 255, 0.4)';
    ctx.lineWidth = isBreach ? 2 : 1;
    ctx.setLineDash(isBreach ? [6, 4] : [2, 2]);
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(nx, ny);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  drawMoonTerrain(ctx, w, h) {
    // Lunar Highlands Anorthosite Base
    ctx.fillStyle = '#1c1c1e';
    ctx.fillRect(0, 0, w, h);

    // Dark Basaltic Maria (Ocean of Storms, Mare Tranquillitatis)
    ctx.fillStyle = '#111113';
    ctx.beginPath();
    ctx.ellipse(w * 0.38, h * 0.45, w * 0.22, h * 0.3, -0.2, 0, Math.PI * 2);
    ctx.ellipse(w * 0.62, h * 0.42, w * 0.16, h * 0.22, 0.1, 0, Math.PI * 2);
    ctx.ellipse(w * 0.52, h * 0.24, w * 0.14, h * 0.14, 0, 0, Math.PI * 2);
    ctx.fill();

    // Major Impact Craters with Ejecta Rays (Tycho, Copernicus)
    const craters = [
      { x: w * 0.44, y: h * 0.76, r: 18, rays: true }, // Tycho
      { x: w * 0.36, y: h * 0.38, r: 14, rays: true }, // Copernicus
      { x: w * 0.28, y: h * 0.36, r: 10, rays: false }, // Kepler
      { x: w * 0.72, y: h * 0.32, r: 16, rays: false }
    ];

    craters.forEach((c) => {
      if (c.rays) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        for (let a = 0; a < 12; a++) {
          const theta = (a / 12) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(c.x, c.y);
          ctx.lineTo(c.x + Math.cos(theta) * 120, c.y + Math.sin(theta) * 120);
          ctx.stroke();
        }
      }

      ctx.fillStyle = '#080809';
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38383a';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  }

  drawMarsTerrain(ctx, w, h) {
    // Ferric Oxide (Rust) Ochre Base
    ctx.fillStyle = '#26130b';
    ctx.fillRect(0, 0, w, h);

    // Dark Basaltic Volcanic Provinces (Syrtis Major, Acidalia Planitia)
    ctx.fillStyle = '#170b06';
    ctx.beginPath();
    ctx.ellipse(w * 0.3, h * 0.35, w * 0.2, h * 0.24, 0.2, 0, Math.PI * 2);
    ctx.ellipse(w * 0.7, h * 0.45, w * 0.16, h * 0.2, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Valles Marineris Canyon System
    ctx.strokeStyle = '#0d0502';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(w * 0.35, h * 0.58);
    ctx.bezierCurveTo(w * 0.5, h * 0.55, w * 0.65, h * 0.62, w * 0.72, h * 0.65);
    ctx.stroke();

    // Olympus Mons & Tharsis Shield Volcanoes
    const volcanoes = [
      { x: w * 0.18, y: h * 0.42, r: 24, name: 'Olympus Mons' },
      { x: w * 0.25, y: h * 0.48, r: 12, name: 'Ascraeus Mons' },
      { x: w * 0.23, y: h * 0.56, r: 11, name: 'Pavonis Mons' }
    ];

    volcanoes.forEach((v) => {
      ctx.fillStyle = '#3a1e12';
      ctx.beginPath();
      ctx.arc(v.x, v.y, v.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle