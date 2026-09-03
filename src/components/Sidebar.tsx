"use client";

import { 
  CloudRain, 
  Construction, 
  TrendingUp, 
  Timer, 
  ShieldCheck, 
  Activity,
  AlertTriangle
} from "lucide-react";
import { MOCK_ROUTES } from "@/lib/routes";

export default function Sidebar({ 
  isOpen, 
  activeRouteId, 
  isOptimized, 
  selectedAltId,
  confirmedAltId 
}: { 
  isOpen: boolean;
  activeRouteId: string | null;
  isOptimized: boolean;
  selectedAltId: string | null;
  confirmedAltId: string | null;
}) {
  if (!isOpen) return null;

  const activeRoute = activeRouteId ? MOCK_ROUTES.find(r => r.id === activeRouteId) : null;
  
  // Calculate dynamic metrics based on state
  let efficiency = "+18%";
  let delayAvoided = "42 Hrs";
  let hazardsAvoided = "12";
  let aiConfidence = "92%";
  let riskStatus = "Moderate";
  
  if (activeRoute) {
    // Determine which alternate route is actively being viewed
    const activeAlt = confirmedAltId || selectedAltId;
    
    if (activeRouteId === "route-1") {
      hazardsAvoided = "1 (Landslide)";
      aiConfidence = activeRoute.hazardConfidence;
      
      if (activeAlt === "alt-1-1") {
        efficiency = "+42%";
        delayAvoided = "18 Hrs";
      } else if (activeAlt === "alt-1-2") {
        efficiency = "+28%";
        delayAvoided = "12 Hrs";
      } else if (activeAlt === "alt-1-3") {
        efficiency = "+32%";
        delayAvoided = "14 Hrs";
      } else {
        efficiency = isOptimized ? "+34%" : "+0%";
        delayAvoided = isOptimized ? "14 Hrs" : "0 Hrs";
      }
    } else if (activeRouteId === "route-2") {
      hazardsAvoided = "1 (Flooding)";
      aiConfidence = activeRoute.hazardConfidence;
      
      if (activeAlt === "alt-2-1") {
        efficiency = "+28%";
        delayAvoided = "9 Hrs";
      } else if (activeAlt === "alt-2-2") {
        efficiency = "+18%";
        delayAvoided = "6 Hrs";
      } else if (activeAlt === "alt-2-3") {
        efficiency = "+22%";
        delayAvoided = "7 Hrs";
      } else {
        efficiency = isOptimized ? "+22%" : "+0%";
        delayAvoided = isOptimized ? "6 Hrs" : "0 Hrs";
      }
    } else if (activeRouteId === "route-3") {
      hazardsAvoided = "1 (Subsidence)";
      aiConfidence = activeRoute.hazardConfidence;
      
      if (activeAlt === "alt-3-1") {
        efficiency = "+15%";
        delayAvoided = "5 Hrs";
      } else if (activeAlt === "alt-3-2") {
        efficiency = "+10%";
        delayAvoided = "3 Hrs";
      } else if (activeAlt === "alt-3-3") {
        efficiency = "+12%";
        delayAvoided = "4 Hrs";
      } else {
        efficiency = isOptimized ? "+10%" : "+0%";
        delayAvoided = isOptimized ? "3 Hrs" : "0 Hrs";
      }
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

            {/* Delay Metric */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 p-4 rounded-xl flex flex-col justify-center">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                <Timer className="h-4 w-4" />
                <span className="text-xs font-semibold">Delay Avoided</span>
              </div>
              <span className="text-2xl font-black text-foreground">{delayAvoided}</span>
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
