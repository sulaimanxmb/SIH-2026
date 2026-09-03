"use client";

import { Activity, KeyRound, Mail } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden relative z-10">
        <div className="p-8 text-center border-b border-border bg-muted/20">
          <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 border border-primary/20">
            <Activity className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome to NER-LogiSync</h1>
          <p className="text-sm text-muted-foreground mt-2">Sign in to access the Smart Logistics Accessibility Platform</p>
        </div>

        <div className="p-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input 
                  type="email" 
                  value="driver@ner-logisync.com" 
                  readOnly
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:border-primary text-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input 
                  type="password" 
                  value="sih2026demo" 
                  readOnly
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:border-primary text-foreground font-mono tracking-widest"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs mt-2 mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-input text-primary focus:ring-primary bg-background" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <span className="text-primary hover:underline cursor-pointer">Forgot password?</span>
            </div>

            <Link href="/" className="block">
              <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2 shadow-lg shadow-primary/20">
                Sign In to Command Center
              </button>
            </Link>
          </div>

          <div className="mt-6 text-center text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg border border-border">
            <span className="font-bold text-foreground">Demo Credentials:</span><br/>
            driver@ner-logisync.com / sih2026demo
          </div>
        </div>
      </div>
    </div>
  );
}
