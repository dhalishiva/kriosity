// Practical guides that answer the exact questions people search for,
// each ending with the Kriosity product that solves the problem.
// Only state what is true about the products (see lib/products.ts).

export type GuideSection = {
  id: string;
  heading: string;
  paras?: string[];
  list?: string[];
  ordered?: boolean;
  after?: string[];
};

export type Guide = {
  slug: string;
  product: string; // product slug
  title: string; // the H1
  seoTitle: string;
  description: string;
  keywords: string[];
  published: string; // YYYY-MM-DD
  updated: string; // YYYY-MM-DD
  intro: string;
  sections: GuideSection[];
  productPitch: string; // the short "how the product helps" paragraph
  faq: { q: string; a: string }[];
};

export const guides: Guide[] = [
  // ───────────────────────────── Mahina ─────────────────────────────
  {
    slug: "whatsapp-fee-reminder-for-tuition-teachers",
    product: "mahina",
    title: "WhatsApp fee reminders for tuition teachers and coaching classes",
    seoTitle: "WhatsApp Fee Reminders for Tuition Teachers: Messages and UPI Links",
    description:
      "How tuition teachers and coaching classes can collect monthly fees on time with WhatsApp reminders: when to send them, what to write, and how a UPI payment link gets parents to pay in one tap.",
    keywords: ["WhatsApp fee reminder", "tuition fee reminder message", "coaching class fee collection", "fee reminder for parents", "UPI fee payment link"],
    published: "2026-10-23",
    updated: "2026-10-23",
    intro:
      "Most tuition teachers don't lose fees because parents refuse to pay. They lose them because nobody remembers, the notebook is out of date, and sending the third \"Sir, fees pending\" message of the month feels awkward. A simple routine fixes most of it: know exactly who owes what, remind at the right time, and make paying take one tap.",
    sections: [
      {
        id: "keep-a-register",
        heading: "Start with a register you trust",
        paras: [
          "Before any reminder, you need a list you can rely on: each student, the parent's WhatsApp number, the monthly fee and the day it is due. If some families pay quarterly or get a sibling discount, write that down too. A reminder sent to a parent who already paid does more damage than no reminder at all.",
          "Mark payments the day they arrive, including part payments. At the end of the month you should be able to say, without scrolling through chats, who has paid, who has paid part, and who still owes.",
        ],
      },
      {
        id: "when-to-remind",
        heading: "When to send fee reminders",
        paras: ["A rhythm that works for most classes:"],
        list: [
          "Two or three days before the due date: a friendly heads-up with the amount.",
          "On the due date: a short reminder with the payment link.",
          "A few days after: a polite follow-up to anyone still pending.",
          "After that: a firmer message, or a quiet word at pick-up time.",
        ],
        after: [
          "Send reminders at a sensible hour, usually in the evening when parents check their phones. Avoid late-night messages; they read as pressure.",
        ],
      },
      {
        id: "what-to-write",
        heading: "What to write: sample messages",
        paras: [
          "Keep it short, name the student, state the amount and month, and include the way to pay. Some examples you can adapt:",
        ],
        list: [
          "Gentle: \"Namaste! A quick reminder that Aarav's tuition fee of ₹1,500 for November is due on the 5th. You can pay here: [link]. Thank you!\"",
          "On the due date: \"Hi, Aarav's November fee of ₹1,500 is due today. Pay by UPI here: [link]. Please ignore if already paid.\"",
          "Follow-up: \"Hello, Aarav's November fee of ₹1,500 is still pending. Kindly pay at your convenience: [link]. Let me know if you'd like to discuss.\"",
          "Hinglish: \"Namaste ji, Aarav ki November ki fees ₹1,500 pending hai. Yahan se UPI se pay kar sakte hain: [link]. Dhanyavaad!\"",
        ],
        after: [
          "\"Please ignore if already paid\" saves a lot of awkwardness when a payment crosses with your message.",
        ],
      },
      {
        id: "upi-link",
        heading: "Put a UPI payment link in every reminder",
        paras: [
          "The biggest delay in fee collection is the gap between \"I'll pay\" and actually paying. Sharing a bare UPI ID means the parent has to open an app, type the ID, check the name and enter the amount. A payment link that opens your UPI QR code with the exact amount already filled in removes all of that. Parents can pay with GPay, PhonePe, Paytm or any UPI app.",
          "Because the money goes straight into your own UPI account, there is no payment gateway and no commission to pay.",
        ],
      },
      {
        id: "receipts",
        heading: "Send a receipt when they pay",
        paras: [
          "A short receipt on WhatsApp (student, month, amount, date) closes the loop. Parents keep it for their records, and it ends the \"did you get my payment?\" messages.",
        ],
      },
    ],
    productPitch:
      "Mahina does this routine for you. Add your students once, or import a whole batch. On the due date it shows who is paid, partly paid or due. One tap opens WhatsApp from your own number with a ready reminder in Hindi, Hinglish or English, carrying a link to your UPI QR code with the exact amount. When the money arrives, mark it paid and send a receipt link back. It's free for up to 15 members, and Pro is ₹149 a month for unlimited members.",
    faq: [
      { q: "Is it okay to send fee reminders on WhatsApp?", a: "Yes, as long as the messages go to parents who gave you their number for class updates, are polite, and are sent at a reasonable hour. Most parents prefer WhatsApp to calls." },
      { q: "Do parents need to install an app to pay?", a: "No. A UPI payment link opens in any UPI app they already have, such as GPay, PhonePe or Paytm." },
      { q: "Does Mahina take a cut of the fees?", a: "No. Parents pay straight into your own UPI ID. Mahina charges no commission." },
    ],
  },
  {
    slug: "gym-yoga-class-fee-collection-upi",
    product: "mahina",
    title: "How gyms, yoga and dance classes can collect monthly fees with UPI",
    seoTitle: "Gym and Yoga Class Fee Collection with UPI: A Simple Monthly System",
    description:
      "A simple system for gyms, yoga studios, dance and music classes in India to track monthly memberships, send WhatsApp reminders with a UPI link, and stop chasing members for fees.",
    keywords: ["gym fee collection app", "yoga class fee management", "membership fee reminder", "dance class fees UPI", "gym membership tracking India"],
    published: "2026-10-23",
    updated: "2026-10-23",
    intro:
      "Small gyms and classes in India usually run on a notebook, a WhatsApp group and memory. That works with twenty members. At sixty, renewals slip, part payments get forgotten, and you end up training people who stopped paying two months ago. You don't need gym software with turnstiles and diet plans. You need a fee register and a quick way to remind.",
    sections: [
      {
        id: "due-dates",
        heading: "Pick one due-date rule and stick to it",
        paras: [
          "Members join on different days, so decide how renewals work:",
        ],
        list: [
          "Joining-date cycle: each member renews on the day they joined. Fair, but you track many due dates.",
          "Fixed date: everyone pays by, say, the 5th, and new joiners pay a pro-rated first month.",
        ],
        after: [
          "Either works. Mixing the two is what causes confusion. Write the rule on your notice board and in your welcome message.",
        ],
      },
      {
        id: "track",
        heading: "Track paid, partly paid and due",
        paras: [
          "Plenty of members pay in parts: half now, half after salary day. Your register needs to show that, not just paid or unpaid. At any moment you should know the total outstanding and who it is with.",
          "Also note quarterly and yearly plans, so you don't remind someone who prepaid for six months.",
        ],
      },
      {
        id: "remind",
        heading: "Remind individually, not in the group",
        paras: [
          "Posting \"fees pending\" in the batch group embarrasses people and rarely works. A short personal message does better:",
        ],
        list: [
          "\"Hi Priya, your yoga membership of ₹2,000 for November is due on the 1st. Pay here: [link]. See you on the mat!\"",
          "\"Hi Rohit, a reminder that ₹1,200 is still pending for this month. You can pay by UPI here: [link]. Ignore if already paid.\"",
        ],
        after: ["Send the first reminder a day or two before the due date and one follow-up a few days after."],
      },
      {
        id: "upi",
        heading: "Make paying take ten seconds",
        paras: [
          "Members put off paying when it takes effort. A link that opens your UPI QR code with the amount filled in means they can pay between sets. Any UPI app works, and the money lands in your account with no gateway fees.",
        ],
      },
      {
        id: "records",
        heading: "Keep a record you can export",
        paras: [
          "At the end of the month, or when your accountant asks, export the register as a spreadsheet. It's also your backup if a phone gets lost.",
        ],
      },
    ],
    productPitch:
      "Mahina is a fee register built for exactly this. Add members with their fee and due date, see who is paid, partly paid or due, and send a WhatsApp reminder from your own number with a link to your UPI QR code and the exact amount. Mark payments as they come in, share a receipt link, and export a CSV any time. It's free for up to 15 members, and Pro is ₹149 a month or ₹1,490 a year for unlimited members, prepaid with no auto-renewal.",
    faq: [
      { q: "Do I need a payment gateway to collect gym fees online?", a: "No. Members can pay straight to your UPI ID. A payment link with your QR code and the amount is enough for most small gyms and classes." },
      { q: "Can members pay in parts?", a: "Yes. Record each part payment and the balance stays visible until it's cleared." },
      { q: "Does Mahina work for music, dance and tiffin services too?", a: "Yes. It works for any business with a monthly fee per person, including PGs and hostels." },
    ],
  },

  // ──────────────────────────── PaidTwice ────────────────────────────
  {
    slug: "find-duplicate-payments-in-quickbooks",
    product: "paidtwice",
    title: "How to find duplicate payments in QuickBooks",
    seoTitle: "How to Find Duplicate Payments in QuickBooks (Beyond Exact Matches)",
    description:
      "QuickBooks warns about duplicate bill numbers, but real duplicate payments often slip through. Here's how to export your payments and find the duplicates QuickBooks misses, step by step.",
    keywords: ["find duplicate payments QuickBooks", "QuickBooks duplicate bills", "duplicate vendor payments QuickBooks", "QuickBooks AP audit", "duplicate invoice check"],
    published: "2026-10-23",
    updated: "2026-10-23",
    intro:
      "QuickBooks can warn you when you enter a bill number that already exists for the same vendor. That catches the obvious case. It doesn't catch the duplicates that actually cost money: the same invoice keyed as INV-1042 and 1042, a vendor set up twice under slightly different names, or a reissued invoice paid alongside the original. Here's how to look for those.",
    sections: [
      {
        id: "why-missed",
        heading: "Why duplicates get past QuickBooks",
        paras: ["Exact-match checks miss duplicates that look different on paper:"],
        list: [
          "Reformatted invoice numbers: INV-0042, 0042 and 42 are the same invoice.",
          "Typos: one digit off in the invoice number or amount.",
          "Duplicate vendor records: \"Acme Supplies\" and \"Acme Supplies Pvt Ltd\" are two vendors to QuickBooks.",
          "Reissued invoices: the vendor sends a corrected copy and both get paid.",
          "Missing invoice numbers: bills entered without a reference can't be matched at all.",
        ],
      },
      {
        id: "export",
        heading: "Step 1: Export your payments",
        paras: [
          "In QuickBooks Online, open Reports and run a vendor payment report, for example Bill Payment List or Transaction List by Vendor. Set the date range to the period you want to check (a full year is a good start), make sure the vendor, date, amount and reference or invoice number columns are included, and export to Excel or CSV.",
          "In QuickBooks Desktop, the Vendor reports (such as Transaction List by Vendor or Unpaid Bills Detail) export the same way. Report names vary slightly between versions; what matters is one row per bill or payment with vendor, date, amount and invoice number.",
        ],
      },
      {
        id: "manual",
        heading: "Step 2: The manual check in a spreadsheet",
        paras: ["If you want to check by hand:"],
        list: [
          "Clean the invoice numbers into a new column: strip prefixes like INV-, spaces, dashes and leading zeros.",
          "Sort by vendor, then by cleaned invoice number, and look for repeats.",
          "Sort by amount, then date, and look for the same amount paid to similar vendor names within a few weeks.",
          "Search the vendor list for near-duplicate names.",
        ],
        ordered: true,
        after: [
          "This works for a few hundred rows. Beyond that, the lookalike-name and one-digit-typo checks become slow and easy to get wrong.",
        ],
      },
      {
        id: "recover",
        heading: "Step 3: Recover what you find",
        paras: [
          "For each confirmed duplicate, email the vendor with both payment dates, the amounts and the invoice reference, and ask for a credit note or refund. Then merge the duplicate vendor records in QuickBooks so it doesn't happen again.",
        ],
      },
    ],
    productPitch:
      "PaidTwice runs these checks for you. Drop in the QuickBooks export and it looks for eight duplicate patterns, including reformatted invoice numbers, single-keystroke errors, duplicate vendor records, same-day reissues and lookalike vendor names, while recognising legitimate recurring charges. The file is read inside your browser and never uploaded. The free scan shows the total at stake and your top three findings; a $15 Audit Pass unlocks every finding, Excel and CSV export, and a ready credit-request email for each one.",
    faq: [
      { q: "Does QuickBooks detect duplicate payments automatically?", a: "It warns about a repeated bill number for the same vendor. It doesn't flag reformatted numbers, typos, duplicate vendor records or reissued invoices." },
      { q: "Is it safe to scan my QuickBooks export online?", a: "With PaidTwice the file is processed inside your browser tab and never sent to a server. Closing the tab clears it." },
      { q: "How far back should I check?", a: "Start with the last 12 months. Vendors are more likely to issue credits for recent payments." },
    ],
  },
  {
    slug: "find-duplicate-payments-in-xero-and-netsuite",
    product: "paidtwice",
    title: "How to find duplicate payments in Xero and NetSuite",
    seoTitle: "Find Duplicate Payments in Xero and NetSuite: Export, Check, Recover",
    description:
      "How to export accounts payable data from Xero or NetSuite and check it for duplicate vendor payments that exact-match rules miss, with a short recovery checklist.",
    keywords: ["Xero duplicate payments", "NetSuite duplicate vendor payments", "duplicate bills Xero", "NetSuite AP audit", "accounts payable duplicate check"],
    published: "2026-10-23",
    updated: "2026-10-23",
    intro:
      "Xero and NetSuite both have controls against entering the same bill twice, but they depend on the reference matching exactly. Duplicate payments that differ by a prefix, a typo or a second vendor record go straight through. A periodic duplicate check on your exported payables data is the simplest way to catch them.",
    sections: [
      {
        id: "xero",
        heading: "Exporting from Xero",
        paras: [
          "In Xero, open Reports and use a payables report such as Payable Invoice Detail, or Account Transactions for your accounts payable account. Choose the date range, include contact, date, reference or invoice number and amount, and export to Excel or CSV.",
          "If you have several Xero organisations, export each one separately. Duplicates rarely cross organisations, but each one needs checking.",
        ],
      },
      {
        id: "netsuite",
        heading: "Exporting from NetSuite",
        paras: [
          "In NetSuite, the most flexible route is a saved transaction search filtered to Bills (or Bill Payments), with vendor, date, reference number, amount and subsidiary as result columns. Run it for your period and export to CSV or Excel. A standard AP report works too if it includes those columns.",
          "Include the subsidiary column if you run several. The same vendor invoice paid by two subsidiaries is a classic duplicate.",
        ],
      },
      {
        id: "patterns",
        heading: "What to look for",
        list: [
          "The same invoice number written differently (INV-0042 versus 42).",
          "The same amount to the same vendor within a short window.",
          "One-character differences in invoice numbers or amounts.",
          "Two vendor records for one supplier.",
          "Bills with no reference number, which can't be matched at all.",
        ],
        after: [
          "Expect some false alarms: monthly retainers and subscriptions repeat the same amount on purpose. Check whether a credit note already reversed a duplicate before chasing it.",
        ],
      },
      {
        id: "recover",
        heading: "Recovering and preventing",
        list: [
          "Send each vendor a short credit request listing both payments.",
          "Merge or archive duplicate supplier records.",
          "Make the invoice reference mandatory on bills.",
          "Run the check before each payment run, not once a year.",
        ],
      },
    ],
    productPitch:
      "PaidTwice reads Xero and NetSuite exports, along with QuickBooks, Sage, SAP, Dynamics, MYOB and most CSV or Excel payment registers. It checks for eight duplicate patterns and recognises legitimate recurring charges and credits that already reversed a duplicate, so you get fewer false alarms. Everything runs in your browser and nothing is uploaded. The free scan is unlimited; the $15 Audit Pass gives every finding with exports and credit-request emails, and Pro at $10 a month is for checking every payment run.",
    faq: [
      { q: "Which Xero report is best for a duplicate check?", a: "Any payables report that gives one row per bill with contact, date, reference and amount. Payable Invoice Detail is a good starting point." },
      { q: "Can I check several NetSuite subsidiaries at once?", a: "Yes. Export them together with a subsidiary column so cross-subsidiary duplicates show up." },
      { q: "Will recurring subscriptions show as duplicates?", a: "PaidTwice recognises legitimate recurring charges to keep those out of the findings." },
    ],
  },

  // ─────────────────────────── SlotRecover ───────────────────────────
  {
    slug: "reduce-no-shows-salons-and-clinics",
    product: "slotrecover",
    title: "How salons and clinics can reduce no-shows and refill cancelled slots",
    seoTitle: "How Salons and Clinics Can Reduce No-Shows and Fill Cancellations",
    description:
      "Practical ways for salons, spas, clinics and trainers to cut no-shows: confirmation timing, cancellation policies, deposits, and using a waitlist to refill cancelled appointments.",
    keywords: ["reduce no-shows salon", "clinic no-show policy", "appointment confirmation", "salon waitlist", "fill cancelled appointments"],
    published: "2026-10-23",
    updated: "2026-10-23",
    intro:
      "A no-show costs more than the missed fee. The chair or room sat empty, the time was blocked, and someone who would have taken that slot was turned away. You can't remove no-shows completely, but two habits shrink them a lot: hear about a cancellation early, and have someone ready to take the slot.",
    sections: [
      {
        id: "confirm",
        heading: "Ask clients to confirm, don't just remind",
        paras: [
          "A reminder is easy to ignore. A confirmation asks for an answer: confirm, reschedule or cancel. That gives you a clear signal. Anyone who hasn't replied by the evening before is your at-risk list.",
          "About 24 hours ahead works well: close enough that the appointment is on their mind, early enough that you can still fill the slot.",
        ],
      },
      {
        id: "silence",
        heading: "Follow up on silence personally",
        paras: [
          "For clients who haven't responded, a short personal WhatsApp message gets a reply far more often than another automated email: \"Hi Sara, just checking you're still good for your 3pm colour tomorrow?\"",
        ],
      },
      {
        id: "policy",
        heading: "Have a cancellation policy, and say it kindly",
        list: [
          "Set a notice window, for example 24 hours, and state it when people book.",
          "For long or high-value services, consider a deposit taken at booking.",
          "Keep it human: waive it for genuine emergencies and regulars. The policy exists to set expectations, not to punish.",
        ],
      },
      {
        id: "waitlist",
        heading: "Keep a waitlist and use it fast",
        paras: [
          "Most cancelled slots stay empty because nobody is asked in time. Keep a waitlist of clients who want an earlier time, noting the service, preferred staff member and when they can come. The moment a slot opens, offer it to the best match first.",
        ],
      },
      {
        id: "measure",
        heading: "Measure what you saved",
        paras: [
          "Track how many slots were cancelled each week and how many you refilled. It shows whether your changes are working, and which days or services need a firmer policy.",
        ],
      },
    ],
    productPitch:
      "SlotRecover automates the confirmation and refill loop. Clients get an email 24 hours ahead to confirm, reschedule or cancel in one tap. Anyone who stays silent is flagged as at risk with a ready-written WhatsApp nudge. When someone cancels, the slot opens and is offered to matching waitlist clients by service, staff and time preference. It works alongside your current booking system and costs $29 a month, with a 30-day free trial and no card needed.",
    faq: [
      { q: "How far in advance should I send appointment confirmations?", a: "About 24 hours before works for most salons and clinics. It's soon enough to be remembered and early enough to refill the slot." },
      { q: "Should I charge a no-show fee?", a: "A clear notice window, plus a deposit for long or high-value services, works for many businesses. Apply it with judgement for regulars and emergencies." },
      { q: "Do I need to change my booking system to use SlotRecover?", a: "No. It sits alongside how you take bookings today." },
    ],
  },

  // ──────────────────────────── Aegistra ────────────────────────────
  {
    slug: "answer-customer-ai-security-questionnaire",
    product: "aegistra",
    title: "How to answer a customer's AI security questionnaire",
    seoTitle: "How to Answer an AI Security Questionnaire from Customers",
    description:
      "Customers' security reviews now include an AI section. What they usually ask, how to prepare answers once and reuse them, and the evidence that makes reviews go faster.",
    keywords: ["AI security questionnaire", "vendor AI questionnaire", "AI governance for SaaS", "AI inventory", "customer security review AI"],
    published: "2026-10-23",
    updated: "2026-10-23",
    intro:
      "If you sell software to larger companies, the security questionnaire probably has a new section: how do you use AI? For many teams the honest answer starts with a scramble through Slack and spreadsheets to work out which tools are in use and who owns them. Preparing once, and keeping it current, turns the next questionnaire into a lookup.",
    sections: [
      {
        id: "what-they-ask",
        heading: "What customers usually ask",
        list: [
          "Which AI systems or providers do you use, and for what?",
          "Does any of our data go into those systems? Is it used to train models?",
          "Where is that data processed and how long is it kept?",
          "Who in your company is accountable for each AI system?",
          "Is there human review of AI outputs that affect us?",
          "Do you follow a framework such as the NIST AI RMF or ISO/IEC 42001?",
        ],
        after: [
          "The exact wording varies, but nearly every question comes back to the same facts: what you use, what data touches it, and who is responsible.",
        ],
      },
      {
        id: "inventory",
        heading: "Step 1: Build an AI inventory",
        paras: [
          "List every AI system in use, both in your product and internally: model APIs, AI features inside other SaaS tools, coding assistants and internal automations. For each one, record the purpose, the owner, the vendor, what data it receives, and whether it is in testing, live or retired.",
        ],
      },
      {
        id: "prioritise",
        heading: "Step 2: Decide what matters most",
        paras: [
          "Not every tool needs the same scrutiny. A model that processes customer data and makes decisions on its own deserves more attention than an internal writing helper. Score each system on a few plain questions about data, autonomy and impact, and review the high-priority ones first.",
        ],
      },
      {
        id: "answers",
        heading: "Step 3: Write reusable answers",
        paras: [
          "Draft standard answers from the inventory: a short AI usage statement, a list of AI subprocessors, and your data-handling position for each. Keep them with your other security documents so sales and security teams use the same wording.",
        ],
      },
      {
        id: "evidence",
        heading: "Step 4: Have evidence ready",
        paras: [
          "Reviewers trust a dated export more than a paragraph. A PDF or CSV showing each system, its owner, its review status and any open actions shows the register is real and maintained.",
        ],
      },
    ],
    productPitch:
      "Aegistra keeps that inventory in one place. Register each AI system with its purpose, owner and lifecycle status, or import a CSV. Six plain questions give each one a 0–100 priority score (a governance aid, not a legal classification). Assign actions with owners and due dates, and export a PDF or CSV evidence pack for the next questionnaire. It's free for up to three systems, $5 a month for up to 50, and $10 a month for unlimited systems with team roles and an audit log.",
    faq: [
      { q: "Do small SaaS companies really get AI questions in security reviews?", a: "Increasingly, yes, especially when selling to US and EU companies with formal vendor-risk processes." },
      { q: "Is an AI register the same as legal compliance with AI regulation?", a: "No. A register is the foundation for answering questions and managing risk, but it isn't a legal assessment. Get legal advice for regulatory obligations." },
      { q: "What should an AI inventory include?", a: "At minimum: the system, its purpose, owner, vendor, the data it receives, and its lifecycle status." },
    ],
  },

  // ─────────────────────────── KriosityOps ───────────────────────────
  {
    slug: "track-multiple-saas-apps-as-a-founder",
    product: "kriosityops",
    title: "How indie founders can keep track of multiple SaaS apps",
    seoTitle: "How Indie Founders Track Multiple SaaS Apps in One Place",
    description:
      "Running several side projects or SaaS products? A simple system to record where each app lives, keep marketing on schedule and avoid two people (or AI tools) changing the same app at once.",
    keywords: ["manage multiple SaaS apps", "indie founder tools", "track side projects", "app portfolio tracker", "founder dashboard"],
    published: "2026-10-23",
    updated: "2026-10-23",
    intro:
      "The first app is easy to hold in your head. By the fourth, you're opening five dashboards to remember which Supabase account has which project, which repo deploys to which domain, and when you last posted about any of them. A little structure saves hours, and saves the panic when something breaks at midnight.",
    sections: [
      {
        id: "where-it-lives",
        heading: "Write down where each app lives",
        paras: ["For every app, record:"],
        list: [
          "Database and the account it's under",
          "Hosting: frontend, backend and any workers",
          "Repository and the branch that deploys",
          "Domain and where DNS is managed",
          "Payments, email, storage and analytics providers",
        ],
        after: [
          "Record identifiers only: account names, project refs and console links. Never put passwords or API keys in a tracker; they belong in a password manager.",
        ],
      },
      {
        id: "marketing",
        heading: "Give each app a posting rhythm",
        paras: [
          "Products go quiet when marketing depends on remembering. Pick the channels for each app (X, Reddit, LinkedIn, a newsletter) and a rhythm, such as weekly on X and monthly on Reddit. Log the link each time you post. Then \"what's overdue?\" has an answer at a glance.",
        ],
      },
      {
        id: "wip",
        heading: "Mark who is working on what",
        paras: [
          "With AI coding tools, collaborators or several sessions open, it's easy for two efforts to change the same app at once. Before starting work, leave a marker on the app (who, what, since when) and clear it when you finish.",
        ],
      },
      {
        id: "numbers",
        heading: "Watch one number per app",
        paras: [
          "You don't need a full analytics suite for every side project. A daily count of new and total users tells you which apps are growing and which need attention.",
        ],
      },
    ],
    productPitch:
      "KriosityOps is a board built for this. For each app, pick the type and provider (database, hosting, repo, domain, payments, email, storage, analytics) and add identifiers and console links, never secrets. Add social channels with a posting rhythm, and due and overdue lamps show what needs a post. Set a work-in-progress marker before handing an app to an AI tool or a teammate. It's free for two apps; Pro is $9 a month (₹299 in India) for unlimited apps, with daily user counts from Supabase rolling out.",
    faq: [
      { q: "Should I store API keys in my app tracker?", a: "No. Keep identifiers and links in the tracker and secrets in a password manager. KriosityOps never asks for passwords or API keys." },
      { q: "Does KriosityOps post to social media for me?", a: "No. You post as usual and log the link, so you can see what's due next." },
      { q: "How many apps is too many to track by memory?", a: "For most people, anything beyond two or three. That's why the free plan covers two apps." },
    ],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
export const guidesFor = (productSlug: string) => guides.filter((g) => g.product === productSlug);
