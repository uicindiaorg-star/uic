import { useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section, Container } from "@/components/ui"
import { animate, stagger } from "animejs"

export const Hero = () => {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Elegant luxury reveal animation on load
    animate(".hero-editorial-stagger", {
      opacity: [0, 1],
      translateY: [24, 0],
      delay: stagger(150, { start: 100 }),
      duration: 1000,
      easing: "cubicBezier(0.25, 0.1, 0.25, 1)"
    })
  }, [])

  const handleCtaClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <Section
      id="hero"
      className="h-screen w-full relative flex items-end pb-[10vh] md:pb-[12vh] overflow-hidden select-none bg-transparent"
    >
      {/* ═══ PREMIUM CINEMATIC EDITORIAL HERO BACKGROUND ═══ */}
      <div className="absolute inset-0 bg-[var(--bg-primary)] transition-colors duration-500 overflow-hidden pointer-events-none z-[1]">
        
        {/* Layer 05 — Ambient Light & Vignette */}
        <div className="absolute inset-0 bg-radial from-[var(--accent-glow-strong)]/20 via-transparent to-transparent pointer-events-none z-10" />
        <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_120px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_0_120px_rgba(0,0,0,0.6)]" />

        {/* SVG Filter Scaffold for Real-time Liquid Refraction & Cinematic Grain */}
        <svg className="absolute w-0 h-0 pointer-events-none select-none">
          <defs>
            <filter id="flutedGlassRefraction">
              <feTurbulence type="fractalNoise" baseFrequency="0.005" numOctaves="3" result="glassWarp" />
              <feDisplacementMap in="SourceGraphic" in2="glassWarp" scale="35" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id="cinematicFilmGrain">
              <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            </filter>
          </defs>
        </svg>

        {/* Layer 01 & 02 — Fluid Swirls with real Glass Refraction Warp */}
        <div 
          className="absolute inset-0 opacity-[0.95] z-0"
          style={{ filter: "url(#flutedGlassRefraction)" }}
        >
          {/* Extremely slow organic light warm forms - soft low opacities to prevent white washing */}
          <div className="absolute top-[-25%] left-[-15%] w-[85%] h-[85%] rounded-full bg-white/20 dark:bg-white/[0.02] blur-[100px] opacity-[0.25] animate-[fluid-one_28s_infinite_ease-in-out]" />
          <div className="absolute bottom-[-25%] right-[-10%] w-[90%] h-[90%] rounded-full bg-white/15 dark:bg-white/[0.015] blur-[120px] opacity-[0.35] animate-[fluid-two_35s_infinite_ease-in-out]" />
          <div className="absolute top-[20%] right-[10%] w-[70%] h-[70%] rounded-full bg-white/10 dark:bg-white/[0.01] blur-[110px] opacity-[0.2] animate-[fluid-one_24s_infinite_ease-in-out_reverse]" />
        </div>

        {/* Layer 02 Overlay — 12 Column vertical Fluted Glass highlights with backdrop blurs */}
        <div className="absolute inset-0 grid grid-cols-12 gap-0 z-10 pointer-events-none opacity-[0.25]">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="h-full border-l border-[var(--border-primary)]/40 bg-transparent" 
            />
          ))}
        </div>

        {/* Layer 03 — Chromatic Energy (diffused lower-right orange glow) */}
        <div 
          className="absolute bottom-[-15%] right-[-15%] w-[70%] h-[70%] rounded-full bg-[#F26522] blur-[160px] opacity-[0.065] pointer-events-none z-10 animate-[orange-breathing_20s_infinite_ease-in-out]"
        />

        {/* Layer 04 — Microscopic Cinematic Film Grain */}
        <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none z-20">
          <svg className="w-full h-full">
            <rect width="100%" height="100%" filter="url(#cinematicFilmGrain)" />
          </svg>
        </div>

      </div>

      <style>{`
        @keyframes fluid-one {
          0%, 100% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
          }
          50% {
            transform: translate(25px, -15px) scale(1.05) rotate(90deg);
          }
        }
        @keyframes fluid-two {
          0%, 100% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
          }
          50% {
            transform: translate(-20px, 25px) scale(0.95) rotate(-90deg);
          }
        }
        @keyframes orange-breathing {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
            opacity: 0.05;
          }
          50% {
            transform: translate(-25px, -25px) scale(1.15);
            opacity: 0.08;
          }
        }
      `}</style>

      {/* ═══ EDITORIAL CONTENT ANCHORED BOTTOM-LEFT ═══ */}
      <Container className="relative z-10 w-full max-w-[1150px] mx-auto px-4 md:px-8 text-left">
        <div ref={contentRef} className="flex flex-col items-start gap-8 max-w-4xl">

          {/* Small Label */}
          <div className="hero-editorial-stagger opacity-0 flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[var(--text-secondary)] font-mono">
              Unique Identity Creation
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-editorial-stagger opacity-0 text-[36px] sm:text-[48px] md:text-[62px] font-medium text-[var(--text-primary)] tracking-[-0.03em] leading-[1.06] text-left">
            Create memorable digital identities<br />
            and premium NFC experiences<br />
            that make brands impossible to ignore.
          </h1>

          {/* CTA Row: Orange Button + Partner Badges */}
          <div className="hero-editorial-stagger opacity-0 flex flex-wrap gap-4 items-center w-full mt-2">

            {/* Primary Brand Accent CTA with text-roll */}
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-[11px] font-extrabold uppercase tracking-widest bg-[var(--accent-base)] hover:bg-neutral-900 text-white border-0 transition-all duration-300 group flex items-center gap-2 shadow-[0_4px_20px_rgba(123,63,242,0.15)] select-none"
              onClick={() => handleCtaClick("#contact")}
            >
              <span className="block relative overflow-hidden h-4">
                <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                  Start your project
                </span>
                <span className="absolute top-full left-0 block transition-transform duration-500 group-hover:-translate-y-full font-bold">
                  Start your project
                </span>
              </span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:rotate-[-45deg] text-white" />
            </Button>

            {/* Secondary: Partner/Trust Badge glass pill
            <div className="flex items-center gap-2.5 bg-white/70 border border-neutral-100/60 rounded-full px-5 py-3.5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] backdrop-blur-md">
              <ShieldCheck className="h-4 w-4 text-neutral-800" strokeWidth={2.5} />
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-800 font-mono">
                SECURE NFC CERTIFIED
              </span>
            </div> */}

          </div>

        </div>
      </Container>
    </Section>
  )
}
