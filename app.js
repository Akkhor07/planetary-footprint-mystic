/**
 * THE PLANETARY FOOTPRINT ATLAS — NSSDCA & NASA EYES 3D TELEMETRY ENGINE
 * Integrates:
 *   1. Live NASA Eyes 3D WebGL Controller (eyes.nasa.gov)
 *   2. Official NASA 3D Resources GLB Hardware Controller (science.nasa.gov/3d-resources)
 *   3. Definitive NSSDCA Relic Catalog (13 Lunar, Martian & Deep Space Artifacts)
 *   4. Artemis Accords Section 9 Regolith Plume Ballistics Simulator
 *   5. Live NASA Image and Video Library REST API Client (images-api.nasa.gov)
 */

'use strict';

/* ==========================================================================
   MASTER NSSDCA SPACECRAFT & RELIC CATALOG (13 VERIFIED ARTIFACTS)
   ========================================================================== */
const NSSDCA_RELICS = [
  {
    id: 'apollo-lm',
    nssdcaId: '1969-059C',
    name: 'Apollo Lunar Modules (Eagle & 5 Sister Stages)',
    domain: 'moon',
    domainLabel: 'THE MOON // MARE TRANQUILLITATIS',
    coords: '0.674° N, 23.473° E',
    launchYear: 1969,
    status: 'STATIONARY LAUNCH PAD RELIC',
    restingPlace: 'Tranquility Base & 5 Apollo Landing Sites',
    nssdcaUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C',
    eyesUrl: 'https://eyes.nasa.gov/apps/solar-system/#/moon?embed=true&logo=false',
    glbUrl: 'https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/Apollo%20Lunar%20Module/Apollo%20Lunar%20Module.glb',
    apiQuery: 'Apollo 11 Lunar Module Eagle',
    mapX: 540,
    mapY: 245,
    summary:
      'The descent stages of six Apollo Lunar Modules served as surface habitats and launch pads for the ascent stages.Protected under Artemis Accords Section 9 with a 2.0 km statutory no-overflight zone.'
  },
  {
    id: 'apollo-lrv',
    nssdcaId: '1971-063C',
    name: 'Lunar Roving Vehicles (Apollo 15, 16, 17 LRVs)',
    domain: 'moon',
    domainLabel: 'THE MOON // HADLEY-APENNINE',
    coords: '26.132° N, 3.633° E',
    launchYear: 1971,
    status: 'PERMANENTLY PARKED ELECTRIC ROVER',
    restingPlace: 'Hadley Rille, Descartes Highlands, Taurus-Littrow',
    nssdcaUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C',
    eyesUrl: 'https://eyes.nasa.gov/apps/solar-system/#/moon?embed=true&logo=false',
    glbUrl: 'https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/Apollo%20Lunar%20Module/Apollo%20Lunar%20Module.glb',
    apiQuery: 'Apollo 15 Lunar Roving Vehicle',
    mapX: 468,
    mapY: 162,
    summary:
      'Three dual-motor electric moon buggies driven by Apollo 15, 16, and 17 astronauts across 90+ km of lunar terrain. Parked at final television broadcast vantage points.'
  },
  {
    id: 'apollo-alsep',
    nssdcaId: '1969-099C',
    name: 'ALSEP Scientific Packages & Retroreflectors',
    domain: 'moon',
    domainLabel: 'THE MOON // OCEANUS PROCELLARUM',
    coords: '3.012° S, 23.421° W',
    launchYear: 1969,
    status: 'PASSIVE LASER REFLECTORS ACTIVE',
    restingPlace: 'Apollo 11, 12, 14, 15, 16, 17 Stations',
    nssdcaUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C',
    eyesUrl: 'https://eyes.nasa.gov/apps/solar-system/#/moon?embed=true&logo=false',
    glbUrl: 'https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/Apollo%20Lunar%20Module/Apollo%20Lunar%20Module.glb',
    apiQuery: 'Apollo ALSEP Lunar Surface Experiments',
    mapX: 334,
    mapY: 266,
    summary:
      'Radioisotope-powered seismometers, magnetometers, and corner-cube laser retroreflectors. While ALSEP transmitters were commanded off in Sept 1977, the optical retroreflectors still return Earth laser pulses today.'
  },
  {
    id: 'surveyor-3',
    nssdcaId: '1967-035A',
    name: 'Surveyor Landers (Surveyor 1–7 Series)',
    domain: 'moon',
    domainLabel: 'THE MOON // SURVEYOR CRATER',
    coords: '3.015° S, 23.418° W',
    launchYear: 1967,
    status: 'SANDBLASTED HERITAGE BENCHMARK',
    restingPlace: 'Oceanus Procellarum (160m from Apollo 12)',
    nssdcaUrl: 'https://science.nasa.gov/mission/surveyor-3/',
    eyesUrl: 'https://eyes.nasa.gov/apps/solar-system/#/moon?embed=true&logo=false',
    glbUrl: 'https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/Apollo%20Lunar%20Module/Apollo%20Lunar%20Module.glb',
    apiQuery: 'Surveyor 3 Apollo 12 Moon',
    mapX: 342,
    mapY: 270,
    summary:
      'Proved soft lunar landings were possible. Visited by Apollo 12 astronauts in 1969; returned camera parts revealed supersonic regolith sandblasting from Apollo 12’s descent plume.'
  },
  {
    id: 'sojourner',
    nssdcaId: '1996-068A',
    name: 'Sojourner Rover & Mars Pathfinder',
    domain: 'mars',
    domainLabel: 'MARS // ARES VALLIS',
    coords: '19.13° N, 33.22° W',
    launchYear: 1996,
    status: 'INACTIVE SURFACE MONUMENT',
    restingPlace: 'Carl Sagan Memorial Station, Ares Vallis',
    nssdcaUrl: 'https://science.nasa.gov/mission/mars-pathfinder/',
    eyesUrl: 'https://eyes.nasa.gov/apps/solar-system/#/mars?embed=true&logo=false',
    glbUrl: null,
    apiQuery: 'Sojourner Rover Mars Pathfinder',
    mapX: 365,
    mapY: 194,
    summary:
      'The first wheeled rover to operate on another planet (July 1997). Demonstrated airbag-mediated atmospheric entry and Alpha Proton X-ray Spectrometer rock analysis.'
  },
  {
    id: 'spirit-opportunity',
    nssdcaId: '2003-032A',
    name: 'Spirit & Opportunity (MER Twin Rovers)',
    domain: 'mars',
    domainLabel: 'MARS // MERIDIANI & GUSEV',
    coords: '2.28° S, 5.83° W',
    launchYear: 2003,
    status: 'SILENCED BY GLOBAL DUST STORM (2018)',
    restingPlace: 'Perseverance Valley & Troy Sand Trap',
    nssdcaUrl: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/',
    eyesUrl: 'https://eyes.nasa.gov/apps/solar-system/#/mars?embed=true&logo=false',
    glbUrl: null,
    apiQuery: 'Opportunity Rover Mars Panorama',
    mapX: 438,
    mapY: 262,
    summary:
      'Engineered for 90 sols, Opportunity operated for 5,111 sols (14+ years) and traversed 45.16 km, discovering hematite concretions proving ancient liquid water on Mars.'
  },
  {
    id: 'viking-landers',
    nssdcaId: '1975-075C',
    name: 'Viking 1 & Viking 2 Landers',
    domain: 'mars',
    domainLabel: 'MARS // CHRYSE & UTOPIA PLANITIA',
    coords: '22.48° N, 47.97° W',
    launchYear: 1975,
    status: 'INACTIVE BIOLOGICAL LAB RELICS',
    restingPlace: 'Thomas Mutch Memorial Station, Chryse Planitia',
    nssdcaUrl: 'https://science.nasa.gov/mission/viking-1/',
    eyesUrl: 'https://eyes.nasa.gov/apps/solar-system/#/mars?embed=true&logo=false',
    glbUrl: null,
    apiQuery: 'Viking 1 Lander Mars Surface',
    mapX: 318,
    mapY: 180,
    summary:
      'The first U.S. spacecraft to land safely on Mars and return surface imagery (July 1976). Viking 1 operated for over 6 years conducting gas-chromatograph mass-spectrometer soil assays.'
  },
  {
    id: 'phoenix-insight',
    nssdcaId: '2018-042A',
    name: 'Phoenix & InSight Geophysical Landers',
    domain: 'mars',
    domainLabel: 'MARS // ELYSIUM PLANITIA & NORTH POLE',
    coords: '4.50° N, 135.62° E',
    launchYear: 2018,
    status: 'SOLAR ARRAYS DUST-OCCLUDED (RETIRED)',
    restingPlace: 'Elysium Planitia & Vastitas Borealis',
    nssdcaUrl: 'https://science.nasa.gov/mission/insight/',
    eyesUrl: 'https://eyes.nasa.gov/apps/solar-system/#/mars?embed=true&logo=false',
    glbUrl: null,
    apiQuery: 'InSight Lander Mars Seismometer',
    mapX: 695,
    mapY: 238,
    summary:
      'Phoenix directly sampled subsurface polar water ice in 2008; InSight detected over 1,300 marsquakes between 2018 and 2022, mapping the thickness of the Martian crust and liquid core.'
  },
  {
    id: 'ingenuity',
    nssdcaId: '2020-052B',
    name: 'Ingenuity Mars Helicopter (Ginny)',
    domain: 'mars',
    domainLabel: 'MARS // VALINOR HILLS, JEZERO CRATER',
    coords: '18.49° N, 77.40° E',
    launchYear: 2020,
    status: 'STATIONARY AERONAUTICAL ARTIFACT',
    restingPlace: 'Valinor Hills Airfield, Jezero Crater',
    nssdcaUrl: 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/',
    eyesUrl: 'https://eyes.nasa.gov/apps/solar-system/#/sc_perseverance?embed=true&logo=false',
    glbUrl: null,
    apiQuery: 'Ingenuity Mars Helicopter Flight',
    mapX: 592,
    mapY: 196,
    summary:
      'Achieved the first powered, controlled aerodynamic flight on another planet (April 19, 2021). Completed 72 flights before rotor blade tip damage grounded it permanently in Jan 2024.'
  },
  {
    id: 'dawn-probe',
    nssdcaId: '2007-043A',
    name: 'Dawn Ion-Propulsion Spacecraft',
    domain: 'deepspace',
    domainLabel: 'MAIN ASTEROID BELT // DWARF PLANET CERES',
    coords: 'DERELICT POLAR ORBIT (CERES)',
    launchYear: 2007,
    status: 'UNPOWERED PERPETUAL CERES ORBIT',
    restingPlace: 'Quarantine Orbit Around Dwarf Planet Ceres',
    nssdcaUrl: 'https://science.nasa.gov/mission/dawn/',
    eyesUrl: 'https://eyes.nasa.gov/apps/solar-system/#/sc_dawn?embed=true&logo=false',
    glbUrl: 'https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/Dawn/Dawn.glb',
    apiQuery: 'Dawn Spacecraft Ceres Occator Crater',
    mapX: null,
    mapY: null,
    summary:
      'First spacecraft to orbit two extraterrestrial bodies (protoplanet Vesta and dwarf planet Ceres). Depleted hydrazine in Oct 2018; left in a stable orbit to prevent contaminating Ceres’ subsurface brines.'
  },
  {
    id: 'near-shoemaker',
    nssdcaId: '1996-008A',
    name: 'NEAR Shoemaker Asteroid Lander',
    domain: 'deepspace',
    domainLabel: 'NEAR-EARTH ASTEROID // 433 EROS',
    coords: '35.0° S, 279.0° W (EROS)',
    launchYear: 1996,
    status: 'RESTING ON ASTEROID SURFACE',
    restingPlace: 'Saddle Region of Asteroid 433 Eros',
    nssdcaUrl: 'https://science.nasa.gov/mission/near-shoemaker/',
    eyesUrl: 'https://eyes.nasa.gov/apps/asteroids/#/433_eros?embed=true&logo=false',
    glbUrl: 'https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/1999%20RQ36%20asteroid/1999%20RQ36%20asteroid.glb',
    apiQuery: 'NEAR Shoemaker Asteroid Eros',
    mapX: null,
    mapY: null,
    summary:
      'Though designed only as an orbiter, engineers executed an improvised soft touchdown on asteroid 433 Eros on Feb 12, 2001—the first asteroid landing in human history.'
  },
  {
    id: 'pioneer-10-11',
    nssdcaId: '1972-012A',
    name: 'Pioneer 10 & Pioneer 11 Interstellar Probes',
    domain: 'deepspace',
    domainLabel: 'OUTER HELIOSPHERE // TAURUS & SCUTUM',
    coords: '~138 AU (DRIFTING TO ALDEBARAN)',
    launchYear: 1972,
    status: 'BALLISTIC INTERSTELLAR DRIFT (SILENT)',
    restingPlace: 'Heliospheric Escape Trajectory',
    nssdcaUrl: 'https://science.nasa.gov/mission/pioneer-10/',
    eyesUrl: 'https://eyes.nasa.gov/apps/solar-system/#/sc_pioneer_10?embed=true&logo=false',
    glbUrl: 'https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/3D%20Models/70-meter%20Dish/70%20meter%20dish.glb',
    apiQuery: 'Pioneer 10 Plaque Spacecraft',
    mapX: null,
    mapY: null,
    summary:
      'First spacecraft to traverse the asteroid belt and fly past Jupiter (1973) and Saturn (1979). Last weak signal from Pioneer 10 was received on Jan 23, 2003; both carry gold-anodized Pioneer Plaques.'
  },
  {
    id: 'kepler-telescope',
    nssdcaId: '2009-011A',
    name: 'Kepler Exoplanet Space Telescope',
    domain: 'deepspace',
    domainLabel: 'HELIOCENTRIC // EARTH-TRAILING ORBIT',
    coords: '~1.05 AU (372.5-DAY PERIOD)',
    launchYear: 2009,
    status: 'PASSIVATED HELIOCENTRIC MONUMENT',
    restingPlace: 'Safe Earth-Trailing Solar Orbit',
    nssdcaUrl: 'https://science.nasa.gov/mission/kepler/',
    eyesUrl: 'https://eyes.nasa.gov/apps/solar-system/#/sc_kepler?embed=true&logo=false',
    glbUrl: null,
    apiQuery: 'Kepler Space Telescope Exoplanet',
    mapX: null,
    mapY: null,
    summary:
      'Surveyed 530,506 stars and confirmed over 2,600 exoplanets, proving Earth-sized worlds are ubiquitous. Decommissioned on Oct 30, 2018 with its transmitter disabled in heliocentric drift.'
  }
];

