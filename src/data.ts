import { EligibilityCriterion, TechSpecificationRow, PreBidQuery } from "./types";

export const RFP_INFO = {
  reference: "IDBI-Bank/ITD/PPG /RFP/25-26/39",
  date: "August 30, 2025",
  title: "RFP for Supply, Install, Implementation and Maintenance of Bharat Bill Payment System (BBPS) Solution on CAPEX Model",
  authority: "Procurement & Payment Group (PPG), Information Technology Department, IDBI Bank Limited",
  location: "Chembur, Mumbai - 400071",
  timeline: [
    { label: "RFP Date of Commencement", date: "August 30, 2025", status: "Published" },
    { label: "Last Date for Written Queries", date: "September 06, 2025 upto 18.00 Hours", status: "Upcoming" },
    { label: "Online Pre-Bid Meeting", date: "September 09, 2025 at 16.00 Hours", status: "Upcoming" },
    { label: "Last Date for Bid Submission", date: "September 22, 2025 up to 16:00 Hours", status: "Upcoming" },
    { label: "Date & Time of Bid Opening", date: "September 22, 2025 at 17:00 Hours", status: "Upcoming" }
  ],
  financials: {
    bidFee: "Rs. 5,000 + 18% GST (Non-Refundable)",
    emd: "Rs. 5,000,000 (Rupees Five Lakh Only)", // wait, in screenshot "Rs. 5,00,000" is written but text says "(Rupees Five Lakh Only)". Let's display "Rs. 5,00,000 (Five Lakhs)"
    pbg: "3% of Contracted Value in the form of PBG ($15,000,000 upfront mentioned on page 29)", // Rs. 15 Lakhs upfront mentioned on page 29
    pbgUpfront: "Rs. 15,00,000"
  },
  keySlas: [
    { metric: "Monthly Uptime", target: "99.99% for both BOU & COU", penalty: "Up to 100% of monthly amount payable for <95% uptime" },
    { metric: "Uptime Penalty Steps", target: ">=99.99% Nil", penalty: "99.90% to <99.99%: 2% penalty; 98.00% to <99.90%: 5% penalty" },
    { metric: "Transaction Success Rate", target: "99.90% success rate monthly", penalty: "Failure steps similar, up to 100% of amount payable if <91%" },
    { metric: "Severity 1 Bug Resolution", target: "<= 2 hours response", penalty: "Rs. 5,000/hour up to 10 hours; Rs. 10,000/hour beyond 10 hours" },
    { metric: "Severity 2 Bug Resolution", target: "<= 1 day response", penalty: "Rs. 3,000 per day delay" },
    { metric: "Severity 3 Bug Resolution", target: "<= 5 days response", penalty: "Rs. 1,000 per day delay" },
    { metric: "Data Breach Liability", target: "Absolute Security", penalty: "Unlimited Penalty / Legal Action" }
  ]
};

