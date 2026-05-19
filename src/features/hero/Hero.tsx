import { useEffect, useRef, useState } from "react"
import { ArrowRight, Sparkles, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Typography, Section, Container } from "@/components/ui"
import { animate, stagger } from "animejs"
import { heroContent } from "@/content/hero"

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)

  // Parallax scroll state
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    // Elegant stagger reveal
    animate(".hero-stagger", {
      opacity: [0, 1],
      translateY: [32, 0],
      delay: stagger(120, { start: 200 }),
      duration: 1200,
      easing: "easeOutExpo"
    })

    // Portrait cinematic reveal on load
    animate(portraitRef.current!, {
      scale: [1.3, 1],
      opacity: [0, 1],
      duration: 1800,
      easing: "easeOutExpo",
      delay: 300
    })

    // Mask circle expansion reveal
    animate(maskRef.current!, {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 1600,
      easing: "easeOutExpo",
      delay: 100
    })

    // Float preview panels
    const previewFloat = animate(previewRef.current!, {
      translateY: [-6, 6],
      duration: 3800,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine"
    })

    // Float abstract purple orb
    const orbFloat = animate(orbRef.current!, {
      scale: [1, 1.15, 1],
      translateX: [-10, 10],
      translateY: [10, -10],
      duration: 8000,
      loop: true,
      easing: "easeInOutSine"
    })

    return () => {
      previewFloat.pause()
      orbFloat.pause()
    }
  }, [])

  // Parallax scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Parallax transform values
  const parallaxPortrait = scrollY * 0.3
  const parallaxCard = scrollY * 0.15
  const parallaxPreview = scrollY * 0.08
  const parallaxText = scrollY * 0.12
  const portraitScale = Math.max(1 - scrollY * 0.0003, 0.85)
  const maskOpacity = Math.max(1 - scrollY * 0.002, 0)

  // Immersive 3D Tilt Parallax on the floating composition
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!visualRef.current || !cardRef.current || !previewRef.current) return
    const rect = visualRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const normX = x / (rect.width / 2)
    const normY = y / (rect.height / 2)

    // Card tilts slightly
    animate(cardRef.current, {
      rotateX: -normY * 18,
      rotateY: normX * 18,
      translateX: normX * 8,
      translateY: normY * 8,
      duration: 200,
      easing: "easeOutQuad"
    })

    // Back preview panel tilts with opposite offset
    animate(previewRef.current, {
      rotateX: -normY * 10,
      rotateY: normX * 10,
      translateX: -normX * 12,
      translateY: -normY * 12,
      duration: 200,
      easing: "easeOutQuad"
    })

    // Portrait subtle parallax movement
    if (portraitRef.current) {
      animate(portraitRef.current, {
        translateX: normX * 6,
        translateY: normY * 6,
        duration: 300,
        easing: "easeOutQuad"
      })
    }
  }

  const handleMouseLeave = () => {
    if (!cardRef.current || !previewRef.current) return
    animate([cardRef.current, previewRef.current], {
      translateX: 0,
      translateY: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 900,
      easing: "easeOutElastic(1, 0.7)"
    })
    if (portraitRef.current) {
      animate(portraitRef.current, {
        translateX: 0,
        translateY: 0,
        duration: 900,
        easing: "easeOutElastic(1, 0.7)"
      })
    }
  }

  const handleCtaClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <Section
      ref={sectionRef as any}
      id="hero"
      className="min-h-screen flex items-center pt-32 pb-20 relative overflow-hidden"
    >

      {/* Background large neon mesh glow elements */}
      <div className="absolute top-[10%] left-[-5%] w-[450px] h-[450px] bg-radial from-[#7b3ff2]/15 to-transparent blur-[110px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-10%] w-[550px] h-[550px] bg-radial from-[#b084ff]/10 to-transparent blur-[120px] pointer-events-none z-0" />

      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">

        {/* Left Column: 70/30 asymmetric typography layout */}
        <div
          className="lg:col-span-7 flex flex-col items-start gap-6 text-left"
          style={{ transform: `translateY(${-parallaxText}px)` }}
        >

          <div className="hero-stagger opacity-0 inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[var(--border-primary)] text-[var(--accent-secondary)] border border-[var(--border-primary)]">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span>{heroContent.eyebrow}</span>
          </div>

          <Typography variant="display" as="h1" className="hero-stagger opacity-0 leading-[1.05] tracking-tight">
            Create Your <br />
            <span className="bg-gradient-to-r from-[var(--text-primary)] via-[var(--accent-secondary)] to-[var(--text-primary)] bg-clip-text text-transparent">
              Digital Identity
            </span>
          </Typography>

          <Typography variant="subhead" className="hero-stagger opacity-0 max-w-xl text-[var(--text-secondary)]">
            {heroContent.description}
          </Typography>

          <div className="hero-stagger opacity-0 flex flex-wrap gap-4 w-full sm:w-auto mt-4">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-xs font-bold uppercase tracking-widest bg-[var(--accent-base)] text-white hover:bg-[var(--accent-hover)] transition-all flex items-center gap-2"
              onClick={() => handleCtaClick("#contact")}
            >
              <span>{heroContent.buttonPrimary}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-xs font-bold uppercase tracking-widest border-[var(--border-primary)] hover:border-[var(--text-secondary)] bg-transparent text-[var(--text-primary)]"
              onClick={() => handleCtaClick("#work")}
            >
              {heroContent.buttonSecondary}
            </Button>
          </div>

          {/* Staggered metrics row */}
          <div className="hero-stagger opacity-0 grid grid-cols-3 gap-6 border-t border-[var(--border-primary)] pt-8 mt-6 w-full">
            {heroContent.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold font-mono tracking-tight text-[var(--text-primary)]">
                  {stat.value}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Face Reveal + Floating Composites with Parallax */}
        <div
          ref={visualRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-5 flex justify-center items-center relative h-[500px] w-full"
        >

          {/* Abstract gradient mesh orb layer */}
          <div
            ref={orbRef}
            className="mesh-orb w-[280px] h-[280px] absolute"
            style={{
              top: "10%",
              left: "15%",
              background: "radial-gradient(circle, rgba(123,63,242,0.35) 0%, rgba(176,132,255,0.08) 50%, transparent 70%)",
              transform: `translateY(${-parallaxPortrait * 0.5}px)`,
            }}
          />

          {/* ═══ FACE REVEAL: Portrait with circular mask & parallax ═══ */}
          <div
            ref={maskRef}
            className="absolute z-20"
            style={{
              width: "300px",
              height: "300px",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) translateY(${-parallaxPortrait}px) scale(${portraitScale})`,
              opacity: maskOpacity > 0.15 ? 1 : maskOpacity / 0.15,
            }}
          >
            {/* Glowing ring border */}
            <div
              className="absolute inset-[-4px] rounded-full transition-all duration-700"
              style={{
                background: "conic-gradient(from 0deg, var(--accent-base), var(--accent-tertiary), var(--accent-secondary), var(--accent-base))",
                opacity: 0.6,
                filter: "blur(2px)",
              }}
            />

            {/* Inner circular portrait container */}
            <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-[var(--border-primary)]">
              <div
                ref={portraitRef}
                className="w-full h-full"
                style={{ transformOrigin: "center center" }}
              >
                <img
                  src="/images/hero-portrait.png"
                  alt="Professional Portrait"
                  className="w-full h-full object-cover object-center"
                  style={{
                    filter: "contrast(1.05) brightness(0.95)",
                  }}
                />
              </div>

              {/* Subtle vignette overlay on portrait */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, transparent 50%, rgba(5,5,5,0.4) 100%)",
                }}
              />
            </div>

            {/* Floating name tag on portrait */}
            <div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[var(--bg-primary)]/90 border border-[var(--border-primary)] backdrop-blur-md shadow-lg z-30 whitespace-nowrap"
              style={{ transform: `translateX(-50%) translateY(${parallaxPortrait * 0.1}px)` }}
            >
            </div>
          </div>

          {/* Layer 1: Floating website preview card — parallax offset */}
          <div
            ref={previewRef}
            className="absolute w-[240px] h-[150px] rounded-2xl bg-black/60 border border-[var(--border-primary)] shadow-premium p-4 flex flex-col justify-between text-left transition-all pointer-events-none z-10"
            style={{
              top: "2%",
              left: "0%",
              transform: `translate3d(-20px, ${-parallaxPreview}px, 0)`,
              transformStyle: "preserve-3d",
              opacity: Math.max(1 - scrollY * 0.003, 0),
            }}
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
              </div>
              <span className="text-[8px] font-mono text-[var(--text-tertiary)] font-semibold">uic.identity</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="h-2 w-12 rounded bg-white/20" />
              <div className="h-4 w-28 rounded bg-gradient-to-r from-white/30 to-transparent" />
            </div>

            <div className="flex justify-between items-center">
              <div className="h-2.5 w-16 rounded-full bg-white/10" />
              <div className="h-5 w-5 rounded-full bg-[var(--accent-base)]/30 border border-[var(--accent-secondary)]/20" />
            </div>
          </div>

          {/* Layer 2: Interactive Titanium NFC card mockup — deeper parallax */}
          <div
            ref={cardRef}
            className="absolute w-[250px] aspect-[1.586/1] rounded-[20px] bg-gradient-to-br from-[#1b1233] to-[#07050d] border border-white/10 shadow-premium p-5 flex flex-col justify-between text-left transition-all cursor-pointer z-10"
            style={{
              bottom: "5%",
              right: "0%",
              transform: `translate3d(10px, ${-parallaxCard}px, 40px)`,
              transformStyle: "preserve-3d",
              opacity: Math.max(1 - scrollY * 0.0025, 0),
            }}
            onClick={() => handleCtaClick("#nfc")}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-40 rounded-[20px] pointer-events-none" />

            <div className="flex justify-between items-start" style={{ transform: "translateZ(20px)" }}>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-secondary)] animate-pulse" />
                <span className="font-mono text-[9px] font-bold tracking-widest text-[var(--text-primary)]">UIC.NTAG</span>
              </div>
              <Wifi className="h-4 w-4 rotate-90 text-[var(--text-tertiary)]" />
            </div>

            <div className="text-left" style={{ transform: "translateZ(30px)" }}>
              <span className="text-[12px] font-bold font-mono tracking-widest text-[var(--text-primary)] block">
                ALEXANDER MERCER
              </span>
              <span className="text-[7px] uppercase tracking-widest text-[var(--text-tertiary)] block mt-0.5 font-bold">
                DESIGN DIRECTOR
              </span>
            </div>
          </div>

        </div>

      </Container>
    </Section>
  )
}