/* ==========================================================================
   CONTROLLER 01: SYSTEM TELEMETRY CLOCK & VOYAGER 1 ODOMETER
   ========================================================================== */
class SystemClockController {
  constructor() {
    this.utcEl = document.getElementById('utc-readout');
    this.voyagerEl = document.getElementById('live-voyager-au');
    this.baseAu = 173.12048;
    this.velAuPerSec = 17.0 / 149597870.7;
    this.startMs = performance.now();

    setInterval(() => this.tick(), 100);
  }

  tick() {
    const now = new Date();
    const hh = String(now.getUTCHours()).padStart(2, '0');
    const mm = String(now.getUTCMinutes()).padStart(2, '0');
    const ss = String(now.getUTCSeconds()).padStart(2, '0');
    const ds = Math.floor(now.getUTCMilliseconds() / 100);
    if (this.utcEl) {
      this.utcEl.textContent = `${hh}:${mm}:${ss}.${ds}`;
    }

    const elapsedSec = (performance.now() - this.startMs) / 1000;
    const currentAu = this.baseAu + elapsedSec * this.velAuPerSec;
    if (this.voyagerEl) {
      this.voyagerEl.textContent = `${currentAu.toFixed(6)} AU`;
    }
  }
}

/* ==========================================================================
   CONTROLLER 02: NASA EYES WEBGL & NASA 3D GLB HARDWARE LAB
   ========================================================================== */
