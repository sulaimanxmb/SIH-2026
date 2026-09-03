"use client";

import React, { useEffect, useState } from 'react';
import { useMap, useMapEvents, MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from 'next-themes';

// Fix Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom HTML Icons using Tailwind
const createCustomIcon = (text: string, colorClass: string) => L.divIcon({
  html: `<div class="w-8 h-8 ${colorClass} rounded-full border-4 border-white shadow-md flex items-center justify-center text-white font-bold text-xs">${text}</div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
});

const originIcon = createCustomIcon('A', 'bg-blue-600');
const destIcon = createCustomIcon('B', 'bg-slate-900');
const hazardIcon = createCustomIcon('!', 'bg-red-500');

// Beautiful SVG Truck Icon with variable background
const createTruckIcon = (colorClass: string) => L.divIcon({
  html: `<div class="w-8 h-8 ${colorClass} rounded-full border-2 border-white shadow-md flex items-center justify-center text-white"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l4 4v5c0 .6-.4 1-1 1h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg></div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
});

type FleetStatus = "On Move" | "Stationary" | "Loading";

const statusConfig: Record<FleetStatus, { icon: L.DivIcon, colorText: string }> = {
  "On Move": { icon: createTruckIcon('bg-emerald-500'), colorText: 'text-emerald-600' },
  "Stationary": { icon: createTruckIcon('bg-red-500'), colorText: 'text-red-600' },
  "Loading": { icon: createTruckIcon('bg-amber-500'), colorText: 'text-amber-600' },
};

// Component to handle auto-fitting the map bounds
function BoundsManager({ coords }: { coords: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (coords.length > 0) {
      map.fitBounds(L.latLngBounds(coords), { padding: [50, 50], duration: 1 });
    }
  }, [coords, map]);
  return null;
}

// Component to handle map clicks for dropping pins
function MapClickHandler({ onMapClick }: { onMapClick?: (latlng: L.LatLng) => void }) {
  useMapEvents({
    click(e) {
      if (onMapClick) onMapClick(e.latlng);
    }
  });
  return null;
}

