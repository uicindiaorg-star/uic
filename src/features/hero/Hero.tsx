import { useEffect, useRef } from "react"
import { ArrowRight, ShieldCheck } from "lucide-react"
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
      className="h-screen w-full relative flex items-end pb-[10vh] md:pb-[12vh] overflow-hidden select-none bg-[#EFEFEF]"
    >
      {/* ═══ PREMIUM EDITORIAL ANIMATED SHADER BACKGROUND ═══ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

        {/* Layer A: Slow fluid organic swirls */}
        <div className="absolute top-[-25%] left-[-20%] w-[90%] h-[90%] rounded-full bg-[#E5E5E5] blur-[120px] mix-blend-multiply opacity-80 animate-[swirl_25s_infinite_ease-in-out]" />
        <div className="absolute bottom-[-30%] right-[-15%] w-[100%] h-[100%] rounded-full bg-[#DEDEDE] blur-[140px] mix-blend-multiply opacity-70 animate-[swirl_30s_infinite_ease-in-out_reverse]" />
        <div className="absolute top-[20%] right-[5%] w-[70%] h-[70%] rounded-full bg-[#EAEAEA] blur-[100px] mix-blend-multiply opacity-85 animate-[swirl_20s_infinite_ease-in-out]" />

        {/* Layer B: Fluted Glass Refraction Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: "linear-gradient(90deg, transparent 49%, rgba(0, 0, 0, 0.08) 50%, transparent 51%)",
            backgroundSize: "28px 100%"
          }}
        />

        {/* Layer C: Cinematic Film Grain (using dynamic SVG turbulence) */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.038] mix-blend-overlay">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>

        {/* Layer D: Soft warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#F4F4F4]/20 via-transparent to-[#EAEAEA]/25 mix-blend-overlay" />
      </div>

      <style>{`
        @keyframes swirl {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          33% {
            transform: translate(3%, 4%) scale(1.06) rotate(120deg);
          }
          66% {
            transform: translate(-2%, -3%) scale(0.96) rotate(240deg);
          }
        }
      `}</style>

      {/* ═══ EDITORIAL CONTENT ANCHORED BOTTOM-LEFT ═══ */}
      <Container className="relative z-10 w-full max-w-[1150px] mx-auto px-4 md:px-8 text-left">
        <div ref={contentRef} className="flex flex-col items-start gap-8 max-w-4xl">

          {/* Small Label */}
          <div className="hero-editorial-stagger opacity-0 flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-neutral-500 font-mono">
              Unique Identity Creation
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-editorial-stagger opacity-0 text-[36px] sm:text-[48px] md:text-[62px] font-medium text-neutral-900 tracking-[-0.03em] leading-[1.06] text-left">
            Create memorable digital identities<br />
            and premium NFC experiences<br />
            that make brands impossible to ignore.
          </h1>

          {/* CTA Row: Orange Button + Partner Badges */}
          <div className="hero-editorial-stagger opacity-0 flex flex-wrap gap-4 items-center w-full mt-2">

            {/* Primary Orange Accent CTA with text-roll */}
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-[11px] font-extrabold uppercase tracking-widest bg-[#F26522] hover:bg-neutral-900 text-white border-0 transition-all duration-300 group flex items-center gap-2 shadow-[0_4px_20px_rgba(242,101,34,0.15)] select-none"
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
