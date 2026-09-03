"use client";

import React from 'react';
import { X, CloudRain, Construction, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function ThreatRadarModal({ 
  isOpen, 
  onClose,
  activeRouteId
}: { 
  isOpen: boolean; 
  onClose: () => void;
  activeRouteId: string | null;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 sm:p-6">
      <div className="bg-card border border-border shadow-2xl rounded-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-border bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="bg-red-500/20 p-2 rounded-lg">
              <ShieldAlert className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground tracking-tight">Live Threat Radar</h2>
              <p className="text-xs text-muted-foreground">Active geological and meteorological alerts across NER</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 bg-background space-y-4 max-h-[60vh] overflow-y-auto">
          
          {(!activeRouteId || activeRouteId === "route-1") && (
            <div className="p-4 border border-red-500/20 bg-red-500/5 rounded-xl flex items-start gap-4 transition-all hover:bg-red-500/10">
              <div className="bg-red-500/20 p-3 rounded-lg shrink-0 mt-1">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 bg-red-600 text-white rounded-full">CRITICAL</span>
                  <p className="text-sm font-bold text-foreground">Massive Landslide Risk</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Location:</strong> NH-13 near Sela Pass<br/>
                  <strong>Details:</strong> AI predicts 94% probability of washout due to highly saturated soil from continuous heavy rainfall over the past 48 hours. Direct routes are considered impassable.
                </p>
              </div>
            </div>
          )}

          {(!activeRouteId || activeRouteId === "route-2") && (
            <div className="p-4 border border-blue-500/20 bg-blue-500/5 rounded-xl flex items-start gap-4 transition-all hover:bg-blue-500/10">
              <div className="bg-blue-500/20 p-3 rounded-lg shrink-0 mt-1">
                <CloudRain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 bg-blue-600 text-white rounded-full">HIGH RISK</span>
                  <p className="text-sm font-bold text-foreground">Bridge Washout (Flooding)</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Location:</strong> Barak River Valley<br/>
                  <strong>Details:</strong> River overflow detected by satellite telemetry. 88% confidence of structural instability ahead. Avoid low-lying crossings.
                </p>
              </div>
            </div>
          )}
          
          {(!activeRouteId || activeRouteId === "route-3") && (
            <div className="p-4 border border-yellow-500/20 bg-yellow-500/5 rounded-xl flex items-start gap-4 transition-all hover:bg-yellow-500/10">
              <div className="bg-yellow-500/20 p-3 rounded-lg shrink-0 mt-1">
                <Construction className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 bg-yellow-600 text-white rounded-full">WARNING</span>
                  <p className="text-sm font-bold text-foreground">Road Subsidence</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Location:</strong> Dimapur to Kohima Highway<br/>
                  <strong>Details:</strong> Geological sensors detect minor caving and structural weakening. Heavy commercial vehicles are advised to take detour routes.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
