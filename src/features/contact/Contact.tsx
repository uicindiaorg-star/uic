import { useState } from "react"
import { contactContent } from "@/content/contact"
import { Typography, Section, Container, Card } from "@/components/ui"
import { Button } from "@/components/ui/button"
import { Send, CheckCircle2, ArrowUpRight, CalendarRange } from "lucide-react"

export const Contact = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [projectType, setProjectType] = useState("")
  const [budget, setBudget] = useState("")
  const [message, setMessage] = useState("")
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return

    setIsSubmitting(true)
    
    // Simulate luxury API POST logger
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      
      // Reset values
      setName("")
      setEmail("")
      setProjectType("")
      setBudget("")
      setMessage("")
    }, 1200)
  }

  return (
    <Section id="contact" className="relative">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Heading & Discovery book calls options */}
        <div className="lg:col-span-5 flex flex-col items-start gap-6 text-left">
          <Typography variant="label">Commence Project</Typography>
          <Typography variant="headline" as="h2" className="!leading-[1.3]">
            {contactContent.title}
          </Typography>
          <Typography variant="subhead">
            {contactContent.subtitle}
          </Typography>

          <div className="flex flex-col gap-3 mt-4 w-full">
            <span className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
              Secondary Coordinates
            </span>
            
            {/* Book Discovery Call Button */}
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 rounded-[20px] border border-[var(--border-primary)] bg-[var(--bg-secondary)] hover:border-[var(--text-secondary)] transition-all group w-full"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--border-primary)] flex items-center justify-center text-[var(--accent-secondary)]">
                  <CalendarRange className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest font-bold text-[var(--text-primary)] block">
                    Book Discovery Call
                  </span>
                  <span className="text-[10px] text-[var(--text-secondary)] block mt-0.5">
                    Discuss structural layouts live (15 min)
                  </span>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-[var(--text-tertiary)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          <div className="flex flex-col gap-2 mt-4 w-full">
            <span className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
              Social coordinates
            </span>
            <div className="flex flex-wrap gap-4">
              {contactContent.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <span>{social.name}</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Premium Floating Inputs Form */}
        <div className="lg:col-span-7 w-full">
          <Card className="p-8 border border-[var(--border-primary)] shadow-premium rounded-[36px]" hoverEffect={false}>
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4 animate-in fade-in duration-500">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-primary)] mb-2">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <Typography variant="headline" as="h3" className="text-xl font-bold">
                  Commission Form Logged
                </Typography>
                <p className="text-xs text-[var(--text-secondary)] max-w-sm">
                  {contactContent.successMessage}
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 rounded-full border-[var(--border-primary)]"
                >
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
                      {contactContent.fields.name.label}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-primary)] text-xs font-semibold text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-secondary)] transition-all"
                      placeholder={contactContent.fields.name.placeholder}
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
                      {contactContent.fields.email.label}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-primary)] text-xs font-semibold text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-secondary)] transition-all"
                      placeholder={contactContent.fields.email.placeholder}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Project Type Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
                      {contactContent.fields.projectType.label}
                    </label>
                    <input
                      type="text"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-primary)] text-xs font-semibold text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-secondary)] transition-all"
                      placeholder={contactContent.fields.projectType.placeholder}
                    />
                  </div>

                  {/* Estimated Budget Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
                      {contactContent.fields.budget.label}
                    </label>
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-primary)] text-xs font-semibold text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-secondary)] transition-all"
                      placeholder={contactContent.fields.budget.placeholder}
                    />
                  </div>
                </div>

                {/* Brief Message Details */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
                    {contactContent.fields.message.label}
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-primary)] text-xs font-semibold text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-secondary)] transition-all resize-none"
                    placeholder={contactContent.fields.message.placeholder}
                  />
                </div>

                {/* Submit trigger button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 mt-2 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 font-semibold flex items-center justify-center gap-2 uppercase text-xs tracking-wider font-sans"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{isSubmitting ? "Submitting Commission..." : "Initiate Project"}</span>
                </Button>
              </form>
            )}
          </Card>
        </div>

      </Container>
    </Section>
  )
}
