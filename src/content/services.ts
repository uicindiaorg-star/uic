export interface Service {
  id: string
  title: string
  desc: string
  details: string[]
  iconName: "Sparkles" | "Layers" | "Boxes" | "Cpu" | "Zap" | "Cpu"
}

export const servicesContent = {
  title: "What We Build",
  subtitle: "Aerospace performance meets luxury digital presence. Clean interfaces crafted for high-impact leaders.",
  list: [
    {
      id: "portfolios",
      title: "Portfolio Websites",
      desc: "Bespoke digital portfolios constructed for architects, creative directors, and founders seeking absolute typographic elegance.",
      details: ["Cinematic reveal animations", "Sub-150ms dynamic loading", "Fluid typography controls", "Reduced motion compatibility"],
      iconName: "Sparkles"
    },
    {
      id: "business-webs",
      title: "Business Websites",
      desc: "Premium corporate assets constructed to deliver quiet authority, optimize search positions, and convert audiences.",
      details: ["Editorial minimalist layouts", "Stripe-inspired vector graphics", "Global search indexing ready", "High-performance code foundations"],
      iconName: "Boxes"
    },
    {
      id: "nfc-cards",
      title: "NFC Business Cards",
      desc: "Aerospace composite physical cards linked to high-speed profile dashboards to beam credentials instantly.",
      details: ["Solid titanium/bamboo options", "Cloud dynamic destination manager", "Universal mobile tapping", "Encrypted coordinate data storage"],
      iconName: "Layers"
    },
    {
      id: "seo-opt",
      title: "SEO Optimization",
      desc: "Precision engineering to rank your identity at the absolute peak of organic search parameters securely.",
      details: ["Semantic clean HTML structure", "Lightweight image pipelines", "Core Web Vitals max performance", "Comprehensive key term analysis"],
      iconName: "Cpu"
    },
    {
      id: "dashboards",
      title: "Admin Dashboard Systems",
      desc: "Complex visual management portals built to chart live metric parameters, manage assets, and streamline work.",
      details: ["Real-time data feeds", "Tailored analytical graphs", "Granular operator access rights", "Custom HSL visual themes"],
      iconName: "Cpu"
    },
    {
      id: "custom-apps",
      title: "Custom Web Applications",
      desc: "Tailor-made software assets compiled for extreme responsiveness, absolute security, and custom logic flows.",
      details: ["Secure customer portals", "Granular state managers", "Custom React/TypeScript hooks", "Universal integration readiness"],
      iconName: "Zap"
    }
  ] as Service[]
}