export const ELIGIBILITY_CRITERIA_DATA: EligibilityCriterion[] = [
  {
    id: 1,
    category: "General",
    criteria: "Indian Company/LLP/Partnership firm registered under applicable acts in India, in operation for at least Three years as on the RFP date.",
    supportingDocs: "Certificate of Incorporation, Memorandum & Articles of Association / Partnership Deed, copy of PAN Card and GSTIN Certificate."
  },
  {
    id: 2,
    category: "Financial",
    criteria: "Annual average turnover of Rs. 10 crore (Rs. 5 crore for MSE) in the last 2 financial years (FY 2022-23 & FY 2023-24). Relaxation for DPIIT start-ups currently revenue generating with positive net worth.",
    supportingDocs: "Audited Financial Sheets of the last 3 financial years, or provisional certificate signed by CA for FY 2024-25, alongside DPIIT certificate if applicable."
  },
  {
    id: 3,
    category: "Financial",
    criteria: "Positive Net Worth in the last two Financial Years (2023-24 & 2024-25).",
    supportingDocs: "Audited Financial Sheet/Report of the last financial years."
  },
  {
    id: 4,
    category: "Regulatory",
    criteria: "Not been blacklisted by any Government bodies, Public Sector Banks, or PSUs during the last five years.",
    supportingDocs: "Self-Declaration on company letterhead as per Annexure-7."
  },
  {
    id: 5,
    category: "Regulatory",
    criteria: "In compliance with the land-border restrictions circular (Notification F.No.6/18/2019-PDD) issued by the Ministry of Finance.",
    supportingDocs: "Model Certificate for Tenders stamped and signed by approving authority."
  },
  {
    id: 6,
    category: "Technical",
    criteria: "Bidder must be a Technical Service Provider (TSP) for BBPS and enpaneled with NPCI/NBBL as on the date of RFP.",
    supportingDocs: "Self-declaration on letterhead."
  },
  {
    id: 7,
    category: "Technical",
    criteria: "Bidder should be a Technical Service Provider (TSP) for BBPS (BOU and/or COU) in at least 2 banks which are active on the date of RFP.",
    supportingDocs: "Copy of Purchase Order or Completion Certificate from the active client banks."
  },
  {
    id: 8,
    category: "Technical",
    criteria: "The COU & BOU module should support a minimum Transactions Per Second (TPS) of 300 initially (both Bill fetch and Payment) and be further scalable.",
    supportingDocs: "Self-declaration on letterhead."
  },
  {
    id: 9,
    category: "Technical",
    criteria: "Must be an Original Software Developer (OSD) and deployed similar cloud application for at least one Bank/BFSI entity in India.",
    supportingDocs: "Self-declaration, PO, Project sign-off, or client authorized email confirmation."
  },
  {
    id: 10,
    category: "Technical",
    criteria: "Capable of routing and handling minimum of 2.50 lakh financial/non-financial transactions per month.",
    supportingDocs: "Self-declaration on client letterhead or system statistics report."
  },
  {
    id: 11,
    category: "Technical",
    criteria: "Confirming cloud-agnostic features with flexibility to host in any Bank-empanelled CSP (specifically AWS or GCP).",
    supportingDocs: "Undertaking signed by Authorized Signatory."
  },
  {
    id: 12,
    category: "Regulatory",
    criteria: "Capable of ensuring protection of personal data as per the provisions of Digital Personal Data Protection (DPDP) Act, 2023.",
    supportingDocs: "Undertaking signed by Authorized Signatory."
  }
];

