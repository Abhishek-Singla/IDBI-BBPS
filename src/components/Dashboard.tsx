import React from "react";
import { RFP_INFO } from "../data";
import { Calendar, DollarSign, Clock, AlertTriangle, CheckCircle, Award } from "lucide-react";

interface DashboardProps {
  onNavigation: (tab: string) => void;
  eligibilityScore: number;
  complianceRating: number;
}

export default function Dashboard({ onNavigation, eligibilityScore, complianceRating }: DashboardProps) {
  const info = RFP_INFO;

  return (
    <div id="dashboard-tab" className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm border border-indigo-500/30">
            Official RFP REF: {info.reference}
          </div>
          <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white leading-tight">
            IDBI Bank BBPS (Bharat Connect) CAPEX Bid Advisor
          </h1>
          <p className="text-slate-300 max-w-3xl leading-relaxed text-sm md:text-base">
            Optimize, simulate, and draft your Technical Service Provider (TSP) proposal for IDBI Bank's core bill payment integration. Stay compliant with NPCI, the DPDP Act 2023, and the 70:30 Techno-Commercial parameters.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onNavigation("eligibility")}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition rounded-xl font-medium text-sm shadow-lg shadow-indigo-600/20"
            >
              Check Eligibility Status
            </button>
            <button
              onClick={() => onNavigation("advisor")}
              className="px-5 py-2.5 bg-slate-800/80 hover:bg-slate-800 transition rounded-xl font-medium text-sm text-slate-200 border border-slate-700 backdrop-blur-sm"
            >
              Ask AI RFP Advisor
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Earnest Money Deposit</span>
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">{info.financials.emd}</h3>
            <p className="text-slate-500 text-xs mt-1">Payable via NEFT (Exempt for registered MSEs with proof)</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Performance Security</span>
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">{info.financials.pbgUpfront}</h3>
            <p className="text-slate-500 text-xs mt-1">Or 3% of total contract value. Valid for 60m + 12m claims</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-medium uppercase tracking-wider font-mono">Eligibility Check</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${eligibilityScore === 12 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {eligibilityScore === 12 ? "Qualified" : `${eligibilityScore}/12 Met`}
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">{Math.round((eligibilityScore / 12) * 100)}% Match</h3>
            <p className="text-slate-500 text-xs mt-1">Must meet all 12 criteria to prevent administrative rejection</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-medium uppercase tracking-wider font-sans">Compliance Rating</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${complianceRating >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
              {complianceRating >= 80 ? "Passable" : "Threshold Under"}
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">{complianceRating} / 100</h3>
            <p className="text-slate-500 text-xs mt-1">Target is minimum 80 marks in Annexure 4 Specifications</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Core Timeline Checklist */}
        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm space-y-6 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-sans font-bold text-slate-900 text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              Schedules & Crucial Timelines
            </h3>
            <span className="text-slate-500 text-xs">Primary Target: Sep 2025</span>
          </div>

          <div className="relative border-l border-slate-100 ml-4 space-y-6">
            {info.timeline.map((item, index) => (
              <div key={index} className="relative pl-6">
                {/* Timeline Node Icon */}
                <div className="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full border-4 border-white bg-indigo-600 shadow-sm"></div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h4 className="font-sans font-medium text-slate-900 text-sm">{item.label}</h4>
                  <span className="text-slate-500 text-xs font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                    {item.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Post Go-Live Timelines:</h4>
            <ul className="text-slate-600 text-xs list-disc pl-5 space-y-1">
              <li>Integration with all Bank payment channels: <span className="font-semibold text-slate-800">within 3 Months</span></li>
              <li>Onboarding and migration of all existing Billers: <span className="font-semibold text-slate-800">within 6 Months</span></li>
              <li>Full technical specifications alignment: <span className="font-semibold text-slate-800">within 6 Months</span></li>
            </ul>
          </div>
        </div>

        {/* SLA and Penalties Threat Level */}
        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="font-sans font-bold text-slate-900 text-lg">
              Critical SLAs & Threat Log
            </h3>
          </div>

          <div className="space-y-4">
            {info.keySlas.slice(0, 5).map((sla, idx) => (
              <div key={idx} className="p-3 bg-rose-50/40 rounded-lg border border-rose-100/50 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-rose-950 font-sans">{sla.metric}</span>
                  <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-900 font-mono text-[10px] font-bold">
                    {sla.target}
                  </span>
                </div>
                <p className="text-slate-600">{sla.penalty}</p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigation("compliance")}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 transition rounded-lg text-slate-700 text-xs font-medium border border-slate-200 text-center"
            >
              Review Full SLA Penalty Sheet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
