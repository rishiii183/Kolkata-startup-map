export const GOOGLE_FORM_URL = "https://forms.google.com";

export const TYPES = [
  { id: "all", label: "All Types" },
  { id: "startup", label: "Startups" },
  { id: "vc", label: "VCs & Investors" },
  { id: "ecosystem", label: "Incubators & Hubs" }
];

export const AREAS = [
  { id: "all", label: "All Areas" },
  { id: "salt-lake", label: "Salt Lake (Sector V)" },
  { id: "new-town", label: "New Town / Rajarhat" },
  { id: "park-street", label: "Park Street & Camac St" },
  { id: "ballygunge", label: "Ballygunge & Gariahat" },
  { id: "alipore", label: "Alipore" },
  { id: "behala", label: "Behala" },
  { id: "howrah", label: "Howrah" },
  { id: "dum-dum", label: "Dum Dum" },
  { id: "garia", label: "Garia" },
  { id: "jadavpur", label: "Jadavpur" },
  { id: "em-bypass", label: "EM Bypass" },
  { id: "other", label: "Other Kolkata Areas" }
];

export const STAGES = [
  { id: "all", label: "All Stages" },
  { id: "pre-seed", label: "Pre-Seed" },
  { id: "seed", label: "Seed" },
  { id: "bootstrapped", label: "Bootstrapped" },
  { id: "series-a", label: "Series A" },
  { id: "series-b", label: "Series B" },
  { id: "series-c+", label: "Series C+" },
  { id: "public", label: "Public" },
  { id: "acquired", label: "Acquired" }
];

export const SECTORS = [
  { id: "all", label: "All Sectors" },
  { id: "ai", label: "AI & ML" },
  { id: "consumer", label: "Consumer Tech" },
  { id: "d2c", label: "D2C Brands" },
  { id: "deeptech", label: "DeepTech / HardTech" },
  { id: "edtech", label: "EdTech" },
  { id: "fintech", label: "FinTech" },
  { id: "gaming", label: "Gaming & Esports" },
  { id: "healthtech", label: "HealthTech" },
  { id: "logistics", label: "Logistics & Supply Chain" },
  { id: "saas", label: "SaaS & Enterprise" },
  { id: "other", label: "Other" }
];

export const SECTOR_COLOR_MAP = {
  ai: { bg: "bg-purple-600", text: "text-purple-600", badgeBg: "bg-purple-50 text-purple-700 border-purple-200", hex: "#9333ea" },
  consumer: { bg: "bg-sky-500", text: "text-sky-500", badgeBg: "bg-sky-50 text-sky-700 border-sky-200", hex: "#0ea5e9" },
  d2c: { bg: "bg-amber-500", text: "text-amber-500", badgeBg: "bg-amber-50 text-amber-700 border-amber-200", hex: "#f59e0b" },
  deeptech: { bg: "bg-teal-600", text: "text-teal-600", badgeBg: "bg-teal-50 text-teal-700 border-teal-200", hex: "#0d9488" },
  edtech: { bg: "bg-indigo-600", text: "text-indigo-600", badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200", hex: "#4f46e5" },
  fintech: { bg: "bg-emerald-600", text: "text-emerald-600", badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200", hex: "#059669" },
  gaming: { bg: "bg-fuchsia-600", text: "text-fuchsia-600", badgeBg: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200", hex: "#c026d3" },
  healthtech: { bg: "bg-rose-500", text: "text-rose-500", badgeBg: "bg-rose-50 text-rose-700 border-rose-200", hex: "#f43f5e" },
  logistics: { bg: "bg-cyan-600", text: "text-cyan-600", badgeBg: "bg-cyan-50 text-cyan-700 border-cyan-200", hex: "#0891b2" },
  saas: { bg: "bg-blue-600", text: "text-blue-600", badgeBg: "bg-blue-50 text-blue-700 border-blue-200", hex: "#2563eb" },
  other: { bg: "bg-slate-600", text: "text-slate-600", badgeBg: "bg-slate-100 text-slate-700 border-slate-200", hex: "#475569" }
};
