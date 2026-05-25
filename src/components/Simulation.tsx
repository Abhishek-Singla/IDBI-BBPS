import React, { useState } from "react";
import { ComparisonBidder } from "../types";
import { Plus, Trash, HelpCircle, AlertCircle, TrendingUp, Info } from "lucide-react";

interface SimulationProps {
  myTechnicalScore: number;
}

export default function Simulation({ myTechnicalScore }: SimulationProps) {
  // Competitors list
  const [bidders, setBidders] = useState<ComparisonBidder[]>([
    { id: "1", name: "InnoTech Payments", technicalScore: 95, bbpsPurchaseCost: 1200000, billerOnboardingCost: 15000, changeRequestCost: 8000, atsCost: 180000, isEligible: true },
    { id: "2", name: "Cosmic Connect (We)", technicalScore: Math.round(myTechnicalScore), bbpsPurchaseCost: 1000000, billerOnboardingCost: 12000, changeRequestCost: 7500, atsCost: 150000, isEligible: true },
    { id: "3", name: "FinCorp Solutions", technicalScore: 90, bbpsPurchaseCost: 1500000, billerOnboardingCost: 10000, changeRequestCost: 10000, atsCost: 200000, isEligible: true },
    { id: "4", name: "Legacy Sys Ltd", technicalScore: 75, bbpsPurchaseCost: 800000, billerOnboardingCost: 20000, changeRequestCost: 6000, atsCost: 144000, isEligible: false } // Fails technical score threshold of 80
  ]);

  // Pricing multipliers
  const [onboardingCount, setOnboardingCount] = useState<number>(30); // Standard 30 billers
  const [changeRequestDays, setChangeRequestDays] = useState<number>(15); // Standard 15 person-days

  // Form states to add new bidder
  const [newName, setNewName] = useState("");
  const [newTech, setNewTech] = useState(85);
  const [newBbpsCost, setNewBbpsCost] = useState(1100000);
  const [newOnboardCost, setNewOnboardCost] = useState(15000);
  const [newDaysCost, setNewDaysCost] = useState(8000);

  // Sync our tech score when it moves
  React.useEffect(() => {
    setBidders((prev) =>
      prev.map((b) => (b.name.includes("(We)") ? { ...b, technicalScore: Math.round(myTechnicalScore) } : b))
    );
  }, [myTechnicalScore]);

  // Remove competitor
  const handleDeleteBidder = (id: string) => {
    setBidders(bidders.filter((b) => b.id !== id));
  };

  // Add competitor
  const handleAddBidder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const newBidder: ComparisonBidder = {
      id: Date.now().toString(),
      name: newName,
      technicalScore: newTech,
      bbpsPurchaseCost: newBbpsCost,
      billerOnboardingCost: newOnboardCost,
      changeRequestCost: newDaysCost,
      atsCost: Math.min(newBbpsCost * 0.18, 180000), // capped at 18% of BBPS Purchase Cost
      isEligible: newTech >= 80
    };
    setBidders([...bidders, newBidder]);
    setNewName("");
  };

  // Calculate costs, Commercial Scores, FCS, FTS, and Final Scores
  const computedBidders = bidders.map((bidder) => {
    // Check if eligible
    const isEligible = bidder.technicalScore >= 80;

    // ATS calculated on-actual but capped at 18% of One-Time BBPS Purchase cost
    const computedAts = bidder.bbpsPurchaseCost * 0.15; // standard simulated ATS 15%

    // Total Cost of Ownership (TCO)
    const tco = bidder.bbpsPurchaseCost + (bidder.billerOnboardingCost * onboardingCount) + (bidder.changeRequestCost * changeRequestDays) + computedAts;

    return {
      ...bidder,
      isEligible,
      tco
    };
  });

  // Find lowest TCO amongst technically eligible bidders
  const eligibleBidders = computedBidders.filter((b) => b.isEligible);
  const lowestEligibleTco = eligibleBidders.length > 0 ? Math.min(...eligibleBidders.map((b) => b.tco)) : 1;

  // Second pass: Calculate Commercial Score (CS), FCS, FTS, and Final Score
  const finalizedBidders = computedBidders.map((bidder) => {
    let cs = 0;
    if (bidder.isEligible && lowestEligibleTco > 0) {
      cs = (lowestEligibleTco / bidder.tco) * 100;
    }

    const fcs = cs * 0.3; // 30% weighting
    const fts = bidder.technicalScore * 0.7; // 70% weighting
    const finalScore = bidder.isEligible ? fcs + fts : 0;

    return {
      ...bidder,
      cs,
      fcs,
      fts,
      finalScore
    };
  });

  // Sort score descending
  const sortedLeaderboard = [...finalizedBidders].sort((a, b) => b.finalScore - a.finalScore);
  const winner = sortedLeaderboard[0]?.finalScore > 0 ? sortedLeaderboard[0] : null;

  return (
    <div id="simulation-tab" className="space-y-8">
      {/* Introduction Callout */}
      <div className="flex flex-col xl:flex-row gap-6 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <div className="space-y-4 xl:w-2/3">
          <h2 className="text-xl font-sans font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600 animate-pulse" />
            70:30 Techno-Commercial Evaluation Simulator
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Configure financial and technical values of competing bidders. This is modeled precisely on pages 37-38 of the RFP. Commercial Bids are scored dynamically against the lowest eligible TCO. Bidders scoring &lt; 80 in technical evaluation are administratively excluded from commercial scoring.
          </p>

          {/* Core parameter inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase">Simulated Onboarded Billers Counts:</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={onboardingCount}
                  onChange={(e) => setOnboardingCount(Number(e.target.value))}
                  className="flex-1 accent-indigo-600 cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none"
                />
                <span className="text-sm font-bold text-indigo-950 bg-slate-50 border border-slate-200 px-2 py-1 rounded w-16 text-center font-mono">
                  {onboardingCount} Pcs
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase">Customization / Changes (Per Person Days):</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={changeRequestDays}
                  onChange={(e) => setChangeRequestDays(Number(e.target.value))}
                  className="flex-1 accent-indigo-600 cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none"
                />
                <span className="text-sm font-bold text-indigo-950 bg-slate-50 border border-slate-200 px-2 py-1 rounded w-16 text-center font-mono">
                  {changeRequestDays} Days
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Winner Card */}
        <div className="xl:w-1/3 bg-gradient-to-br from-indigo-950 to-slate-950 rounded-xl p-6 text-white flex flex-col justify-between border border-indigo-900 shadow-md">
          <div className="space-y-2">
            <span className="text-indigo-400 text-xs font-mono uppercase font-black tracking-wider block">Winner Forecast (TC1)</span>
            {winner ? (
              <>
                <h3 className="text-2xl font-extrabold tracking-tight text-white">{winner.name}</h3>
                <div className="flex gap-4 pt-2">
                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[10px] uppercase">Final Score</span>
                    <p className="text-indigo-300 font-bold font-mono">{winner.finalScore.toFixed(2)} / 100</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[10px] uppercase">Total Price</span>
                    <p className="text-indigo-300 font-bold font-mono">₹{(winner.tco / 100000).toFixed(2)} Lakhs</p>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-slate-400 text-sm">No qualified bidders. Raise technical specs marks first.</p>
            )}
          </div>
          <div className="border-t border-slate-800/80 pt-3 text-[10px] text-slate-400 leading-normal flex items-start gap-1">
            <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
            Highest Final Score (FS = FCS + FTS) represents successful bid awards.
          </div>
        </div>
      </div>

      {/* SVG chart and competitor grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Competitors and prices configuration */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-sans font-bold text-slate-900 text-base">Comparison Sheet</h3>

            <div className="divide-y divide-slate-100 space-y-4">
              {finalizedBidders.map((bidder) => (
                <div key={bidder.id} className="pt-4 first:pt-0 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-sans font-bold text-slate-800 text-sm sm:text-base">{bidder.name}</h4>
                      {bidder.name.includes("(We)") && (
                        <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                          Ourselves
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${bidder.isEligible ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                        {bidder.isEligible ? `Eligible (Tech: ${bidder.technicalScore})` : `Ineligible (Tech: ${bidder.technicalScore})`}
                      </span>
                      {!bidder.name.includes("(We)") && (
                        <button
                          onClick={() => handleDeleteBidder(bidder.id)}
                          className="p-1 hover:bg-rose-50 hover:text-rose-600 rounded transition text-slate-400"
                          title="Remove competitor"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Input parameters */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">BBPS Purchase (One Time)</span>
                      <input
                        type="number"
                        step="50000"
                        value={bidder.bbpsPurchaseCost}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setBidders(bidders.map((b) => b.id === bidder.id ? { ...b, bbpsPurchaseCost: val } : b));
                        }}
                        className="w-full bg-white border border-slate-200 rounded px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-indigo-500 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">Biller On-board (Per partner)</span>
                      <input
                        type="number"
                        step="1000"
                        value={bidder.billerOnboardingCost}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setBidders(bidders.map((b) => b.id === bidder.id ? { ...b, billerOnboardingCost: val } : b));
                        }}
                        className="w-full bg-white border border-slate-200 rounded px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-indigo-500 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">CR Charge (Person days)</span>
                      <input
                        type="number"
                        step="500"
                        value={bidder.changeRequestCost}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setBidders(bidders.map((b) => b.id === bidder.id ? { ...b, changeRequestCost: val } : b));
                        }}
                        className="w-full bg-white border border-slate-200 rounded px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-indigo-500 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">Overall TCO</span>
                      <span className="text-xs font-bold text-slate-900 block pt-1.5 font-mono">
                        ₹{(bidder.tco / 100000).toFixed(2)} Lakhs
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Competitor Mini-Form */}
          <form onSubmit={handleAddBidder} className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-sans font-bold text-slate-900 text-sm">Add Competing Bidder</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              <input
                type="text"
                placeholder="Bidder Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-indigo-500 md:col-span-2"
                required
              />
              <input
                type="number"
                placeholder="Tech Score"
                min="0"
                max="100"
                value={newTech}
                onChange={(e) => setNewTech(Number(e.target.value))}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-indigo-500 font-mono"
                required
              />
              <input
                type="number"
                placeholder="Purchase Cost (₹)"
                value={newBbpsCost}
                onChange={(e) => setNewBbpsCost(Number(e.target.value))}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-indigo-500 font-mono"
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 transition text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Bid
              </button>
            </div>
          </form>
        </div>

        {/* Live Leaderboard Display */}
        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-sans font-bold text-slate-900 text-base">FS Leaderboard Points</h3>
            <p className="text-slate-400 text-[10px] mt-0.5">Scored out of 100 max comprehensively</p>
          </div>

          <div className="space-y-5">
            {sortedLeaderboard.map((item, index) => {
              const barPercentage = item.isEligible ? item.finalScore : 10;
              return (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 truncate max-w-[120px]">{item.name}</span>
                    <span className="font-bold font-mono text-indigo-950">
                      {item.isEligible ? item.finalScore.toFixed(1) : "Excl. (Tech < 80)"}
                    </span>
                  </div>

                  {/* SVG Bar representation */}
                  <div className="w-full h-8 bg-slate-50 border border-slate-100 rounded-lg relative overflow-hidden flex items-center px-2">
                    <div
                      className={`h-full absolute left-0 top-0 transition-all duration-500 ${item.name.includes("(We)") ? 'bg-gradient-to-r from-indigo-500 to-indigo-600' : 'bg-gradient-to-r from-slate-400 to-slate-500'}`}
                      style={{ width: `${barPercentage}%` }}
                    ></div>
                    {/* Index float */}
                    <span className="relative z-10 font-bold text-white text-[10px]">
                      {item.isEligible ? `Score: ${item.finalScore.toFixed(1)}` : "Disqualified"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>FCS (Comm): {item.fcs ? item.fcs.toFixed(1) : "0.0"}</span>
                    <span>FTS (Tech): {item.fts ? item.fts.toFixed(1) : "0.0"}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5 text-[11px] text-slate-600">
            <h5 className="font-bold text-slate-700">Official Evaluation Model (PG-37):</h5>
            <p className="leading-relaxed">
              Score = FTS (70%) + FCS (30%). Low pricing yields higher Commercial score, while high compliance on specs secures a robust technical score.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
