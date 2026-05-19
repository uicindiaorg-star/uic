import { useState } from "react"
import { Typography, Section, Container, Badge } from "@/components/ui"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  Layers,
  Rocket,
  Globe,
  PenTool,
  BarChart3,
  Shield,
  Zap,
  ArrowRight,
  ChevronRight,
} from "lucide-react"

const processSteps = [
  {
    icon: Sparkles,
    step: "01",
    title: "Discover",
    subtitle: "Brand Deep-Dive",
    description:
      "We analyze your personal brand, industry position, and target audience to craft a portfolio strategy that amplifies your unique identity.",
    accent: "from-[#7b3ff2] to-[#b084ff]",
  },
  {
    icon: PenTool,
    step: "02",
    title: "Design",
    subtitle: "Pixel-Perfect Craft",
    description:
      "Our design team creates a bespoke, cinematic portfolio with premium animations, curated typography, and immersive scroll experiences.",
    accent: "from-[#b084ff] to-[#d4b8ff]",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Deploy",
    subtitle: "Live in 48 Hours",
    description:
      "Fully optimized, blazing-fast deployment on global edge networks. Your portfolio goes live with analytics, SEO, and a custom domain.",
    accent: "from-[#d4b8ff] to-[#f0e6ff]",
  },
]

const features = [
  {
    icon: Globe,
    title: "Custom Domain",
    desc: "yourname.com — we handle DNS, SSL, and hosting. One seamless identity.",
  },
  {
    icon: Layers,
    title: "Dynamic CMS",
    desc: "Update projects, case studies, and bio sections in real-time — no code needed.",
  },
  {
    icon: BarChart3,
    title: "Built-in Analytics",
    desc: "Track visitors, engagement metrics, and link clicks with a private dashboard.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "Edge-cached, DDoS-protected, and GDPR-compliant from day one.",
  },
  {
    icon: Zap,
    title: "100 Performance",
    desc: "Lighthouse-perfect scores. Sub-second load times on any device, anywhere.",
  },
  {
    icon: PenTool,
    title: "Unlimited Revisions",
    desc: "Iterate until it's flawless. We refine every detail until you're proud to share it.",
  },
]

export const PortfolioBuilder = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  return (
    <Section
      id="portfolio"
      className="relative overflow-hidden py-28 bg-[var(--bg-primary)]"
    >
      {/* Ambient glow decorations */}
      <div className="absolute top-[10%] right-[-8%] w-[500px] h-[500px] bg-radial from-[rgba(123,63,242,0.04)] to-transparent pointer-events-none blur-[60px]" />
      <div className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] bg-radial from-[rgba(176,132,255,0.03)] to-transparent pointer-events-none blur-[50px]" />

      <Container className="flex flex-col items-center text-center gap-6">
        {/* Section Header */}
        <Badge>Portfolio Service</Badge>

        <Typography variant="headline" as="h2" className="max-w-3xl">
          We Build Your Portfolio
          <span className="bg-gradient-to-r from-[var(--accent-base)] to-[var(--accent-tertiary)] bg-clip-text text-transparent">
            {" "}For You
          </span>
        </Typography>

        <Typography variant="subhead" className="max-w-2xl">
          Stop struggling with templates. Our team designs, develops, and deploys
          a stunning personal portfolio that captures who you are — so you can
          focus on what you do best.
        </Typography>

        {/* ═══ 3-Step Process Timeline ═══ */}
        <div className="w-full mt-16">
          {/* Connecting line */}
          <div className="hidden lg:block relative w-full max-w-4xl mx-auto mb-8">
            <div className="absolute top-1/2 left-[16.67%] right-[16.67%] h-[1px] bg-gradient-to-r from-[var(--accent-base)]/20 via-[var(--accent-base)]/40 to-[var(--accent-base)]/20" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {processSteps.map((step, idx) => {
              const Icon = step.icon
              const isHovered = hoveredStep === idx

              return (
                <div
                  key={step.step}
                  onMouseEnter={() => setHoveredStep(idx)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className={`relative group flex flex-col items-center text-center p-8 rounded-[28px] border transition-all duration-500 cursor-default ${isHovered
                    ? "border-[var(--accent-base)]/40 bg-[var(--accent-glow)] shadow-[0_0_60px_rgba(123,63,242,0.08)] scale-[1.02]"
                    : "border-[var(--border-primary)] bg-[var(--bg-card)]"
                    }`}
                >
                  {/* Step number badge */}
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--accent-secondary)] mb-4">
                    Step {step.step}
                  </span>

                  {/* Icon orb */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 bg-gradient-to-br ${step.accent} ${isHovered ? "shadow-[0_8px_32px_rgba(123,63,242,0.3)] scale-110" : "shadow-[0_4px_16px_rgba(123,63,242,0.1)]"
                      }`}
                  >
                    <Icon className="w-7 h-7 text-white" strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <Typography
                    variant="headline"
                    as="h3"
                    className="!text-xl mb-1"
                  >
                    {step.title}
                  </Typography>

                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent-secondary)] mb-3">
                    {step.subtitle}
                  </span>

                  {/* Description */}
                  <Typography variant="body" className="!text-sm leading-relaxed">
                    {step.description}
                  </Typography>

                  {/* Arrow connector on desktop */}
                  {idx < processSteps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--border-primary)] items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-[var(--accent-secondary)]" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ═══ Feature Grid ═══ */}
        <div className="w-full mt-20 max-w-5xl mx-auto">
          <Typography
            variant="label"
            className="mb-8 block"
          >
            Everything Included
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feat) => {
              const Icon = feat.icon
              return (
                <div
                  key={feat.title}
                  className="group flex items-start gap-4 p-5 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] hover:border-[var(--accent-base)]/30 hover:bg-[var(--accent-glow)] transition-all duration-300 text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-base)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--accent-base)]/20 transition-colors">
                    <Icon className="w-5 h-5 text-[var(--accent-secondary)]" strokeWidth={1.8} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-[var(--text-primary)]">
                      {feat.title}
                    </span>
                    <span className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {feat.desc}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ═══ CTA Block ═══ */}
        <div className="mt-16 w-full max-w-2xl mx-auto flex flex-col items-center gap-5">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              size="lg"
              className="rounded-full px-10 py-5 text-xs font-bold uppercase tracking-widest bg-[var(--accent-base)] text-white hover:bg-[var(--accent-secondary)] transition-colors shadow-[0_8px_32px_rgba(123,63,242,0.3)]"
            >
              Start Your Portfolio
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            {/* <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-5 text-xs font-bold uppercase tracking-widest border-[var(--border-primary)] text-[var(--text-primary)] hover:border-[var(--text-secondary)]"
            >
              View Examples
            </Button> */}
          </div>

          {/* <Typography variant="mono" className="!text-[10px] text-[var(--text-tertiary)]">
            Starting from $299 · Delivered in 48 hours · Unlimited revisions
          </Typography> */}
        </div>
      </Container>
    </Section>
  )
}
