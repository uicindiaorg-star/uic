import { useState } from "react"
import { servicesContent } from "@/content/services"
import { Typography, Section, Container, Card } from "@/components/ui"
import { Cpu, Zap, Layers, Boxes, Sparkles, Plus, Minus } from "lucide-react"

export const Services = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const iconMap = {
    Cpu: Cpu,
    Zap: Zap,
    Layers: Layers,
    Boxes: Boxes,
    Sparkles: Sparkles
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  // Bento layout mapping of grid column spans
  const bentoGridSpans = [
    "lg:col-span-8 md:col-span-2", // Card 1: Portfolios (Large)
    "lg:col-span-4 md:col-span-1",  // Card 2: Business (Small)
    "lg:col-span-4 md:col-span-1",  // Card 3: NFC Cards (Small)
    "lg:col-span-4 md:col-span-1",  // Card 4: SEO (Small)
    "lg:col-span-4 md:col-span-1",  // Card 5: Dashboards (Small)
    "lg:col-span-8 md:col-span-2"  // Card 6: Custom Apps (Large)
  ]

  return (
    <Section id="services" className="relative">
      
      {/* Subtle purple background ambient orbs */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] bg-radial from-[#7b3ff2]/5 to-transparent blur-[90px] pointer-events-none" />

      <Container className="flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-start text-left max-w-2xl gap-4">
          <Typography variant="label">Expertise Directory</Typography>
          <Typography variant="headline" as="h2">
            {servicesContent.title}
          </Typography>
          <Typography variant="subhead">
            {servicesContent.subtitle}
          </Typography>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mt-4">
          {servicesContent.list.map((service, idx) => {
            const IconComponent = iconMap[service.iconName as keyof typeof iconMap] || Sparkles
            const isExpanded = expandedId === service.id
            const spanClass = bentoGridSpans[idx % bentoGridSpans.length]

            return (
              <div 
                key={service.id} 
                className={`${spanClass} transition-all duration-300`}
              >
                <Card 
                  className={`relative flex flex-col justify-between items-start gap-6 border border-[var(--border-primary)] rounded-[32px] p-8 transition-all duration-500 hover:border-[#7b3ff2]/30 hover:shadow-premium group bg-[var(--surface-glass)] backdrop-blur-md cursor-pointer ${
                    isExpanded ? "border-[#7b3ff2]/40 bg-[var(--surface-glass-hover)]" : ""
                  }`}
                  onClick={() => toggleExpand(service.id)}
                >
                  {/* Subtle inner glass shine */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/[0.01] opacity-50 rounded-[32px] pointer-events-none" />

                  <div className="w-full">
                    <div className="flex justify-between items-center w-full mb-6">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[var(--surface-elevated)] border border-[var(--border-primary)] text-[var(--accent-secondary)] group-hover:scale-105 transition-transform duration-300">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      
                      <button
                        className="p-2 rounded-full border border-[var(--border-primary)] hover:border-[var(--text-secondary)] transition-colors focus:outline-none bg-[var(--surface-glass)]"
                        aria-label={isExpanded ? "Collapse highlights" : "Inspect highlights"}
                      >
                        {isExpanded ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                      </button>
                    </div>

                    <Typography variant="headline" as="h3" className="text-xl font-bold mb-3 text-left tracking-tight">
                      {service.title}
                    </Typography>

                    <Typography variant="body" className="text-xs text-left leading-relaxed text-[var(--text-secondary)]">
                      {service.desc}
                    </Typography>

                    {/* Expand highlights */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isExpanded ? "max-h-[220px] opacity-100 mt-6" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="border-t border-[var(--border-primary)] pt-4 flex flex-col gap-2.5 text-left">
                        <span className="text-[9px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold mb-1">
                          Operational Parameters
                        </span>
                        {service.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]">
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)] shrink-0" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] mt-4 select-none">
                    {isExpanded ? "[ Click to collapse ]" : "[ Click to inspect parameters ]"}
                  </div>
                </Card>
              </div>
            )
          })}
        </div>

      </Container>
    </Section>
  )
}
