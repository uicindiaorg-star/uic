import { siteConfig } from "@/content/site"
import { navLinks } from "../navigation/nav.data"
import { Typography, Container } from "@/components/ui"
import { ArrowUpRight } from "lucide-react"

export const Footer = () => {
  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="border-t border-[var(--border-primary)] bg-[var(--bg-secondary)] py-16 md:py-24 text-left">
      
      {/* Top Block: Let's Build Something Meaningful CTA */}
      <Container className="border-b border-[var(--border-primary)] pb-12 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <Typography variant="headline" as="h3" className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
            Let's Build Something <span className="text-[var(--accent-secondary)] block md:inline font-sans">Exceptional.</span>
          </Typography>
          
          <button
            onClick={() => handleLinkClick("#contact")}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 transition-all font-bold text-xs uppercase tracking-widest focus:outline-none"
          >
            <span>Start Project</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </Container>

      {/* Middle Block: Navigation Directory */}
      <Container className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        
        {/* Brand summary details */}
        <div className="md:col-span-6 flex flex-col items-start gap-4">
          <span className="font-bold text-sm tracking-widest text-[var(--text-primary)] uppercase">
            {siteConfig.name}.STUDIO
          </span>
          <Typography variant="body" className="max-w-xs text-xs text-[var(--text-secondary)] leading-relaxed">
            {siteConfig.description}
          </Typography>
        </div>

        {/* Directory links */}
        <div className="md:col-span-3 flex flex-col items-start gap-4">
          <span className="text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] font-bold">
            Directory
          </span>
          <nav className="flex flex-col gap-3" aria-label="Footer Navigation">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors focus:outline-none text-left"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Coordinates */}
        <div className="md:col-span-3 flex flex-col items-start gap-4">
          <span className="text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] font-bold">
            Studio Coordinates
          </span>
          <div className="flex flex-col gap-3 text-xs font-semibold text-[var(--text-secondary)]">
            <span>Global Operations</span>
            <span>London × Geneva × Tokyo</span>
            <a 
              href="mailto:design@uic.studio" 
              className="text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors mt-1 font-bold underline"
            >
              design@uic.studio
            </a>
          </div>
        </div>

      </Container>

      {/* Bottom Block: Logo, Socials, Copyright */}
      <Container className="border-t border-[var(--border-primary)] pt-8 mt-12 md:mt-16 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">
        <span>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </span>
        
        <div className="flex gap-6">
          <a href="https://twitter.com" target="_blank" className="hover:text-[var(--text-primary)] transition-colors">Twitter</a>
          <a href="https://linkedin.com" target="_blank" className="hover:text-[var(--text-primary)] transition-colors">LinkedIn</a>
          <a href="https://instagram.com" target="_blank" className="hover:text-[var(--text-primary)] transition-colors">Instagram</a>
        </div>
      </Container>
    </footer>
  )
}