class Nasa3DLabController {
  constructor() {
    this.iframe = document.getElementById('nasa-eyes-iframe');
    this.eyesLabel = document.getElementById('eyes-active-label');
    this.eyesExt = document.getElementById('eyes-external-link');

    this.modelViewer = document.getElementById('nasa-model-viewer');
    this.glbLabel = document.getElementById('glb-active-label');
    this.glbDesc = document.getElementById('glb-description');

    this.bindEvents();
  }

  bindEvents() {
    const eyesButtons = Array.from(document.querySelectorAll('#eyes-preset-strip .preset-btn'));
    eyesButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        eyesButtons.forEach((b) => b.classList.toggle('active', b === btn));
        const url = btn.getAttribute('data-eyes');
        const label = btn.getAttribute('data-label');
        this.loadEyesTarget(url, label);
      });
    });

    const glbButtons = Array.from(document.querySelectorAll('#glb-preset-strip .preset-btn'));
    glbButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        glbButtons.forEach((b) => b.classList.toggle('active', b === btn));
        const glb = btn.getAttribute('data-glb');
        const title = btn.getAttribute('data-title');
        const desc = btn.getAttribute('data-desc');
        this.loadGlbModel(glb, title, desc);
      });
    });
  }

  loadEyesTarget(url, label) {
    this.iframe.src = url;
    this.eyesLabel.textContent = `LIVE WEBGL // ${label}`;
    this.eyesExt.href = url.replace('?embed=true&logo=false', '');
  }

  loadGlbModel(glbUrl, title, desc) {
    if (this.modelViewer && glbUrl) {
      this.modelViewer.setAttribute('src', glbUrl);
      this.glbLabel.textContent = title;
      this.glbDesc.textContent = desc;
    }
  }
}

