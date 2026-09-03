"use client";

import { MapPin, Navigation, X } from "lucide-react";
import { useState } from "react";
import { MOCK_ROUTES } from "@/lib/routes";

export default function RouteOptimizerPanel({ 
  onOptimizeRoute, 
  activeRouteId,
  onRouteSelect,
  isOptimized,
  selectedAltId,
  onAltSelect,
  confirmedAltId,
  onConfirm,
  onClose
}: { 
  onOptimizeRoute: () => void;
  activeRouteId: string | null;
  onRouteSelect: (id: string) => void;
  isOptimized: boolean;
  selectedAltId?: string | null;
  onAltSelect?: (id: string) => void;
  confirmedAltId?: string | null;
  onConfirm?: (id: string | null) => void;
  onClose?: () => void;
}) {
  const [isCalculating, setIsCalculating] = useState(false);

  const handleOptimize = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      onOptimizeRoute();
    }, 1500);
  };

  const selectedRoute = MOCK_ROUTES.find(r => r.id === activeRouteId);
  const confirmedRoute = selectedRoute?.alternateRoutes?.find(r => r.id === confirmedAltId);

  return (
    <div className="absolute top-4 right-4 w-[380px] bg-card/95 backdrop-blur shadow-2xl rounded-xl border border-border flex flex-col z-[1000] overflow-hidden">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">AI Route Optimizer</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title="Close Panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <select 
              value={activeRouteId || ""}
              onChange={(e) => onRouteSelect(e.target.value)}
              disabled={!!confirmedAltId}
              className="w-full pl-3 pr-8 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer disabled:opacity-50"
            >
              {MOCK_ROUTES.map(route => (
                <option key={route.id} value={route.id}>
                  {route.origin.split(",")[0]} ➔ {route.destination.split(",")[0]}
                </option>
              ))}
            </select>
          </div>

          {!confirmedAltId && (
            <div className="space-y-2 mt-4 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>Origin: {selectedRoute?.origin}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Navigation className="h-3 w-3 text-primary" />
                <span>Dest: {selectedRoute?.destination}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mt-2">
                <span className="font-semibold text-foreground">Risk Level:</span>
                <span className={selectedRoute?.risk.includes("High") ? "text-red-500 font-medium" : selectedRoute?.risk.includes("Medium") ? "text-yellow-500 font-medium" : "text-green-500 font-medium"}>{selectedRoute?.risk}</span>
              </div>
            </div>
          )}

          {confirmedAltId && confirmedRoute ? (
            <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg animate-in fade-in zoom-in-95">
              <h3 className="text-sm font-bold text-primary mb-2">Navigation Active</h3>
              <p className="text-sm font-semibold mb-1">{confirmedRoute.name}</p>
              <div className="flex justify-between text-xs text-muted-foreground mb-4">
                <span>{confirmedRoute.distance}</span>
                <span>{confirmedRoute.time}</span>
              </div>
              
              <button 
                onClick={() => onConfirm?.(null)}
                className="w-full bg-background hover:bg-muted text-foreground font-medium py-2 px-4 rounded-md text-sm transition-colors border border-border"
              >
                Cancel Navigation
              </button>
            </div>
          ) : isOptimized ? (
            <div className="mt-6 space-y-4">
              <h3 className="text-sm font-medium text-foreground">AI Generated Alternatives</h3>
              <div className="space-y-3">
                {selectedRoute?.alternateRoutes?.map((alt) => (
                  <div key={alt.id}>
                    <div 
                      onClick={() => onAltSelect?.(alt.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${selectedAltId === alt.id ? 'border-primary bg-primary/10' : 'border-border bg-background hover:border-primary/50'}`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-sm">{alt.name}</span>
                        <span className="text-xs text-muted-foreground">{alt.time}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">{alt.distance}</span>
                        <span className={alt.riskLevel === "Low" || alt.riskLevel === "Very Low" ? "text-green-500" : "text-yellow-500"}>Risk: {alt.riskLevel}</span>
                      </div>
                    </div>
                    {/* Confirmation Button floats below the selected item */}
                    {selectedAltId === alt.id && (
                      <button 
                        onClick={() => onConfirm?.(alt.id)}
                        className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 rounded-md text-xs shadow-md transition-all animate-in fade-in slide-in-from-top-2"
                      >
                        Confirm & Navigate
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => onRouteSelect(activeRouteId!)}
                className="w-full bg-red-500/10 text-red-500 hover:bg-red-500/20 font-medium py-2 px-4 rounded-md text-sm transition-colors border border-red-500/20 mt-4"
              >
                Revert to Original Route
              </button>
            </div>
          ) : (
            <button 
              onClick={handleOptimize}
              disabled={isCalculating}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md text-sm transition-colors flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
            >
              {isCalculating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Analyzing Threat...
                </>
              ) : (
                "Generate Safe Route"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
