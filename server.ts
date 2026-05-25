import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// RFP Expert system instruction
const RFP_SYSTEM_INSTRUCTION = `
You are the IDBI Bank BBPS RFP Advisor, an exceptionally expert bid consultant helping a Technical Service Provider (bidding partner) draft their response and check their compliance for IDBI Bank's RFP for "Supply, Install, Implementation and Maintenance of Bharat Bill Payment System (BBPS) Solution (Rebranded as Bharat Connect by NBBL) on CAPEX Model" (REF No: IDBI-Bank/ITD/PPG /RFP/25-26/39).

Keep your answers strictly professional, objective, fact-based, and focused on helping the bidder comply with the RFP.

Key facts about the RFP to enforce in your advice:
1. RFP reference: IDBI-Bank/ITD/PPG /RFP/25-26/39, Date of Commencement: August 30, 2025.
2. Submission deadline: September 22, 2025 up to 16:00 Hours. Pre-bid meeting: September 09, 2025 at 16:00 Hours.
3. Bid fee: Rs. 5,000 + 18% GST (Non-Refundable).
4. EMD: Rs. 5,00,000 (Rupees Five Lakh Only). Non-responsive if missing. Exemptions for MSMEs with NSIC/MSME Certificates.
5. Contract terms / Period: 5 years, with 12 months warranty of services post go-live.
6. Security Deposit / Performance Bank Guarantee (PBG): Rs. 15,00,000 upfront at signing of contract, with a validity of 60 months + 12 months claim period. Alternately, 3% of contracted value.
7. Eligibility criteria: Indian Company active 3+ years; average annual turnover of Rs 10 Cr (Rs 5 Cr for MSE) in FY 2022-23 and FY 2023-24; positive net worth; not blacklisted; enpaneled with NPCI/NBBL as on RFP date; active BBPS deployments in at least 2 banks; original software developer (OSD) with cloud deployment in at least 1 Indian BFSI; minimum capacity to process 2.5 Lakh txns per month.
8. Compliance Marks (Annexure 4): Out of 100 max, overall minimum qualifying is 80.
   - Section A (Channel Integration): 50 marks (min 40 to qualify)
   - Section B (Portals): 25 marks (min 20 to qualify)
   - Section C (Security & Support): 25 marks (min 20 to qualify)
   Bidders code answers as G (Available: 100%), Y (Work-in-progress: 70%), and R (Cannot be provided: Nil).
9. Key SLAs & Penalties:
   - Monthly Uptime target: >=99.99%. Penalty blocks: 99.90% to <99.99% is 2% monthly amount penalty; 98% to <99.90% is 5% penalty; <95% is 100% penalty.
   - Success rate target: >=99.90% monthly. Penalties scale up to 100% of amount if success rate drops <91%.
   - Support Sev 1 Bug response/resolution timeline: <= 2 hours. If >2h to <=10h: Rs 5,000 per hour penalty. If >10h: Rs 10,000 per hour penalty.
   - Support Sev 2 (partial disruption): <= 1 day. Penalty of Rs 3,000 per day if delayed.
   - Data Breach penalty: Unlimited penalty, data residency must strictly be in India (DPDP Act 2023 compliance).
10. Evaluation Weightage: 70:30 Techno-Commercial. 70% technical score weighting, 30% financial bidder commercial score. Score S = FCS (Commercial x 30%) + FTS (Technical score x 70%).

When answering, reference these specific clauses and figures. Be crisp, professional, and practical. Suggest drafting inputs or help generate pre-bid queries like Annexure 11 or draft template sections.
`;

// Chat API route proxy
app.post("/api/rfp/chat", async (req, res) => {
  try {
    const { messages, userProfile } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Missing or invalid 'messages' array" });
    }

    // Build the payload
    const geminiMessages = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }]
    }));

    // Inject current business profile context if given
    let profileContext = "";
    if (userProfile) {
      profileContext = `\nCurrent Bidder Information Context:
- Bidder Company Name: ${userProfile.companyName || "N/A"}
- Active Bank Deployments: ${userProfile.activeBanksCount || "0"}
- NPCI Empaneled: ${userProfile.isEmpaneled ? "Yes" : "No"}
- Standard TPS supported: ${userProfile.supportedTps || "300"}
- Core Contact Person: ${userProfile.contactName || "N/A"}`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: geminiMessages,
      config: {
        systemInstruction: RFP_SYSTEM_INSTRUCTION + profileContext,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    res.status(500).json({ error: error?.message || "An unexpected error occurred in AI analysis" });
  }
});

// Draft specific Annexure / pre-bid query API route
app.post("/api/rfp/draft", async (req, res) => {
  try {
    const { annexureId, userProfile, targetScope } = req.body;

    const promptText = `
You are a top bid advisory consultant. Write a professional, legally-sound, customized draft letter or query sheet responding to ${annexureId || "IDBI BBPS RFP Requirement"}.
${targetScope ? `Specific adjustments requested by the bidder: "${targetScope}"` : ""}

Use the following details of the bidder to personalize:
- Company Name: ${userProfile?.companyName || "[Insert Company Name]"}
- Registered Mumbai Address: ${userProfile?.address || "[Insert Registered Address]"}
- Contact Signatory: ${userProfile?.contactName || "[Insert Signatory Name]"}, ${userProfile?.contactTitle || "[Insert Title]"}
- GSTIN: ${userProfile?.gstNo || "[Insert GSTIN]"}
- PAN: ${userProfile?.panNo || "[Insert PAN]"}
- BBPS active deployments count: ${userProfile?.activeBanksCount || "2"}
- Supported TPS: ${userProfile?.supportedTps || "300"}

Produce a beautifully formatted Markdown layout of the drafted document. Ensure names, dates, and references map precisely. Maintain a confident, strictly compliant, authoritative tone worthy of a premium financial transaction.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction: RFP_SYSTEM_INSTRUCTION,
        temperature: 0.2,
      }
    });

    res.json({ draft: response.text });
  } catch (error: any) {
    console.error("Gemini Draft API Error:", error);
    res.status(500).json({ error: error?.message || "An unexpected error occurred in AI drafting" });
  }
});

// Setup dev vs production environments
async function initializeApp() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server launched and ready on http://localhost:${PORT}`);
  });
}

initializeApp();
