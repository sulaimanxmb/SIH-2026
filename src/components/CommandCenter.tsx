"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AlertOctagon } from "lucide-react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import RouteOptimizerPanel from "./RouteOptimizerPanel";
import ReportHazardModal from "./ReportHazardModal";
import { MOCK_ROUTES } from "@/lib/routes";

const MapView = dynamic(() => import("./MapView"), { ssr: false });

export default function CommandCenter() {
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);
  const [isOptimized, setIsOptimized] = useState<boolean>(false);
  const [selectedAltId, setSelectedAltId] = useState<string | null>(null);
  const [confirmedAltId, setConfirmedAltId] = useState<string | null>(null);
  const [showFleet, setShowFleet] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  
  // Reporting state
  const [isReporting, setIsReporting] = useState(false);
  const [userReports, setUserReports] = useState<any[]>([]);
  const [pendingMapReport, setPendingMapReport] = useState<any>(null);
  const [isReportsLoaded, setIsReportsLoaded] = useState(false);

  useEffect(() => {
    // Read the mission ID from the URL params to support the Inbox workflow
    const params = new URLSearchParams(window.location.search);
    const mission = params.get('mission');
    if (mission) {
      setActiveRouteId(mission);
    }

    // Load persisted reports from session storage
    const savedReports = sessionStorage.getItem('ner_logisync_reports');
    if (savedReports) {
      try {
        setUserReports(JSON.parse(savedReports));
      } catch (e) {
        console.error("Failed to parse saved reports");
      }
    }
    setIsReportsLoaded(true);
  }, []);

  // Save reports to session storage whenever they change
  useEffect(() => {
    if (isReportsLoaded) {
      sessionStorage.setItem('ner_logisync_reports', JSON.stringify(userReports));
    }
  }, [userReports, isReportsLoaded]);

  const activeRoute = activeRouteId ? (MOCK_ROUTES.find(r => r.id === activeRouteId) || null) : null;

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      <TopBar 
        showFleet={showFleet} 
        onToggleFleet={() => setShowFleet(!showFleet)} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar 
          isOpen={isSidebarOpen} 
          activeRouteId={activeRouteId}
          isOptimized={isOptimized}
          selectedAltId={selectedAltId}
          confirmedAltId={confirmedAltId}
        />
        <main className="flex-1 relative">
          <MapView 
            activeRoute={activeRoute} 
            isOptimized={isOptimized} 
            selectedAltId={selectedAltId}
            confirmedAltId={confirmedAltId}
            showFleet={showFleet}
            userReports={userReports}
            onClearReport={(index) => {
              const newReports = [...userReports];
              newReports.splice(index, 1);
              setUserReports(newReports);
            }}
            onMapClick={(latlng) => {
              if (pendingMapReport) {
                setUserReports([...userReports, { ...pendingMapReport, lat: latlng.lat, lng: latlng.lng }]);
                setPendingMapReport(null);
              }
            }}
          />
          
          {/* Map Pin Drop Banner */}
          {pendingMapReport && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg z-[1000] flex items-center gap-3 animate-in slide-in-from-top-4">
              <span className="font-bold">Click anywhere on the map to drop the hazard marker</span>
              <button 
                onClick={() => setPendingMapReport(null)}
                className="ml-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          )}

          {activeRoute && !pendingMapReport && (
            <RouteOptimizerPanel 
              onOptimizeRoute={() => {
                setIsOptimized(true);
                setSelectedAltId(null);
                setConfirmedAltId(null);
              }} 
              activeRouteId={activeRouteId}
              onRouteSelect={(id) => {
                setActiveRouteId(id);
                setIsOptimized(false);
                setSelectedAltId(null);
                setConfirmedAltId(null);
                window.history.replaceState({}, '', `?mission=${id}`);
              }}
              isOptimized={isOptimized}
              selectedAltId={selectedAltId}
              onAltSelect={(id) => setSelectedAltId(id)}
              confirmedAltId={confirmedAltId}
              onConfirm={(id) => setConfirmedAltId(id)}
              onClose={() => {
                setActiveRouteId(null);
                setIsOptimized(false);
                setSelectedAltId(null);
                setConfirmedAltId(null);
                window.history.replaceState({}, '', '/');
              }}
            />
          )}
          
          {/* Floating Report Button */}
          {!pendingMapReport && (
            <button 
              className="absolute bottom-8 right-8 z-[900] flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)] transition-all hover:-translate-y-1 font-bold tracking-wide"
              onClick={() => setIsReporting(true)}
            >
              <AlertOctagon className="h-5 w-5" />
              Report Blocked Road
            </button>
          )}

          {/* Render Reporting Modal */}
          {isReporting && (
            <ReportHazardModal 
              onClose={() => setIsReporting(false)}
              onSubmit={(reportData) => {
                setIsReporting(false);
                if (reportData.location === "Manually mark on map") {
                  setPendingMapReport(reportData);
                } else {
                  // Drop a marker slightly offset from Guwahati center for demonstration
                  const lat = 26.1445 + (Math.random() * 0.1 - 0.05);
                  const lng = 91.7362 + (Math.random() * 0.1 - 0.05);
                  setUserReports([...userReports, { ...reportData, lat, lng }]);
                }
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
