# Smart Logistics Accessibility Intelligence Platform (NER)

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
