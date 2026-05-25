import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { MessageSquare, Send, Loader2, Sparkles, AlertTriangle, ShieldCheck } from "lucide-react";

interface RfpChatProps {
  userProfile: any;
}

export default function RfpChat({ userProfile }: RfpChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Hello! I am your IDBI Bank BBPS RFP Advisor, powered by Gemini. Ask me any clause clarification about schedules, minimum eligibility checkmarks, uptime penalty percentages, severity level penalties, or payment structure. \n\nClick any shortcut query below to get started immediately!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const queryRfp = async (prompt: string) => {
    if (loading) return;
    setLoading(true);

    const userMsg: ChatMessage = {
      role: "user",
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText("");

    try {
      const response = await fetch("/api/rfp/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, text: m.text })),
          userProfile
        })
      });

      const data = await response.json();
      if (data.text) {
        setMessages(prev => [
          ...prev,
          {
            role: "model",
            text: data.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        throw new Error(data.error || "Failed to parse model reply");
      }
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          role: "model",
          text: `Advisor connection glitch: "${err?.message || err}". Ensure process.env.GEMINI_API_KEY is configured in your platform secrets.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    queryRfp(inputText);
  };

  const shortcuts = [
    { title: "SLA Penalties Summary", query: "Summarize the SLA uptime and success rate penalty thresholds and their percentage deductions (from pages 30-31)." },
    { title: "EMD & PBG Rules", query: "What are the rules regarding the Earnest Money Deposit (EMD) security value, where do we credit it, and how is Perfomance Bank Guarantee (PBG) configured (page 9, 29, 41)?" },
    { title: "Bug Severity Penalties", query: "Can you list the exact Severity 1 to 4 delay fines, timeline hours, and reporting methods defined on page 32 of the RFP?" },
    { title: "Payment Milestones", query: "Outline the key payment terms and percentages for the solution CAPEX delivery and ATS costs (page 29)." }
  ];

  return (
    <div id="advisor-tab" className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Help shortcuts bar on left */}
      <div className="space-y-6 lg:col-span-1">
        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-sans font-bold text-slate-900 text-sm flex items-center gap-1.5 string">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Quick Shortcuts
          </h3>
          <p className="text-slate-400 text-xs leading-normal">
            Select one of our frequently asked compliance questions to immediately extract key clauses from the 170-page RFP.
          </p>

          <div className="space-y-2.5 pt-2">
            {shortcuts.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => queryRfp(sc.query)}
                className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100/80 hover:border-slate-300 transition text-xs font-semibold text-slate-700 rounded-lg border border-slate-150 leading-relaxed block"
              >
                {sc.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main chat layout */}
      <div className="lg:col-span-3 flex flex-col h-[600px] bg-white rounded-xl border border-slate-150 overflow-hidden shadow-sm">
        {/* Chat header area */}
        <div className="flex items-center gap-2.5 bg-slate-50 p-4 border-b border-slate-150">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <MessageSquare className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="font-sans font-bold text-slate-800 text-sm">Bid Compliance Expert Advisor</h4>
            <span className="text-[10px] text-emerald-600 font-semibold block uppercase">⚡ Online Active</span>
          </div>
        </div>

        {/* Messaging area scroll */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 select-text">
          {messages.map((m, idx) => {
            const isUser = m.role === "user";
            return (
              <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xl p-4 rounded-xl space-y-2 shadow-sm ${isUser ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-150'}`}>
                  {/* Text content renders nicely as line breaks */}
                  <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed font-sans font-medium">
                    {m.text}
                  </p>
                  <span className={`text-[9px] block text-right font-mono ${isUser ? 'text-indigo-200' : 'text-slate-400'}`}>
                    {m.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-50 text-slate-500 rounded-xl p-4 rounded-tl-none border border-slate-150 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                <span className="text-xs font-semibold">Consulting RFP pages...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input box */}
        <form onSubmit={handleKeyPress} className="p-4 bg-slate-50 border-t border-slate-150 flex gap-2">
          <input
            type="text"
            placeholder={loading ? "Analyzing..." : "Ask clarify clause, e.g. What are the background check rules?"}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
            className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm bg-white text-slate-800 focus:outline-indigo-500 font-medium"
          />
          <button
            type="submit"
            disabled={loading || !inputText.trim()}
            className="p-2 sm:px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 transition text-white text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-1 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </form>
      </div>
    </div>
  );
}
