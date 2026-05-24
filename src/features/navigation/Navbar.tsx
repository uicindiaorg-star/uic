import { useState, useEffect } from "react"
import { Sun, Moon, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { navLinks } from "./nav.data"
import { MobileMenu } from "./MobileMenu"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface NavbarProps {
  theme: "light" | "dark"
  onToggleTheme: () => void
}

export const Navbar = ({ theme, onToggleTheme }: NavbarProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [activeSection, setActiveSection] = useState("#hero")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [prevScrollY, setPrevScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide on scroll down, reveal on scroll up
      if (currentScrollY > prevScrollY && currentScrollY > 120) {
        setIsVisible(false) // scrolling down
      } else {
        setIsVisible(true) // scrolling up
      }

      setPrevScrollY(currentScrollY)

      // Find active section
      const scrollPosition = currentScrollY + 220
      for (const link of navLinks) {
        const el = document.querySelector(link.href)
        if (el) {
          const top = (el as HTMLElement).offsetTop
          const height = (el as HTMLElement).offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.href)
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollY])

  // Morph navbar capsule dynamically on scroll using GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const mm = gsap.matchMedia()

    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        start: "top top",
        end: "+=120",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress
          const capsule = document.querySelector(".navbar-capsule")
          if (capsule) {
            gsap.to(capsule, {
              maxWidth: gsap.utils.interpolate(1150, 950, progress) + "px",
              paddingLeft: gsap.utils.interpolate(32, 20, progress) + "px",
              paddingRight: gsap.utils.interpolate(32, 20, progress) + "px",
              paddingTop: gsap.utils.interpolate(12, 8, progress) + "px",
              paddingBottom: gsap.utils.interpolate(12, 8, progress) + "px",
              overwrite: "auto",
              duration: 0.15,
            })
          }
        }
      })
    })

    return () => {
      mm.revert()
    }
  }, [])

  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Compute inverted capsule theme styles:
  // - Light web theme -> Dark navbar capsule (high contrast black float over ivory bg)
  // - Dark web theme -> Light navbar capsule (glowing white card float over obsidian bg)
  const isNavbarDark = theme === "light"

  const capsuleBg = isNavbarDark 
    ? "bg-neutral-950/95 border-neutral-800/80 shadow-[0_16px_40px_rgba(0,0,0,0.18)]" 
    : "bg-white/95 border-neutral-100/80 shadow-[0_12px_40px_rgba(0,0,0,0.03)]"

  const logoBg = isNavbarDark ? "bg-white" : "bg-neutral-950"
  const studioText = isNavbarDark ? "text-white" : "text-neutral-950"

  const toggleBtnBg = isNavbarDark 
    ? "bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 text-white" 
    : "bg-neutral-50/50 border-neutral-100 hover:border-neutral-300 text-neutral-700"

  const ctaBtnClasses = isNavbarDark 
    ? "bg-white hover:bg-neutral-200 text-black" 
    : "bg-neutral-950 hover:bg-neutral-800 text-white"

  const hamburgerBorder = isNavbarDark ? "border-neutral-800 bg-neutral-900" : "border-neutral-100 bg-neutral-50"
  const hamburgerLines = isNavbarDark ? "bg-white" : "bg-neutral-900"

  const getNavLinkClass = (href: string) => {
    const isActive = activeSection === href
    if (isNavbarDark) {
      return isActive 
        ? "text-white bg-white/10" 
        : "text-white/60 hover:text-white hover:bg-white/5"
    } else {
      return isActive 
        ? "text-neutral-950 bg-neutral-100" 
        : "text-neutral-500 hover:text-neutral-950 hover:bg-neutral-50/50"
    }
  }

  const getNavLinkTextClass = () => {
    return isNavbarDark ? "text-white" : "text-neutral-950"
  }

  return (
    <>
      <header
        className={`fixed top-4 md:top-6 left-0 right-0 z-50 transition-all duration-500 max-w-[1440px] mx-auto px-4 md:px-12 pointer-events-none ${isMobileMenuOpen ? "opacity-0 -translate-y-24 pointer-events-none" : ""
          } ${!isMobileMenuOpen && !isVisible ? "-translate-y-24 opacity-0" : "translate-y-0 opacity-100"
          }`}
      >
        {/* Floating Inverted Capsule design */}
        <div
          className={`navbar-capsule mx-auto max-w-[1150px] rounded-full px-3.5 md:px-8 py-2 md:py-3 flex justify-between items-center transition-all duration-500 pointer-events-auto border ${capsuleBg} backdrop-blur-md`}
        >
          {/* Logo brand - Circular vector brand logo */}
          <button
            onClick={() => handleLinkClick("#hero")}
            className="flex items-center gap-2 md:gap-2.5 focus:outline-none group"
          >
            <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full ${logoBg} flex items-center justify-center p-1.5 transition-transform duration-300 group-hover:scale-105 shadow-inner border border-white/5`}>
              <img
                src="/logo.png"
                alt="UIC Studio"
                className="w-full h-full object-contain"
              />
            </div>
            <span className={`hidden xs:inline text-[10px] md:text-xs font-black tracking-widest ${studioText} uppercase`}>
              STUDIO
            </span>
          </button>

          {/* Links menu (Center) - Hover text-roll transition */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-5" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`relative text-[11px] font-extrabold uppercase tracking-widest transition-all focus:outline-none py-1.5 px-3.5 group rounded-full ${getNavLinkClass(link.href)}`}
              >
                <span className="block relative overflow-hidden h-4">
                  <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                    {link.label}
                  </span>
                  <span className={`absolute top-full left-0 block transition-transform duration-500 group-hover:-translate-y-full font-bold ${getNavLinkTextClass()}`}>
                    {link.label}
                  </span>
                </span>
              </button>
            ))}
          </nav>

          {/* Nav CTAs - Right: Location Indicator + Premium CTA button with rotating arrow */}
          <div className="flex items-center gap-1.5 md:gap-3">

            {/* Premium Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className={`hidden md:flex p-1.5 md:p-2 rounded-full border transition-all focus:outline-none items-center justify-center ${toggleBtnBg}`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-3.5 w-3.5 md:h-4 md:w-4 text-[var(--accent-base)] animate-in spin-in-12 duration-500" />
              ) : (
                <Moon className="h-3.5 w-3.5 md:h-4 md:w-4 text-neutral-500 animate-in spin-in-12 duration-500" />
              )}
            </button>

            {/* Premium CTA Button */}
            <Button
              size="sm"
              className={`hidden md:inline-flex rounded-full px-3 py-1.5 md:px-5 md:py-2.5 text-[8.5px] md:text-[10px] font-extrabold uppercase tracking-widest border-0 transition-all duration-300 group focus:outline-none items-center gap-1 md:gap-1.5 ${ctaBtnClasses}`}
              onClick={() => handleLinkClick("#contact")}
            >
              <span>Start Project</span>
              <ArrowUpRight className="h-3 w-3 md:h-3.5 md:w-3.5 transition-transform duration-300 group-hover:rotate-45" />
            </Button>

            {/* Animated Hamburger Button — mobile only */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden w-8 h-8 md:w-9 md:h-9 flex flex-col justify-center items-center gap-[4.5px] p-1.5 rounded-full border transition-all focus:outline-none ${hamburgerBorder}`}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`block h-[1.2px] md:h-[1.5px] ${hamburgerLines} transition-all duration-300 origin-center ${isMobileMenuOpen ? "w-3.5 rotate-45 translate-y-[5.5px]" : "w-3.5"
                }`} />
              <span className={`block h-[1.2px] md:h-[1.5px] ${hamburgerLines} transition-all duration-200 ${isMobileMenuOpen ? "w-0 opacity-0" : "w-2.5 opacity-100"
                }`} />
              <span className={`block h-[1.2px] md:h-[1.5px] ${hamburgerLines} transition-all duration-300 origin-center ${isMobileMenuOpen ? "w-3.5 -rotate-45 -translate-y-[5.5px]" : "w-3.5"
                }`} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />
    </>
  )
}
