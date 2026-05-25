import React from "react";
import { EligibilityCriterion } from "../types";
import { Check, X, ShieldAlert, BadgeCheck, FileText } from "lucide-react";

interface EligibilityProps {
  criteria: EligibilityCriterion[];
  onToggleCriterion: (id: number) => void;
  eligibilityScore: number;
}

export default function Eligibility({ criteria, onToggleCriterion, eligibilityScore }: EligibilityProps) {
  const isFullyEligible = eligibilityScore === criteria.length;

  return (
    <div id="eligibility-tab" className="space-y-6">
      {/* Tab Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white rounded-xl border border-slate-100 shadow-sm gap-4">
        <div>
          <h2 className="text-xl font-sans font-bold text-slate-900">12-Step Administrative Eligibility Checklist</h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Determine if your company satisfies the threshold criteria described on pages 11-13 of the official RFP.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-slate-400 text-xs block font-mono font-semibold uppercase">My Score</span>
            <span className="text-2xl font-black text-slate-800">{eligibilityScore} / {criteria.length}</span>
          </div>
          <div className={`p-3 rounded-full ${isFullyEligible ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'}`}>
            {isFullyEligible ? <BadgeCheck className="w-8 h-8 animate-bounce" /> : <ShieldAlert className="w-8 h-8" />}
          </div>
        </div>
      </div>

      {/* AI Assessment callout */}
      <div className={`p-4 rounded-xl border flex items-start gap-4 ${isFullyEligible ? 'bg-emerald-50/50 border-emerald-100 text-emerald-950' : 'bg-amber-50/50 border-amber-100 text-amber-950'}`}>
        <div className="pt-0.5">
          {isFullyEligible ? (
            <Check className="w-5 h-5 text-emerald-600 font-bold" />
          ) : (
            <ShieldAlert className="w-5 h-5 text-amber-600" />
          )}
        </div>
        <div className="space-y-1 text-xs">
          <h4 className="font-bold font-sans">
            {isFullyEligible ? "Fully Qualified Sponsor!" : "Attention: Disqualification Hazard!"}
          </h4>
          <p className="leading-relaxed">
            {isFullyEligible
              ? "Based on your selections, you meet all eligibility parameters of the IDBI tender, including empanelment and active BFSI cloud experience. You are safe to advance to compiling your Technical Proposal."
              : "IDBI Bank enforces strict eligibility filters. If you answer 'No' to any requirement, your proposal is liable for straight administrative rejection or immediate disqualification upon bid opening (Refer to disclaimers on page 11)."}
          </p>
        </div>
      </div>

      {/* Checklist Interactive List */}
      <div className="space-y-4">
        {criteria.map((item) => {
          const isSelected = item.userAnswer ?? true; // defaults to true for initial ease
          return (
            <div
              key={item.id}
              onClick={() => onToggleCriterion(item.id)}
              className={`p-5 rounded-xl border transition cursor-pointer flex flex-col md:flex-row gap-5 items-start bg-white hover:border-slate-300 shadow-sm relative ${isSelected ? 'border-indigo-100 ring-2 ring-indigo-500/5' : 'border-slate-200 opacity-80'}`}
            >
              {/* Checkbox Trigger */}
              <div className="pointer-events-none flex items-center justify-center pt-1">
                <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${isSelected ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-600/10' : 'border-slate-300 hover:border-slate-400 bg-slate-50'}`}>
                  {isSelected && <Check className="w-4 h-4 text-white font-bold" />}
                </div>
              </div>

              {/* Text Context */}
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-slate-900 font-bold font-mono text-sm leading-none"># {item.id}</span>
                  <span className="text-[10px] font-bold font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {item.category}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <p className="font-sans font-medium text-slate-800 text-sm leading-relaxed">{item.criteria}</p>
                  <p className="text-slate-500 text-xs leading-relaxed flex items-start gap-1">
                    <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span className="font-medium text-slate-600">Sought Docs:</span> {item.supportingDocs}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="pointer-events-none md:self-center shrink-0">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${isSelected ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5 font-bold" />
                      We Comply
                    </>
                  ) : (
                    <>
                      <X className="w-3.5 h-3.5 font-bold" />
                      No Compliance
                    </>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
