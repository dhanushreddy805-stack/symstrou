// SYMSTRUO Pitch Deck — content & constants

export const BRAND = {
  name: "SYMSTRUO",
  tagline: "Turning ideas into structured, scalable companies",
  positioning: "A systems-led business-building company",
  founder: "DHANUSH B",
  founderRole: "Founder & CEO",
  ask: "₹20 Lakhs",
  contactEmail: "invest@symstruo.com",
};

export const ASSETS = {
  mark: "https://customer-assets-0z36b82j.emergentagent.net/job_pitch-symstruo/artifacts/42w0t173_ChatGPT%20Image%20Aug%2019%2C%202026%2C%2004_53_58%20PM.png",
  wordmark: "https://customer-assets-0z36b82j.emergentagent.net/job_pitch-symstruo/artifacts/u45rd8oa_NAME.webp",
};

export const IMAGES = {
  cover: "https://images.unsplash.com/photo-1637946175559-22c4fe13fc54?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  architecture: "https://images.unsplash.com/photo-1526289034009-0240ddb68ce3?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  interior: "https://images.unsplash.com/photo-1698864551605-fab9fed03af5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
};

export const PROBLEMS = [
  {
    k: "01",
    title: "Fragmented Support",
    body: "Founders stitch together separate agencies, consultants and freelancers who never share a single plan.",
    stat: "5+",
    statLabel: "vendors for one company",
  },
  {
    k: "02",
    title: "Disconnected Disciplines",
    body: "Strategy, brand, growth, systems and fundraising are built in silos — so they contradict each other.",
    stat: "0",
    statLabel: "shared operating architecture",
  },
  {
    k: "03",
    title: "Weak Scale-Readiness",
    body: "Execution slows, capital is wasted, and businesses reach investors before they are structurally ready.",
    stat: "Slow",
    statLabel: "path to investment",
  },
];

export const MARKET = [
  { tier: "Idea-Stage", desc: "First-time & repeat founders needing clarity and structure before building.", tag: "Broad" },
  { tier: "Early-Stage", desc: "Live businesses needing brand, growth systems and operating structure.", tag: "Deepest demand" },
  { tier: "Transformation", desc: "Established businesses restructuring to become scale- and capital-ready.", tag: "Highest value" },
];

export const MARKET_STATS = [
  { value: "63M+", label: "MSMEs in India seeking structured growth" },
  { value: "Pre-VC", label: "Demand exists before venture-scale maturity" },
  { value: "3 Segments", label: "Idea, early-stage & transformation" },
];

export const ECOSYSTEM = [
  {
    id: "idea-lab",
    name: "Idea Lab",
    line: "Validate the core",
    desc: "Structured validation of the idea, market and model before capital is committed.",
    items: ["Market & problem validation", "Business hypothesis testing", "Feasibility & risk scoring"],
  },
  {
    id: "blueprint",
    name: "Business Blueprint",
    line: "Architect the company",
    desc: "The operating architecture — model, unit economics, org design and roadmap.",
    items: ["Business model design", "Unit economics", "Operating roadmap"],
  },
  {
    id: "brand",
    name: "Brand Architecture",
    line: "Command perception",
    desc: "Positioning, narrative and identity that earn premium trust in the market.",
    items: ["Positioning & narrative", "Visual identity system", "Messaging framework"],
  },
  {
    id: "growth",
    name: "Growth Engine",
    line: "Install the system",
    desc: "Repeatable acquisition, sales and retention systems that run without the founder.",
    items: ["Sales system", "Marketing engine", "Ops & CRM setup"],
  },
  {
    id: "investment",
    name: "Investment Preparation",
    line: "Ready for capital",
    desc: "Financial model, data room and investor narrative to raise with confidence.",
    items: ["Financial model", "Pitch & data room", "Investor readiness"],
  },
];

export const STEPS = [
  { n: "01", title: "Diagnose", when: "Week 1–2", desc: "Map the business stage, gaps and readiness across every discipline." },
  { n: "02", title: "Foundation", when: "Week 3–5", desc: "Build the strategic core — model, unit economics and operating logic." },
  { n: "03", title: "Brand & Positioning", when: "Week 5–8", desc: "Design the identity and market narrative that commands premium value." },
  { n: "04", title: "Growth Systems", when: "Week 8–12", desc: "Install acquisition, sales and operating systems that scale predictably." },
  { n: "05", title: "Scale / Capital", when: "Week 12+", desc: "Prepare for funding or the next stage of structured scaling." },
];

