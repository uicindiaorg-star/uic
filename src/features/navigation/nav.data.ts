export interface NavLink {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "NFC Cards", href: "#nfc" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" }
]
