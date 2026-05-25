import React, { useState } from "react";
import { ELIGIBILITY_CRITERIA_DATA, TECH_SPECIFICATIONS_DATA } from "./data";
import { EligibilityCriterion, TechSpecificationRow } from "./types";
import Dashboard from "./components/Dashboard";
import Eligibility from "./components/Eligibility";
import Compliance from "./components/Compliance";
import Simulation from "./components/Simulation";
import Templates from "./components/Templates";
import RfpChat from "./components/RfpChat";
import AuthScreen from "./components/AuthScreen";
import HelpSection from "./components/HelpSection";
import DevOpsLab from "./components/DevOpsLab";
import { 
  LayoutDashboard, 
  ShieldCheck, 
  ClipboardCheck, 
  Scale, 
  FileSignature, 
  MessageSquareCode, 
  LogOut, 
  BookOpen, 
  Terminal, 
  User 
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // User auth state
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    return localStorage.getItem("rfp_logged_in_user");
  });

  // State managers
  const [eligibilityCriteria, setEligibilityCriteria] = useState<EligibilityCriterion[]>(ELIGIBILITY_CRITERIA_DATA);
  const [techSpecs, setTechSpecs] = useState<TechSpecificationRow[]>(TECH_SPECIFICATIONS_DATA);
  const [userProfile, setUserProfile] = useState({
    companyName: "Cosmic Connect Pvt Ltd",
    address: "Bungalow No 4, Bandra Kurla Complex (BKC), Mumbai - 400051",
    contactName: "Vikram Malhotra",
    contactTitle: "Chief Technology Officer",
    gstNo: "27ABCDE1234F1Z8",
    panNo: "ABCDE1234F",
    activeBanksCount: 3,
    supportedTps: 300,
    isEmpaneled: true
  });

  // Toggle single eligibility criterion answer state
  const handleToggleCriterion = (id: number) => {
    setEligibilityCriteria((prev) =>
      prev.map((c) => (c.id === id ? { ...c, userAnswer: !(c.userAnswer ?? true) } : c))
    );
  };

  // Alter single technical spec response code (G, Y, R)
  const handleChangeSpecResponse = (id: string, response: "G" | "Y" | "R") => {
    setTechSpecs((prev) =>
      prev.map((s) => (s.id === id ? { ...s, bidderResponse: response } : s))
    );
  };

  // Change individual bidder profile fields
  const handleChangeProfile = (key: string, value: any) => {
    setUserProfile((prev) => ({ ...prev, [key]: value }));
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("rfp_logged_in_user");
    setCurrentUser(null);
  };

  // Handle login
  const handleLogin = (email: string) => {
    localStorage.setItem("rfp_logged_in_user", email);
    setCurrentUser(email);
  };

  // Calculate scores
  const eligibilityScore = eligibilityCriteria.filter((c) => c.userAnswer !== false).length;

  const totalComplianceRating = Math.round(
    techSpecs.reduce((acc, curr) => {
      let coeff = 1;
      if (curr.bidderResponse === "Y") coeff = 0.7;
      if (curr.bidderResponse === "R") coeff = 0;
      return acc + curr.maxMarks * coeff;
    }, 0)
  );

  // Guard Clause for Non-Authenticated Sessions
  if (!currentUser) {
    return <AuthScreen onLoginSuccess={handleLogin} />;
  }

  // Extract initials from email for user avatar badge
  const userInitials = currentUser.substring(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased">
      {/* Top Banner Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-150 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col xl:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full xl:w-auto justify-between">
            <div className="flex items-center gap-3">
              {/* IDBI BANK simulated blue colors theme */}
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-lg shadow-sm shadow-indigo-600/15 select-none shrink-0">
                ID
              </div>
              <div>
                <h1 className="font-sans font-extrabold text-slate-900 tracking-tight leading-none text-base sm:text-lg">
                  IDBI Bank BBPS Bid Portal
                </h1>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-400 font-mono block">
                  RFP Advisory and Compliance Platform
                </span>
              </div>
            </div>

            {/* User profile avatar and logout indicator for narrow viewport */}
            <div className="flex xl:hidden items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-150 text-indigo-700 flex items-center justify-center text-xs font-bold font-mono">
                {userInitials}
              </div>
              <button 
                onClick={handleLogout}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tab lists */}
          <nav className="flex flex-wrap items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${activeTab === "dashboard" ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
            </button>
            <button
              onClick={() => setActiveTab("eligibility")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${activeTab === "eligibility" ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Eligibility
            </button>
            <button
              onClick={() => setActiveTab("compliance")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${activeTab === "compliance" ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <ClipboardCheck className="w-3.5 h-3.5" /> Compliance
            </button>
            <button
              onClick={() => setActiveTab("simulation")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${activeTab === "simulation" ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <Scale className="w-3.5 h-3.5" /> TCO Simulator
            </button>
            <button
              onClick={() => setActiveTab("templates")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${activeTab === "templates" ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <FileSignature className="w-3.5 h-3.5" /> Bid Center
            </button>
            <button
              onClick={() => setActiveTab("advisor")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${activeTab === "advisor" ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <MessageSquareCode className="w-3.5 h-3.5" /> Chat Advisor
            </button>
            <button
              onClick={() => setActiveTab("devops")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${activeTab === "devops" ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <Terminal className="w-3.5 h-3.5" /> DevOps & QA Lab
            </button>
            <button
              onClick={() => setActiveTab("tutorials")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${activeTab === "tutorials" ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Help & Tutorials
            </button>
          </nav>

          {/* User profile avatar and logout indicator for widescreen */}
          <div className="hidden xl:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-150 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-black font-mono">
                {userInitials}
              </div>
              <div className="text-left select-none">
                <span className="text-[10px] font-black text-slate-800 block truncate max-w-36 leading-none">
                  {currentUser.split("@")[0]}
                </span>
                <span className="text-[8px] font-medium text-slate-400 block tracking-normal uppercase">
                  ACTIVE BIDDER
                </span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="py-1.5 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
              title="End Secure Session"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-400" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main interactive application driver */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 h-full">
        {activeTab === "dashboard" && (
          <Dashboard
            onNavigation={(tab) => setActiveTab(tab)}
            eligibilityScore={eligibilityScore}
            complianceRating={totalComplianceRating}
          />
        )}

        {activeTab === "eligibility" && (
          <Eligibility
            criteria={eligibilityCriteria}
            onToggleCriterion={handleToggleCriterion}
            eligibilityScore={eligibilityScore}
          />
        )}

        {activeTab === "compliance" && (
          <Compliance
            specs={techSpecs}
            onChangeSpecResponse={handleChangeSpecResponse}
            complianceRating={totalComplianceRating}
          />
        )}

        {activeTab === "simulation" && (
          <Simulation myTechnicalScore={totalComplianceRating} />
        )}

        {activeTab === "templates" && (
          <Templates userProfile={userProfile} onChangeProfile={handleChangeProfile} />
        )}

        {activeTab === "advisor" && <RfpChat userProfile={userProfile} />}

        {activeTab === "devops" && <DevOpsLab />}

        {activeTab === "tutorials" && <HelpSection />}
      </main>

      {/* Footer copyright section */}
      <footer className="bg-white border-t border-slate-150 py-4 text-center mt-auto">
        <p className="text-slate-400 text-xs font-mono font-medium">
          IDBI Bank REF No: IDBI-Bank/ITD/PPG /RFP/25-26/39 - For evaluation purposes only.
        </p>
      </footer>
    </div>
  );
}
