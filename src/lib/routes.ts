export interface AlternateRoute {
  id: string;
  name: string;
  distance: string;
  time: string;
  riskLevel: string;
  coordinates: number[][];
}

export const MOCK_ROUTES = [
  {
    id: "route-1",
    origin: "Guwahati, Assam",
    destination: "Tawang, Arunachal Pradesh",
    originalCoordinates: [
      [91.7362, 26.1445], // Guwahati
      [91.8021, 26.4012], // Rangia
      [91.9542, 26.7531], // Udalguri
      [92.0510, 27.0987], // Hazard point (Simulated blocked direct road)
      [92.1031, 27.5029], // Sela Pass
      [91.8677, 27.5888]  // Tawang
    ],
    alternateRoutes: [
      {
        id: "alt-1-1",
        name: "Eastern Highway Bypass",
        distance: "450 km",
        time: "10h 30m",
        riskLevel: "Low",
        coordinates: [
          [91.7362, 26.1445],
          [92.5297, 26.7509], // Tezpur
          [92.4158, 27.2645], // Bhalukpong
          [92.2065, 27.3150], // Bomdila
          [92.1031, 27.5029],
          [91.8677, 27.5888]
        ]
      },
      {
        id: "alt-1-2",
        name: "Western Mountain Pass",
        distance: "485 km",
        time: "12h 15m",
        riskLevel: "Medium",
        coordinates: [
          [91.7362, 26.1445],
          [91.3833, 26.5000], // Western point
          [91.5500, 27.2000],
          [91.7500, 27.4500],
          [91.8677, 27.5888]
        ]
      },
      {
        id: "alt-1-3",
        name: "Central Logistics Corridor",
        distance: "510 km",
        time: "11h 45m",
        riskLevel: "Very Low",
        coordinates: [
          [91.7362, 26.1445],
          [92.1000, 26.2000],
          [92.6500, 26.8500], // Deeper east
          [92.3000, 27.4000],
          [91.8677, 27.5888]
        ]
      }
    ],
    hazardLocation: [92.0510, 27.0987] as [number, number],
    hazardConfidence: "94%",
    hazardType: "Massive Landslide",
    center: [92.1, 27.1] as [number, number],
    zoom: 7.5,
    risk: "High (Landslides)"
  },
  {
    id: "route-2",
    origin: "Silchar, Assam",
    destination: "Aizawl, Mizoram",
    originalCoordinates: [
      [92.7956, 24.8333], // Silchar
      [92.7483, 24.5779],
      [92.7212, 24.3121], // Hazard point
      [92.7042, 24.1611],
      [92.6811, 23.9537],
      [92.7176, 23.7271]  // Aizawl
    ],
    alternateRoutes: [
      {
        id: "alt-2-1",
        name: "Eastern Ridge Detour",
        distance: "185 km",
        time: "5h 45m",
        riskLevel: "Low",
        coordinates: [
          [92.7956, 24.8333],
          [92.9510, 24.6012],
          [92.9810, 24.3000],
          [92.8510, 24.1000],
          [92.6811, 23.9537],
          [92.7176, 23.7271]
        ]
      },
      {
        id: "alt-2-2",
        name: "Western Valley Route",
        distance: "210 km",
        time: "6h 20m",
        riskLevel: "Medium",
        coordinates: [
          [92.7956, 24.8333],
          [92.5500, 24.6500],
          [92.5000, 24.2500],
          [92.6000, 23.9000],
          [92.7176, 23.7271]
        ]
      },
      {
        id: "alt-2-3",
        name: "National Highway 306 Bypass",
        distance: "230 km",
        time: "6h 50m",
        riskLevel: "Very Low",
        coordinates: [
          [92.7956, 24.8333],
          [93.1000, 24.7000],
          [93.1500, 24.2000],
          [92.9000, 23.8500],
          [92.7176, 23.7271]
        ]
      }
    ],
    hazardLocation: [92.7212, 24.3121] as [number, number],
    hazardConfidence: "88%",
    hazardType: "Bridge Washout",
    center: [92.75, 24.3] as [number, number],
    zoom: 8.5,
    risk: "High (Flooding)"
  },
  {
    id: "route-3",
    origin: "Dimapur, Nagaland",
    destination: "Kohima, Nagaland",
    originalCoordinates: [
      [93.7266, 25.9067], // Dimapur
      [93.8159, 25.8023], // Hazard point
      [93.9856, 25.7273],
      [94.1086, 25.6701]  // Kohima
    ],
    alternateRoutes: [
      {
        id: "alt-3-1",
        name: "Southern Military Bypass",
        distance: "85 km",
        time: "2h 45m",
        riskLevel: "Low",
        coordinates: [
          [93.7266, 25.9067],
          [93.7500, 25.7000],
          [93.9000, 25.6500],
          [94.1086, 25.6701]
        ]
      },
      {
        id: "alt-3-2",
        name: "Northern Mountain Trail",
        distance: "95 km",
        time: "3h 10m",
        riskLevel: "Medium",
        coordinates: [
          [93.7266, 25.9067],
          [93.8500, 26.0500],
          [94.0500, 25.9500],
          [94.1086, 25.6701]
        ]
      },
      {
        id: "alt-3-3",
        name: "Commercial Transport Route",
        distance: "110 km",
        time: "3h 40m",
        riskLevel: "Very Low",
        coordinates: [
          [93.7266, 25.9067],
          [93.6000, 25.7500],
          [93.8000, 25.5000],
          [94.1086, 25.6701]
        ]
      }
    ],
    hazardLocation: [93.8159, 25.8023] as [number, number],
    hazardConfidence: "75%",
    hazardType: "Road Subsidence",
    center: [93.9, 25.8] as [number, number],
    zoom: 10,
    risk: "Medium (Subsidence)"
  }
];
