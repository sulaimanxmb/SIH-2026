"use client";

import { Activity, ArrowLeft, Mail, Navigation, AlertTriangle, Clock } from "lucide-react";
import Link from "next/link";
import { MOCK_ROUTES } from "@/lib/routes";

export default function InboxPage() {
  const mission = MOCK_ROUTES[0]; // The Guwahati -> Tawang mission

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="h-16 border-b border-border bg-card/80 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Activity className="text-primary h-6 w-6" />
          <h1 className="text-lg font-bold">NER-Alturas <span className="text-muted-foreground font-normal text-sm ml-2">Inbox</span></h1>
        </div>
        <Link href="/">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors bg-secondary px-3 py-1.5 rounded-full">
            <ArrowLeft className="h-4 w-4" /> Back to Map
          </button>
        </Link>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4">
        
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
          <div className="p-2 bg-primary/10 rounded-lg text-primary relative">
            <Mail className="h-6 w-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Mission Inbox</h2>
            <p className="text-sm text-muted-foreground">You have 1 unread dispatch assignment.</p>
          </div>
        </div>

        <div className="space-y-4">
          <Link href={`/?mission=${mission.id}`} className="block">
            <div className="bg-card border border-primary/30 rounded-xl p-6 shadow-md hover:shadow-lg hover:border-primary/60 transition-all cursor-pointer relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-red-500/10 text-red-500 text-xs font-bold rounded uppercase tracking-wider">Priority: High</span>
                  <span className="px-2.5 py-1 bg-blue-500/10 text-blue-500 text-xs font-bold rounded uppercase tracking-wider">New</span>
                </div>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Just now
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                Immediate Dispatch: {mission.origin} to {mission.destination}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
                You have been assigned a high-priority logistics delivery to {mission.destination}. 
                Intelligence indicates active geological threats along the primary route. 
                Please open the Command Center to analyze the route and select an optimized path.
              </p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground bg-secondary/30 p-3 rounded-lg border border-border/50">
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-primary" />
                  <span>Distance: ~450km</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span>Threats: Yes</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
