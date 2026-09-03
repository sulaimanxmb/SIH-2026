"use client";

import { Activity, Settings2, ArrowLeft, Navigation2, Volume2, DownloadCloud, Shield, Map as MapIcon, Moon, Car, Bell } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SettingsPage() {
  const [distanceUnit, setDistanceUnit] = useState("km");
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Mini Header */}
      <header className="h-16 border-b border-border bg-card/80 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Activity className="text-primary h-6 w-6" />
          <h1 className="text-lg font-bold">NER-LogiSync <span className="text-muted-foreground font-normal text-sm ml-2">Settings</span></h1>
        </div>
        <Link href="/">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors bg-secondary px-3 py-1.5 rounded-full">
            <ArrowLeft className="h-4 w-4" /> Back to Map
          </button>
        </Link>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4">
        
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Settings2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Navigation Settings</h2>
            <p className="text-sm text-muted-foreground">Manage your route preferences and app behavior.</p>
          </div>
        </div>

        <div className="space-y-8">
          
          {/* General Navigation */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
              <Navigation2 className="h-4 w-4" /> Routing Preferences
            </h3>
            <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden shadow-sm">
              <div className="p-4 flex items-center justify-between hover:bg-secondary/20 transition-colors">
                <div>
                  <p className="font-medium text-sm">Distance Units</p>
                  <p className="text-xs text-muted-foreground">Choose miles or kilometers</p>
                </div>
                <select 
                  value={distanceUnit}
                  onChange={(e) => setDistanceUnit(e.target.value)}
                  className="bg-secondary border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="km">Kilometers (km)</option>
                  <option value="mi">Miles (mi)</option>
                </select>
              </div>
              
              <label className="p-4 flex items-center justify-between hover:bg-secondary/20 transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-sm">Avoid Tolls</p>
                  <p className="text-xs text-muted-foreground">AI will prefer toll-free routes</p>
                </div>
                <input type="checkbox" className="w-4 h-4 rounded text-primary focus:ring-primary border-input bg-background" />
              </label>

              <label className="p-4 flex items-center justify-between hover:bg-secondary/20 transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-sm">Prefer Highways</p>
                  <p className="text-xs text-muted-foreground">Optimize for multi-axle vehicle speeds</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary border-input bg-background" />
              </label>
            </div>
          </section>

          {/* Map Display */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
              <MapIcon className="h-4 w-4" /> Map Display
            </h3>
            <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden shadow-sm">
              <label className="p-4 flex items-center justify-between hover:bg-secondary/20 transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-sm">3D Buildings</p>
                  <p className="text-xs text-muted-foreground">Show 3D models in dense urban areas</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary border-input bg-background" />
              </label>

              <label className="p-4 flex items-center justify-between hover:bg-secondary/20 transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-sm">Live Traffic Colors</p>
                  <p className="text-xs text-muted-foreground">Overlay red/yellow/green traffic flow</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary border-input bg-background" />
              </label>
              
              <label className="p-4 flex items-center justify-between hover:bg-secondary/20 transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-sm flex items-center gap-2">Speed Limits <Badge text="Beta" /></p>
                  <p className="text-xs text-muted-foreground">Display posted speed limit on HUD</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary border-input bg-background" />
              </label>
            </div>
          </section>

          {/* Sound & Voice */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
              <Volume2 className="h-4 w-4" /> Sound & Voice
            </h3>
            <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden shadow-sm">
              <div className="p-4 flex items-center justify-between hover:bg-secondary/20 transition-colors">
                <div>
                  <p className="font-medium text-sm">Voice Guidance</p>
                  <p className="text-xs text-muted-foreground">Select voice assistant detail level</p>
                </div>
                <select className="bg-secondary border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                  <option>Full Detailed Guidance</option>
                  <option>Alerts Only</option>
                  <option>Muted</option>
                </select>
              </div>
              <label className="p-4 flex items-center justify-between hover:bg-secondary/20 transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-sm">Play alert chimes over Bluetooth</p>
                  <p className="text-xs text-muted-foreground">Route alerts through vehicle audio</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary border-input bg-background" />
              </label>
            </div>
          </section>

          {/* Offline & Data */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
              <DownloadCloud className="h-4 w-4" /> Offline Maps
            </h3>
            <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden shadow-sm">
              <div className="p-4 flex items-center justify-between hover:bg-secondary/20 transition-colors">
                <div>
                  <p className="font-medium text-sm">North Eastern Region Map Data</p>
                  <p className="text-xs text-muted-foreground text-green-500">Downloaded (1.2 GB) - Up to date</p>
                </div>
                <button className="text-xs font-medium bg-secondary hover:bg-secondary/80 border border-border px-3 py-1.5 rounded-md transition-colors">
                  Update
                </button>
              </div>
              <label className="p-4 flex items-center justify-between hover:bg-secondary/20 transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-sm">Auto-download over Wi-Fi</p>
                  <p className="text-xs text-muted-foreground">Keep maps updated automatically</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary border-input bg-background" />
              </label>
            </div>
          </section>

        </div>
        
        <div className="mt-8 flex justify-end">
           <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 px-6 rounded-lg text-sm transition-colors shadow-lg shadow-primary/20">
              Apply Settings
           </button>
        </div>

      </main>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-500 uppercase tracking-widest border border-blue-500/30">{text}</span>;
}