/* ==========================================================================
   CONTROLLER 03: NSSDCA ARCHIVE CARDS & FILTER ENGINE
   ========================================================================== */
class NssdcaCatalogController {
  constructor(labController, artemisController, apiController) {
    this.container = document.getElementById('nssdca-cards-container');
    this.labController = labController;
    this.artemisController = artemisController;
    this.apiController = apiController;

    this.bindFilters();
    this.renderCards('all');
  }

  bindFilters() {
    const btns = Array.from(document.querySelectorAll('#nssdca-filter-bar .filter-btn'));
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btns.forEach((b) => b.classList.toggle('active', b === btn));
        this.renderCards(btn.getAttribute('data-domain'));
      });
    });
  }

  renderCards(domainFilter) {
    const list =
      domainFilter === 'all'
        ? NSSDCA_RELICS
        : NSSDCA_RELICS.filter((item) => item.domain === domainFilter);

    this.container.innerHTML = '';

    list.forEach((relic) => {
      const card = document.createElement('article');
      card.className = 'nssdca-card';
      card.innerHTML = `
        <div>
          <div class="nssdca-card__top">
            <span class="nssdca-id-badge">NSSDCA // ${relic.nssdcaId}</span>
            <span class="nssdca-domain-tag">${relic.domainLabel}</span>
          </div>
          <h3 class="nssdca-title">${relic.name}</h3>
          <div class="nssdca-resting">STATUS: ${relic.status}</div>
        </div>

        <p class="nssdca-desc">${relic.summary}</p>

        <div class="nssdca-meta-table">
          <div class="nssdca-meta-cell">
            <span>FINAL RESTING PLACE</span>
            ${relic.restingPlace}
          </div>
          <div class="nssdca-meta-cell">
            <span>COORDINATES / ORBIT</span>
            ${relic.coords}
          </div>
        </div>

        <div class="nssdca-actions">
          <a href="${relic.nssdcaUrl}" target="_blank" rel="noopener noreferrer" class="micro-action micro-action--alert">
            NSSDCA RECORD &#8599;
          </a>
          <button type="button" class="micro-action" data-action="eyes" data-id="${relic.id}">
            LOAD IN NASA EYES 3D
          </button>
          <button type="button" class="micro-action" data-action="photos" data-id="${relic.id}">
            FETCH NASA PHOTOS
          </button>
          ${
            relic.mapX !== null
              ? `<button type="button" class="micro-action" data-action="plume" data-id="${relic.id}">TEST PLUME BUFFER</button>`
              : ''
          }
        </div>
      `;

      this.container.appendChild(card);
    });

    this.container.querySelectorAll('button[data-action]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        const relic = NSSDCA_RELICS.find((r) => r.id === btn.getAttribute('data-id'));
        if (!relic) return;

        if (action === 'eyes') {
          this.labController.loadEyesTarget(relic.eyesUrl, relic.name.toUpperCase());
          if (relic.glbUrl) {
            this.labController.loadGlbModel(
              relic.glbUrl,
              `3D CAD // ${relic.name.toUpperCase()}`,
              relic.summary
            );
          }
          document.getElementById('sector-eyes').scrollIntoView({ behavior: 'smooth' });
        } else if (action === 'photos') {
          this.apiController.executeSearch(relic.apiQuery);
          document.getElementById('sector-earth').scrollIntoView({ behavior: 'smooth' });
        } else if (action === 'plume') {
          this.artemisController.focusRelicViolation(relic);
          document.getElementById('sector-artemis').scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
}

/* ==========================================================================
   CONTROLLER 04: ARTEMIS ACCORDS SECTION 9 BALLISTIC PLUME SIMULATOR
   ========================================================================== */
class ArtemisPlumeController {
  constructor() {
    this.canvas = document.getElementById('artemis-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.activeSurface = 'moon';
    this.scaleMap = { moon: 3.5, mars: 6.8 };
    this.velMap = { moon: '2,420 m/s (Vacuum Sheet)', mars: '1,180 m/s (6.1 mbar Plume)' };
    this.thresholdKm = 80.0;

    this.touchdown = { x: 220, y: 185 };

    this.bindEvents();
    this.evaluateAndDraw();
  }

  bindEvents() {
    const btns = Array.from(document.querySelectorAll('#artemis-body-switch .filter-btn'));
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btns.forEach((b) => b.classList.toggle('active', b === btn));
        this.activeSurface = btn.getAttribute('data-surface');
        this.touchdown = { x: 210, y: 340 };
        this.evaluateAndDraw();
      });
    });

    const getCanvasPt = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: ((e.clientX - rect.left) / rect.width) * this.canvas.width,
        y: ((e.clientY - rect.top) / rect.height) * this.canvas.height
      };
    };

    this.canvas.addEventListener('click', (e) => {
      this.touchdown = getCanvasPt(e);
      this.evaluateAndDraw();
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const pt = getCanvasPt(e);
      const lat = (90 - (pt.y / this.canvas.height) * 180).toFixed(2);
      const lon = ((pt.x / this.canvas.width) * 360 - 180).toFixed(2);
      document.getElementById('artemis-cursor-readout').textContent =
        `CURSOR // LAT ${lat}° LON ${lon}° [X:${Math.round(pt.x)} Y:${Math.round(pt.y)}]`;
    });

    document.getElementById('sim-apollo12-case').addEventListener('click', () => {
      const sites = this.getActiveSites();
      const target = sites.find((s) => s.id === 'surveyor-3') || sites[0];
      this.touchdown = { x: target.mapX + 3, y: target.mapY - 3 };
      this.evaluateAndDraw();
    });

    document.getElementById('sim-safe-case').addEventListener('click', () => {
      this.touchdown = { x: 160, y: 390 };
      this.evaluateAndDraw();
    });
  }

  getActiveSites() {
    return NSSDCA_RELICS.filter((r) => r.domain === this.activeSurface && r.mapX !== null);
  }

  focusRelicViolation(relic) {
    this.activeSurface = relic.domain;
    const btns = Array.from(document.querySelectorAll('#artemis-body-switch .filter-btn'));
    btns.forEach((b) => b.classList.toggle('active', b.getAttribute('data-surface') === this.activeSurface));
    this.touchdown = { x: relic.mapX + 4, y: relic.mapY - 4 };
    this.evaluateAndDraw();
  }

  evaluateAndDraw() {
    const scale = this.scaleMap[this.activeSurface];
    const sites = this.getActiveSites().map((s) => {
      const pxDist = Math.hypot(this.touchdown.x - s.mapX, this.touchdown.y - s.mapY);
      return { ...s, kmDist: pxDist * scale };
    });

    sites.sort((a, b) => a.kmDist - b.kmDist);
    const nearest = sites[0];
    const isBreach = nearest.kmDist < this.thresholdKm;

    const lat = (90 - (this.touchdown.y / this.canvas.height) * 180).toFixed(2);
    const lon = ((this.touchdown.x / this.canvas.width) * 360 - 180).toFixed(2);

    document.getElementById('artemis-latlon').textContent = `${lat}°, ${lon}°`;
    document.getElementById('artemis-nearest-relic').textContent = `${nearest.name.split(' (')[0]} (${nearest.nssdcaId})`;
    document.getElementById('artemis-standoff-km').textContent = `${nearest.kmDist.toFixed(1)} km`;
    document.getElementById('artemis-plume-vel').textContent = this.velMap[this.activeSurface];

    const vBox = document.getElementById('artemis-verdict-box');
    const vTitle = document.getElementById('artemis-verdict-title');
    const vText = document.getElementById('artemis-verdict-text');

    if (isBreach) {
      vBox.className = 'verdict-banner verdict-banner--violation';
      vTitle.textContent = `CRITICAL VIOLATION // ${nearest.kmDist.toFixed(1)} KM FROM ${nearest.nssdcaId}`;
      vText.textContent = `Touchdown violates the 80.0 km ballistic plume perimeter around ${nearest.name}. Rocket exhaust sheet will sandblast historic thermal blankets and optical surfaces (Apollo 12 / Surveyor 3 effect).`;
    } else {
      vBox.className = 'verdict-banner verdict-banner--ok';
      vTitle.textContent = 'APPROVED // ARTEMIS ACCORDS SECTION 9 COMPLIANT';
      vText.textContent = `Standoff of ${nearest.kmDist.toFixed(1)} km from ${nearest.name} exceeds the 80.0 km ballistic regolith threshold. Heritage hardware remains unperturbed.`;
    }

    const tbody = document.getElementById('artemis-matrix-body');
    tbody.innerHTML = '';
    sites.forEach((s) => {
      const tr = document.createElement('tr');
      if (s.kmDist < this.thresholdKm) tr.classList.add('breach-row');
      tr.innerHTML = `
        <td>${s.nssdcaId}</td>
        <td>${s.name.split(' (')[0]}</td>
        <td>${s.kmDist.toFixed(1)} km</td>
      `;
      tr.addEventListener('click', () => {
        this.touchdown = { x: s.mapX + 4, y: s.mapY - 4 };
        this.evaluateAndDraw();
      });
      tbody.appendChild(tr);
    });

    this.drawTacticalGrid(sites, nearest, isBreach, scale);
  }

  drawTacticalGrid(sites, nearest, isBreach, scale) {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const radiusPx = this.thresholdKm / scale;

    ctx.fillStyle = this.activeSurface === 'moon' ? '#060606' : '#0d0604';
    ctx.fillRect(0, 0, w, h);

    // Tactical Coordinate Graticule
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += 92) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += 83) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Equator & Prime Meridian
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();

    // Draw NSSDCA Relics & Exclusion Rings
    sites.forEach((s) => {
      const breached = s.kmDist < this.thresholdKm;
      ctx.save();

      // 80 km Plume Hazard Perimeter
      ctx.beginPath();
      ctx.arc(s.mapX, s.mapY, radiusPx, 0, Math.PI * 2);
      ctx.fillStyle = breached ? 'rgba(255, 42, 75, 0.24)' : 'rgba(255, 77, 0, 0.08)';
      ctx.fill();
      ctx.strokeStyle = breached ? '#ff2a4b' : '#ff4d00';
      ctx.lineWidth = breached ? 2 : 1.2;
      ctx.stroke();

      // Artifact Center Cross
      ctx.fillStyle = '#ff4d00';
      ctx.fillRect(s.mapX - 3, s.mapY - 3, 6, 6);

      ctx.font = '600 10px "Geist Mono", monospace';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${s.nssdcaId} // ${s.name.split(' (')[0].toUpperCase()}`, s.mapX + 10, s.mapY + 4);
      ctx.restore();
    });

    // Vector Line to Nearest Artifact
    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.moveTo(this.touchdown.x, this.touchdown.y);
    ctx.lineTo(nearest.mapX, nearest.mapY);
    ctx.strokeStyle = isBreach ? '#ff2a4b' : '#00ff66';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.setLineDash([]);

    // Touchdown Reticle
    const col = isBreach ? '#ff2a4b' : '#00ff66';
    ctx.strokeStyle = col;
    ctx.lineWidth = 1.8;
    ctx.strokeRect(this.touchdown.x - 9, this.touchdown.y - 9, 18, 18);

    ctx.beginPath();
    ctx.moveTo(this.touchdown.x - 16, this.touchdown.y);
    ctx.lineTo(this.touchdown.x + 16, this.touchdown.y);
    ctx.moveTo(this.touchdown.x, this.touchdown.y - 16);
    ctx.lineTo(this.touchdown.x, this.touchdown.y + 16);
    ctx.stroke();
    ctx.restore();
  }
}

