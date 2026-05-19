import { workContent } from "@/content/work"
import { Typography, Section, Container } from "@/components/ui"
import { Button } from "@/components/ui/button"
import { FolderGit2 } from "lucide-react"

export const Works = () => {
  const projects = workContent.projects

  return (
    <Section id="work" className="relative min-h-screen flex flex-col justify-center py-6 bg-[var(--bg-primary)] overflow-hidden">
      <Container className="flex flex-col justify-center gap-6 md:gap-8 w-full max-w-7xl mx-auto">
        
        {/* Centered Minimalist Section Header */}
        <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto">
          <Typography variant="label">Commission Showcase</Typography>
          <Typography variant="headline" as="h2" className="!leading-[1.2] text-3xl md:text-5xl font-bold tracking-tight">
            {workContent.title}
          </Typography>
          <Typography variant="subhead" className="text-xs md:text-sm text-[var(--text-secondary)]">
            {workContent.subtitle}
          </Typography>
        </div>

        {/* Premium Massive Full-Screen Coverflow Card Gallery */}
        <div className="flex flex-row overflow-x-auto gap-6 md:gap-8 pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory -mx-6 px-6 md:px-0 w-full justify-start md:justify-center items-center">
          {projects.map((project, idx) => {
            const middleIdx = Math.floor(projects.length / 2)
            const isMiddle = idx === middleIdx

            return (
              <div 
                key={project.id}
                className={`flex-shrink-0 w-[90vw] sm:w-[480px] md:w-[540px] lg:w-[580px] h-[72vh] min-h-[580px] max-h-[700px] snap-center flex flex-col rounded-[40px] bg-[var(--bg-secondary)] overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-glow group relative ${
                  isMiddle 
                    ? "scale-[1.02] md:scale-[1.03] border-2 border-[var(--accent-base)] shadow-glow" 
                    : "scale-[0.98] border border-[var(--border-primary)] opacity-90 hover:border-[var(--accent-base)]"
                }`}
              >
                {/* Top Half: Massive Brand Colored Mockup Panel (46% of card height) */}
                <div 
                  className="h-[46%] w-full flex justify-center items-center relative overflow-hidden transition-all duration-500"
                  style={{ backgroundColor: project.color }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10 opacity-40 pointer-events-none" />
                  
                  {/* Floating Mini Mockup Showcase (Larger sizing for massive look) */}
                  <div 
                    className="w-[78%] aspect-[1.586/1] rounded-2xl flex flex-col justify-between p-5 md:p-6 shadow-premium border border-white/5 relative overflow-hidden bg-black/15 group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                    style={{ color: project.category === "portfolio" ? "#fafaf8" : "#111111" }}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                        {project.category}
                      </span>
                      <div className="w-2 h-2 rounded-full bg-current opacity-70" />
                    </div>

                    <div className="text-left">
                      <Typography variant="mono" as="span" className="font-bold text-[14px] md:text-[16px] tracking-wider block text-current !leading-tight">
                        {project.title}
                      </Typography>
                      <span className="text-[8px] uppercase tracking-widest opacity-50 block mt-1 text-current">
                        Validated Project Code
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Half: Full Work details with generous typography */}
                <div className="flex-grow flex flex-col justify-between p-8 md:p-10 text-left bg-[var(--bg-secondary)] relative z-10">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="h-4 w-4 text-[var(--text-tertiary)]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">
                        {project.industry}
                      </span>
                    </div>

                    <Typography variant="headline" as="h3" className="text-xl md:text-2xl font-bold tracking-tight text-[var(--text-primary)] !leading-[1.25]">
                      {project.title}
                    </Typography>

                    <Typography variant="body" className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3 h-[60px] overflow-hidden">
                      {project.description}
                    </Typography>
                  </div>

                  <div className="w-full mt-4">
                    {/* Commission Metric Summary Row */}
                    <div className="flex justify-between items-center w-full border-t border-[var(--border-primary)] pt-4 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] font-sans">
                        Commission Metric
                      </span>
                      <span className="text-sm font-bold font-mono text-[var(--accent-base)]">
                        {project.result}
                      </span>
                    </div>

                    <Button
                      size="default"
                      variant="outline"
                      className="w-full rounded-full py-3 text-[11px] font-bold uppercase tracking-widest border-[var(--border-primary)] hover:border-[var(--text-secondary)] text-[var(--text-primary)] bg-transparent transition-all"
                    >
                      View Case Study
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
