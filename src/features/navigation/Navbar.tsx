import { useState, useEffect } from "react"
import { Sun, Moon, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { navLinks } from "./nav.data"
import { MobileMenu } from "./MobileMenu"

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

  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <header
        className={`fixed top-4 md:top-6 left-0 right-0 z-50 transition-all duration-500 max-w-[1440px] mx-auto px-4 md:px-12 pointer-events-none ${isMobileMenuOpen ? "opacity-0 -translate-y-24 pointer-events-none" : ""
          } ${!isMobileMenuOpen && !isVisible ? "-translate-y-24 opacity-0" : "translate-y-0 opacity-100"
          }`}
      >
        {/* Floating Capsule design */}
        <div
          className={`mx-auto max-w-[1150px] rounded-full px-4 md:px-8 py-2 md:py-3 flex justify-between items-center transition-all duration-300 pointer-events-auto border bg-white/95 text-neutral-900 border-neutral-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)]`}
        >
          {/* Logo brand - Circular dark logo with UIC initials */}
          <button
            onClick={() => handleLinkClick("#hero")}
            className="flex items-center gap-2.5 focus:outline-none group"
          >
            <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <span className="text-[10px] font-black text-white tracking-widest font-mono pl-[1px]">UIC</span>
            </div>
            <span className="hidden sm:inline text-xs font-black tracking-widest text-neutral-950 uppercase">
              STUDIO
            </span>
          </button>

          {/* Links menu (Center) - Hover text-roll transition */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-5" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`relative text-[11px] font-extrabold uppercase tracking-widest transition-colors focus:outline-none py-1.5 px-3.5 group rounded-full ${activeSection === link.href
                    ? "text-neutral-950 bg-neutral-50"
                    : "text-neutral-500 hover:text-neutral-950 hover:bg-neutral-50/50"
                  }`}
              >
                <span className="block relative overflow-hidden h-4">
                  <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                    {link.label}
                  </span>
                  <span className="absolute top-full left-0 block transition-transform duration-500 group-hover:-translate-y-full font-bold text-neutral-950">
                    {link.label}
                  </span>
                </span>
              </button>
            ))}
          </nav>

          {/* Nav CTAs - Right: Location Indicator + Premium CTA button with rotating arrow */}
          <div className="flex items-center gap-3">

            {/* Small live location indicator
            <div className="hidden lg:flex items-center gap-2 bg-neutral-50 border border-neutral-100 rounded-full px-3 py-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-black tracking-widest text-neutral-500 uppercase">
                MUMBAI, IN
              </span>
            </div> */}

            {/* Premium Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full border border-neutral-100 hover:border-neutral-300 text-neutral-700 transition-all bg-neutral-50 focus:outline-none flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-[var(--accent-base)] animate-in spin-in-12 duration-500" />
              ) : (
                <Moon className="h-4 w-4 text-neutral-500 animate-in spin-in-12 duration-500" />
              )}
            </button>

            {/* Premium CTA Button */}
            <Button
              size="sm"
              className="hidden sm:inline-flex rounded-full px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-widest bg-neutral-900 hover:bg-[var(--accent-base)] text-white border-0 transition-all duration-300 group focus:outline-none flex items-center gap-1.5"
              onClick={() => handleLinkClick("#contact")}
            >
              <span>Start Project</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45 text-white" />
            </Button>

            {/* Animated Hamburger Button — mobile only */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-[5px] p-1.5 rounded-full border border-neutral-100 bg-neutral-50 hover:border-neutral-300 transition-all focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`block h-[1.5px] bg-neutral-900 transition-all duration-300 origin-center ${isMobileMenuOpen ? "w-4 rotate-45 translate-y-[6.5px]" : "w-4"
                }`} />
              <span className={`block h-[1.5px] bg-neutral-900 transition-all duration-200 ${isMobileMenuOpen ? "w-0 opacity-0" : "w-3 opacity-100"
                }`} />
              <span className={`block h-[1.5px] bg-neutral-900 transition-all duration-300 origin-center ${isMobileMenuOpen ? "w-4 -rotate-45 -translate-y-[6.5px]" : "w-4"
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