export const REVENUE = [
  {
    id: "packages",
    name: "Custom Business Packages",
    tag: "Core engine",
    desc: "Tiered, project-based engagements that bundle multiple ecosystem modules into a single structured build.",
    metric: "₹1.5L – ₹6L",
    metricLabel: "per engagement",
  },
  {
    id: "commissions",
    name: "Investment Commissions",
    tag: "Aligned upside",
    desc: "Success-based commission earned when we help a client raise or close capital — incentives fully aligned.",
    metric: "Success fee",
    metricLabel: "on capital closed",
  },
  {
    id: "retainers",
    name: "Strategic Retainers",
    tag: "Recurring",
    desc: "Ongoing advisory and systems maintenance that turns projects into continuity revenue.",
    metric: "Monthly",
    metricLabel: "recurring value",
  },
  {
    id: "premium",
    name: "Premium Execution Modules",
    tag: "Add-on",
    desc: "Specialised high-intensity sprints — fundraising, brand overhaul or growth acceleration.",
    metric: "Add-on",
    metricLabel: "specialised scope",
  },
];

export const TRACTION = [
  { title: "Pre-Sales Revenue", desc: "Revenue booked ahead of formal launch." },
  { title: "Paid Discovery", desc: "Clients paying for scoped diagnostic engagements." },
  { title: "Signed Intent", desc: "Committed clients moving into full engagements." },
  { title: "Active Pipeline", desc: "Ongoing founder & business conversations." },
];

export const COMP_COLS = ["SYMSTRUO", "Agencies", "Consultants", "Branding Firms", "Startup Studios"];
export const COMP_ROWS = [
  { cap: "Strategy & business design", v: [true, false, true, false, true] },
  { cap: "Brand & positioning", v: [true, true, false, true, false] },
  { cap: "Growth & operating systems", v: [true, true, false, false, "partial"] },
  { cap: "Investment readiness", v: [true, false, "partial", false, true] },
  { cap: "Integrated end-to-end delivery", v: [true, false, false, false, "partial"] },
  { cap: "Reusable systems & IP", v: [true, false, false, false, "partial"] },
];

export const MOATS = [
  { title: "Integrated Model", desc: "One connected architecture instead of five disconnected vendors." },
  { title: "Systems-Led Delivery", desc: "Reusable playbooks and IP that compound with every engagement." },
  { title: "Transformation Focus", desc: "We build companies, not isolated deliverables." },
  { title: "Aligned Incentives", desc: "Investment commissions tie our success to the client's outcome." },
];

export const GTM = [
  { title: "Founder-Led Sales", desc: "Direct, high-trust selling led by the founder in the early stage." },
  { title: "Referrals & Relationships", desc: "Relationship-driven business development and word of mouth." },
  { title: "Authority Content", desc: "Thought leadership and brand presence that builds inbound demand." },
  { title: "Targeted Outbound", desc: "Precise outreach to founders and businesses that fit the model." },
  { title: "Network Partnerships", desc: "Partnerships with startup and business ecosystems." },
];

export const SCENARIOS = {
  Conservative: [
    { year: "Year 1", revenue: 20, margin: 62 },
    { year: "Year 2", revenue: 42, margin: 65 },
    { year: "Year 3", revenue: 80, margin: 68 },
  ],
  Base: [
    { year: "Year 1", revenue: 30, margin: 65 },
    { year: "Year 2", revenue: 66, margin: 68 },
    { year: "Year 3", revenue: 132, margin: 70 },
  ],
  Growth: [
    { year: "Year 1", revenue: 42, margin: 66 },
    { year: "Year 2", revenue: 96, margin: 70 },
    { year: "Year 3", revenue: 190, margin: 72 },
  ],
};

export const FIN_ASSUMPTIONS = [
  "Average package value ≈ ₹2.5L per engagement",
  "12–16 structured engagements in Year 1",
  "Investment-commission upside excluded from base revenue",
  "High gross margin from expertise-led delivery",
];

export const ALLOCATION = [
  { name: "Sales & Marketing", value: 5, color: "#D4AF37", note: "Demand generation & pipeline" },
  { name: "Working Capital / Ops", value: 5, color: "#E5C158", note: "Operating runway & delivery" },
  { name: "Hiring / Specialist Talent", value: 4, color: "#C9A227", note: "Core delivery team" },
  { name: "Infrastructure & Systems", value: 3, color: "#8FA6C4", note: "Internal tooling & IP" },
  { name: "Brand, Website & Content", value: 2, color: "#5C7A99", note: "Premium brand assets" },
  { name: "Contingency", value: 1, color: "#64748B", note: "Buffer & flexibility" },
];

export const MILESTONES = [
  { q: "Q1", title: "Foundation", desc: "Team, internal systems and delivery playbooks in place." },
  { q: "Q2", title: "Pipeline", desc: "Sales engine live; first cohort of full engagements delivered." },
  { q: "Q3", title: "Scale Delivery", desc: "Repeatable module delivery; retainer base established." },
  { q: "Q4", title: "Capital Layer", desc: "Investment-preparation engagements & commission revenue live." },
];

export const INVEST_TERMS = [
  { label: "Total Raise", value: "₹20 Lakhs" },
  { label: "Runway", value: "~12 Months" },
  { label: "Instrument", value: "Open — Equity / Rev-Share" },
  { label: "Deployment", value: "Growth-enabling" },
];