export default function MapView({ 
  activeRoute, 
  isOptimized, 
  selectedAltId,
  confirmedAltId,
  showFleet = true,
  userReports = [],
  onMapClick,
  onClearReport
}: { 
  activeRoute: any; 
  isOptimized: boolean; 
  selectedAltId?: string | null;
  confirmedAltId?: string | null;
  showFleet?: boolean;
  userReports?: any[];
  onMapClick?: (latlng: L.LatLng) => void;
  onClearReport?: (index: number) => void;
}) {
  const { theme } = useTheme();
  const [originalPath, setOriginalPath] = useState<[number, number][]>([]);
  const [altPaths, setAltPaths] = useState<Record<string, [number, number][]>>({});
  const [fleetLocations, setFleetLocations] = useState<{lat: number, lng: number, status: FleetStatus}[]>([]);

  useEffect(() => {
    // Generate exactly 24 random active truck locations around the NER region to match the counter
    const baseStatuses: FleetStatus[] = ["On Move", "Stationary", "Loading"];
    const generated = Array.from({ length: 24 }).map(() => {
      // Wider spread for 24 trucks (approx +/- 2.5 degrees)
      const lat = 26.1445 + (Math.random() * 5 - 2.5);
      const lng = 91.7362 + (Math.random() * 5 - 2.5);
      
      // Bias 60% of trucks to be "On Move" for a healthier dashboard look
      const status = Math.random() > 0.4 
        ? "On Move" 
        : baseStatuses[Math.floor(Math.random() * baseStatuses.length)];
        
      return { lat, lng, status };
    });
    setFleetLocations(generated);
  }, []);

  useEffect(() => {
    if (!activeRoute) return;

    const fetchRoute = async (coordinates: number[][], callback: (path: [number, number][]) => void) => {
      try {
        const waypoints = coordinates.map(c => `${c[0]},${c[1]}`).join(';');
        const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${waypoints}?overview=full&geometries=geojson`);
        const data = await res.json();
        if (data.routes && data.routes.length > 0) {
          const latLngs = data.routes[0].geometry.coordinates.map((c: number[]) => [c[1], c[0]]);
          callback(latLngs);
        }
      } catch (error) {
        console.error("OSRM Routing Error", error);
        callback(coordinates.map(c => [c[1], c[0]]));
      }
    };

    fetchRoute(activeRoute.originalCoordinates, setOriginalPath);

    if (activeRoute.alternateRoutes) {
      activeRoute.alternateRoutes.forEach((alt: any) => {
        fetchRoute(alt.coordinates, (path) => {
          setAltPaths(prev => ({ ...prev, [alt.id]: path }));
        });
      });
    }
  }, [activeRoute]);

  const defaultCenter: [number, number] = [26.1445, 91.7362]; // Guwahati
  
  // Calculate rendering variables if activeRoute exists
  let originCoord: [number, number] | null = null;
  let destCoord: [number, number] | null = null;
  let hazardCoord: [number, number] | null = null;
  let boundsCoords: [number, number][] = [];
  let sortedAlts: any[] = [];
  let initialCenter = defaultCenter;
  let initialZoom = 7; // Better regional zoom level for Northeast India

  if (activeRoute) {
    originCoord = [activeRoute.originalCoordinates[0][1], activeRoute.originalCoordinates[0][0]];
    destCoord = [activeRoute.originalCoordinates[activeRoute.originalCoordinates.length - 1][1], activeRoute.originalCoordinates[activeRoute.originalCoordinates.length - 1][0]];
    hazardCoord = [activeRoute.hazardLocation[1], activeRoute.hazardLocation[0]];
    initialCenter = [activeRoute.center[1], activeRoute.center[0]];
    initialZoom = activeRoute.zoom;

    if (confirmedAltId && altPaths[confirmedAltId]) {
      boundsCoords = [...altPaths[confirmedAltId]];
      boundsCoords.push(hazardCoord); // Ensure hazard is in bounds
    } else {
      boundsCoords = [...originalPath];
      if (isOptimized) {
        Object.values(altPaths).forEach(path => boundsCoords.push(...path));
      }
    }

    sortedAlts = [...(activeRoute.alternateRoutes || [])].sort((a: any, b: any) => {
      if (a.id === selectedAltId || a.id === confirmedAltId) return 1;
      if (b.id === selectedAltId || b.id === confirmedAltId) return -1;
      return 0;
    });
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      {/* 
        CRITICAL: Never conditionally unmount/remount MapContainer or swap between 
        multiple MapContainers in the same DOM node. It crashes Leaflet.
        Always use a single MapContainer and conditionally render its children.
      */}
      <MapContainer center={initialCenter} zoom={initialZoom} style={{ height: '100%', width: '100%' }} zoomControl={false}>
        <TileLayer
          key={theme} // Force remount when theme changes to apply the CSS class instantly
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          className={theme === 'dark' ? 'dark-tiles' : ''}
        />
        
        {/* Click handler for manual reporting mode */}
        <MapClickHandler onMapClick={onMapClick} />
        
        {/* Draw active truck locations (fleet) conditionally */}
        {showFleet && fleetLocations.map((truck, idx) => {
          const config = statusConfig[truck.status];
          return (
            <Marker key={`truck-${idx}`} position={[truck.lat, truck.lng]} icon={config.icon}>
              <Popup className="custom-popup">
                <div className="font-sans">
                  <p className={`text-xs font-bold ${config.colorText} m-0`}>Active Vehicle #{1040 + idx}</p>
                  <p className="text-[10px] text-gray-500 m-0 mt-1">Status: {truck.status}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Draw User Submitted Reports */}
        {userReports && userReports.map((report, idx) => (
          <Marker key={`report-${idx}`} position={[report.lat, report.lng]} icon={hazardIcon}>
            <Popup className="custom-popup">
              <div className="font-sans min-w-[140px]">
                <p className="text-xs font-bold text-red-600 m-0">Reported Blockage</p>
                <p className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 mt-1 mb-0">{report.cause}</p>
                <p className="text-[10px] text-gray-500 m-0">Delay: {report.severity}</p>
                <p className="text-[9px] text-blue-500 mt-1 mb-2">Source: Field Agent</p>
                <button 
                  onClick={() => onClearReport && onClearReport(idx)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white text-[10px] font-bold py-1 rounded shadow-sm transition-colors"
                >
                  Clear Blockage
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* State 1: No Active Route (Empty State) */}
        {!activeRoute && (
          <Marker position={defaultCenter} icon={createCustomIcon('Me', 'bg-slate-900')} />
        )}

        {/* State 2: Active Route */}
        {activeRoute && (
          <>
            {/* Draw Original Route - hidden if navigation is confirmed */}
            {!confirmedAltId && originalPath.length > 0 && (
              <Polyline 
                key={`orig-${isOptimized}`} 
                positions={originalPath} 
                color="#ef4444" 
                weight={isOptimized ? 4 : 6} 
                opacity={isOptimized ? 0.6 : 0.9} 
                dashArray={isOptimized ? "10, 10" : undefined}
              />
            )}

            {/* Draw Safe Routes */}
            {isOptimized && sortedAlts.map((alt: any) => {
              const path = altPaths[alt.id];
              if (!path) return null;
              
              if (confirmedAltId && confirmedAltId !== alt.id) {
                return null; // Hide unselected routes when confirmed
              }

              const isSelected = selectedAltId === alt.id || confirmedAltId === alt.id;
              const isFaded = !confirmedAltId && selectedAltId !== null && !isSelected;

              return (
                <Polyline 
                  key={`${alt.id}-sel:${isSelected}-fade:${isFaded}-conf:${confirmedAltId !== null}`}
                  positions={path} 
                  color={isSelected ? "#3b82f6" : "#64748b"}
                  weight={isSelected ? 6 : 4} 
                  opacity={isSelected ? 1 : (isFaded ? 0.2 : 0.8)}
                  dashArray={!isSelected ? "10, 10" : undefined}
                />
              );
            })}

            {originCoord && <Marker position={originCoord} icon={originIcon} />}
            {destCoord && <Marker position={destCoord} icon={destIcon} />}
            {hazardCoord && (
              <Marker position={hazardCoord} icon={hazardIcon}>
                <Popup className="custom-popup">
                  <div className="font-sans">
                    <p className="text-xs font-bold text-red-600 m-0">{activeRoute.hazardType}</p>
                    <p className="text-[10px] text-gray-500 m-0 mt-1">AI Confidence: {activeRoute.hazardConfidence}</p>
                  </div>
                </Popup>
              </Marker>
            )}
          </>
        )}

        {/* Only bound map if there's an active route that needs to be fitted */}
        {activeRoute && boundsCoords.length > 0 && <BoundsManager coords={boundsCoords} />}
      </MapContainer>
    </div>
  );
}
