<img width="1892" height="827" alt="Screenshot 2026-11-16 010033" src="https://github.com/user-attachments/assets/efc49ebb-ce11-4375-ab0f-55c090ce58d8" />
# Planetary Footprint

**From Earth’s Scars to Cosmic Relics** — An interactive 3D aerospace telemetry and Earth observation web application mapping humanity’s permanent footprint across the Solar System, from anthropogenic climate scars on Earth to protected historic spacecraft across the Moon, Mars, asteroids, and interstellar space.

Built for the **NASA Space Apps Challenge**.

🔗 **Live Demo:** [planetary-footprint-mystic.vercel.app](https://planetary-footprint-mystic.vercel.app/)

---

## Visual Overview

### 01 // Real-Time 3D Telemetry & Hardware Lab (`index.html`)
Interactive **NASA Eyes on the Solar System** WebGL embeds paired with an official **NASA 3D Resources (`.glb`)** CAD hardware inspector, beneath a full-bleed Three.js sunlit planetary horizon and floating 3D Apollo Lunar Module hero.
<img width="1892" height="827" alt="Screenshot 2026-11-16 010033" src="https://github.com/user-attachments/assets/f7f0bec3-54c5-4f56-a24e-c099eddc4658" />


### 02 // NSSDCA Cosmic Relics & 3D Plume Simulator (`relics.html`)
Browse **13 cataloged NSSDCA spacecraft relics** (Moon, Mars, 433 Eros, Ceres, and interstellar space) enriched with live NASA archive photography, and simulate **Artemis Accords Section 9** landings on a 3D cratered lunar/Martian terrain with supersonic regolith ejecta particles.
<img width="1896" height="900" alt="Screenshot 2026-11-16 005957" src="https://github.com/user-attachments/assets/9e91c55b-1336-44a8-92c3-670f130e5c9a" />

### 03 // Earth Scars & Satellite Observatory (`observatory.html`)
Interactive before-and-now satellite swipe comparator tracking multi-decade and century-scale planetary transformations alongside a live **NASA Images & Video Library REST API** search engine.
<img width="1892" height="906" alt="Screenshot 2026-11-16 010009" src="https://github.com/user-attachments/assets/b182b0d6-1a84-482b-9de7-0ee31366e9ba" />

## Key Features

### Page 1 — `index.html` (3D Telemetry & Solar System Atlas)
- **Interactive 3D Hero:** Three.js sunlit lunar horizon, atmospheric rim glow, starfield parallax, and a rotatable 3D Apollo Lunar Module (`<model-viewer>`).
- **Live NASA Eyes WebGL Switcher:** Jump directly between Voyager 1, Earth Observation Fleet, the Moon, Mars, Perseverance, Dawn at Ceres, 433 Eros, Pioneer 10, and Kepler.
- **NASA 3D Hardware Inspector:** Inspect official `.glb` CAD meshes including the **Apollo Lunar Module**, **Dawn Spacecraft**, **Cassini-Huygens**, **70m Deep Space Network Dish**, and **Asteroid Bennu (1999 RQ36)**.

### Page 2 — `relics.html` (Cosmic Relics & 3D Plume Simulator)
- **NSSDCA Relic Catalog (13 Artifacts):** Filterable across Lunar, Martian, and Deep Space domains with resting coordinates, mission status, NASA photography, and cross-page deep links.
- **3D Artemis Accords Section 9 Plume Simulator:**
  - Three.js displaced cratered terrain with **Luna** and **Mars** surface modes.
  - Official **Apollo Lunar Module `.glb`** lander that glides to any clicked landing vector.
  - Animated rocket exhaust cone and outward **supersonic regolith particle ring**.
  - Real-time compliance verdict checking the **2.0 km statutory core** and **80.0 km ballistic ejecta envelope**, including a replay of the **1969 Apollo 12 / Surveyor 3** sandblasting precedent.

### Page 3 — `observatory.html` (Earth Scars & Live NASA Archive)
- **Century & Climate Satellite Comparator:** Smooth draggable before/after split viewer featuring verified NASA MODIS & Landsat imagery:
  - **Aral Sea (2002 vs 2017 / 1960–2024):** `-91.4%` surface loss and formation of the Aralkum Desert.
  - **Caspian Sea (2006 vs 2024):** Warming-driven evaporation and shrinking northern coastline.
  - **Arctic Sea Ice (1984 vs 2016+):** Loss of `95%` of oldest multi-year ice pack due to polar amplification.
  - **Columbia Glacier, Alaska (1986 vs 2011+):** `>20 km` tidewater terminus retreat and `-50%` volume loss.
  - **Rondônia, Amazon (2000 vs 2007):** `-38%` canopy loss from fishbone deforestation corridors.
  - **Lake Mead, USA (2000 vs 2022):** `-52 m` elevation drop (`27%` capacity) under Western megadrought.
- **Live NASA Media API:** Real-time query interface connected to `https://images-api.nasa.gov/search`.

---

## Project Structure

```text
planetary-footprint-atlas-main/
├── index.html          # Page 1: 3D Hero, NASA Eyes WebGL & GLB Hardware Lab
├── relics.html         # Page 2: NSSDCA Relic Archive & 3D Artemis Plume Simulator
├── observatory.html    # Page 3: Before/Now Satellite Comparator & NASA Media API
├── style.css           # Shared aerospace design system & responsive grid
├── app.js              # Core NSSDCA catalog, ephemeris clock, plume math & API client
├── docs/
│   └── screenshots/    # README preview images
└── LICENSE             # Apache License 2.0
