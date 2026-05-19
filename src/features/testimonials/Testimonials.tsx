import { useState, useRef } from "react"
import { testimonialsContent } from "@/content/testimonials"
import { Typography, Section, Container, Card } from "@/components/ui"
import { animate } from "animejs"
import { ChevronRight, Quote } from "lucide-react"

export const Testimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  const cardsContainerRef = useRef<HTMLDivElement>(null)

  const handleNext = () => {
    const total = testimonialsContent.list.length
    const nextIdx = (activeIdx + 1) % total

    // Smoothly animate the active sliding out and back in at the bottom of the stack using AnimeJS
    if (cardsContainerRef.current) {
      animate(cardsContainerRef.current.querySelector(".quote-card-active")!, {
        translateX: [0, 160, 0],
        rotate: [0, 8, 0],
        opacity: [1, 0, 1],
        scale: [1, 0.9, 1],
        duration: 800,
        easing: "easeOutExpo",
        changeComplete: () => {
          setActiveIdx(nextIdx)
        }
      })
    } else {
      setActiveIdx(nextIdx)
    }
  }

  return (
    <Section id="testimonials" className="relative bg-[var(--bg-secondary)] border-y border-[var(--border-primary)]">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Trust Metrics & Section Headers */}
        <div className="lg:col-span-5 flex flex-col items-start gap-6 text-left">
          <Typography variant="label">Verified Operations</Typography>
          <Typography variant="headline" as="h2" className="!leading-[1.3]">
            {testimonialsContent.title}
          </Typography>
          <Typography variant="subhead">
            {testimonialsContent.subtitle}
          </Typography>

          {/* Luxury trust metrics cards */}
          <div className="grid grid-cols-3 gap-4 border-t border-[var(--border-primary)] pt-8 mt-4 w-full">
            {testimonialsContent.metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <span className="text-xl md:text-2xl font-bold tracking-tight text-[var(--text-primary)] font-mono">
                  {metric.value}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Premium Stacked Quotes Slider */}
        <div className="lg:col-span-7 flex flex-col items-center gap-6">
          <div 
            ref={cardsContainerRef} 
            className="relative w-full max-w-[500px] h-[340px] flex items-center justify-center"
          >
            {testimonialsContent.list.map((item, idx) => {
              // Stack offset calculations
              const isCurrent = idx === activeIdx
              const isNext = idx === (activeIdx + 1) % testimonialsContent.list.length
              const isPrev = idx === (activeIdx + 2) % testimonialsContent.list.length

              let zIndex = 10
              let scale = 0.9
              let translateY = 24
              let opacity = 0

              if (isCurrent) {
                zIndex = 30
                scale = 1
                translateY = 0
                opacity = 1
              } else if (isNext) {
                zIndex = 20
                scale = 0.94
                translateY = 12
                opacity = 0.8
              } else if (isPrev) {
                zIndex = 10
                scale = 0.88
                translateY = 24
                opacity = 0.4
              }

              return (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-all duration-500 flex items-center justify-center ${
                    isCurrent ? "quote-card-active" : ""
                  }`}
                  style={{
                    zIndex,
                    transform: `scale(${scale}) translateY(${translateY}px)`,
                    opacity,
                    pointerEvents: isCurrent ? "auto" : "none"
                  }}
                >
                  <Card className="w-full h-full flex flex-col justify-between p-8 bg-[var(--bg-primary)] border border-[var(--border-primary)] shadow-premium rounded-[28px] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-radial from-[rgba(170,59,255,0.015)] to-transparent pointer-events-none" />
                    
                    {/* Testimonial Quote details */}
                    <div className="flex flex-col items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex items-center justify-center text-[var(--accent-secondary)]">
                        <Quote className="h-4 w-4" />
                      </div>
                      <Typography variant="body" className="text-left text-[14px] leading-relaxed italic text-[var(--text-secondary)]">
                        "{item.review}"
                      </Typography>
                    </div>

                    {/* Review Author details */}
                    <div className="flex items-center gap-3 border-t border-[var(--border-primary)] pt-6 mt-6">
                      <div className="w-10 h-10 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] flex items-center justify-center font-bold text-xs font-mono border border-[var(--border-primary)]">
                        {item.avatar}
                      </div>
                      <div className="text-left">
                        <span className="text-xs uppercase tracking-widest font-bold text-[var(--text-primary)] block">
                          {item.name}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] block font-semibold mt-0.5">
                          {item.company}
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              )
            })}
          </div>

          {/* Swipe/Next trigger button */}
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border-primary)] bg-[var(--bg-primary)] hover:border-[var(--text-secondary)] text-[var(--text-primary)] transition-all font-bold text-[10px] uppercase tracking-widest focus:outline-none mt-2 shadow-soft"
          >
            <span>Next Endorsement</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

      </Container>
    </Section>
  )
}
