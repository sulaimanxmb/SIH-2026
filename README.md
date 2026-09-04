# NER-Alturas | Smart Logistics Accessibility Platform

This repository contains the Command Center / Dispatcher Dashboard for our SIH 2026 project, focused on solving logistics and routing challenges in the Northeast Region (NER) of India.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router, React)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (using glassmorphic UI principles for an enterprise feel)
*   **Map Engine:** [Leaflet](https://leafletjs.com/) & `react-leaflet` (for interactive spatial mapping)
*   **Routing API:** [OSRM (Open Source Routing Machine)](http://project-osrm.org/) (for mapping coordinate waypoints to real-world road networks)
*   **Icons:** [Lucide React](https://lucide.dev/)

## Working Basics

This platform acts as a high-level monitoring and routing hub for logistics administrators:

1.  **Mission Intelligence:** The dashboard loads pre-configured logistics routes across complex NER terrain (e.g., Guwahati to Tawang).
2.  **Field Agent Simulation:** Administrators can simulate a field agent reporting a blockage by using the **"Report Blocked Road"** tool and dropping a pin on the map.
3.  **Dynamic Geofencing:** Once a hazard is reported, the system automatically cordons off the area by drawing a translucent 12km radius Danger Zone.
4.  **AI Route Optimization:** The platform instantly recalculates and visually renders new optimal bypass routes using the OSRM routing engine, keeping trucks safely away from the detected hazard.
5.  **Predictive Timeline:** A continuous meteorological and geological timeline provides context for weather-related risks (simulating predictions from a Python/XGBoost backend utilizing ISRO/IMD data).

*Note: This frontend prototype is optimized for desktop and large monitor displays typical of a command center environment.*

## 🚀 Vision & Future Roadmap (SIH Next Rounds)

Our goal is to evolve **NER-Alturas** from a command-center dashboard into a fully decentralized, offline-capable logistics ecosystem tailored specifically for the extreme terrains and unpredictable cellular coverage of Northeast India.

### 1. The Offline Mesh-Network (Solving the Connectivity Gap)
In the mountainous terrains of the NER, cellular dead-zones are the biggest threat to real-time logistics. 
* **Implementation:** We plan to integrate peer-to-peer (P2P) mesh networking among the fleet. If a truck encounters a landslide in a dead zone, the hazard report is cached locally and bounced to passing vehicles. Once any vehicle in the mesh chain hits a cellular tower, the critical alert is instantly beamed to the Alturas Command Center.

### 2. Crowdsourced Intelligence & The "Karma" Engine
To ensure our hazard data is incredibly accurate and real-time, we are building a gamified community reporting system.
* **Implementation:** Local commercial and taxi drivers will use a lightweight companion app to upload geo-tagged photos of fallen trees, landslides, or flooded roads. 
* **Incentivization:** Reports are verified by our AI, and drivers earn "Karma Points" which can be redeemed for FastTag toll waivers, subsidized fuel, or government tax rebates in partnership with the Ministry of Road Transport.

### 3. Advanced Geospatial Integration
We are building on robust, community-driven, and indigenous spatial data:
* **Base Map & Telematics:** Expanding our reliance on **OpenStreetMap (OSM)** for a flexible, open-source frontend UI, vehicle GPS tracking, and community-verified ETAs that understand hyper-local terrain.
* **ISRO Bhuvan Intelligence Overlay:** Utilizing ISRO Bhuvan’s WMS (Web Map Service) APIs to pull specific government disaster layers (e.g., historical landslide vulnerability zones) and overlay them as translucent threat-radars directly on top of our OSM routing engine.

### 4. The Perishability Matrix (Cold-Chain Rescue)
Route optimization isn't just about reaching the destination; it's about keeping the cargo alive. 
* **Implementation:** If a truck carrying COVID vaccines, vital medicines, or fresh agricultural produce gets trapped by a landslide, the AI calculates the diesel remaining for the truck's refrigeration unit (reefer). If the unit will run out of power before the road clears, the AI abandons the original destination and instantly reroutes the truck to the **nearest government cold-storage facility** to save the highly perishable cargo.
