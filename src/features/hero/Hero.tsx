import { useEffect, useRef, useState } from "react"
import { ArrowRight, Code, Sliders, Layers, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const TOTAL_FRAMES = 44

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const accentsLayerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])

  // Load and preloading states
  const [loadedCount, setLoadedCount] = useState(0)
  const [isPreloaded, setIsPreloaded] = useState(false)

  // Floating widgets animated states (reused from old Hero)
  const [sliderVal, setSliderVal] = useState(24)
  const [typedCode, setTypedCode] = useState("")

  // 1. Preload optimized WebP frames
  useEffect(() => {
    let loaded = 0
    const images: HTMLImageElement[] = []

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      const padNum = String(i).padStart(4, "0")
      img.src = `/images/heropage/${padNum}.webp`

      img.onload = () => {
        loaded++
        setLoadedCount(loaded)
        if (loaded === TOTAL_FRAMES) {
          setIsPreloaded(true)
        }
      }

      img.onerror = () => {
        // Increment anyway to prevent UI blocking
        loaded++
        setLoadedCount(loaded)
        if (loaded === TOTAL_FRAMES) {
          setIsPreloaded(true)
        }
      }

      images.push(img)
    }

    imagesRef.current = images
  }, [])

  // 2. High-DPI canvas cover drawing helper
  const drawImageOnCanvas = (img: HTMLImageElement) => {
    const canvas = canvasRef.current
    if (!canvas || !img) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Compute cover sizing
    const imgWidth = img.naturalWidth || img.width
    const imgHeight = img.naturalHeight || img.height
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    const imgRatio = imgWidth / imgHeight
    const canvasRatio = canvasWidth / canvasHeight

    let drawWidth = canvasWidth
    let drawHeight = canvasHeight
    let offsetX = 0
    let offsetY = 0

    if (canvasRatio > imgRatio) {
      drawHeight = canvasWidth / imgRatio
      offsetY = (canvasHeight - drawHeight) / 2
    } else {
      drawWidth = canvasHeight * imgRatio
      offsetX = (canvasWidth - drawWidth) / 2
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
  }

  // 3. GSAP ScrollTrigger Sequence & Parallax System
  useEffect(() => {
    if (!isPreloaded) return

    gsap.registerPlugin(ScrollTrigger)

    const canvas = canvasRef.current
    const frameObj = { frame: 1 }

    const handleLayout = () => {
      if (!canvas) return
      const viewport = canvas.closest(".sticky-hero-viewport")
      if (!viewport) return
      const rect = viewport.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const newWidth = Math.floor(rect.width * dpr)
      const newHeight = Math.floor(rect.height * dpr)

      if (canvas.width !== newWidth || canvas.height !== newHeight) {
        canvas.width = newWidth
        canvas.height = newHeight

        // Redraw current frame immediately on resize
        const currentFrameIndex = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(frameObj.frame)))
        const img = imagesRef.current[currentFrameIndex - 1]
        if (img && img.complete) {
          drawImageOnCanvas(img)
        }
      }
    }

    window.addEventListener("resize", handleLayout)
    handleLayout()

    // Create the master scroll scrubbing timeline for Hero Parallax
    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1, // buttery smooth scroll scrub momentum
        invalidateOnRefresh: true,
      }
    })

    // Scrub image sequence frames 1 to 44
    heroTimeline.to(frameObj, {
      frame: TOTAL_FRAMES,
      ease: "none",
      onUpdate: () => {
        const frameIndex = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(frameObj.frame)))
        const img = imagesRef.current[frameIndex - 1]
        if (img && img.complete) {
          drawImageOnCanvas(img)
        }
      }
    }, 0)

    // Canvas background zoom & 0.7x parallax translate
    if (canvasContainerRef.current) {
      heroTimeline.to(canvasContainerRef.current, {
        y: "22vh",
        scale: 1.08,
        ease: "none",
      }, 0)
    }

    // Typography layer fade-out and 1.0x standard translation
    if (contentRef.current) {
      heroTimeline.to(contentRef.current, {
        y: "-12vh",
        opacity: 0,
        ease: "none",
      }, 0)
    }

    // Individual floating 3D widgets specialized parallax speeds and tilts
    const accents = accentsLayerRef.current
    if (accents) {
      const codeEditor = accents.querySelector(".hero-mockup-stagger:nth-child(1)")
      const designSlider = accents.querySelector(".hero-mockup-stagger:nth-child(2)")
      const hierarchyTree = accents.querySelector(".hero-mockup-stagger:nth-child(3)")

      if (codeEditor) {
        heroTimeline.to(codeEditor, {
          y: "-30vh", // translates faster (1.3x speed)
          rotationY: 8, // subtle 3D rotational scrolls
          rotationX: -6,
          ease: "none",
        }, 0)
      }

      if (designSlider) {
        heroTimeline.to(designSlider, {
          y: "-12vh", // translates slower (0.8x speed)
          x: "-2vw", // slight horizontal float
          rotationY: -5,
          ease: "none",
        }, 0)
      }

      if (hierarchyTree) {
        heroTimeline.to(hierarchyTree, {
          y: "-22vh", // medium-fast (1.15x speed)
          rotationY: 12,
          rotationX: 4,
          ease: "none",
        }, 0)
      }
    }

    // Initial first-frame draw
    const firstImg = imagesRef.current[0]
    if (firstImg && firstImg.complete) {
      drawImageOnCanvas(firstImg)
    }

    return () => {
      window.removeEventListener("resize", handleLayout)
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill()
        }
      })
    }
  }, [isPreloaded])

  // 4. Simulated typewriter coding effect (reused from old Hero)
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
          timer = setTimeout(type, 3500)
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

  // 5. Simulated design slider oscillating values (reused from old Hero)
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

  // 6. Premium GSAP stagger reveal entrance when preloaded
  useEffect(() => {
    if (!isPreloaded) return

    const entranceTimer = setTimeout(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.2 }
      })

      // Stagger editorial text elements with horizontal and vertical translations
      tl.fromTo(".hero-editorial-stagger",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 1.2 },
        "+=0.1"
      )

      // Stagger and 3D tilt reveal floating mockup widgets
      tl.fromTo(".hero-mockup-stagger",
        { 
          opacity: 0, 
          scale: 0.85, 
          y: 60,
          rotationX: 15,
          rotationY: -15,
        },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          rotationX: 0,
          rotationY: 0,
          stagger: 0.15,
          duration: 1.4,
        },
        "-=0.9" // overlaps beautifully with typography reveal
      )
    }, 700) // syncs with preloader fade-out

    return () => clearTimeout(entranceTimer)
  }, [isPreloaded])

  const handleCtaClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  const sliderPercentage = ((sliderVal - 12) / (36 - 12)) * 100

  return (
    <div ref={containerRef} className="scroll-hero-container select-none overflow-visible">
      {/* Sticky Viewport Container */}
      <div className="sticky-hero-viewport">

        {/* PREMIUM IMAGE SEQUENCE PRELOADER OVERLAY */}
        <div className={`hero-loader-overlay ${isPreloaded ? "fade-out" : ""}`}>
          <span className="hero-loader-text">Loading Experience</span>
          <div className="hero-loader-bar-bg">
            <div
              className="hero-loader-bar-fill"
              style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
            />
          </div>
        </div>

        {/* ═══ CANVAS RENDERING LAYER (0.7x Parallax + Zoom) ═══ */}
        <div
          ref={canvasContainerRef}
          className="scroll-hero-canvas-container"
        >
          <canvas ref={canvasRef} className="scroll-hero-canvas" />

          {/* Luxury Ambient Shaders & Film Grain */}
          <div className="absolute inset-0 bg-radial from-transparent via-black/10 to-black/85 pointer-events-none z-[2]" />
          <div className="absolute inset-0 pointer-events-none z-[2] shadow-[inset_0_0_120px_rgba(0,0,0,0.85)]" />

          {/* Subtle micro-grain overlay */}
          <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none z-[3]">
            <svg className="w-full h-full">
              <filter id="cinematicFilmGrain">
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#cinematicFilmGrain)" />
            </svg>
          </div>
        </div>

        {/* ═══ 3D ACCENTS PARALLAX LAYER (1.3x Parallax) ═══ */}
        <div
          ref={accentsLayerRef}
          className="scroll-hero-accents-layer"
        >
          {/* Accent 1: FLOATING CODE EDITOR PANEL (Top-Right) */}
          <div className="hero-mockup-stagger opacity-0 absolute top-[12%] right-[10%] w-[220px] rounded-2xl bg-black/80 backdrop-blur-xl border border-white/[0.08] shadow-2xl p-3 pointer-events-none hidden lg:block select-none transform-style preserve-3d">
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
            <pre className="text-[9px] font-mono leading-normal text-left text-neutral-400 overflow-hidden select-none h-[80px]">
              <code className="typing-cursor">
                {typedCode.split("\n").map((line, i) => {
                  if (line.includes("createIdentity")) {
                    return (
                      <div key={i}>
                        <span className="token-keyword">const</span> app = <span className="token-tag">createIdentity</span>(&#123;
                      </div>
                    )
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

          {/* Accent 2: FLOATING DESIGN SYSTEM SLIDER PANEL (Bottom-Right) */}
          <div className="hero-mockup-stagger opacity-0 absolute bottom-[18%] right-[16%] w-[210px] rounded-2xl bg-black/85 backdrop-blur-xl border border-white/[0.06] shadow-2xl p-3 hidden lg:block select-none transform-style preserve-3d">
            <div className="flex items-center gap-1.5 border-b border-white/[0.06] pb-2 mb-2.5">
              <Sliders className="h-3.5 w-3.5 text-[var(--accent-secondary)]" />
              <span className="text-[9px] font-black uppercase tracking-wider text-neutral-200">Design System</span>
            </div>
            <div className="space-y-3 text-left">
              <div>
                <div className="flex justify-between items-center text-[8px] font-mono text-neutral-400 mb-1">
                  <span>Border Radius</span>
                  <span className="text-[var(--accent-secondary)] font-bold">{Math.round(sliderVal)}px</span>
                </div>
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
              <div>
                <div className="text-[8px] font-mono text-neutral-400 mb-1.5">Color Palette</div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[var(--accent-base)] border border-white/50 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <div className="w-4 h-4 rounded-full bg-blue-500" />
                  <div className="w-4 h-4 rounded-full bg-emerald-500" />
                  <div className="w-4 h-4 rounded-full bg-neutral-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Accent 3: COMPONENT HIERARCHY TREE PANEL (Top-Right-Edge) */}
          <div className="hero-mockup-stagger opacity-0 absolute top-[32%] right-[2%] w-[185px] rounded-2xl bg-black/80 backdrop-blur-xl border border-white/[0.05] shadow-xl p-3.5 hidden xl:block select-none transform-style preserve-3d">
            <div className="flex items-center gap-1.5 border-b border-white/[0.05] pb-2 mb-2">
              <Layers className="h-3.5 w-3.5 text-[var(--accent-tertiary)]" />
              <span className="text-[9px] font-black uppercase tracking-wider text-neutral-300">Hierarchy</span>
            </div>
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
                  <Check className="h-2.5 w-2.5 text-[var(--accent-secondary)]" strokeWidth={3} />
                  Identity Canvas
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)]" />
              </div>
            </div>
          </div>
        </div>

        {/* ═══ EDITORIAL CONTENT LAYER (1.0x Parallax Overlay) ═══ */}
        <Container className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-8 h-full flex flex-col justify-center scroll-hero-content-layer">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">

            {/* Left Column: Architectural Typography */}
            <div
              ref={contentRef}
              className="lg:col-span-7 flex flex-col items-start gap-6 md:gap-8 max-w-2xl text-left"
            >

              <div className="hero-editorial-stagger opacity-0 flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[var(--text-secondary)] font-mono">
                  Unique Identity Creation
                </span>
              </div>

              <h1 className="hero-editorial-stagger opacity-0 text-[36px] sm:text-[48px] md:text-[58px] lg:text-[50px] xl:text-[56px] font-medium text-[var(--text-primary)] tracking-[-0.03em] leading-[1.08] text-left">
                Memorable digital identities <br className="hidden lg:inline" />
                & premium NFC experiences.
              </h1>

              <p className="hero-editorial-stagger opacity-0 text-[14px] md:text-[16px] text-[var(--text-secondary)] leading-relaxed max-w-lg font-light">
                Architect and compile stunning mobile-first web portfolio containers that pair seamlessly with luxury physical accessories. Start designing your digital flagship in seconds.
              </p>

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
          </div>
        </Container>

      </div>
    </div>
  )
}
