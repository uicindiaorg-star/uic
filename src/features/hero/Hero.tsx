import { useEffect, useRef, useState } from "react"
import { ArrowRight, Code, Sliders, Layers, Check, Wifi, Sparkles, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section, Container } from "@/components/ui"
import { animate, stagger } from "animejs"

export const Hero = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  const mockupRef = useRef<HTMLDivElement>(null)

  // Interactive mockup state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  // Real-time animation simulator values
  const [sliderVal, setSliderVal] = useState(24)
  const [typedCode, setTypedCode] = useState("")

  // 1. Mouse coordinates listener for 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    // Convert to range [-0.5, 0.5] relative to center
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x, y })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
  }

  // 2. Scroll listener for vertical drift parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 3. Simulated typewriter typing sequence for Code Editor widget
  useEffect(() => {
    const fullCode = `const app = createIdentity({\n  name: "UIC",\n  nfc: true,\n  theme: "luxury"\n})`
    let index = 0
    let isDeleting = false
    let currentText = ""
    let timer: any = null

    const type = () => {
      if (!isDeleting) {
        currentText = fullCode.slice(0, index + 1)
        index++
        setTypedCode(currentText)
        if (index === fullCode.length) {
          isDeleting = true
          timer = setTimeout(type, 3500) // Pause long at full code
          return
        }
      } else {
        currentText = fullCode.slice(0, index - 1)
        index--
        setTypedCode(currentText)
        if (index === 0) {
          isDeleting = false
        }
      }
      timer = setTimeout(type, isDeleting ? 30 : 65)
    }

    type()
    return () => clearTimeout(timer)
  }, [])

  // 4. Simulated oscillating slider value for Design panel
  useEffect(() => {
    let direction = 1
    const interval = setInterval(() => {
      setSliderVal((prev) => {
        if (prev >= 36) direction = -1
        if (prev <= 12) direction = 1
        return prev + direction * 0.4
      })
    }, 45)
    return () => clearInterval(interval)
  }, [])

  // 5. Elegant stagger reveal load animation
  useEffect(() => {
    // Reveal text elements first
    animate(".hero-editorial-stagger", {
      opacity: [0, 1],
      translateY: [24, 0],
      delay: stagger(120, { start: 100 }),
      duration: 1000,
      easing: "cubicBezier(0.25, 0.1, 0.25, 1)"
    })

    // Reveal mockup layers with a stagger offset
    animate(".hero-mockup-stagger", {
      opacity: [0, 1],
      scale: [0.85, 1],
      translateY: [40, 0],
      delay: stagger(100, { start: 400 }),
      duration: 1200,
      easing: "cubicBezier(0.25, 0.1, 0.25, 1)"
    })
  }, [])

  const handleCtaClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  // Calculate mouse tilt rotations (max 15 degrees)
  const rotateX = mousePos.y * -15
  const rotateY = mousePos.x * 15

  // Slider bar calculation
  const sliderPercentage = ((sliderVal - 12) / (36 - 12)) * 100

  return (
    <Section
      id="hero"
      className="min-h-screen lg:h-screen w-full relative flex items-center pt-[100px] pb-[8vh] lg:py-0 overflow-hidden select-none bg-transparent"
    >
      {/* ═══ PREMIUM CINEMATIC EDITORIAL HERO BACKGROUND ═══ */}
      <div className="absolute inset-0 bg-[var(--bg-primary)] transition-colors duration-500 overflow-hidden pointer-events-none z-[1]">

        {/* Ambient Light & Vignette */}
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
          <div className="absolute top-[-25%] left-[-15%] w-[85%] h-[85%] rounded-full bg-white/20 dark:bg-white/[0.02] blur-[100px] opacity-[0.25] animate-[fluid-one_28s_infinite_ease-in-out]" />
          <div className="absolute bottom-[-25%] right-[-10%] w-[90%] h-[90%] rounded-full bg-white/15 dark:bg-white/[0.015] blur-[120px] opacity-[0.35] animate-[fluid-two_35s_infinite_ease-in-out]" />
          <div className="absolute top-[20%] right-[10%] w-[70%] h-[70%] rounded-full bg-white/10 dark:bg-white/[0.01] blur-[110px] opacity-[0.2] animate-[fluid-one_24s_infinite_ease-in-out_reverse]" />
        </div>

        {/* 12 Column vertical Fluted Glass highlights with backdrop blurs */}
        <div className="absolute inset-0 grid grid-cols-12 gap-0 z-10 pointer-events-none opacity-[0.25]">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="h-full border-l border-[var(--border-primary)]/40 bg-transparent"
            />
          ))}
        </div>

        {/* Chromatic Energy */}
        <div
          className="absolute bottom-[-15%] right-[-15%] w-[70%] h-[70%] rounded-full bg-[var(--accent-base)] blur-[160px] opacity-[0.065] pointer-events-none z-10 animate-[accent-breathing_20s_infinite_ease-in-out]"
        />

        {/* Microscopic Cinematic Film Grain */}
        <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none z-20">
          <svg className="w-full h-full">
            <rect width="100%" height="100%" filter="url(#cinematicFilmGrain)" />
          </svg>
        </div>

      </div>

      <style>{`
        @keyframes fluid-one {
          0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          50% { transform: translate(25px, -15px) scale(1.05) rotate(90deg); }
        }
        @keyframes fluid-two {
          0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          50% { transform: translate(-20px, 25px) scale(0.95) rotate(-90deg); }
        }
        @keyframes accent-breathing {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.05; }
          50% { transform: translate(-25px, -25px) scale(1.15); opacity: 0.08; }
        }
      `}</style>

      {/* ═══ ASYMMETRICAL EDITORIAL GRID CONTAINER ═══ */}
      <Container className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-8 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">

          {/* LEFT COLUMN: Premium Typography & Call-To-Action (60% Desktop) */}
          <div ref={contentRef} className="lg:col-span-7 flex flex-col items-start gap-6 md:gap-8 max-w-2xl text-left">

            {/* Small Monospaced Tagline */}
            <div className="hero-editorial-stagger opacity-0 flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[var(--text-secondary)] font-mono">
                Unique Identity Creation
              </span>
            </div>

            {/* Giant Architectural Headline */}
            <h1 className="hero-editorial-stagger opacity-0 text-[36px] sm:text-[48px] md:text-[58px] lg:text-[50px] xl:text-[56px] font-medium text-[var(--text-primary)] tracking-[-0.03em] leading-[1.08] text-left">
              Memorable digital identities <br className="hidden lg:inline" />
              & premium NFC experiences.
            </h1>

            {/* Subtext description */}
            <p className="hero-editorial-stagger opacity-0 text-[14px] md:text-[16px] text-[var(--text-secondary)] leading-relaxed max-w-lg font-light">
              Architect and compile stunning mobile-first web portfolio containers that pair seamlessly with luxury physical accessories. Start designing your digital flagship in seconds.
            </p>

            {/* Primary Action Row */}
            <div className="hero-editorial-stagger opacity-0 flex flex-wrap gap-4 items-center w-full mt-2">
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
            </div>

          </div>

          {/* RIGHT COLUMN: 3D Parallax "App Creator" Live Mockup (40% Desktop) */}
          <div
            ref={mockupRef}
            className="lg:col-span-5 relative w-full h-[450px] sm:h-[500px] lg:h-[550px] flex items-center justify-center perspective-container select-none scale-[0.8] sm:scale-[0.9] lg:scale-100 origin-center transition-transform duration-300"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Parallax Wrapper with Mouse Tilt Rotate Matrix */}
            <div
              className="relative w-[280px] h-[480px] preserve-3d"
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transition: "transform 0.15s ease-out",
                transformStyle: "preserve-3d"
              }}
            >

              {/* LAYER 00: Core Mobile Device chassis container */}
              <div
                className="absolute inset-0 phone-mockup-frame backdrop-blur-xl border border-white/[0.08] dark:border-white/[0.04] bg-neutral-950/80 dark:bg-black/85 flex flex-col p-3 preserve-3d z-10"
                style={{
                  transform: `translate3d(0, ${-scrollY * 0.05}px, 0)`,
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Device Speaker Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-[#14141e] dark:bg-[#0c0c12] rounded-b-2xl border-x border-b border-white/[0.05] flex items-center justify-center z-30">
                  <div className="w-10 h-1 bg-[#252536] dark:bg-[#1a1a24] rounded-full mb-1" />
                  <div className="w-1.5 h-1.5 bg-[#252536] dark:bg-[#1a1a24] rounded-full mb-1 ml-2" />
                </div>

                {/* Inner mockup screen contents */}
                <div className="flex-1 w-full rounded-[30px] overflow-hidden flex flex-col justify-between pt-6 pb-4 px-3.5 bg-neutral-950 dark:bg-black relative">

                  {/* Glowing mesh active indicator behind chassis screen */}
                  <div className="absolute inset-0 bg-radial from-[var(--accent-glow)]/10 via-transparent to-transparent pointer-events-none z-0" />

                  {/* App Screen Header */}
                  <div className="flex justify-between items-center z-10 mt-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[var(--accent-base)] to-[var(--accent-secondary)] flex items-center justify-center text-[8px] font-black text-white shadow-[0_2px_8px_rgba(123,63,242,0.3)]">
                        U
                      </div>
                      <span className="text-[10px] font-mono tracking-wider font-semibold text-neutral-400">@uic.studio</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 rounded-full px-2 py-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[8px] font-bold text-green-400 uppercase tracking-widest font-mono">live</span>
                    </div>
                  </div>

                  {/* App Screen Body — Live updating digital pass Card being designed */}
                  <div className="flex-1 flex flex-col items-center justify-center my-4 relative z-10">

                    {/* Pulsing Concentric NFC Signal Waves */}
                    <div className="absolute w-[200px] h-[200px] flex items-center justify-center pointer-events-none z-0">
                      <div className="nfc-signal-ring w-full h-full" style={{ animationDelay: "0s" }} />
                      <div className="nfc-signal-ring w-full h-full" style={{ animationDelay: "1s" }} />
                      <div className="nfc-signal-ring w-full h-full" style={{ animationDelay: "2s" }} />
                    </div>

                    {/* Holographic NFC Identity Card */}
                    <div
                      className="w-full aspect-[1.58/1] bg-gradient-to-br from-[#12121e] via-[#09090f] to-[#1e1430] border border-white/[0.08] shadow-[0_12px_28px_rgba(0,0,0,0.5)] flex flex-col justify-between p-3.5 relative overflow-hidden transition-all duration-75"
                      style={{
                        borderRadius: `${sliderVal}px`,
                        boxShadow: `0 8px 30px rgba(123,63,242,${((sliderVal - 12) / (36 - 12)) * 0.15})`
                      }}
                    >
                      {/* Sub-card decorative glass gloss overlay */}
                      <div className="absolute top-0 right-0 w-[60%] h-full bg-linear-to-bl from-white/[0.04] to-transparent pointer-events-none transform skew-x-12" />

                      {/* Card top row */}
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-1">
                          <Cpu className="h-4.5 w-4.5 text-[var(--accent-secondary)]" strokeWidth={1.5} />
                          <span className="text-[7px] font-black tracking-[0.25em] text-neutral-300 font-mono">SECURE LINK</span>
                        </div>
                        <Wifi className="h-4 w-4 text-[var(--accent-tertiary)] animate-pulse" />
                      </div>

                      {/* Card center glowing badge */}
                      <div className="flex items-center gap-1.5 my-1.5">
                        <Sparkles className="h-3 w-3 text-amber-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-gradient-to-r from-white via-neutral-200 to-[var(--accent-tertiary)] bg-clip-text text-transparent">
                          UIX PASS
                        </span>
                      </div>

                      {/* Card bottom row */}
                      <div className="flex justify-between items-end border-t border-white/[0.05] pt-2">
                        <div>
                          <div className="text-[6px] uppercase tracking-wider text-neutral-500 font-mono">Holder</div>
                          <div className="text-[8px] font-bold text-neutral-200 uppercase tracking-widest font-mono">UIC person</div>
                        </div>
                        <div className="flex gap-0.5">
                          <div className="w-3.5 h-3.5 rounded-full bg-white/[0.08]" />
                          <div className="w-3.5 h-3.5 rounded-full bg-[var(--accent-base)]/40 -ml-2" />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* App Screen Footer analytics cards */}
                  <div className="grid grid-cols-2 gap-2 z-10">
                    <div className="bg-neutral-900/60 dark:bg-white/[0.02] border border-white/[0.05] rounded-xl p-2 text-left">
                      <div className="text-[7px] text-neutral-500 uppercase tracking-widest font-mono">Tap Analytics</div>
                      <div className="text-[11px] font-extrabold text-neutral-100 mt-0.5">1,248 clicks</div>
                    </div>
                    <div className="bg-neutral-900/60 dark:bg-white/[0.02] border border-white/[0.05] rounded-xl p-2 text-left">
                      <div className="text-[7px] text-neutral-500 uppercase tracking-widest font-mono">Integrations</div>
                      <div className="text-[11px] font-extrabold text-neutral-100 mt-0.5">Active NFC</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* LAYER 01: FLOATING CODE EDITOR PANEL (Top-Left, Aggressive Parallax) */}
              <div
                className="hero-mockup-stagger opacity-0 absolute top-[-25px] left-[-70px] w-[215px] rounded-2xl bg-[#09090d]/90 dark:bg-[#040407]/95 border border-white/[0.1] shadow-2xl p-3 z-30 pointer-events-none"
                style={{
                  transform: `translate3d(0, ${-scrollY * 0.15}px, 60px) rotateX(${rotateX * 1.15}deg) rotateY(${rotateY * 1.15}deg)`,
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Editor Header */}
                <div className="flex justify-between items-center border-b border-white/[0.08] pb-1.5 mb-2">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/80" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                    <div className="w-2 h-2 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Code className="h-3 w-3 text-neutral-500" />
                    <span className="text-[8px] font-mono text-neutral-400 font-bold">nfc-config.ts</span>
                  </div>
                </div>

                {/* Typewriter Code lines */}
                <pre className="text-[9px] font-mono leading-normal text-left text-neutral-400 overflow-hidden select-none h-[80px]">
                  <code className="typing-cursor">
                    {typedCode.split("\n").map((line, i) => {
                      if (line.includes("createIdentity")) {
                        return <div key={i}><span className="token-keyword">const</span> app = <span className="token-tag">createIdentity</span>(&#123;</div>
                      }
                      if (line.includes("theme:") || line.includes("name:") || line.includes("nfc:")) {
                        const parts = line.split(":")
                        return (
                          <div key={i}>
                            &nbsp;&nbsp;<span className="token-attr">{parts[0].trim()}</span>:{" "}
                            <span className="token-string">{parts[1].trim()}</span>
                          </div>
                        )
                      }
                      return <div key={i}>{line}</div>
                    })}
                  </code>
                </pre>
              </div>

              {/* LAYER 02: FLOATING DESIGN SYSTEM WIDGET (Bottom-Right, Moderate Parallax) */}
              <div
                className="hero-mockup-stagger opacity-0 absolute bottom-[20px] right-[-55px] w-[210px] rounded-2xl bg-neutral-950/90 dark:bg-black/90 border border-white/[0.08] dark:border-white/[0.04] shadow-2xl p-3 z-30"
                style={{
                  transform: `translate3d(0, ${-scrollY * 0.07}px, 85px) rotateX(${rotateX * 0.85}deg) rotateY(${rotateY * 0.85}deg)`,
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Title */}
                <div className="flex items-center gap-1.5 border-b border-white/[0.06] pb-2 mb-2.5">
                  <Sliders className="h-3.5 w-3.5 text-[var(--accent-secondary)]" />
                  <span className="text-[9px] font-black uppercase tracking-wider text-neutral-200">Design System</span>
                </div>

                {/* Slider values (moves dynamically) */}
                <div className="space-y-3 text-left">
                  <div>
                    <div className="flex justify-between items-center text-[8px] font-mono text-neutral-400 mb-1">
                      <span>Border Radius</span>
                      <span className="text-[var(--accent-secondary)] font-bold">{Math.round(sliderVal)}px</span>
                    </div>
                    {/* Simulated Slider Track */}
                    <div className="h-1 w-full bg-neutral-800 rounded-full relative overflow-visible">
                      <div
                        className="h-full bg-[var(--accent-base)] rounded-full absolute left-0"
                        style={{ width: `${sliderPercentage}%` }}
                      />
                      <div
                        className="w-2.5 h-2.5 rounded-full bg-white border border-[var(--accent-base)] shadow-sm absolute top-1/2 -translate-y-1/2 -ml-1.25 transition-all duration-75"
                        style={{ left: `${sliderPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Accents Selector Row */}
                  <div>
                    <div className="text-[8px] font-mono text-neutral-400 mb-1.5">Color Palette</div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[var(--accent-base)] border border-white/50 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                      <div className="w-4 h-4 rounded-full bg-blue-500 cursor-pointer hover:scale-105 transition-transform" />
                      <div className="w-4 h-4 rounded-full bg-emerald-500 cursor-pointer hover:scale-105 transition-transform" />
                      <div className="w-4 h-4 rounded-full bg-neutral-400 cursor-pointer hover:scale-105 transition-transform" />
                    </div>
                  </div>
                </div>

              </div>

              {/* LAYER 03: FLOATING COMPONENT TREE WIDGET (Top-Right, Shallow Parallax) */}
              <div
                className="hero-mockup-stagger opacity-0 absolute top-[40px] right-[-65px] w-[185px] rounded-2xl bg-neutral-950/85 dark:bg-black/85 border border-white/[0.06] shadow-xl p-3.5 z-20 pointer-events-none"
                style={{
                  transform: `translate3d(0, ${-scrollY * 0.11}px, 35px) rotateX(${rotateX * 1.05}deg) rotateY(${rotateY * 1.05}deg)`,
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-1.5 border-b border-white/[0.05] pb-2 mb-2">
                  <Layers className="h-3.5 w-3.5 text-[var(--accent-tertiary)]" />
                  <span className="text-[9px] font-black uppercase tracking-wider text-neutral-300">Hierarchy</span>
                </div>

                {/* Layer checklist */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between text-[8px] font-mono p-1 bg-white/[0.02] border border-white/[0.03] rounded-md">
                    <span className="text-neutral-300 font-bold flex items-center gap-1">
                      <Check className="h-2.5 w-2.5 text-green-500" strokeWidth={3} />
                      App Root Container
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  </div>
                  <div className="flex items-center justify-between text-[8px] font-mono p-1 bg-white/[0.02] border border-white/[0.03] rounded-md">
                    <span className="text-neutral-300 font-bold flex items-center gap-1">
                      <Check className="h-2.5 w-2.5 text-green-500" strokeWidth={3} />
                      NFC Hub Transmitter
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  </div>
                  <div className="flex items-center justify-between text-[8px] font-mono p-1 bg-[var(--accent-base)]/10 border border-[var(--accent-base)]/25 rounded-md animate-pulse">
                    <span className="text-[var(--accent-tertiary)] font-bold flex items-center gap-1">
                      <Check className="h-2.5 w-2.5 text-[var(--accent-secondary)] animate-bounce" strokeWidth={3} />
                      Identity Canvas
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)]" />
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </Container>
    </Section>
  )
}
