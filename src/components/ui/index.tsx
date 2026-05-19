import * as React from "react"
import { cn } from "@/lib/utils"

/* ═══ Container ═══ */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("editorial-container", className)} {...props} />
  )
)
Container.displayName = "Container"

/* ═══ Section ═══ */
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string
}
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, id, ...props }, ref) => (
    <section
      ref={ref}
      id={id}
      className={cn("section-wrapper", className)}
      {...props}
    />
  )
)
Section.displayName = "Section"

/* ═══ Typography ═══ */
export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant: "display" | "headline" | "subhead" | "body" | "label" | "mono"
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div"
}
export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, ...props }, ref) => {
    const Component = as || (variant === "display" ? "h1" : variant === "headline" ? "h2" : "p")
    const variantClasses: Record<string, string> = {
      display: "font-sans font-bold tracking-tight text-[var(--text-primary)] leading-[1.02] text-[clamp(3rem,8vw,7rem)]",
      headline: "font-sans font-semibold tracking-tight text-[var(--text-primary)] leading-[1.25] text-[clamp(1.8rem,4vw,3.2rem)]",
      subhead: "font-sans font-normal text-[var(--text-secondary)] leading-[1.65] text-[clamp(1rem,1.5vw,1.2rem)]",
      body: "font-sans text-[var(--text-secondary)] leading-[1.7] text-[clamp(0.875rem,1.1vw,1rem)]",
      label: "font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--accent-secondary)]",
      mono: "font-mono text-xs uppercase tracking-wider font-semibold text-[var(--text-tertiary)]"
    }
    return (
      <Component
        ref={ref as any}
        className={cn(variantClasses[variant], className)}
        {...props}
      />
    )
  }
)
Typography.displayName = "Typography"

/* ═══ Divider ═══ */
export const Divider = ({ className }: { className?: string }) => (
  <hr className={cn("border-t border-white/[0.06] my-12", className)} />
)

/* ═══ Badge ═══ */
export const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cn(
    "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full",
    "text-[10px] font-semibold uppercase tracking-[0.15em]",
    "bg-[var(--accent-base)]/10 text-[var(--accent-secondary)] border border-[var(--accent-base)]/20",
    className
  )}>
    {children}
  </span>
)

/* ═══ Glass Card ═══ */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean
}
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "glass-card p-8",
        !hoverEffect && "hover:transform-none hover:border-[var(--border-primary)] hover:bg-white/[0.02] hover:shadow-premium",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"
