"use client";

import { Activity, Camera, Building2, Phone, MapPin, BadgeCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("Test User");
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Mini Header */}
      <header className="h-16 border-b border-border bg-card/80 backdrop-blur px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="text-primary h-6 w-6" />
          <h1 className="text-lg font-bold">NER-Alturas <span className="text-muted-foreground font-normal text-sm ml-2">Profile</span></h1>
        </div>
        <Link href="/">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors bg-secondary px-3 py-1.5 rounded-full">
            <ArrowLeft className="h-4 w-4" /> Back to Map
          </button>
        </Link>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-8 animate-in fade-in slide-in-from-bottom-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Editable Profile */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 text-center shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary/20 to-blue-500/10 border-b border-border"></div>
              
              <div className="relative mt-8 mb-4">
                <div className="w-32 h-32 mx-auto rounded-full border-4 border-background bg-muted shadow-xl overflow-hidden group">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary text-4xl font-bold text-muted-foreground">
                      {name.charAt(0)}
                    </div>
                  )}
                  
                  <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="h-6 w-6 text-white mb-1" />
                    <span className="text-white text-xs font-medium">Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
              </div>

              <div className="space-y-4 text-left mt-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:border-primary text-foreground font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email (Read Only)</label>
                  <input 
                    type="email" 
                    value="driver@ner-logisync.com"
                    readOnly
                    className="w-full px-3 py-2 bg-muted border border-border rounded-md text-sm text-muted-foreground cursor-not-allowed"
                  />
                </div>
                <button className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 rounded-md text-sm transition-colors shadow-sm">
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Hardcoded Company Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Employment Details</h2>
                  <p className="text-sm text-muted-foreground">Verified company information</p>
                </div>
                <BadgeCheck className="h-6 w-6 text-blue-500 ml-auto" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2">
                    Company Name
                  </span>
                  <p className="text-base font-medium text-foreground bg-secondary/50 p-3 rounded-lg border border-border/50">
                    NER-Alturas Corporation
                  </p>
                </div>
                
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" /> Division / Branch
                  </span>
                  <p className="text-base font-medium text-foreground bg-secondary/50 p-3 rounded-lg border border-border/50">
                    Guwahati Central Hub
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" /> Dispatch Contact
                  </span>
                  <p className="text-base font-medium text-foreground bg-secondary/50 p-3 rounded-lg border border-border/50 font-mono tracking-wide">
                    +91 98765 43210
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2">
                    Fleet ID
                  </span>
                  <p className="text-base font-medium text-foreground bg-secondary/50 p-3 rounded-lg border border-border/50 font-mono tracking-wide">
                    VH-AS01-9923
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                  Note: Company details are synchronized with the central dispatch server. To request changes to your employment information, please contact HR.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