/* ==========================================================================
   CONTROLLER 05: EARTH OBSERVATORY COMPARATOR & LIVE NASA IMAGES REST API
   ========================================================================== */
class EarthAndNasaApiController {
  constructor() {
    this.canvas = document.getElementById('scar-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.stage = document.getElementById('scar-stage');
    this.divider = document.getElementById('scar-divider');
    this.metricsRow = document.getElementById('scar-metrics-row');
    this.resultsGrid = document.getElementById('nasa-api-results');
    this.statusBadge = document.getElementById('api-status-badge');

    this.split = 0.5;
    this.dragging = false;
    this.activeScar = 'aral';

    this.scars = {
      aral: {
        title: 'SECTOR 01 // ARAL SEA DESICCATION (LANDSAT 2000 VS 2024)',
        metrics: [
          { k: '2000 WATER SURFACE', v: '28,680 KM²' },
          { k: '2024 REMNANT BASIN', v: '2,460 KM² (-91.4%)' },
          { k: 'NEW DESERT FORMED', v: 'ARALKUM SALT PLAYA' }
        ]
      },
      rondonia: {
        title: 'SECTOR 02 // RONDÔNIA FISHBONE DEFORESTATION (1984 VS 2022)',
        metrics: [
          { k: '1984 PRIMARY CANOPY', v: '208,400 KM²' },
          { k: '2022 CLEARED CORRIDORS', v: '-80,450 KM² (-38.6%)' },
          { k: 'PATTERN GEOMETRY', v: 'BR-364 ORTHOGONAL ARTERIES' }
        ]
      },
      mead: {
        title: 'SECTOR 03 // LAKE MEAD RESERVOIR DEFICIT (1998 VS 2023)',
        metrics: [
          { k: '1998 FULL POOL ELEV', v: '372.2 METERS' },
          { k: '2023 DRAWDOWN ELEV', v: '319.8 METERS (-52.4M)' },
          { k: 'SHORELINE MINERAL RING', v: '33.8% CAPACITY REMAINING' }
        ]
      }
    };

    this.bindComparator();
    this.bindNasaApiSearch();
    this.loadScarCase('aral');
    this.executeSearch('Apollo 12 Surveyor 3');
  }

  bindComparator() {
    const btns = Array.from(document.querySelectorAll('#scar-selector .preset-btn'));
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btns.forEach((b) => b.classList.toggle('active', b === btn));
        this.loadScarCase(btn.getAttribute('data-scar'));
      });
    });

    const updateSplit = (clientX) => {
      const rect = this.stage.getBoundingClientRect();
      this.split = Math.max(0.05, Math.min(0.95, (clientX - rect.left) / rect.width));
      this.divider.style.left = `${(this.split * 100).toFixed(1)}%`;
      this.renderSpectralRadar();
    };

    this.stage.addEventListener('mousedown', (e) => {
      this.dragging = true;
      updateSplit(e.clientX);
    });
    window.addEventListener('mousemove', (e) => {
      if (this.dragging) updateSplit(e.clientX);
    });
    window.addEventListener('mouseup', () => {
      this.dragging = false;
    });

    this.stage.addEventListener(
      'touchstart',
      (e) => {
        this.dragging = true;
        if (e.touches[0]) updateSplit(e.touches[0].clientX);
      },
      { passive: true }
    );
    window.addEventListener(
      'touchmove',
      (e) => {
        if (this.dragging && e.touches[0]) updateSplit(e.touches[0].clientX);
      },
      { passive: true }
    );
    window.addEventListener('touchend', () => {
      this.dragging = false;
    });
  }

  loadScarCase(key) {
    this.activeScar = key;
    const cfg = this.scars[key];
    document.getElementById('scar-active-title').textContent = cfg.title;

    this.metricsRow.innerHTML = cfg.metrics
      .map(
        (m) => `
      <div class="hud-metric">
        <span class="mono-dim">${m.k}</span>
        <span class="mono-bright">${m.v}</span>
      </div>
    `
      )
      .join('');

    this.renderSpectralRadar();
  }

  renderSpectralRadar() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const splitX = Math.round(w * this.split);

    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, w, h);

    // Draw Left (Historical Baseline Vector Contour) vs Right (Modern Depleted Contour)
    this.drawHydrologicalContours(ctx, 0, splitX, true);
    this.drawHydrologicalContours(ctx, splitX, w - splitX, false);
  }

  drawHydrologicalContours(ctx, startX, width, isBaseline) {
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.save();
    ctx.beginPath();
    ctx.rect(startX, 0, width, h);
    ctx.clip();

    // Technical Elevation Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    for (let x = 0; x < w; x += 44) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 44) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    if (this.activeScar === 'aral') {
      // Twin-basin hydrological vector contours
      const rings = isBaseline ? 14 : 3;
      for (let i = rings; i >= 1; i--) {
        ctx.beginPath();
        const rx = isBaseline ? i * 18 : i * 9;
        const ry = isBaseline ? i * 13 : i * 12;
        const cx = isBaseline ? w * 0.48 : w * 0.34;
        ctx.ellipse(cx, h * 0.5, rx, ry, -0.15, 0, Math.PI * 2);
        ctx.fillStyle = isBaseline ? 'rgba(0, 229, 255, 0.08)' : 'rgba(255, 77, 0, 0.12)';
        ctx.fill();
        ctx.strokeStyle = isBaseline ? '#00e5ff' : '#ff4d00';
        ctx.stroke();
      }
      if (!isBaseline) {
        // Exposed Aralkum dry basin perimeter dashed
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = 'rgba(255, 77, 0, 0.5)';
        ctx.beginPath();
        ctx.ellipse(w * 0.52, h * 0.5, 240, 175, -0.1, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    } else if (this.activeScar === 'rondonia') {
      // Canopy density vs orthogonal fishbone logging arteries
      ctx.strokeStyle = isBaseline ? '#00ff66' : '#ff4d00';
      for (let y = 30; y < h; y += 22) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 20) {
          const offset = Math.sin(x * 0.02 + y * 0.05) * 8;
          if (x === 0) ctx.moveTo(x, y + offset);
          else ctx.lineTo(x, y + offset);
        }
        ctx.stroke();
      }
      if (!isBaseline) {
        // BR-364 Highway spine & perpendicular logging corridors
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(80, h * 0.5);
        ctx.lineTo(w - 80, h * 0.5);
        ctx.stroke();

        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#ff2a4b';
        for (let x = 120; x < w - 100; x += 34) {
          ctx.beginPath();
          ctx.moveTo(x, h * 0.14);
          ctx.lineTo(x, h * 0.86);
          ctx.stroke();
        }
      }
    } else {
      // Lake Mead Canyon Contours
      const levels = isBaseline ? 12 : 4;
      for (let i = levels; i >= 1; i--) {
        ctx.beginPath();
        ctx.moveTo(100, h * 0.5 - i * 14);
        ctx.bezierCurveTo(w * 0.4, h * 0.25 - i * 8, w * 0.6, h * 0.75 + i * 8, w - 100, h * 0.45 - i * 12);
        ctx.strokeStyle = isBaseline ? '#00e5ff' : '#ff4d00';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // Epoch Stamp
    ctx.font = '600 11px "Geist Mono", monospace';
    ctx.fillStyle = isBaseline ? '#00e5ff' : '#ff4d00';
    ctx.fillText(
      isBaseline ? 'HISTORICAL BASELINE // MULTISPECTRAL VECTOR' : 'MODERN OBSERVATION // ANTHROPOGENIC DEFICIT',
      isBaseline ? 20 : w - 340,
      30
    );
    ctx.restore();
  }

  bindNasaApiSearch() {
    const form = document.getElementById('nasa-search-form');
    const input = document.getElementById('nasa-search-input');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input.value.trim()) {
        this.executeSearch(input.value.trim());
      }
    });

    document.querySelectorAll('#api-quick-tags .preset-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const q = btn.getAttribute('data-query');
        input.value = q;
        this.executeSearch(q);
      });
    });
  }

  async executeSearch(query) {
    this.statusBadge.textContent = `QUERYING: "${query.toUpperCase()}"...`;
    try {
      const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`;
      const res = await fetch(url);
      const data = await res.json();
      const items = (data?.collection?.items || []).slice(0, 6);

      this.statusBadge.textContent = `200 OK // ${items.length} ASSETS LOADED`;
      this.resultsGrid.innerHTML = '';

      if (items.length === 0) {
        this.resultsGrid.innerHTML = '<div class="api-item"><span class="mono-dim">NO ARCHIVE MATCHES FOUND.</span></div>';
        return;
      }

      items.forEach((item) => {
        const meta = item.data?.[0] || {};
        const thumb = item.links?.[0]?.href || '';
        const nasaId = meta.nasa_id || 'NASA-ARCHIVE';
        const title = meta.title || 'Untitled NASA Asset';
        const date = (meta.date_created || '').slice(0, 10);

        const card = document.createElement('a');
        card.className = 'api-item';
        card.href = `https://images.nasa.gov/details/${encodeURIComponent(nasaId)}`;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        card.innerHTML = `
          <img src="${thumb}" alt="${title.replace(/"/g, '')}" loading="lazy" />
          <div class="api-item-meta">${nasaId} // ${date}</div>
          <div class="api-item-title">${title}</div>
        `;
        this.resultsGrid.appendChild(card);
      });
    } catch (err) {
      this.statusBadge.textContent = 'API OFFLINE // CHECK NETWORK';
    }
  }
}

/* ==========================================================================
   BOOTSTRAP APPLICATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  new SystemClockController();
  const lab3D = new Nasa3DLabController();
  const artemis = new ArtemisPlumeController();
  const earthApi = new EarthAndNasaApiController();
  new NssdcaCatalogController(lab3D, artemis, earthApi);
});
