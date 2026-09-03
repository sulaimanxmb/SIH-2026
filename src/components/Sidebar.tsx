"use client";

import { CloudRain, Construction } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-[300px] border-r border-border bg-card/95 backdrop-blur overflow-y-auto flex flex-col z-10 relative shadow-lg">
      <div className="p-5 flex-1">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Live Alerts & Intelligence</h2>
        
        <div className="space-y-3">
          <div className="p-3 border border-red-500/20 bg-red-500/5 rounded-lg flex items-start gap-3">
            <CloudRain className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">High Landslide Risk</p>
              <p className="text-xs text-muted-foreground mt-1">AI indicates 85% probability of washout on NH-13 near Sela Pass due to continuous rainfall.</p>
            </div>
          </div>

          <div className="p-3 border border-yellow-500/20 bg-yellow-500/5 rounded-lg flex items-start gap-3">
            <Construction className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Bridge Maintenance</p>
              <p className="text-xs text-muted-foreground mt-1">Bogibeel Bridge traffic slowed. Heavy logistics expect 45m delay.</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
