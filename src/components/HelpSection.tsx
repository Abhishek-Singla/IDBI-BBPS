import React, { useState } from "react";
import { BookOpen, Compass, ChevronLeft, ChevronRight, HelpCircle, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, FileText, Sparkles } from "lucide-react";

export default function HelpSection() {
  const [activeStep, setActiveStep] = useState(0);

  const guideSteps = [
    {
      title: "1. RFP Dashboard Overview",
      subtitle: "Evaluate Critical Milelines & EMD Costs",
      desc: "Our responsive Dashboard maps out the core schedules of events (Pre-bid dates, final document costs, security deposit value, block uptime expectations) and highlights penalties directly from the tender.",
      icon: <Compass className="w-6 h-6 text-indigo-500" />,
      instructions: [
        "Glance at the quick-states panel showing ₹5 Lakhs EMD and ₹15 Lakhs PBG targets.",
        "Check out the Calendar mapping out pre-bid and bidding deadlines.",
        "Monitor upcoming block timelines after the purchase order award."
      ]
    },
    {
      title: "2. Eligibility Screening Checks",
      subtitle: "Verify Compliance Thresholds Live",
      desc: "Pages 11-13 set up critical non-negotiable legal filters (3+ years experience, empanelment status, minimum BFSI installations). If you miss any, administrative disqualification is instant.",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      instructions: [
        "Go to the Eligibility tab to review the 12 strict threshold guidelines.",
        "Toggle each criterion to declare your company's status (Yes / No).",
        "View the danger/compliance message update dynamically as your score shifts."
      ]
    },
    {
      title: "3. Compliance Grading Scores",
      subtitle: "Fine-tune Bidder Code Grading (G/Y/R)",
      desc: "Compile Annexure 4 specifications dynamically. Bidding partners rate requirements by G (Available), Y (WIP), or R (Unavailable) scaling to 100%, 70%, or 0% respectively.",
      icon: <CheckCircle2 className="w-6 h-6 text-indigo-500" />,
      instructions: [
        "Access Section A, B, and C containing 50, 25, and 25 marks respectively.",
        "Toggle response grading to see your scores calculate live against IDBI thresholds.",
        "Ensure Section A qualifies at >=40 marks, B hover at >=20, and C remains >=20."
      ]
    },
    {
      title: "4. Techno-Commercial TCO Simulation",
      subtitle: "Outsmart Competing Bids Under 70:30 Model",
      desc: "Simulate tender outcomes using actual RFP pg-37 mathematical equations (Score S = 70% Tech compliance score + 30% Commercial lowest-TCO factor).",
      icon: <ArrowRight className="w-6 h-6 text-amber-500" />,
      instructions: [
        "Adjust volume counts (Billers onboardings, customization days sliders).",
        "Add competitors or alter standard unit pricing items.",
        "Review the Leaderboard to discover which bidder ranks first (TC1 winner) dynamically."
      ]
    },
    {
      title: "5. Bid Center & Interactive AI Drafts",
      subtitle: "Generate Compliant Tender Documents",
      desc: "Draft verified legal documents live. Compile variables directly into placeholders, prompt the AI advisor, or copy pristine formatted text.",
      icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
      instructions: [
        "Select Annexure Letters (Technical Bid, Unconditional Acceptance, InfoSec Agreement).",
        "Fill out Bidder Profiles on the left panel to update template variables instantly.",
        "Input customized text requests (e.g. Include VAPT certifications) to generate tailored AI drafts."
      ]
    }
  ];

  return (
    <div id="help-tutorials-tab" className="space-y-8 select-text">
      {/* Step Onboarding Tour Banner */}
      <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-sans font-black text-slate-900">Interactive Bid Portal Walkthrough</h2>
        </div>

        {/* Dynamic step widget */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Active step contents */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                {guideSteps[activeStep].icon}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-indigo-500 tracking-wider">Step {activeStep + 1} of 5</span>
                <h3 className="text-lg font-bold text-slate-800">{guideSteps[activeStep].title}</h3>
              </div>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
              {guideSteps[activeStep].desc}
            </p>

            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-[10px] font-black uppercase text-slate-500 font-mono tracking-wider block">Instructions / Activities:</span>
              <ul className="space-y-1.5">
                {guideSteps[activeStep].instructions.map((ins, idx) => (
                  <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5 font-medium leading-relaxed">
                    <span className="w-4 h-4 bg-indigo-100 text-indigo-800 text-[9px] font-black rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    {ins}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Step Indicators */}
          <div className="space-y-2 bg-slate-55 border border-slate-100 rounded-xl p-4">
            <span className="text-[10px] font-bold uppercase text-slate-500 block tracking-wider mb-2">Guide Book Index</span>
            <div className="space-y-1.5">
              {guideSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs font-semibold leading-snug transition block border ${activeStep === idx ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-150'}`}
                >
                  {step.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination keys */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <button
            onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
            className="px-4 py-2 bg-slate-50 hover:bg-slate-150 border border-slate-200 text-slate-700 font-bold transition text-xs rounded-lg flex items-center gap-1 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" /> Previous Step
          </button>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${activeStep === i ? 'bg-indigo-600' : 'bg-slate-200'}`}
              ></div>
            ))}
          </div>
          <button
            onClick={() => setActiveStep(prev => Math.min(4, prev + 1))}
            disabled={activeStep === 4}
            className="px-4 py-2 bg-slate-50 hover:bg-slate-150 border border-slate-200 text-slate-700 font-bold transition text-xs rounded-lg flex items-center gap-1 disabled:opacity-50"
          >
            Next Step <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tender Quick Regulations Wiki Index card block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-100 rounded-xl p-6 space-y-4">
          <h3 className="font-sans font-bold text-slate-950 text-base flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
            <FileText className="w-4.5 h-4.5 text-indigo-500" />
            Core RFP Parameters & Guidelines
          </h3>
          <p className="text-slate-500 text-xs leading-normal font-sans">
            Quick handbook summary representing mandatory parameters mentioned across the 170-page IDBI tender guideline:
          </p>
          <div className="space-y-3 pt-2 text-xs">
            <div className="flex items-start gap-2.5">
              <span className="p-1 bg-amber-50 text-amber-600 rounded mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </span>
              <div>
                <h5 className="font-bold text-slate-900 leading-none">Security Audits (AppSec/VAPT)</h5>
                <p className="text-slate-500 leading-normal mt-0.5">
                  Must expose the implemented solution to quarterly audits/VAPT by CERT-In empanelled auditors (Page 90, clause 25).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="p-1 bg-indigo-50 text-indigo-600 rounded mt-0.5">
                <BookOpen className="w-4 h-4" />
              </span>
              <div>
                <h5 className="font-bold text-slate-900 leading-none">Data Privacies & GDPR/DPDP</h5>
                <p className="text-slate-500 leading-normal mt-0.5">
                  Absolute customer data protection as per Digital Personal Data Protection (DPDP) Act 2023 with localized data residency.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="p-1 bg-emerald-50 text-emerald-600 rounded mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <div>
                <h5 className="font-bold text-slate-900 leading-none">CMEK Encryption</h5>
                <p className="text-slate-500 leading-normal mt-0.5">
                  Integrate with Bank Customer Managed Encryption Keys (CMEK) to maintain clear database cryptographic controls.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance checklist reminder card */}
        <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="font-sans font-bold text-slate-950 text-base flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
            <HelpCircle className="w-4.5 h-4.5 text-indigo-500" />
            Common FAQ Checklist
          </h3>
          <div className="space-y-3 font-sans text-xs">
            <div className="space-y-1">
              <span className="font-bold text-slate-900">Q: Can we customize document drafts?</span>
              <p className="text-slate-500 leading-normal">
                Yes! Head to Bid Center, change variables on the left, and fill your personalized company metrics. Use the AI Draft tool to adjust specific sections.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-900">Q: What happens if uptime falls below 95%?</span>
              <p className="text-slate-500 leading-normal">
                IDBI Bank levies a penalty equivalent to 100% of the monthly payment due for that sector. See full penalties compiled in compliance.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-900">Q: Are start-ups exempted from standard turnover thresholds?</span>
              <p className="text-slate-500 leading-normal">
                Yes, relaxation from the average Rs 10 Crore turnover is awarded to valid DPIIT registered startups having active revenue & positive net worth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
