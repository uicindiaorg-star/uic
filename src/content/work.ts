export interface Project {
  id: string
  title: string
  industry: string
  description: string
  services: string[]
  result: string
  category: "all" | "identity" | "portfolio" | "custom"
  color: string
}

export const workContent = {
  title: "Archived Commissions",
  subtitle: "Sought by creators and leaders who value extreme performance and typographic elegance.",
  categories: [
    { id: "all", label: "All Works" },
    { id: "portfolio", label: "Portfolios" },
    { id: "identity", label: "NFC & Identity" },
    { id: "custom", label: "Custom Apps" }
  ],
  projects: [
    {
      id: "linear-portfolio",
      title: "Vanguard Studio Portfolio",
      industry: "Architecture & Design",
      description: "A dark editorial digital canvas designed with custom physics curves and sub-100ms loading speeds to present luxury property renderings.",
      services: ["Next.js React Development", "Custom CSS Fluid Grid", "Typography Optimization"],
      result: "+420% View Engagement",
      category: "portfolio",
      color: "#aa3bff"
    },
    {
      id: "nfc-sleek",
      title: "Alabaster NFC Elite Series",
      industry: "Financial Ventures",
      description: "Solid matte composite physical cards linked to high-performance modular digital contact micro-identities.",
      services: ["Dynamic NFC Redirection", "Material Design Engraving", "CMS Profile Panels"],
      result: "10k+ Encrypted Shares",
      category: "identity",
      color: "#d9b46d"
    },
    {
      id: "stripe-dash",
      title: "Verdant Venture Capital",
      industry: "Equity Dashboard",
      description: "A premium investor relations application providing clear analytical graphs and real-time capital deployment trackers.",
      services: ["React State Management", "HSL Color Analytics System", "API Infrastructure"],
      result: "$120M Capital Tracked",
      category: "custom",
      color: "#2e303a"
    },
    {
      id: "mono-portfolio",
      title: "Heirloom Creative House",
      industry: "Haute Couture",
      description: "An elegant, whitespace-luxury digital directory constructed for a global high-fashion creative agency.",
      services: ["Editorial Minimalist Grid", "Lazy Media Pipeline", "Reduced Motion Support"],
      result: "99/100 Lighthouse Score",
      category: "portfolio",
      color: "#c084fc"
    }
  ] as Project[]
}
