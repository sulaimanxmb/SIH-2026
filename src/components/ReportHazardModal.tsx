"use client";

import React, { useState } from "react";
import { X, AlertOctagon, ArrowRight, CheckCircle2 } from "lucide-react";

type Question = {
  id: string;
  title: string;
  options: string[];
};

const QUESTIONS: Question[] = [
  {
    id: "cause",
    title: "What is the primary cause of the road blockage?",
    options: [
      "Landslide / Rockfall",
      "Flooding / Waterlogging",
      "Bridge Collapse / Structural Damage",
      "Severe Vehicle Accident",
      "Others"
    ]
  },
  {
    id: "severity",
    title: "What is the estimated severity or delay?",
    options: [
      "Minor (Less than 2 hours)",
      "Moderate (2-6 hours)",
      "Severe (Completely Impassable)",
      "Others"
    ]
  },
  {
    id: "location",
    title: "Where is this blockage located?",
    options: [
      "At my exact current GPS location",
      "1-5 km ahead on my current route",
      "Major highway intersection nearby",
      "Manually mark on map",
      "Others"
    ]
  }
];

export default function ReportHazardModal({ 
  onClose, 
  onSubmit 
}: { 
  onClose: () => void;
  onSubmit: (reportData: any) => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [customInputs, setCustomInputs] = useState<Record<string, string>>({});
  
  const currentQ = QUESTIONS[step];
  
  const handleOptionSelect = (option: string) => {
    setAnswers({ ...answers, [currentQ.id]: option });
  };
  
  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomInputs({ ...customInputs, [currentQ.id]: e.target.value });
  };

  const isNextDisabled = !answers[currentQ.id] || (answers[currentQ.id] === "Others" && !customInputs[currentQ.id]);

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Submit
      const finalReport = {
        cause: answers["cause"] === "Others" ? customInputs["cause"] : answers["cause"],
        severity: answers["severity"] === "Others" ? customInputs["severity"] : answers["severity"],
        location: answers["location"] === "Others" ? customInputs["location"] : answers["location"],
      };
      onSubmit(finalReport);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-md rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-red-600 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <AlertOctagon className="h-5 w-5" />
            <h2 className="font-bold text-lg">Report Blocked Road</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-secondary h-1.5">
          <div 
            className="bg-red-600 h-1.5 transition-all duration-300 ease-out" 
            style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6 flex-1">
          <p className="text-sm font-semibold text-red-600 mb-1">Step {step + 1} of {QUESTIONS.length}</p>
          <h3 className="text-xl font-bold text-foreground mb-6">{currentQ.title}</h3>

          <div className="space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = answers[currentQ.id] === opt;
              return (
                <div key={opt}>
                  <button
                    onClick={() => handleOptionSelect(opt)}
                    className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                      isSelected 
                        ? "border-red-600 bg-red-600/10 text-red-700 dark:text-red-400 font-medium" 
                        : "border-border hover:border-red-600/40 hover:bg-secondary text-foreground"
                    }`}
                  >
                    {opt}
                  </button>
                  
                  {isSelected && opt === "Others" && (
                    <div className="mt-3 animate-in fade-in slide-in-from-top-2">
                      <input 
                        type="text"
                        autoFocus
                        placeholder="Please specify..."
                        value={customInputs[currentQ.id] || ""}
                        onChange={handleCustomInputChange}
                        className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 text-sm"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/30 flex items-center justify-between">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleNext}
            disabled={isNextDisabled}
            className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:hover:bg-red-600 text-white text-sm font-bold rounded-lg shadow-md transition-all"
          >
            {step === QUESTIONS.length - 1 ? (
              <>Submit Report <CheckCircle2 className="h-4 w-4" /></>
            ) : (
              <>Next <ArrowRight className="h-4 w-4" /></>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
