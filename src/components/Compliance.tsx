import React, { useState } from "react";
import { TechSpecificationRow } from "../types";
import { Check, AlertTriangle, ShieldCheck, FileSpreadsheet, ChevronRight, HelpCircle } from "lucide-react";

interface ComplianceProps {
  specs: TechSpecificationRow[];
  onChangeSpecResponse: (id: string, response: "G" | "Y" | "R") => void;
  complianceRating: number;
}

export default function Compliance({ specs, onChangeSpecResponse, complianceRating }: ComplianceProps) {
  const [activeSection, setActiveSection] = useState<"A" | "B" | "C">("A");

  // Sum weights and calculate achieved marks based on scoring metric:
  // G: 100% of maxMarks, Y: 70% of maxMarks, R: 0% of maxMarks
  const getSectionStats = (sec: "A" | "B" | "C") => {
    const secSpecs = specs.filter((s) => s.section === sec);
    const maxMarks = secSpecs.reduce((acc, curr) => acc + curr.maxMarks, 0);
    const scoredMarks = secSpecs.reduce((acc, curr) => {
      let multiplier = 1;
      if (curr.bidderResponse === "Y") multiplier = 0.7;
      if (curr.bidderResponse === "R") multiplier = 0;
      return acc + curr.maxMarks * multiplier;
    }, 0);
    return { maxMarks, scoredMarks };
  };

  const statsA = getSectionStats("A"); // Channel Integration (50 max, 40 min needed)
  const statsB = getSectionStats("B"); // Portals (25 max, 20 min needed)
  const statsC = getSectionStats("C"); // Security/Recon/SLA (25 max, 20 min needed)

  const isPassA = statsA.scoredMarks >= 40;
  const isPassB = statsB.scoredMarks >= 20;
  const isPassC = statsC.scoredMarks >= 20;
  const isPassTotal = complianceRating >= 80;

  return (
    <div id="compliance-tab" className="space-y-6">
      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-900 text-white rounded-xl p-6 shadow-md">
        {/* Sum of all achieved scores */}
        <div className="space-y-1">
          <span className="text-slate-400 text-xs block uppercase tracking-wider font-mono">Overall Grade Score</span>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-black text-indigo-300">{complianceRating} / 100</h2>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${isPassTotal ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
              {isPassTotal ? "PASSED" : "FAILED"}
            </span>
          </div>
          <p className="text-slate-500 text-[10px]">Need minimum 80 marks</p>
        </div>

        {/* Section A stats */}
        <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-4">
          <span className="text-slate-400 text-xs block">Sec A: Channels & Billers</span>
          <div className="flex items-baseline justify-between sm:justify-start gap-2">
            <h3 className="text-lg font-bold text-slate-100">{statsA.scoredMarks.toFixed(1)} / 50</h3>
            <span className={`text-[10px] font-bold px-1.5 rounded ${isPassA ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
              {isPassA ? "Pass (>=40)" : "Shortfall"}
            </span>
          </div>
          <p className="text-slate-500 text-[10px]">Weight: 50%. Integrations & TPS</p>
        </div>

        {/* Section B stats */}
        <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-4">
          <span className="text-slate-400 text-xs block">Sec B: Portal Demands</span>
          <div className="flex items-baseline justify-between sm:justify-start gap-2">
            <h3 className="text-lg font-bold text-slate-100">{statsB.scoredMarks.toFixed(1)} / 25</h3>
            <span className={`text-[10px] font-bold px-1.5 rounded ${isPassB ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
              {isPassB ? "Pass (>=20)" : "Shortfall"}
            </span>
          </div>
          <p className="text-slate-500 text-[10px]">Weight: 25%. Admin, Biller, Agents</p>
        </div>

        {/* Section C stats */}
        <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-4">
          <span className="text-slate-400 text-xs block">Sec C: Tech & Support</span>
          <div className="flex items-baseline justify-between sm:justify-start gap-2">
            <h3 className="text-lg font-bold text-slate-100">{statsC.scoredMarks.toFixed(1)} / 25</h3>
            <span className={`text-[10px] font-bold px-1.5 rounded ${isPassC ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
              {isPassC ? "Pass (>=20)" : "Shortfall"}
            </span>
          </div>
          <p className="text-slate-500 text-[10px]">Weight: 25%. SLA, VAPT & Entra</p>
        </div>
      </div>

      {/* Warning Callout for shortfalls */}
      {(!isPassA || !isPassB || !isPassC || !isPassTotal) && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3 text-xs text-amber-800">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 leading-relaxed">
            <h4 className="font-bold">Qualifying Threshold Mismatches Detected</h4>
            <p>
              Your current simulated scorecard does not satisfy all qualifying criteria detailed in Annexure 4. You must achieve at least 80% total marks AND hit individual thresholds in each subsection (A &gt;= 40, B &gt;= 20, C &gt;= 20). Adjust specs response codes below to check how to maximize your technical score!
            </p>
          </div>
        </div>
      )}

      {/* Active Section selector */}
      <div className="flex border-b border-slate-100">
        <button
          onClick={() => setActiveSection("A")}
          className={`flex-1 sm:flex-initial px-5 py-3 text-sm font-semibold transition border-b-2 -mb-[2px] ${activeSection === "A" ? "border-indigo-600 text-indigo-600 font-sans" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Section A: Channel Integration ({specs.filter(s => s.section === "A").length} Items)
        </button>
        <button
          onClick={() => setActiveSection("B")}
          className={`flex-1 sm:flex-initial px-5 py-3 text-sm font-semibold transition border-b-2 -mb-[2px] ${activeSection === "B" ? "border-indigo-600 text-indigo-600 font-sans" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Section B: Portal Specs ({specs.filter(s => s.section === "B").length} Items)
        </button>
        <button
          onClick={() => setActiveSection("C")}
          className={`flex-1 sm:flex-initial px-5 py-3 text-sm font-semibold transition border-b-2 -mb-[2px] ${activeSection === "C" ? "border-indigo-600 text-indigo-600 font-sans" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Section C: Security & SLAs ({specs.filter(s => s.section === "C").length} Items)
        </button>
      </div>

      {/* Checklist Table */}
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-mono text-[10px] sm:text-xs border-b border-slate-100">
              <th className="py-3 px-4 w-12 text-center">Ref</th>
              <th className="py-3 px-4">Technical Specification Requirement</th>
              <th className="py-3 px-4 w-20 text-center">Max Marks</th>
              <th className="py-3 px-4 w-48 text-center">Bidder Response Code</th>
              <th className="py-3 px-4 w-24 text-right">Scored</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 select-none">
            {specs
              .filter((item) => item.section === activeSection)
              .map((row) => {
                let currentScore = row.maxMarks;
                if (row.bidderResponse === "Y") currentScore = row.maxMarks * 0.7;
                if (row.bidderResponse === "R") currentScore = 0;

                return (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition">
                    {/* Index */}
                    <td className="py-4 px-4 font-mono font-bold text-xs text-slate-400 text-center">
                      {row.id}
                    </td>

                    {/* Requirement text */}
                    <td className="py-4 px-4 font-sans text-sm text-slate-700 leading-relaxed max-w-xl">
                      {row.requirement}
                    </td>

                    {/* Max marks */}
                    <td className="py-4 px-4 text-center font-mono font-bold text-slate-700 text-xs">
                      {row.maxMarks}
                    </td>

                    {/* Respose selectors G, Y, R */}
                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                        <button
                          onClick={() => onChangeSpecResponse(row.id, "G")}
                          title="Available - Score 100% of weightage marks"
                          className={`px-3 py-1 text-xs font-semibold rounded-md transition ${row.bidderResponse === "G" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                        >
                          G
                        </button>
                        <button
                          onClick={() => onChangeSpecResponse(row.id, "Y")}
                          title="Will be made available - Score 70% of marks"
                          className={`px-3 py-1 text-xs font-semibold rounded-md transition ${row.bidderResponse === "Y" ? "bg-white text-amber-700 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                        >
                          Y
                        </button>
                        <button
                          onClick={() => onChangeSpecResponse(row.id, "R")}
                          title="Cannot provide - Score 0% marks"
                          className={`px-3 py-1 text-xs font-semibold rounded-md transition ${row.bidderResponse === "R" ? "bg-white text-rose-700 shadow-sm" : "text-slate-500 hover:text-slate-800 border-rose-100"}`}
                        >
                          R
                        </button>
                      </div>
                    </td>

                    {/* Achieved Score */}
                    <td className="py-4 px-4 text-right font-mono font-bold text-indigo-950 text-sm">
                      {currentScore.toFixed(1)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
