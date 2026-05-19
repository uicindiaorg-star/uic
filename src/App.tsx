import { useEffect, useState } from "react"
import { Navbar } from "@/features/navigation/Navbar"
import { Hero } from "@/features/hero/Hero"
import { NfcShowcase } from "@/features/nfc/NfcShowcase"
import { PortfolioBuilder } from "@/features/portfolio/PortfolioBuilder"
import { Services } from "@/features/services/Services"
import { Works } from "@/features/works/Works"
import { Testimonials } from "@/features/testimonials/Testimonials"
import { Contact } from "@/features/contact/Contact"
import { Footer } from "@/features/footer/Footer"
import { animate, stagger, set } from "animejs"
import "@/styles/globals.css"
import "./App.css"

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as 'light' | 'dark'
      return saved || "dark"
    }
    return "dark"
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
      root.classList.remove("light")
    } else {
      root.classList.add("light")
      root.classList.remove("dark")
    }
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  useEffect(() => {
    // Dynamic reveal animation for visible sections on load/scroll
    const handleScrollReveal = () => {
      const elements = document.querySelectorAll(".section-wrapper")
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const isVisible = rect.top <= window.innerHeight * 0.85
        if (isVisible && !el.classList.contains("revealed")) {
          el.classList.add("revealed")
          
          // Animate section entry smoothly using AnimeJS
          animate(el, {
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 900,
            easing: "easeOutExpo"
          })
        }
      })
    }

    window.addEventListener("scroll", handleScrollReveal, { passive: true })
    // Run once on load to reveal initial visible viewport elements
    handleScrollReveal()

    return () => window.removeEventListener("scroll", handleScrollReveal)
  }, [])

  return (
    <div className="font-editorial-sans min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative">
      {/* Apple grain texture overlay */}
      <div className="grain-overlay" />

      {/* Background elegant subtle decoration glow rings */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-radial from-[rgba(123,63,242,0.08)] to-transparent blur-[80px] pointer-events-none z-0"></div>
      <div className="absolute top-[35%] right-[10%] w-[600px] h-[600px] rounded-full bg-radial from-[rgba(176,132,255,0.05)] to-transparent blur-[90px] pointer-events-none z-0"></div>

      {/* Premium Navigation Header */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {/* Main Single Page Scroll Sections */}
      <main className="relative z-10">
        <Hero />
        <NfcShowcase />
        <PortfolioBuilder />
        <Services />
        <Works />
        <Testimonials />
        <Contact />
      </main>

      {/* Accessible CMS-editable Footer */}
      <Footer />
    </div>
  )
}

export default App