export const TECH_SPECIFICATIONS_DATA: TechSpecificationRow[] = [
  // SECTION A: Channel Integration & Biller/Agents On-boarding
  { id: "A1", section: "A", requirement: "Bidder should be an Active Technical Service Provider (TSP) for BBPS-BOU & COU solution.", maxMarks: 10, bidderResponse: "G" },
  { id: "A2", section: "A", requirement: "Bidder should be an Active Technical Service Provider (TSP) for implementation of BBPS solution on Bank’s own Cloud.", maxMarks: 10, bidderResponse: "G" },
  { id: "A3", section: "A", requirement: "The BBPS solution should support all payment channels: Mobile & Internet Banking, FX Retail BC, ATM/Kiosk, Dedicated Web portal (Pre-login), I-net banking lite, Prepaid Cards, WhatsApp Banking, Credit-Card application.", maxMarks: 5, bidderResponse: "G" },
  { id: "A4", section: "A", requirement: "Capable of integrating future payment channels: IDBI PAY (UPI), Connected Banking, Digital Rupee (CBDC), BBPS Cross-Border Inbound payments, etc.", maxMarks: 5, bidderResponse: "G" },
  { id: "A5", section: "A", requirement: "The COU module should feature: view/download txn history, download receipt, Save billers, Autofetch, Autopay management, Register & view complaints status.", maxMarks: 5, bidderResponse: "G" },
  { id: "A6", section: "A", requirement: "Bulk biller management: register bulk billers, bulk bill presentment, bulk bill payments, etc.", maxMarks: 3, bidderResponse: "G" },
  { id: "A7", section: "A", requirement: "Support bill payments for both Bank and Non-Bank customers.", maxMarks: 2, bidderResponse: "G" },
  { id: "A8", section: "A", requirement: "Handle both On-us and Off-us transactions seamlessly.", maxMarks: 2, bidderResponse: "G" },
  { id: "A9", section: "A", requirement: "Integrate with multiple Payment gateways of IDBI Bank's choice with no additional cost.", maxMarks: 2, bidderResponse: "G" },
  { id: "A10", section: "A", requirement: "Limit management & enabling/disabling for channels, Agent Institutes, and Agents. Access whitelisted for public IP and configurable on front end option to Bank.", maxMarks: 2, bidderResponse: "G" },
  { id: "A11", section: "A", requirement: "Complete end-to-end migration of the existing Bank’s BBPS Clients data to the Bank’s Cloud.", maxMarks: 1, bidderResponse: "G" },
  { id: "A12", section: "A", requirement: "Onboarding capabilities for Online and Offline billers.", maxMarks: 1, bidderResponse: "G" },
  { id: "A13", section: "A", requirement: "Support UPMS live platform for Bill Presentment Registration and Bill Presentment.", maxMarks: 1, bidderResponse: "G" },
  { id: "A14", section: "A", requirement: "Mechanism to send SMS/email/WhatsApp notifications of pending bills.", maxMarks: 1, bidderResponse: "G" },

  // SECTION B: Portal requirements for Bank/ Billers/ Agents
  { id: "B1", section: "B", requirement: "Separate unique interface for Billers, Agents, Bank operation team (Admin), and Bank Reconciliation Team.", maxMarks: 5, bidderResponse: "G" },
  { id: "B2", section: "B", requirement: "Admin super user access to bulk/single create & manage users with different roles.", maxMarks: 3, bidderResponse: "G" },
  { id: "B3", section: "B", requirement: "Admin should have full access to view login activities of all users.", maxMarks: 2, bidderResponse: "G" },
  { id: "B4", section: "B", requirement: "Self-service password reset with proper multifactor authentication mechanism.", maxMarks: 1, bidderResponse: "G" },
  { id: "B5", section: "B", requirement: "Download reports in .txt, .pdf, .csv, and .xls formats.", maxMarks: 1, bidderResponse: "G" },
  { id: "B6", section: "B", requirement: "Generate Monthly MDM Declaration letter, Monthly RBI Returns, and Quarterly Self Audit checklist dynamically on-time.", maxMarks: 2, bidderResponse: "G" },
  { id: "B7", section: "B", requirement: "Toggle on/off (enable/disable) for payment modes dynamically on front-end URL.", maxMarks: 1, bidderResponse: "G" },
  { id: "B8", section: "B", requirement: "Agent/AI onboarding and full offline/online billing partner onboarding management.", maxMarks: 1, bidderResponse: "G" },
  { id: "B9", section: "B", requirement: "Graphical representations (pie charts, bar graphs) for transactional summary across biller, channel, AI, and aggregator.", maxMarks: 1, bidderResponse: "G" },
  { id: "B10", section: "B", requirement: "Extensive transaction, failure, uptime, complaint status, performance, and commission reports.", maxMarks: 5, bidderResponse: "G" },
  { id: "B11", section: "B", requirement: "Integrate with CANVAS portal to capture and resolve complaints as per NPCI Format.", maxMarks: 1, bidderResponse: "G" },
  { id: "B12", section: "B", requirement: "Ability to audit request/response log of any specific transactions for COU and BOU on portal.", maxMarks: 1, bidderResponse: "G" },

  // SECTION C: Security / Audit / Reconciliation & Support
  { id: "C1", section: "C", requirement: "Develop, implement, and maintain solution on bank's Cloud with separate databases, UAT instance, and dual DC/DR setups.", maxMarks: 1, bidderResponse: "G" },
  { id: "C2", section: "C", requirement: "Provide extensive architectural, API, and biller onboarding documentation.", maxMarks: 1, bidderResponse: "G" },
  { id: "C3", section: "C", requirement: "Upload and display bank banners/promotions at no additional cost.", maxMarks: 1, bidderResponse: "G" },
  { id: "C4", section: "C", requirement: "Send custom SMS/Email alerts to customers upon registration or payment.", maxMarks: 1, bidderResponse: "G" },
  { id: "C5", section: "C", requirement: "Seamless failover to DR within a 2-hour RTO and near-0 data loss RPO.", maxMarks: 1, bidderResponse: "G" },
  { id: "C6", section: "C", requirement: "User friendly error triggers with clear suggestions for next user actions.", maxMarks: 0.5, bidderResponse: "G" },
  { id: "C7", section: "C", requirement: "Ensure overall application uptime of 99.99% on a monthly basis.", maxMarks: 1, bidderResponse: "G" },
  { id: "C8", section: "C", requirement: "Prepare and share user manuals & video training guides.", maxMarks: 1, bidderResponse: "G" },
  { id: "C9", section: "C", requirement: "Organize workshops and trainings across channels, billers, and agents.", maxMarks: 1, bidderResponse: "G" },
  { id: "C10", section: "C", requirement: "Manage complete billing/recon liaising with agents and NPCI on behalf of Bank.", maxMarks: 1, bidderResponse: "G" },
  { id: "C11", section: "C", requirement: "Maintain audit & system logs for forensics and compliance as per RBI policies.", maxMarks: 0.5, bidderResponse: "G" },
  { id: "C12", section: "C", requirement: "End-to-end encryption (SSL/TLS at rest and in transit).", maxMarks: 1, bidderResponse: "G" },
  { id: "C13", section: "C", requirement: "Integrate with Microsoft Entra or equivalent Bank IdP for SSO and MFA.", maxMarks: 1, bidderResponse: "G" },
  { id: "C14", section: "C", requirement: "Implement strict CMEK solution key management on-cloud and on-prem.", maxMarks: 1, bidderResponse: "G" },
  { id: "C15", section: "C", requirement: "Network attachments, core WAF, and DDoS configuration on Bank land-zone.", maxMarks: 1, bidderResponse: "G" },
  { id: "C16", section: "C", requirement: "Ensure data residency remains permanently within Indian geographical borders.", maxMarks: 1, bidderResponse: "G" },
  { id: "C17", section: "C", requirement: "Integrate with Bank CDMS for document archiving and backup processing.", maxMarks: 1, bidderResponse: "G" },
  { id: "C18", section: "C", requirement: "Support B2B multi-invoice payments and partial payment responses.", maxMarks: 1, bidderResponse: "G" },
  { id: "C19", section: "C", requirement: "Centralized automatic T+1 reconciliation engine, complete with refund APIs.", maxMarks: 1, bidderResponse: "G" },
  { id: "C20", section: "C", requirement: "Support quarterly AppSec/VAPT audit and prompt remediation of findings.", maxMarks: 1, bidderResponse: "G" },
  { id: "C21", section: "C", requirement: "24x7x365 production active-active monitoring and support with dedicated on-site personnel in Mumbai.", maxMarks: 5, bidderResponse: "G" },
  { id: "C22", section: "C", requirement: "Detailed vendor assessment questionnaire compliance across 200 key controls.", maxMarks: 1, bidderResponse: "G" },
  { id: "C23", section: "C", requirement: "Submission of clean, authenticated, and signed SBOM as per CERT-In guidelines.", maxMarks: 1, bidderResponse: "G" }
];

