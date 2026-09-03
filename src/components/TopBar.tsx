"use client";

import { Activity, AlertTriangle, Truck, Sun, Moon, User, Settings, LogOut, Mail, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function TopBar({ 
  showFleet = true, 
  onToggleFleet,
  onToggleSidebar,
  onToggleAlerts
}: { 
  showFleet?: boolean; 
  onToggleFleet?: () => void;
  onToggleSidebar?: () => void;
  onToggleAlerts?: () => void;
}) {
  const { theme, setTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    // Use setTimeout to ensure this doesn't block the initial click
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 border-b border-border bg-card/95 backdrop-blur-md px-6 flex items-center justify-between z-[9999] relative shadow-sm pointer-events-auto">
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleSidebar}
          className="p-2 -ml-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors mr-2"
          title="Toggle Sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Activity className="text-primary h-6 w-6" />
        <h1 className="text-lg font-bold tracking-tight">NER-LogiSync <span className="text-muted-foreground font-normal text-sm ml-2">Command Center</span></h1>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={onToggleFleet}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            showFleet 
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20' 
              : 'bg-muted text-muted-foreground hover:bg-muted/80 line-through decoration-muted-foreground/50'
          }`}
          title="Toggle Fleet Visibility"
        >
          <Truck className="h-4 w-4" />
          <span>24 Active Vehicles</span>
        </button>
        <button 
          onClick={onToggleAlerts}
          className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer"
        >
          <AlertTriangle className="h-4 w-4" />
          <span>3 Critical Alerts</span>
        </button>
        
        <button 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-accent transition-colors relative"
          title="Toggle Theme"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute top-[0.5rem] left-[0.5rem] h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 border border-border transition-colors flex items-center justify-center"
          >
            <User className="h-5 w-5 text-foreground" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
              <div className="p-3 border-b border-border bg-muted/30">
                <p className="text-sm font-semibold text-foreground">Test User</p>
                <p className="text-xs text-muted-foreground">driver@ner-logisync.com</p>
              </div>
              <div className="p-1">
                <Link href="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors w-full text-left">
                  <User className="h-4 w-4" /> Profile
                </Link>
                <Link href="/inbox" className="flex items-center justify-between px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors w-full text-left">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Inbox
                  </div>
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">1</span>
                </Link>
                <Link href="/settings" className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors w-full text-left">
                  <Settings className="h-4 w-4" /> Settings
                </Link>
              </div>
              <div className="p-1 border-t border-border">
                <Link href="/login" className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-md transition-colors w-full text-left">
                  <LogOut className="h-4 w-4" /> Sign out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
