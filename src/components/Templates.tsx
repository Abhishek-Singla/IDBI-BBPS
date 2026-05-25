import React, { useState } from "react";
import { ANNEXURE_TEMPLATES } from "../data";
import { Clipboard, ListRestart, FileCheck, Star, Sparkles, Loader2 } from "lucide-react";

interface TemplatesProps {
  userProfile: {
    companyName: string;
    address: string;
    contactName: string;
    contactTitle: string;
    gstNo: string;
    panNo: string;
    activeBanksCount: number;
    supportedTps: number;
    isEmpaneled: boolean;
  };
  onChangeProfile: (key: string, value: any) => void;
}

export default function Templates({ userProfile, onChangeProfile }: TemplatesProps) {
  const [selectedAnnexure, setSelectedAnnexure] = useState<string>("annexure1");
  const [customRequest, setCustomRequest] = useState<string>("");
  const [aiDraftedText, setAiDraftedText] = useState<string>("");
  const [loadingAi, setLoadingAi] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const activeTemplateObj = ANNEXURE_TEMPLATES.find((t) => t.id === selectedAnnexure);

  // Live variable compiler
  const compileTemplate = (rawText: string) => {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return rawText
      .replaceAll("[COMPANY_NAME]", userProfile.companyName || "[Your Corporate Name]")
      .replaceAll("[COMPANY_ADDRESS]", userProfile.address || "[Your Corporate Registered Office Address]")
      .replaceAll("[SIGNATORY_NAME]", userProfile.contactName || "[Authorized Signatory Name]")
      .replaceAll("[SIGNATORY_TITLE]", userProfile.contactTitle || "[Authorized Signatory Title]")
      .replaceAll("[COMPANY_GST]", userProfile.gstNo || "[Provide GSTIN Number]")
      .replaceAll("[COMPANY_PAN]", userProfile.panNo || "[Provide PAN - Permanent Account Number]")
      .replaceAll("[ACTIVE_BANKS_COUNT]", userProfile.activeBanksCount.toString())
      .replaceAll("[SUPPORTED_TPS]", userProfile.supportedTps.toString())
      .replaceAll("[CURRENT_DATE]", formattedDate)
      .replaceAll("[CURRENT_DAY]", today.getDate().toString())
      .replaceAll("[CURRENT_MONTH]", months[today.getMonth()])
      .replaceAll("[INCORPORATION_YEAR]", "2018")
      .replaceAll("[COMPANY_CONSTITUTION]", "Private Limited Company")
      .replaceAll("[MUMBAI_ADDRESS]", "Unit 102, Bandra Kurla Complex, BKC, Mumbai - 400051")
      .replaceAll("[EMPANELMENT_REF]", "NPCI/BBPS/TSP/2021-9988");
  };

  const compiledText = activeTemplateObj ? compileTemplate(activeTemplateObj.template) : "";

  // Trigger server-side AI drafting
  const handleGenerateCustomDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customRequest) return;
    setLoadingAi(true);
    setAiDraftedText("");

    try {
      const response = await fetch("/api/rfp/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          annexureId: selectedAnnexure,
          userProfile,
          targetScope: customRequest,
        }),
      });
      const data = await response.json();
      if (data.draft) {
        setAiDraftedText(data.draft);
      } else {
        setAiDraftedText("Failed to generate custom draft. Server returned an empty response.");
      }
    } catch (err: any) {
      console.error(err);
      setAiDraftedText(`Error generating draft: ${err?.message || err}`);
    } finally {
      setLoadingAi(false);
    }
  };

  const handleCopyClipboard = (text: string, type: "compiled" | "ai") => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(type);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  return (
    <div id="templates-tab" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Profile settings inputs */}
      <div className="space-y-6 lg:col-span-1">
        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-sans font-bold text-slate-900 text-base">Custom Bidder Profile</h3>
          <p className="text-slate-400 text-xs">
            Edit profile parameters. When changed, all official Annexure files will update live.
          </p>

          <div className="space-y-3.5 pt-2">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Corporate Name</label>
              <input
                type="text"
                value={userProfile.companyName}
                onChange={(e) => onChangeProfile("companyName", e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-indigo-500 font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Corporate Registered Address</label>
              <textarea
                value={userProfile.address}
                onChange={(e) => onChangeProfile("address", e.target.value)}
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-indigo-500 font-sans resize-none"
              />
            </div>

            <div id="signatory-inputs" className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500">Signatory Person</label>
                <input
                  type="text"
                  value={userProfile.contactName}
                  onChange={(e) => onChangeProfile("contactName", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500">Signatory Position</label>
                <input
                  type="text"
                  value={userProfile.contactTitle}
                  onChange={(e) => onChangeProfile("contactTitle", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-indigo-500"
                />
              </div>
            </div>

            <div id="company-identifiers" className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500">GSTIN Registration</label>
                <input
                  type="text"
                  value={userProfile.gstNo}
                  onChange={(e) => onChangeProfile("gstNo", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-indigo-500 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500">PAN Card No</label>
                <input
                  type="text"
                  value={userProfile.panNo}
                  onChange={(e) => onChangeProfile("panNo", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-indigo-500 font-mono"
                />
              </div>
            </div>

            <div id="deployment-parameters" className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500">Active bank clients</label>
                <input
                  type="number"
                  value={userProfile.activeBanksCount}
                  onChange={(e) => onChangeProfile("activeBanksCount", Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-indigo-500 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500">System TPS support</label>
                <input
                  type="number"
                  value={userProfile.supportedTps}
                  onChange={(e) => onChangeProfile("supportedTps", Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-indigo-500 font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compiled Official Templates view & customization */}
      <div className="space-y-6 lg:col-span-2">
        {/* Toggle Selector */}
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
          {ANNEXURE_TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedAnnexure(t.id);
                setAiDraftedText("");
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${selectedAnnexure === t.id ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              {t.title.split(":")[0]}
            </button>
          ))}
        </div>

        {/* Selected letter viewer */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between bg-slate-50 p-4 border-b border-slate-100">
            <span className="font-sans font-bold text-slate-800 text-sm">{activeTemplateObj?.title}</span>
            <button
              onClick={() => handleCopyClipboard(compiledText, "compiled")}
              className="py-1 px-3 bg-white hover:bg-slate-50 active:bg-slate-100 transition rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
            >
              <Clipboard className="w-3.5 h-3.5 text-slate-400" />
              {copyFeedback === "compiled" ? "Copied!" : "Copy Template"}
            </button>
          </div>
          <div className="p-6">
            <pre className="text-slate-700 text-xs leading-relaxed font-mono whitespace-pre-wrap select-text h-96 overflow-y-auto pr-2">
              {compiledText}
            </pre>
          </div>
        </div>

        {/* AI custom prompt drafting panel */}
        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm space-y-4">
          <h4 className="font-sans font-bold text-slate-900 text-sm flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
            AI Draft Editor & Customizer
          </h4>
          <p className="text-slate-400 text-xs leading-normal">
            Need adjustments? Prompt our model to enrich your cover letter or draft a response to Annexure 20 security guidelines on your behalf using your corporate profile.
          </p>

          <form onSubmit={handleGenerateCustomDraft} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Include background certifications, ISO-27011 compliance, and explain the Bandra team's technical support capacity..."
              value={customRequest}
              onChange={(e) => setCustomRequest(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-indigo-500"
            />
            <button
              type="submit"
              disabled={loadingAi}
              className="py-2 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 transition text-white text-xs font-semibold rounded-lg flex items-center gap-1 justify-center shrink-0"
            >
              {loadingAi ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Drafting...
                </>
              ) : (
                "Generate Draft"
              )}
            </button>
          </form>

          {/* AI output display */}
          {aiDraftedText && (
            <div className="p-5 bg-indigo-50/40 border border-indigo-100/50 rounded-lg space-y-3 relative">
              <div className="flex items-center justify-between border-b border-indigo-100/50 pb-2">
                <span className="text-[10px] font-black uppercase text-indigo-950 block tracking-wider font-mono">Customized AI Bid Draft</span>
                <button
                  onClick={() => handleCopyClipboard(aiDraftedText, "ai")}
                  className="p-1.5 hover:bg-indigo-100/50 rounded text-slate-500 transition"
                  title="Copy customized draft to clipboard"
                >
                  <Clipboard className="w-3.5 h-3.5 text-indigo-800" />
                </button>
              </div>
              <pre className="text-slate-700 text-xs leading-relaxed font-mono whitespace-pre-wrap select-text max-h-64 overflow-y-auto pr-2">
                {aiDraftedText}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