export const INITIAL_CHECKLIST_TEMPLATE: PreBidQuery[] = [
  { id: 1, pageNo: "13", clauseNo: "Sr. No 9", description: "The COU & BOU module should support minimum TPS of 300.", suggestion: "Can the bank confirm if this requirement is 300 concurrent TPS for BOU and COU combined or separate?" },
  { id: 2, pageNo: "16", clauseNo: "4(a) vii", description: "The web portal should be PCI-DSS/PA-DSS compliant.", suggestion: "Since this is hosted on Bank's Cloud, can Bank clarify the sharing of responsibilities for PCI-DSS compliance?" },
  { id: 3, pageNo: "19", clauseNo: "4(d) i d", description: "Integration with Bank's CMEK (Customer managed encryption key) solution.", suggestion: "Please provide the technical specs/interfaces of the CMEK solution currently used by Bank." },
  { id: 4, pageNo: "29", clauseNo: "8.2.3", description: "Submit performance security of Rs. 15 Lakh upfront at signing.", suggestion: "Requesting to substitute upfront cash/security with PBG issued by a scheduled bank as per Annexure 14." },
  { id: 5, pageNo: "30", clauseNo: "8.3.2", description: "Delivery of the Solution should be within 60 Days from date of SOW.", suggestion: "Requesting 90 days timeline for comprehensive UAT sign-off and historical data migration." }
];

