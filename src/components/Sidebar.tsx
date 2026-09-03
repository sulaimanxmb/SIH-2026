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
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Predictive AI Weather Timeline</h2>
          
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            
            {/* Timeline Item 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-blue-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <CloudRain className="h-4 w-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-xl border border-border bg-card/50 backdrop-blur-sm shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-foreground">14:00 PM</span>
                  <span className="text-[10px] font-medium text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">Actual</span>
                </div>
                <p className="text-xs text-muted-foreground">Heavy Monsoon Showers begin across NER region.</p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-yellow-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Activity className="h-4 w-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-xl border border-border bg-card/50 backdrop-blur-sm shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-foreground">16:30 PM</span>
                  <span className="text-[10px] font-medium text-yellow-600 bg-yellow-500/10 px-2 py-0.5 rounded-full">Predictive</span>
                </div>
                <p className="text-xs text-muted-foreground">Soil Saturation Threshold (85%) reached near Sela Pass.</p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-red-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-xl border border-red-500/30 bg-red-500/5 backdrop-blur-sm shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-red-500">18:00 PM</span>
                  <span className="text-[10px] font-medium text-red-600 bg-red-500/10 px-2 py-0.5 rounded-full">Critical</span>
                </div>
                <p className="text-xs text-muted-foreground">94% Flash Flood & Landslide Risk on direct routes.</p>
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-emerald-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-sm shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-emerald-500">19:00 PM</span>
                  <span className="text-[10px] font-medium text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">Action</span>
                </div>
                <p className="text-xs text-muted-foreground">AI pre-emptive fleet rerouting activated.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </aside>
  );
}
