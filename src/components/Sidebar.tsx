"use client";

import { 
  CloudRain, 
  Construction, 
  TrendingUp, 
  Fuel, 
  ShieldCheck, 
  Activity,
  AlertTriangle
} from "lucide-react";
import { MOCK_ROUTES } from "@/lib/routes";

export default function Sidebar({ 
  isOpen, 
  activeRouteId, 
  isOptimized, 
  confirmedAltId 
}: { 
  isOpen: boolean;
  activeRouteId: string | null;
  isOptimized: boolean;
  confirmedAltId: string | null;
}) {
  if (!isOpen) return null;

  const activeRoute = activeRouteId ? MOCK_ROUTES.find(r => r.id === activeRouteId) : null;
  
  // Calculate dynamic metrics based on state
  let efficiency = "+18%";
  let fuelSaved = "4,120 L";
  let hazardsAvoided = "12";
  let aiConfidence = "92%";
  let riskStatus = "Moderate";
  
  if (activeRoute) {
    if (activeRouteId === "route-1") {
      efficiency = confirmedAltId ? "+42%" : (isOptimized ? "+34%" : "+0%");
      fuelSaved = confirmedAltId ? "165 L" : (isOptimized ? "145 L" : "0 L");
      hazardsAvoided = "1 (Landslide)";
      aiConfidence = activeRoute.hazardConfidence;
      riskStatus = activeRoute.risk;
    } else if (activeRouteId === "route-2") {
      efficiency = confirmedAltId ? "+28%" : (isOptimized ? "+22%" : "+0%");
      fuelSaved = confirmedAltId ? "95 L" : (isOptimized ? "85 L" : "0 L");
      hazardsAvoided = "1 (Flooding)";
      aiConfidence = activeRoute.hazardConfidence;
      riskStatus = activeRoute.risk;
    } else if (activeRouteId === "route-3") {
      efficiency = confirmedAltId ? "+15%" : (isOptimized ? "+10%" : "+0%");
      fuelSaved = confirmedAltId ? "45 L" : (isOptimized ? "35 L" : "0 L");
      hazardsAvoided = "1 (Subsidence)";
      aiConfidence = activeRoute.hazardConfidence;
      riskStatus = activeRoute.risk;
    }
  }

  return (
    <aside className="w-[320px] border-r border-border bg-card/60 backdrop-blur-xl overflow-y-auto flex flex-col z-10 relative shadow-2xl transition-all duration-300 animate-in slide-in-from-left">
      <div className="p-6 flex-1 space-y-6">
        
        <div>
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
            {activeRoute ? "Mission Intelligence" : "Global Logistics KPI"}
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Efficiency Metric */}
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 p-4 rounded-xl flex flex-col justify-center">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs font-semibold">Efficiency</span>
              </div>
              <span className="text-2xl font-black text-foreground">{efficiency}</span>
            </div>

            {/* Fuel Metric */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 p-4 rounded-xl flex flex-col justify-center">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                <Fuel className="h-4 w-4" />
                <span className="text-xs font-semibold">Fuel Saved</span>
              </div>
              <span className="text-2xl font-black text-foreground">{fuelSaved}</span>
            </div>

            {/* Hazards Metric */}
            <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20 p-4 rounded-xl flex flex-col justify-center col-span-2">
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-2">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-xs font-semibold">Hazards Avoided</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-black text-foreground">{hazardsAvoided}</span>
                <span className="text-sm font-medium text-muted-foreground pb-1">AI Conf: {aiConfidence}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-border w-full"></div>

        <div>
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Live Threat Radar</h2>
          
          <div className="space-y-3">
            {(!activeRoute || activeRouteId === "route-1") && (
              <div className="p-3 border border-red-500/20 bg-red-500/5 rounded-xl flex items-start gap-3 backdrop-blur-sm transition-all hover:bg-red-500/10 cursor-pointer">
                <div className="bg-red-500/20 p-2 rounded-lg shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Massive Landslide Risk</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">AI predicts 94% probability of washout on NH-13 near Sela Pass due to saturated soil.</p>
                </div>
              </div>
            )}

            {(!activeRoute || activeRouteId === "route-2") && (
              <div className="p-3 border border-blue-500/20 bg-blue-500/5 rounded-xl flex items-start gap-3 backdrop-blur-sm transition-all hover:bg-blue-500/10 cursor-pointer">
                <div className="bg-blue-500/20 p-2 rounded-lg shrink-0">
                  <CloudRain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Bridge Washout (Flooding)</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Barak River overflow detected. 88% confidence of structural instability ahead.</p>
                </div>
              </div>
            )}
            
            {(!activeRoute || activeRouteId === "route-3") && (
              <div className="p-3 border border-yellow-500/20 bg-yellow-500/5 rounded-xl flex items-start gap-3 backdrop-blur-sm transition-all hover:bg-yellow-500/10 cursor-pointer">
                <div className="bg-yellow-500/20 p-2 rounded-lg shrink-0">
                  <Construction className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Road Subsidence</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Geological sensors detect minor caving. Heavy commercial vehicles advised to detour.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
