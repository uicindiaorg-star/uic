import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { navLinks } from "./nav.data"
import { MobileMenu } from "./MobileMenu"
import { siteConfig } from "@/content/site"

interface NavbarProps {
  theme: "light" | "dark"
  onToggleTheme: () => void
}

export const Navbar = ({ theme, onToggleTheme }: NavbarProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("#hero")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [prevScrollY, setPrevScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Auto sticky backgrounds
      setIsScrolled(currentScrollY > 20)

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
        className={`fixed top-6 left-0 right-0 transition-all duration-500 max-w-[1440px] mx-auto px-6 md:px-12 pointer-events-none ${
          isMobileMenuOpen ? "z-[70] translate-y-0 opacity-100" : "z-50"
        } ${
          !isMobileMenuOpen && !isVisible ? "-translate-y-24 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        {/* Floating Capsule design */}
        <div
          className={`mx-auto max-w-[920px] rounded-full px-6 py-3.5 flex justify-between items-center transition-all duration-300 pointer-events-auto ${
            isScrolled || isMobileMenuOpen
              ? "navbar-scrolled"
              : "bg-transparent border border-transparent shadow-none"
          }`}
        >
          {/* Logo brand */}
          <button
            onClick={() => handleLinkClick("#hero")}
            className="font-bold text-sm tracking-widest text-[var(--text-primary)] hover:opacity-75 focus:outline-none uppercase"
          >
            {siteConfig.name}.STUDIO
          </button>

          {/* Links menu (Center) */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`relative text-[13px] font-semibold uppercase tracking-wider hover:text-[var(--text-primary)] transition-colors focus:outline-none py-1 px-2 ${
                  activeSection === link.href
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)]"
                }`}
              >
                {link.label}
                {activeSection === link.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--text-primary)] transition-all" />
                )}
              </button>
            ))}
          </nav>

          {/* Nav CTAs */}
          <div className="flex items-center gap-3">
            {/* Premium Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full border border-[var(--border-primary)] hover:border-[var(--text-secondary)] text-[var(--text-primary)] transition-all bg-[var(--surface-glass)] focus:outline-none flex items-center justify-center shadow-soft"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-[var(--accent-secondary)] animate-in spin-in-12 duration-500" />
              ) : (
                <Moon className="h-4 w-4 text-[var(--accent-base)] animate-in spin-in-12 duration-500" />
              )}
            </button>

            <Button
              size="sm"
              className="hidden sm:inline-flex rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 transition-all"
              onClick={() => handleLinkClick("#contact")}
            >
              Start Project
            </Button>
            {/* Animated Hamburger Button — mobile only */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-[5px] p-1.5 rounded-full border border-[var(--border-primary)] bg-[var(--surface-glass)] hover:border-[var(--text-secondary)] transition-all focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`block h-[1.5px] bg-[var(--text-primary)] transition-all duration-300 origin-center ${
                isMobileMenuOpen ? "w-4 rotate-45 translate-y-[6.5px]" : "w-4"
              }`} />
              <span className={`block h-[1.5px] bg-[var(--text-primary)] transition-all duration-200 ${
                isMobileMenuOpen ? "w-0 opacity-0" : "w-3 opacity-100"
              }`} />
              <span className={`block h-[1.5px] bg-[var(--text-primary)] transition-all duration-300 origin-center ${
                isMobileMenuOpen ? "w-4 -rotate-45 -translate-y-[6.5px]" : "w-4"
              }`} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}