export const ANNEXURE_TEMPLATES = [
  {
    id: "annexure1",
    title: "Annexure-1: Technical Bid Form",
    template: `Date: [CURRENT_DATE]

To,
Dy. General Manager
Procurement & Payment Group (PPG),
Information Technology Department,
IDBI Bank Limited,
Ground Floor, Corporate Park,
Chembur, Mumbai - 400071

Subject: Technical Bid for BBPS Solution implementation (REF No: IDBI-Bank/ITD/PPG/RFP/25-26/39)

Dear Sir,/Madam,

Having examined the Bid Documents, the receipt of which is hereby duly acknowledged, we, the undersigned [COMPANY_NAME], absolutely, unconditionally and irrevocably offer to Supply, Install, Implement and Maintain the Bharat Bill Payment System (BBPS) Solution on IDBI Bank's Cloud (Rebranded as Bharat Connect by NBBL) on CAPEX Model in conformity with the said Bid Documents.

We confirm the following critical parameters of our offering:
1. We are a Technical Service Provider (TSP) for BBPS empanelled with NPCI/NBBL.
2. We have active COU & BOU installations in [ACTIVE_BANKS_COUNT] banks.
3. Our solution natively supports a minimum of [SUPPORTED_TPS] TPS on Bank Cloud.
4. We confirm absolute adherence to the DPDP Act 2023, data residency, and RBI guidelines.

If our Bid is accepted, we agree to obtain a Performance Bank Guarantee equivalent to Rs. 15,00,000/- for the due performance and observance of the Contract.

Dated this [CURRENT_DAY] day of [CURRENT_MONTH] 2026.

Sincerely,

For [COMPANY_NAME]
Authorized Name: [SIGNATORY_NAME]
Designation: [SIGNATORY_TITLE]
Company Seal: [COMPANY_NAME] Private Limited`
  },
  {
    id: "annexure6",
    title: "Annexure-6: Unconditional Acceptance of Terms",
    template: `Date: [CURRENT_DATE]

To,
Dy. General Manager
Procurement & Payment Group (PPG),
IDBI Bank Limited, Chembur, Mumbai

Subject: Unconditional Acceptance of Terms & Conditions (REF No: IDBI-Bank/ITD/PPG/RFP/25-26/39: Aug 30, 2025)

Dear Sir,/Madam,

This is to confirm that we, [COMPANY_NAME], absolutely & unconditionally accept all the terms, conditions, penalties, liquidating damages, and scope of work as mentioned in all parts of the said RFP/Bid Document floated by IDBI Bank Limited regarding the Supply, Install, Implementation and Maintenance of Bharat Bill Payment System (BBPS) Solution (Bharat Connect by NBBL) on CAPEX Model.

We acknowledge the SLA penalties:
- Minimum monthly uptime of 99.99% for Boulevard & Customer Operating Units.
- 99.90% transaction success rate requirement with corresponding monthly fee deductions.
- Multi-tier delay penalties mapped to Bug Severity 1 to 4.
- 60 days delivery and installation timeline mapped to 0.5% per week delayed penalty.

We certify that there are no deviations from the specified guidelines of the RFP, and any clauses of deviation inside our submission shall stand null and void.

Sincerely,

For [COMPANY_NAME]
Authorized Name: [SIGNATORY_NAME]
Designation: [SIGNATORY_TITLE]
Company Seal`
  },
  {
    id: "annexure9",
    title: "Annexure-9: Information Security Certificate",
    template: `Date: [CURRENT_DATE]

To,
Dy. General Manager, ITD IDBI Bank

INFORMATION SECURITY UNDERTAKING

We, [COMPANY_NAME], hereby certify and confirm that:
1. The hardware, software, custom modifications, APIs, and future upgrades being offered to IDBI Bank do not contain any kind of malicious code such as Viruses, Trojans, Spyware, or backdoors that would:
   - Obstruct the desired and designed function of the payment system.
   - Cause physical damage or data leak to the user or Bank equipment.
   - Tap information stored on the network, core systems, or CBS platform of IDBI Bank.
   - Culminate in cyber-scams, identity theft, or data extortion.
2. We undertake to remain fully and limitlessly liable to IDBI Bank for any data breach, security leak, or intellectual property rights infringement caused due to system vulnerabilities or deliberate negligence attributable to our application software.
3. We guarantee that all payment logs, customer PII data, credentials, and transaction summaries shall reside in geographical structures strictly within the territory of India as per the DPDP Act 2023.

Signed:

For [COMPANY_NAME]
Authorized Name: [SIGNATORY_NAME]
Designation: [SIGNATORY_TITLE]`
  },
  {
    id: "annexure10",
    title: "Annexure-10: Bidder Profile",
    template: `Date: [CURRENT_DATE]

BIDDER PROFILE DETAILS:

1. Name & Registered Office Address of Bidder:
   [COMPANY_NAME] Private Limited,
   [COMPANY_ADDRESS]

2. Constitution & Year of Incorporation:
   [COMPANY_CONSTITUTION] (Incorporated in Year [INCORPORATION_YEAR])

3. PAN Number: [COMPANY_PAN]
4. GSTIN Number: [COMPANY_GST]

5. Contact Person Details:
   Name: [SIGNATORY_NAME],
   Title: [SIGNATORY_TITLE],
   Email: [SIGNATORY_EMAIL],
   Phone: [SIGNATORY_PHONE]

6. Local Correspondence Address at Mumbai:
   [MUMBAI_ADDRESS]

7. NPCI/NBBL BBPS Empanelment Ref No: [EMPANELMENT_REF]

We certify that the details submitted above are pristine, accurate, and completely verifiable.

Submitted by,
Authorized Name: [SIGNATORY_NAME]
Designation: [SIGNATORY_TITLE]`
  }
];
