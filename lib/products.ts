export type Status = "Live" | "Early access" | "In development";

export type Tier = {
  name: string;
  price: string;
  cadence?: string;
  blurb: string;
  features: string[];
  highlight?: boolean;
};

export type Product = {
  slug: string;
  name: string;
  color: string; // signature color
  logo: string; // app-icon tile in /public/logos
  tint: string; // soft background tint
  category: "Finance operations" | "Service businesses" | "Governance" | "Everyday tools" | "Industrial";
  status: Status;
  url?: string;
  ctaLabel: string;
  currency?: "USD" | "INR"; // prices are USD unless set
  tagline: string;
  oneLiner: string;
  audience: string;
  fromPrice: string;
  problem: { title: string; body: string };
  steps: { title: string; body: string }[];
  features: { title: string; body: string }[];
  tiers: Tier[];
  forWho: string[];
  faq: { q: string; a: string }[];
  seo: { title: string; description: string; keywords: string[]; appCategory: string };
};

export const products: Product[] = [
  {
    slug: "paidtwice",
    logo: "/logos/paidtwice.svg",
    name: "PaidTwice",
    color: "#C2362B",
    tint: "#FBE8E5",
    category: "Finance operations",
    status: "Live",
    url: "https://paidtwice.kriosity.in",
    ctaLabel: "Scan a file free",
    tagline: "Find the invoices you paid twice.",
    oneLiner:
      "Scans your accounts payable export for duplicate payments your accounting system let through, without the file ever leaving your browser.",
    audience: "AP teams, accountants and outsourced bookkeeping firms",
    fromPrice: "Free scan",
    problem: {
      title: "Duplicate checks only catch exact matches.",
      body: "Accounting systems flag an invoice when every field is identical. Real duplicates look different: INV-0042 versus 42, a typo in one digit, the same vendor entered twice, a reissued invoice on the same day. Each one is money that already left the bank.",
    },
    steps: [
      { title: "Export payments", body: "Download a payment or invoice export from QuickBooks, Xero, NetSuite, Sage, SAP, Dynamics or MYOB." },
      { title: "Drop the file in", body: "The file is read in your browser. Nothing is uploaded to a server." },
      { title: "Review what's at stake", body: "See every suspected duplicate grouped by pattern, with the total amount at risk." },
      { title: "Recover the money", body: "Export the findings and send vendors a ready-made credit request." },
    ],
    features: [
      { title: "Eight duplicate patterns", body: "Exact repeats, reformatted invoice numbers, single-keystroke errors, duplicate vendor records, amount mismatches, same-day reissues, missing invoice numbers and lookalike vendor names." },
      { title: "Fewer false alarms", body: "Recognises legitimate recurring charges and credits that already reversed a duplicate." },
      { title: "Private by design", body: "Scanning runs entirely in the browser, so sensitive vendor data never touches a server." },
      { title: "Works with your ERP", body: "Reads exports from the accounting systems finance teams already use." },
      { title: "Credit request templates", body: "Paid plans generate the email you send the vendor to get the money back." },
      { title: "Exportable findings", body: "Hand auditors and controllers a clean list of what was found and why." },
    ],
    tiers: [
      { name: "Free", price: "$0", blurb: "See if you have a problem.", features: ["Unlimited scans", "Top 3 findings", "Total amount at stake"] },
      { name: "Audit Pass", price: "$15", cadence: "one time", blurb: "A full audit, no subscription.", features: ["30 days of full access", "All findings, Excel and CSV export", "Credit request email per finding"], highlight: true },
      { name: "Pro", price: "$10", cadence: "per month", blurb: "Scan every payment run.", features: ["Everything in Audit Pass", "Saved audits and recovery tracking", "$100 billed yearly"] },
      { name: "Firm", price: "Custom", blurb: "For multi-client accounting firms.", features: ["Multiple clients", "Volume pricing", "Priority support"] },
    ],
    forWho: ["Accounts payable teams", "Controllers and finance managers", "Bookkeepers", "Outsourced AP and audit firms"],
    faq: [
      { q: "Is my payment data uploaded anywhere?", a: "No. The file is parsed and analysed inside your browser tab. Closing the tab clears it." },
      { q: "Which systems does it support?", a: "Exports from QuickBooks, Xero, NetSuite, Sage, SAP, Microsoft Dynamics and MYOB, plus most CSV and Excel payment registers." },
      { q: "What does the free scan show?", a: "The total amount at stake and your top three findings, so you can judge whether a full audit is worth it." },
    ],
    seo: {
      title: "PaidTwice — Duplicate payment detection for accounts payable",
      description: "Find duplicate vendor payments your ERP missed. Browser-only scanning for QuickBooks, Xero, NetSuite, SAP and more. Free scan, $15 audit pass.",
      keywords: ["duplicate payment detection", "duplicate invoice software", "accounts payable audit", "AP recovery", "duplicate vendor payments"],
      appCategory: "FinanceApplication",
    },
  },
  {
    slug: "slotrecover",
    logo: "/logos/slotrecover.svg",
    name: "SlotRecover",
    color: "#4A51DC",
    tint: "#E8E9FD",
    category: "Service businesses",
    status: "Live",
    url: "https://www.slotrecover.pro",
    ctaLabel: "Start 30-day trial",
    tagline: "Every empty slot is lost revenue. Get it back.",
    oneLiner:
      "Confirms appointments a day ahead, catches cancellations early and refills the slot from your waitlist automatically.",
    audience: "Salons, studios, clinics, trainers and other appointment businesses",
    fromPrice: "$29 / month",
    problem: {
      title: "No-shows don't announce themselves.",
      body: "A client forgets, a slot sits empty and the day's revenue quietly drops. By the time you notice, it's too late to fill it. SlotRecover gives you the warning early and does the refilling for you.",
    },
    steps: [
      { title: "Clients confirm", body: "24 hours before each appointment, clients get an email to confirm, reschedule or cancel in one tap." },
      { title: "Silence gets flagged", body: "Anyone who hasn't replied shows up as at risk, with a ready-written WhatsApp nudge." },
      { title: "Cancellations free the slot", body: "The moment someone cancels, the slot opens back up." },
      { title: "The waitlist fills it", body: "Matching waitlist clients are offered the time based on service, staff and preferences." },
    ],
    features: [
      { title: "One-tap confirmations", body: "Clients confirm, reschedule or cancel from the reminder email itself." },
      { title: "Smart waitlist", body: "Matches open slots by service type, preferred staff member and time preferences." },
      { title: "WhatsApp nudges", body: "Ready-written messages for clients who haven't responded." },
      { title: "Staff-aware scheduling", body: "Respects each team member's availability and the services they offer." },
      { title: "Recovered revenue dashboard", body: "See what was saved this month and which slots are at risk today." },
      { title: "Installs like an app", body: "Add it to your phone's home screen. No app store needed." },
    ],
    tiers: [
      { name: "SlotRecover", price: "$29", cadence: "per month", blurb: "One plan, everything included.", features: ["Unlimited confirmations", "Waitlist recovery", "WhatsApp nudges", "30-day free trial, no card needed"], highlight: true },
    ],
    forWho: ["Hair salons and barbershops", "Nail studios and spas", "Massage and physio clinics", "Personal trainers and tutors", "Pet groomers and photographers"],
    faq: [
      { q: "Do I need to change my booking system?", a: "No. SlotRecover sits alongside how you take bookings today and focuses on confirmations and refilling cancellations." },
      { q: "Is client data handled safely?", a: "Data is encrypted and handled in line with GDPR." },
      { q: "What happens after the trial?", a: "The trial lasts 30 days and needs no card. Then continue from $29 a month, billed monthly, every six months or yearly, or cancel any time from Settings." },
    ],
    seo: {
      title: "SlotRecover — Reduce no-shows and refill cancelled appointments",
      description: "Automatic appointment confirmations, no-show alerts and waitlist recovery for salons, spas, clinics and trainers. From $29/month with a 30-day free trial.",
      keywords: ["reduce no-shows", "appointment confirmation software", "waitlist app for salons", "cancellation recovery", "appointment reminders"],
      appCategory: "BusinessApplication",
    },
  },
  {
    slug: "mahina",
    logo: "/logos/mahina.svg",
    name: "Mahina",
    color: "#2433A6",
    tint: "#EEF1FF",
    category: "Service businesses",
    status: "Live",
    url: "https://mahina.kriosity.in",
    ctaLabel: "Start free",
    currency: "INR",
    tagline: "Get every month's fees on time, without asking twice.",
    oneLiner:
      "A monthly fee register for India's tutors, trainers and small services: see who owes what, send WhatsApp reminders with your UPI payment link, and share receipts.",
    audience: "Tuition teachers, tiffin services, gyms, yoga and music classes, PGs and hostels in India",
    fromPrice: "Free · Pro ₹149 / month",
    problem: {
      title: "Chasing fees is the worst part of the month.",
      body: "Notebooks and memory don't show who has paid, and asking the same people again feels awkward. Mahina keeps the register for you and turns each reminder into one tap, with a payment link that goes straight to your own UPI.",
    },
    steps: [
      { title: "Add your members", body: "Name, phone number, monthly fee and due date. Import a whole batch in a couple of minutes." },
      { title: "See who owes what", body: "On the due date Mahina marks each person paid, partly paid or due, with the total outstanding." },
      { title: "Send the reminder", body: "One tap opens WhatsApp with a ready message and your personal UPI payment link." },
      { title: "Record and share a receipt", body: "When the money arrives, mark it paid. A receipt link goes back to them on WhatsApp." },
    ],
    features: [
      { title: "Fee register", body: "Every member's monthly fee, due date and balance, with paid, partly paid and due at a glance." },
      { title: "WhatsApp reminders", body: "Ready-written reminders sent from your own number, in a gentle or firm tone." },
      { title: "UPI payment links", body: "Each reminder carries a link with your UPI QR code and the exact amount. Works with GPay, PhonePe, Paytm and any UPI app." },
      { title: "No commission", body: "Money goes straight into your UPI account. Mahina never touches it." },
      { title: "Hindi, Hinglish and English", body: "Send reminders in the language your members actually read." },
      { title: "Receipts and CSV export", body: "Share a receipt link when someone pays, and export your register any time." },
    ],
    tiers: [
      { name: "Free", price: "₹0", blurb: "For a single batch or a small side business.", features: ["Up to 15 members", "Unlimited WhatsApp reminders", "UPI payment links and receipts"] },
      { name: "Pro", price: "₹149", cadence: "per month", blurb: "For growing classes and services.", features: ["Unlimited members", "Everything in Free", "Priority email support", "₹1,490 a year, two months free"], highlight: true },
    ],
    forWho: ["Tuition teachers and coaching classes", "Tiffin and meal services", "Gyms, yoga and dance classes", "Music teachers", "PG, hostel and rent collection"],
    faq: [
      { q: "Does the money go to Mahina?", a: "No. Members pay straight into your own UPI ID through any UPI app. Mahina charges no commission." },
      { q: "Do my members need to install anything?", a: "No. They get a normal WhatsApp message from your number with a link that opens your UPI QR code and the amount due." },
      { q: "Does Pro renew automatically?", a: "No. Pro is prepaid for a month or a year, and nothing is charged unless you choose to renew." },
    ],
    seo: {
      title: "Mahina — Monthly fee collection with WhatsApp reminders and UPI",
      description: "Fee register for tuition teachers, gyms, yoga classes and tiffin services in India. WhatsApp fee reminders with a UPI payment link, receipts, no commission. Free for 15 members.",
      keywords: ["fee collection app", "tuition fee reminder", "WhatsApp fee reminder", "UPI payment link", "fee management app India"],
      appCategory: "FinanceApplication",
    },
  },
  {
    slug: "aegistra",
    logo: "/logos/aegistra.svg",
    name: "Aegistra",
    color: "#0377B5",
    tint: "#DFF1FA",
    category: "Governance",
    status: "Live",
    url: "https://aegistra.kriosity.in",
    ctaLabel: "Start free",
    tagline: "Know where AI is used. Know who owns it.",
    oneLiner:
      "A lightweight register of every AI system your company uses, with owners, priority scores and the evidence customers ask for.",
    audience: "Software companies, agencies and consultancies with 10–250 people",
    fromPrice: "Free for 3 systems",
    problem: {
      title: "Customers now ask how you use AI.",
      body: "Security questionnaires have a new section, and the honest answer is usually a scramble through Slack and spreadsheets. Aegistra keeps one current list of your AI systems so the next questionnaire is a lookup, not a project.",
    },
    steps: [
      { title: "Register each system", body: "Record what it does, who owns it and where it is in its lifecycle. Or import a CSV." },
      { title: "Answer six questions", body: "Plain-language questions about data, autonomy and impact produce a 0–100 priority score." },
      { title: "Work the actions", body: "Assign governance actions with owners and due dates, and see what needs review." },
      { title: "Export the evidence", body: "Hand customers and auditors a PDF or CSV assurance pack." },
    ],
    features: [
      { title: "Central AI register", body: "Purpose, owner and lifecycle status for every AI system in one place." },
      { title: "Priority scoring", body: "A 0–100 score from six plain questions. A governance aid, not a legal risk classification." },
      { title: "Readiness view", body: "Spots gaps in ownership and overdue reviews before a customer does." },
      { title: "Actions with owners", body: "Track governance work with due dates and accountability." },
      { title: "Evidence export", body: "PDF and CSV exports ready for security questionnaires." },
      { title: "Team roles and audit log", body: "Admin, member and viewer roles, with every change logged." },
    ],
    tiers: [
      { name: "Free", price: "$0", blurb: "Start your register.", features: ["Up to 3 AI systems", "Priority scoring", "No card required"] },
      { name: "Team", price: "$5", cadence: "per month", blurb: "For a growing register.", features: ["Up to 50 AI systems", "Actions and reviews", "PDF and CSV evidence"], highlight: true },
      { name: "Business", price: "$10", cadence: "per month", blurb: "No limits.", features: ["Unlimited AI systems", "Everything in Team", "Team roles and audit log"] },
    ],
    forWho: ["SaaS companies selling to US and EU customers", "Agencies building with AI", "Consultancies answering security questionnaires", "Ops and compliance leads"],
    faq: [
      { q: "Is the priority score a legal risk rating?", a: "No. It's a practical way to decide what to look at first. It is not a legal classification under any regulation." },
      { q: "Can I import what we already have?", a: "Yes. Bring a CSV of your existing AI tools and export back out at any time." },
      { q: "Do I need a credit card to start?", a: "No. The free plan covers three AI systems with no card." },
    ],
    seo: {
      title: "Aegistra — Lightweight AI governance register for growing teams",
      description: "Track every AI system, its owner and priority. Answer customer AI security questionnaires with PDF and CSV evidence. Free for 3 systems, from $5/month.",
      keywords: ["AI governance software", "AI register", "AI inventory tool", "AI risk register", "AI security questionnaire"],
      appCategory: "BusinessApplication",
    },
  },
  {
    slug: "beamdrop",
    logo: "/logos/beamdrop.svg",
    name: "BeamDrop",
    color: "#2B50FF",
    tint: "#E8EDFF",
    category: "Everyday tools",
    status: "Live",
    url: "https://beamdrop.kriosity.in",
    ctaLabel: "Send a file",
    tagline: "Send files of any size, device to device.",
    oneLiner:
      "Open BeamDrop on both devices and the file streams straight from one browser to the other. Nothing is uploaded, so there is no size limit and nothing is stored.",
    audience: "Anyone moving big files between their own devices or to someone nearby",
    fromPrice: "Free",
    problem: {
      title: "Big files get stuck in the middle.",
      body: "Most transfer sites upload your file to a server first, then make the other device download it. That is where size caps, waiting and storage limits come from. BeamDrop skips the server, so a 10 GB video goes from laptop to phone without a cable, an app or an account.",
    },
    steps: [
      { title: "Pick a file", body: "Open BeamDrop on the sending device, choose the file and get a six-character code." },
      { title: "Join from the other device", body: "Open BeamDrop there, enter the code or scan the QR code, and tap Accept." },
      { title: "It streams across", body: "The file travels in small pieces straight between the two browsers and is saved as it arrives." },
    ],
    features: [
      { title: "No size limit", body: "Nothing passes through a server, so the only limit is free space on the receiving device." },
      { title: "Never uploaded", body: "Files go device to device over an encrypted connection. The server only introduces the two browsers." },
      { title: "No app or account", body: "Works in current Chrome, Edge, Firefox and Safari on computers and phones." },
      { title: "Code or QR", body: "Join with a six-character code or by scanning a QR code. Each code works for one device." },
      { title: "Receiver says yes first", body: "Nothing is sent until the receiving device accepts the file." },
      { title: "Saves as it arrives", body: "Large files stream to disk instead of filling the browser's memory." },
    ],
    tiers: [
      { name: "BeamDrop", price: "Free", blurb: "Send as much as you like.", features: ["Any file size", "No account needed", "Phones and computers", "Encrypted, device to device"], highlight: true },
    ],
    forWho: ["Moving videos and photos from phone to laptop", "Sharing large project files with a colleague", "Getting files onto a device without cables", "Anyone tired of upload size caps"],
    faq: [
      { q: "Is there really no size limit?", a: "BeamDrop does not set one, because the file is never uploaded. The practical limits are free storage on the receiving device and how long you keep both devices open." },
      { q: "Can you see my files?", a: "No. Files go straight from one device to the other over an encrypted connection and never reach our servers." },
      { q: "Does it work on iPhone and iPad?", a: "Yes, in current browsers. iOS limits very large downloads, so for files of several gigabytes receive on a computer or an Android phone if you can." },
    ],
    seo: {
      title: "BeamDrop — Send large files device to device, no size limit",
      description: "Free browser-to-browser file transfer. Send files of any size from computer to phone with a code or QR. Nothing is uploaded, no account needed.",
      keywords: ["send large files", "file transfer no size limit", "send file from pc to phone", "peer to peer file transfer", "browser file sharing"],
      appCategory: "UtilitiesApplication",
    },
  },
  {
    slug: "gateway",
    logo: "/logos/gateway.svg",
    name: "Gateway",
    color: "#0F7B6C",
    tint: "#DDF1EC",
    category: "Industrial",
    status: "In development",
    ctaLabel: "Request early access",
    tagline: "PLC data to OPC UA, without the heavyweight licence.",
    oneLiner:
      "A lightweight on-premise gateway that reads Rockwell, Siemens and other PLCs and serves their tags over OPC UA, as a plain Windows service.",
    audience: "Manufacturing sites and industrial integrators",
    fromPrice: "~$200 / site / year",
    problem: {
      title: "Industrial connectivity is priced for the enterprise.",
      body: "Plants with dozens of sites pay large licences for what is often a simple job: read tags from a PLC and expose them over OPC UA. Gateway is built to do that job reliably, at a price a single site can try.",
    },
    steps: [
      { title: "Install the service", body: "Runs as a Windows service on Windows Server 2019 or later." },
      { title: "Add your devices", body: "Connect Rockwell, Siemens and other PLCs with native drivers." },
      { title: "Browse the tags", body: "Explore every device in a hierarchical tag browser with all data types." },
      { title: "Serve OPC UA", body: "Clients read the tags from the built-in OPC UA server." },
    ],
    features: [
      { title: "Native PLC drivers", body: "Rockwell and Siemens first, with more families to follow." },
      { title: "OPC UA server", body: "Exposes device tags to any OPC UA client." },
      { title: "Hierarchical tag browser", body: "Navigate devices and tags the way plant engineers think about them." },
      { title: "Plain Windows service", body: "Starts with the server and runs without a desktop session." },
      { title: "Logs where you look", body: "Writes to the Windows Event Log and to ProgramData." },
      { title: "Failure notifications", body: "Email alerts when a device or connection fails. Planned." },
    ],
    tiers: [
      { name: "Per site", price: "~$200", cadence: "per year, planned", blurb: "Licensed per site so plants can try it.", features: ["All drivers", "OPC UA server", "Tag browser", "Early-access pricing for first sites"], highlight: true },
    ],
    forWho: ["Multi-site manufacturers", "Plant and controls engineers", "Industrial systems integrators", "Teams replacing costly OPC licences"],
    faq: [
      { q: "When is it available?", a: "Gateway is in development with a simulated-tag build first. Request early access to pilot it at your site." },
      { q: "Which operating systems?", a: "Windows Server 2019 and later." },
      { q: "How is it licensed?", a: "Per site, per year, with licences managed from a separate admin tool." },
    ],
    seo: {
      title: "Gateway — Lightweight PLC to OPC UA gateway for Windows",
      description: "An affordable on-premise industrial gateway: Rockwell and Siemens PLC drivers, OPC UA server and tag browser as a Windows service. Early access open.",
      keywords: ["OPC UA gateway", "PLC to OPC UA", "Siemens OPC UA server", "Rockwell OPC server", "industrial gateway Windows service"],
      appCategory: "BusinessApplication",
    },
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const categories = Array.from(new Set(products.map((p) => p.category)));
