import { useEffect, useRef, useState } from "react"
import { Section } from "@/components/ui"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { animate } from "animejs"

const archiveData = [
  { title: "Premium NFC Identity", category: "NFC Business Card", image: "/images/nfccard.webp" },
  { title: "Brand Identity System", category: "Identity + Visual Design", image: "/images/Brand Identity System.webp" },
  { title: "Digital Presence Launch", category: "Website + Portfolio", image: "/images/digital-launch2.webp" },
  { title: "Creator Profile Experience", category: "Personal Branding", image: "/images/Creator Profile Experience.webp" },
  { title: "Business Identity Package", category: "Brand + NFC Experience", image: "/images/Business Identity Package.webp" },
  { title: "Luxury Portfolio System", category: "Creative Showcase", image: "/images/Luxury Portfolio System.png" }
]

export const Works = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  // Use AnimeJS for Swap and Navigate
  const handleNavigate = (direction: 'next' | 'prev' | 'first') => {
    const total = archiveData.length
    let nextIdx = activeIdx
    
    if (direction === 'next') {
      nextIdx = activeIdx + 1 >= total ? 0 : activeIdx + 1
    } else if (direction === 'prev') {
      nextIdx = activeIdx - 1 < 0 ? 0 : activeIdx - 1
    } else if (direction === 'first') {
      nextIdx = 0
    }
    
    if (nextIdx === activeIdx) return

    setActiveIdx(nextIdx)

    // AnimeJS Navigation Swap Animation
    if (trackRef.current) {
      // Calculate offset based on card width + gap (620px + 32px)
      const offset = nextIdx * (620 + 32)
      
      animate(trackRef.current, {
        translateX: -offset,
        duration: 900,
        easing: "easeOutExpo"
      })
    }
  }

  // Auto-play Animation
  useEffect(() => {
    const timer = setInterval(() => {
      handleNavigate('next')
    }, 4000)

    return () => clearInterval(timer)
  }, [activeIdx])

  return (
    <Section id="work" ref={sectionRef} className="section-wrapper opacity-0 relative bg-[var(--bg-primary)] text-[var(--text-primary)] border-y border-[var(--border-primary)] py-32 overflow-hidden">
      
      {/* BACKGROUND: Soft grain */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay z-0" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' 
        }} 
      />
      
      {/* BACKGROUND: Editorial lines */}
      <div className="absolute top-0 bottom-0 left-[8vw] w-[1px] bg-[var(--border-primary)] pointer-events-none z-0 hidden lg:block" />
      <div className="absolute top-0 bottom-0 left-[48vw] w-[1px] bg-[var(--border-primary)] pointer-events-none z-0 hidden lg:block" />

      {/* BACKGROUND: Subtle shader motion / ambient glow */}
      <div className="absolute top-[20%] left-[30%] w-[600px] h-[600px] bg-radial from-[var(--accent-glow-strong)] to-transparent blur-[80px] pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center h-full w-full">
        
        {/* FIXED LEFT INTRO PANEL */}
        <div className="w-full lg:w-[45vw] h-full flex flex-col justify-center pl-6 lg:pl-[8vw] pr-6 lg:pr-16 relative z-20 pb-16 lg:pb-0">
          
          {/* Subtle gradient to fade cards passing behind text on desktop */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)] to-transparent pointer-events-none hidden lg:block" />
          
          <div className="relative z-10 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xs font-mono border border-[var(--border-primary)] rounded-full px-3 py-1 bg-[var(--surface-glass)] backdrop-blur-md text-[var(--text-primary)]">○ 03</span>
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">Commission Archive</span>
            </div>
            
            <h2 
              className="font-bold tracking-tight text-[var(--text-primary)] !leading-[1.05]"
              style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}
            >
              Archived<br />Commissions<br />of UIC
            </h2>
            
            <p className="mt-8 text-[1.1rem] text-[var(--text-secondary)] max-w-sm leading-relaxed">
              A curated collection of completed identity systems, NFC experiences and digital commissions.
            </p>

            {/* AnimeJS Interactive Navigation Controls */}
            <div className="flex items-center gap-4 mt-12">
              <button 
                onClick={() => handleNavigate('prev')}
                disabled={activeIdx === 0}
                className="w-14 h-14 rounded-full border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[var(--text-primary)] bg-[var(--surface-glass)] backdrop-blur-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button 
                onClick={() => handleNavigate('next')}
                className="w-14 h-14 rounded-full border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[var(--text-primary)] bg-[var(--surface-glass)] backdrop-blur-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <span className="ml-4 text-xs font-mono font-bold text-[var(--text-tertiary)]">
                {String(activeIdx + 1).padStart(2, '0')} / {String(archiveData.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* SCROLLING / SWAPPING TRACK */}
        <div className="w-full lg:w-[55vw] overflow-visible relative h-[78vh] min-h-[500px]">
          <div 
            ref={trackRef}
            className="absolute top-0 left-0 h-full flex flex-row items-center gap-[32px] will-change-transform pl-6 lg:pl-0 pr-[8vw]"
          >
            {/* ARCHIVE CARDS */}
            {archiveData.map((item, idx) => {
              const formattedIdx = String(idx + 1).padStart(2, '0')
              const isActive = idx === activeIdx;

              return (
                <div 
                  key={idx}
                  className={`flex-shrink-0 relative group cursor-pointer transition-all duration-700 ease-[cubic-bezier(.25,.1,.25,1)] flex flex-col p-4 ${isActive ? 'scale-100 z-30' : 'scale-[0.95] opacity-60 z-10 hover:opacity-100'}`}
                  onClick={() => {
                    if (idx > activeIdx) handleNavigate('next');
                    if (idx < activeIdx) handleNavigate('prev');
                  }}
                  style={{
                    width: 'min(85vw, 620px)',
                    height: '100%',
                    background: isActive ? 'var(--surface-elevated)' : 'var(--surface-glass)',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: isActive ? 'var(--shadow-card-hover)' : 'var(--shadow-cinematic)',
                  }}
                >
                  {/* Top: Large Visual */}
                  <div className="w-full flex-grow overflow-hidden rounded-[20px] bg-[var(--bg-secondary)] relative">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(.25,.1,.25,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  
                  {/* Bottom: Glass Metadata Block */}
                  <div className="h-[28%] shrink-0 pt-6 px-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start w-full">
                      <span className="text-sm font-mono font-bold text-[var(--text-tertiary)]">{formattedIdx}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] border border-[var(--border-primary)] rounded-full px-3 py-1 bg-[var(--surface-glass)]">2026</span>
                    </div>
                    
                    <div className="flex justify-between items-end w-full">
                      <div className="flex flex-col gap-1.5 pr-2">
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[var(--text-primary)]">{item.title}</h3>
                        <span className="text-[10px] md:text-[11px] uppercase tracking-widest text-[var(--text-secondary)] font-semibold">{item.category}</span>
                      </div>
                      
                      <div className={`w-12 h-12 shrink-0 rounded-full border border-[var(--border-primary)] flex items-center justify-center transition-colors duration-500 bg-[var(--surface-glass)] ${isActive ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]' : 'text-[var(--text-primary)] group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-primary)]'}`}>
                        <ArrowRight className={`w-5 h-5 transition-transform duration-500 ease-[cubic-bezier(.25,.1,.25,1)] ${isActive ? 'rotate-0' : '-rotate-45 group-hover:rotate-0'}`} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}
