export interface Testimonial {
  id: string
  name: string
  company: string
  avatar: string
  review: string
}

export const testimonialsContent = {
  title: "Archived Endorsements",
  subtitle: "Quiet confidence shared by leading creative directors, startup founders, and high-fashion labels.",
  metrics: [
    { value: "50+ Commits", label: "Completed Projects" },
    { value: "95%", label: "Satisfaction rate" },
    { value: "4.9 ★", label: "Global Rating" }
  ],
  list: [
    {
      id: "review-1",
      name: "Marcus Sterling",
      company: "Aether Capital Holdings",
      avatar: "M",
      review: "UIC has set a new gold standard for executive branding. The combination of an editorial modular portfolio and custom steel NFC cards makes a memorable impression in high-level private meetings. Absolute class."
    },
    {
      id: "review-2",
      name: "Evelyn Moreau",
      company: "Maison de Couture",
      avatar: "E",
      review: "The luxury whitespace, typographic attention, and fluid responsiveness of our agency's portfolio is superb. It loads under 140ms on modern iPhones, representing our brand identity precisely."
    },
    {
      id: "review-3",
      name: "Jared Vance",
      company: "Apex Developer Labs",
      avatar: "J",
      review: "Engineering excellence. The structural CMS integration was smooth, letting our operations team update case study archives without touching frontend React layouts. A masterpiece."
    }
  ] as Testimonial[]
}
