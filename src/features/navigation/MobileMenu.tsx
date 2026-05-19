import { useEffect } from "react"
import { ArrowUpRight, Sun, Moon, X } from "lucide-react"
import { navLinks } from "./nav.data"
import { siteConfig } from "@/content/site"
import { animate, stagger } from "animejs"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  theme: "light" | "dark"
  onToggleTheme: () => void
}

export const MobileMenu = ({ isOpen, onClose, theme, onToggleTheme }: MobileMenuProps) => {

  useEffect(() => {
    if (isOpen) {
      // Stagger reveal nav links
      animate(".mobile-nav-link", {
        opacity: [0, 1],
        translateX: [-30, 0],
        delay: stagger(80, { start: 200 }),
        duration: 600,
        easing: "easeOutExpo"
      })

      // Fade in footer CTA
      animate(".mobile-nav-footer", {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: 500,
        duration: 600,
        easing: "easeOutExpo"
      })

      // Lock body scroll
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleLinkClick = (href: string) => {
    onClose()
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }, 150)
  }

  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      {/* Backdrop blur overlay */}
      <div
        className="absolute inset-0 bg-[var(--bg-primary)]/97 backdrop-blur-2xl"
        onClick={onClose}
      />

      {/* Menu content */}
      <div className="relative z-10 flex flex-col h-full px-6 pt-8 pb-10">
        
        {/* Integrated Mobile Header Top Bar (matching capsule alignment but full width) */}
        <div className="flex justify-between items-center mb-10 pb-4 border-b border-[var(--border-secondary)]">
          {/* Logo brand */}
          <button
            onClick={() => handleLinkClick("#hero")}
            className="font-bold text-sm tracking-widest text-[var(--text-primary)] hover:opacity-75 focus:outline-none uppercase"
          >
            {siteConfig.name}.STUDIO
          </button>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full border border-[var(--border-primary)] text-[var(--text-primary)] transition-all bg-[var(--surface-glass)] focus:outline-none flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-[var(--accent-secondary)]" />
              ) : (
                <Moon className="h-4 w-4 text-[var(--accent-base)]" />
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-[var(--border-primary)] bg-[var(--surface-glass)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--text-secondary)] transition-all focus:outline-none"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col gap-1 flex-1" aria-label="Mobile Navigation">
          {navLinks.map((link, idx) => (
            <button
              key={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="mobile-nav-link opacity-0 group flex items-center justify-between py-4 border-b border-[var(--border-primary)] text-left focus:outline-none transition-all hover:pl-2"
            >
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono font-bold text-[var(--accent-secondary)] tracking-wider">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight group-hover:text-[var(--accent-secondary)] transition-colors">
                  {link.label}
                </span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-[var(--text-tertiary)] group-hover:text-[var(--accent-secondary)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          ))}
        </nav>

        {/* Footer CTA */}
        <div className="mobile-nav-footer opacity-0 flex flex-col gap-4 pt-6">
          <button
            onClick={() => handleLinkClick("#contact")}
            className="w-full py-4 rounded-2xl bg-[var(--accent-base)] text-white text-center font-bold text-sm uppercase tracking-widest hover:bg-[var(--accent-secondary)] transition-colors shadow-[0_8px_32px_rgba(123,63,242,0.3)]"
          >
            Start Your Project
          </button>

          <div className="flex items-center justify-center gap-6 pt-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">
              © {new Date().getFullYear()} {siteConfig.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
