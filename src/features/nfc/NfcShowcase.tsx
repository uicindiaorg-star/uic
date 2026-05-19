import { useState, useRef } from "react"
import { nfcContent } from "@/content/nfc"
import { Typography, Section, Container } from "@/components/ui"
import { Button } from "@/components/ui/button"
import { animate } from "animejs"
import { CreditCard, Check, Radio, Cpu, Palette, Paintbrush, ChevronDown, Upload, Trash2 } from "lucide-react"

export const NfcShowcase = () => {
  const [selectedMat, setSelectedMat] = useState(nfcContent.materials[0])
  const [userName, setUserName] = useState("Micheal Jackson")
  const [userTitle, setUserTitle] = useState("Singer")
  const [isTapped, setIsTapped] = useState(false)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  // Custom design state
  const [customPrimary, setCustomPrimary] = useState("#1a0533")
  const [customSecondary, setCustomSecondary] = useState("#7b3ff2")
  const [gradientDir, setGradientDir] = useState("135deg")
  const [finishType, setFinishType] = useState<"matte" | "glossy" | "brushed">("glossy")
  const [showCustomPanel, setShowCustomPanel] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Limit file size to 3MB
    if (file.size > 3 * 1024 * 1024) {
      alert("Artwork file size is too large (maximum 3MB).")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setUploadedImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setUploadedImage(null)
  }

  // Download Build spec state
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState("")

  const handleDownload = () => {
    if (isGenerating) return
    setIsGenerating(true)

    const steps = [
      "Initializing Laser Engraver Setup...",
      `Configuring Core Material: ${selectedMat.name}...`,
      "Mapping Dynamic Digital vCard Profile...",
      "Encoding Contact Verification Key...",
      "Compiling 3D Model Coordinates...",
      "Generating NFC Card Preview Image..."
    ]

    let stepIdx = 0
    setGenerationStep(steps[0])

    const interval = setInterval(() => {
      stepIdx++
      if (stepIdx < steps.length) {
        setGenerationStep(steps[stepIdx])
      } else {
        clearInterval(interval)

        // ═══ CANVAS CARD IMAGE GENERATION ═══
        const canvas = document.createElement("canvas");
        canvas.width = 1015;
        canvas.height = 640;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          setIsGenerating(false);
          return;
        }

        const drawRoundedRect = (x: number, y: number, w: number, h: number, r: number) => {
          ctx.beginPath();
          ctx.moveTo(x + r, y);
          ctx.arcTo(x + w, y, x + w, y + h, r);
          ctx.arcTo(x + w, y + h, x, y + h, r);
          ctx.arcTo(x, y + h, x, y, r);
          ctx.arcTo(x, y, x + w, y, r);
          ctx.closePath();
        };

        // Background Gradient
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        if (selectedMat.id === "black") {
          gradient.addColorStop(0, "#121318");
          gradient.addColorStop(1, "#1e2029");
        } else if (selectedMat.id === "gold") {
          gradient.addColorStop(0, "#cf9e53");
          gradient.addColorStop(0.5, "#ecd099");
          gradient.addColorStop(1, "#c49144");
        } else if (selectedMat.id === "silver") {
          gradient.addColorStop(0, "#e5e4e7");
          gradient.addColorStop(1, "#f4f3f6");
        } else {
          gradient.addColorStop(0, customPrimary);
          gradient.addColorStop(1, customSecondary);
        }

        drawRoundedRect(0, 0, canvas.width, canvas.height, 48);
        ctx.fillStyle = gradient;
        ctx.fill();

        const drawDetailsAndDownload = () => {
          // Brushed texture overlay
          ctx.globalAlpha = 1.0;
          const opacity = selectedMat.id === "gold" ? 0.15 : selectedMat.id === "silver" ? 0.04 : 0.08;
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 1.2;
          for (let i = 0; i < canvas.width; i += 4) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
          }

          // Inset border
          ctx.strokeStyle = selectedMat.id === "gold" ? "rgba(43, 30, 6, 0.25)" : "rgba(255, 255, 255, 0.15)";
          ctx.lineWidth = 2.5;
          drawRoundedRect(16, 16, canvas.width - 32, canvas.height - 32, 38);
          ctx.stroke();

          // Card Top Row Logo
          const cardTextCol = selectedMat.id === "gold" ? "#2b1e06" : selectedMat.id === "silver" ? "#1c1c1f" : "#ffffff";
          ctx.fillStyle = cardTextCol;
          ctx.globalAlpha = 0.85;

          // Logo mark
          ctx.beginPath();
          ctx.arc(70, 70, 10, 0, Math.PI * 2);
          ctx.fill();

          ctx.font = "bold 22px Courier New, monospace";
          ctx.fillText("UIC CARD", 95, 78);

          // NFC Wave Active icon
          ctx.font = "bold 14px Arial, sans-serif";
          ctx.fillText("NFC ACTIVE", canvas.width - 180, 78);

          // Microchip component
          const chipX = 70;
          const chipY = 200;
          const chipW = 120;
          const chipH = 90;

          const chipGrad = ctx.createLinearGradient(chipX, chipY, chipX + chipW, chipY + chipH);
          if (selectedMat.id === "gold") {
            chipGrad.addColorStop(0, "#f3e5b3");
            chipGrad.addColorStop(0.5, "#d4af37");
            chipGrad.addColorStop(1, "#aa8c2c");
          } else {
            chipGrad.addColorStop(0, "#f5f5f5");
            chipGrad.addColorStop(0.5, "#d0d0d0");
            chipGrad.addColorStop(1, "#a0a0a0");
          }

          ctx.globalAlpha = 1.0;
          drawRoundedRect(chipX, chipY, chipW, chipH, 14);
          ctx.fillStyle = chipGrad;
          ctx.fill();
          ctx.strokeStyle = "rgba(0,0,0,0.18)";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Gold/Silver chip wire patterns
          ctx.strokeStyle = "rgba(0,0,0,0.22)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(chipX + chipW / 2, chipY);
          ctx.lineTo(chipX + chipW / 2, chipY + chipH);
          ctx.moveTo(chipX, chipY + chipH / 2);
          ctx.lineTo(chipX + chipW, chipY + chipH / 2);
          ctx.stroke();

          // Card Owner Name and Title (Engraved text)
          ctx.fillStyle = cardTextCol;
          ctx.shadowColor = selectedMat.id === "gold" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
          ctx.shadowBlur = 1.5;
          ctx.shadowOffsetX = 1;
          ctx.shadowOffsetY = 1.5;

          // Draw Owner Name
          ctx.font = "bold 34px 'Courier New', Courier, monospace";
          ctx.fillText(userName.toUpperCase(), 70, 510);

          // Draw Owner Title
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.fillStyle = selectedMat.id === "gold" ? "rgba(43, 30, 6, 0.65)" : "rgba(255, 255, 255, 0.55)";
          ctx.font = "bold 15px Arial, sans-serif";
          ctx.fillText(userTitle.toUpperCase(), 70, 550);

          // Download Canvas Image as PNG
          const dataUrl = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.download = `${userName.toLowerCase().replace(/\s+/g, '_')}_nfc_card.png`;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Reset generation state
          setTimeout(() => {
            setIsGenerating(false)
            setGenerationStep("")
          }, 1200)
        };

        // Draw Artwork or trigger direct compilation
        if (selectedMat.id === "custom" && uploadedImage) {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            ctx.save();
            drawRoundedRect(0, 0, canvas.width, canvas.height, 48);
            ctx.clip();
            ctx.globalAlpha = 0.75;

            // Cover fill
            const imgRatio = img.width / img.height;
            const canvasRatio = canvas.width / canvas.height;
            let drawW = canvas.width;
            let drawH = canvas.height;
            let drawX = 0;
            let drawY = 0;

            if (imgRatio > canvasRatio) {
              drawW = canvas.height * imgRatio;
              drawX = (canvas.width - drawW) / 2;
            } else {
              drawH = canvas.width / imgRatio;
              drawY = (canvas.height - drawH) / 2;
            }

            ctx.drawImage(img, drawX, drawY, drawW, drawH);
            ctx.restore();

            drawDetailsAndDownload();
          };
          img.src = uploadedImage;
        } else {
          drawDetailsAndDownload();
        }
      }
    }, 850)
  }

  const cardMockupRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardMockupRef.current) return
    const rect = cardMockupRef.current.getBoundingClientRect()

    // Rotation calculations
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const normX = x / (rect.width / 2)
    const normY = y / (rect.height / 2)

    animate(cardMockupRef.current, {
      rotateX: -normY * 20,
      rotateY: normX * 20,
      scale: 1.04,
      duration: 150,
      easing: "easeOutQuad"
    })

    // Dynamic metallic light sheen calculations
    const posX = ((e.clientX - rect.left) / rect.width) * 100
    const posY = ((e.clientY - rect.top) / rect.height) * 100
    cardMockupRef.current.style.setProperty("--mouse-x", `${posX}%`)
    cardMockupRef.current.style.setProperty("--mouse-y", `${posY}%`)
  }

  const handleMouseLeave = () => {
    if (!cardMockupRef.current) return
    animate(cardMockupRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 800,
      easing: "easeOutElastic(1, 0.75)"
    })
    cardMockupRef.current.style.setProperty("--mouse-x", "50%")
    cardMockupRef.current.style.setProperty("--mouse-y", "50%")
  }

  // NFC tap simulation waves trigger
  const handleCardTap = () => {
    if (isTapped) return
    setIsTapped(true)

    animate(".nfc-ripple-ring", {
      scale: [0.8, 3.8],
      opacity: [0.8, 0],
      delay: (_el: any, i: number) => i * 180,
      duration: 1300,
      easing: "easeOutExpo",
      complete: () => {
        setIsTapped(false)
      }
    })
  }

  // Pick color base properties based on selected metal material
  const getCardMaterialStyles = () => {
    switch (selectedMat.id) {
      case "black":
        return {
          bg: "linear-gradient(135deg, #121318 0%, #1e2029 100%)",
          color: "#fafaf8",
          chipColor: "bg-[#e5e4e7] border-white/20 text-[#222]",
          brushedOpacity: "opacity-[0.08]",
          laserEngrave: "shadow-laser-dark text-white/95",
          highlightColor: "rgba(255, 255, 255, 0.12)"
        }
      case "gold":
        return {
          bg: "linear-gradient(135deg, #cf9e53 0%, #ecd099 50%, #c49144 100%)",
          color: "#1c1405",
          chipColor: "bg-[#ffd700] border-amber-400 text-amber-950",
          brushedOpacity: "opacity-[0.15]",
          laserEngrave: "shadow-laser-gold text-[#2b1e06]",
          highlightColor: "rgba(255, 255, 255, 0.35)"
        }
      case "custom": {
        // Auto-detect if the card is light or dark for text contrast
        const isLight = isLightColor(customPrimary)
        return {
          bg: `linear-gradient(${gradientDir}, ${customPrimary} 0%, ${customSecondary} 100%)`,
          color: isLight ? "#1a1a1e" : "#fafaf8",
          chipColor: isLight
            ? "bg-[#d1cfd4] border-black/10 text-neutral-800"
            : "bg-[#e5e4e7] border-white/20 text-[#222]",
          brushedOpacity: finishType === "brushed" ? "opacity-[0.14]" : finishType === "matte" ? "opacity-[0.02]" : "opacity-[0.06]",
          laserEngrave: isLight ? "shadow-laser-light text-neutral-900" : "shadow-laser-dark text-white/95",
          highlightColor: finishType === "glossy"
            ? "rgba(255, 255, 255, 0.30)"
            : finishType === "brushed"
              ? "rgba(255, 255, 255, 0.18)"
              : "rgba(255, 255, 255, 0.06)"
        }
      }
      case "silver":
      default:
        return {
          bg: "linear-gradient(135deg, #e5e4e7 0%, #f4f3f6 100%)",
          color: "#1a1a1e",
          chipColor: "bg-[#d1cfd4] border-black/10 text-neutral-800",
          brushedOpacity: "opacity-[0.03]",
          laserEngrave: "shadow-laser-light text-neutral-900",
          highlightColor: "rgba(255, 255, 255, 0.28)"
        }
    }
  }

  // Utility: determine if a hex color is perceptually light
  function isLightColor(hex: string) {
    const c = hex.replace("#", "")
    const r = parseInt(c.substring(0, 2), 16)
    const g = parseInt(c.substring(2, 4), 16)
    const b = parseInt(c.substring(4, 6), 16)
    return (r * 299 + g * 587 + b * 114) / 1000 > 140
  }

  const matStyles = getCardMaterialStyles()

  return (
    <Section id="nfc" className="bg-[var(--bg-secondary)] border-y border-[var(--border-primary)] relative overflow-hidden py-24">

      {/* Dynamic background light flares */}
      <div className="absolute top-[25%] left-[-15%] w-[450px] h-[450px] bg-radial from-[rgba(168,85,247,0.02)] to-transparent pointer-events-none" />

      <Container className="flex flex-col gap-12">
        {/* Full-Width Section Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto mb-4">
          <Typography variant="label">NFC Customizer</Typography>
          <Typography variant="headline" as="h2">
            Experience It Live
          </Typography>
          <Typography variant="subhead">
            Configure your aerospace composite credentials. Laser-etched, weighted metallic components integrated with dynamic profile links.
          </Typography>
        </div>

        {/* Customizer Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">

          {/* Left Column: High-Fidelity 3D Metal Card Customizer */}
          <div className="lg:col-span-6 flex flex-col justify-center items-center gap-8 relative">

          {/* Circular ripple rings from tapping card */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="nfc-ripple-ring absolute w-[160px] h-[160px] rounded-full border-2 border-[var(--accent-base)] opacity-0" />
            <div className="nfc-ripple-ring absolute w-[160px] h-[160px] rounded-full border-2 border-[var(--accent-base)] opacity-0" />
          </div>

          {/* Experience Interaction Title Indicator */}
          <div className="flex items-center gap-2 px-4.5 py-2 rounded-full border border-[var(--accent-base)]/25 bg-[var(--accent-glow)] text-[var(--accent-base)] animate-pulse z-10">
            <Radio className="w-3.5 h-3.5 text-[var(--accent-base)]" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Tap Card to Experience NFC Signal</span>
          </div>

          {/* Perspective bounds */}
          <div className="perspective-[1200px] w-full max-w-[440px] z-10">
            <div
              ref={cardMockupRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleCardTap}
              className="relative aspect-[1.586/1] rounded-[28px] p-8 md:p-9 flex flex-col justify-between cursor-pointer transition-all active:scale-98 relative overflow-hidden select-none"
              style={{
                background: matStyles.bg,
                color: matStyles.color,
                transformStyle: "preserve-3d",
                // Outer chamfer bevel drop shadows
                boxShadow: selectedMat.id === "minimalist"
                  ? "inset 0 0 0 1.5px rgba(255,255,255,0.7), inset 0 -2px 4px rgba(0,0,0,0.1), 0 20px 45px rgba(0,0,0,0.12)"
                  : "inset 0 0 0 1.5px rgba(255,255,255,0.15), inset 0 2px 4px rgba(255,255,255,0.1), 0 25px 50px rgba(0,0,0,0.45)"
              }}
            >
              {/* Custom uploaded background image artwork */}
              {selectedMat.id === "custom" && uploadedImage && (
                <div
                  className="absolute inset-0 bg-cover bg-center pointer-events-none rounded-[28px] opacity-75 mix-blend-normal"
                  style={{ backgroundImage: `url(${uploadedImage})` }}
                />
              )}

              {/* Brushed metal micro-lines texture overlay */}
              <div
                className={`absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.065)_0px,rgba(255,255,255,0.065)_1px,transparent_1px,transparent_4px)] ${matStyles.brushedOpacity} pointer-events-none rounded-[28px]`}
              />

              {/* Dynamic Shiny Light Sheen Reflector */}
              <div
                className="absolute inset-0 pointer-events-none rounded-[28px] transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${matStyles.highlightColor} 0%, transparent 65%)`
                }}
              />

              {/* Card top row */}
              <div className="flex justify-between items-start" style={{ transform: "translateZ(35px)" }}>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 opacity-85 shrink-0" />
                  <span className="font-bold tracking-widest text-[10px] opacity-85 font-mono">UIC CARD</span>
                </div>
                <div className="flex items-center gap-1.5 opacity-80">
                  <span className="text-[7px] uppercase tracking-widest font-bold">NFC ACTIVE</span>
                  <svg viewBox="0 0 24 24" className="h-4 w-4 animate-pulse fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 8.5a4 4 0 0 1 0 7" />
                    <path d="M10 5.5a8 8 0 0 1 0 13" />
                    <path d="M14 2.5a12 12 0 0 1 0 19" />
                  </svg>
                </div>
              </div>

              {/* Microchip Component (Realistic Metallic Chip) */}
              <div className="flex flex-col gap-1 items-start text-left shrink-0" style={{ transform: "translateZ(45px)" }}>
                <div className={`w-12 h-9 rounded-[8px] ${selectedMat.id === "gold" ? "bg-gradient-to-br from-[#f3e5b3] via-[#d4af37] to-[#aa8c2c] text-[#5c4a16] border-[#8a6d1c]" : "bg-gradient-to-br from-[#f5f5f5] via-[#d0d0d0] to-[#a0a0a0] text-[#404040] border-[#808080]"} relative shadow-[inset_0_1px_3px_rgba(255,255,255,0.6),0_2px_5px_rgba(0,0,0,0.2)] border flex items-center justify-center overflow-hidden`}>
                  {/* Shimmer reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent pointer-events-none" />

                  {/* Microchip Icon */}
                  <Cpu className="w-5 h-5 opacity-80 z-10" strokeWidth={2} />
                </div>
              </div>

              {/* Card bottom row (Etched text layers) */}
              <div className="flex justify-between items-end text-left" style={{ transform: "translateZ(35px)" }}>
                <div>
                  <Typography
                    variant="mono"
                    as="span"
                    className={`font-bold text-[14px] md:text-[16px] tracking-widest block text-current ${matStyles.laserEngrave}`}
                  >
                    {userName || "ALEXANDER MERCER"}
                  </Typography>
                  <span className={`text-[8px] uppercase tracking-widest opacity-80 block font-bold mt-1 text-current ${matStyles.laserEngrave}`}>
                    {userTitle || "CHIEF DESIGN DIRECTOR"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-black/10 dark:bg-white/15 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-inner shrink-0">
                  <Radio className="h-3 w-3 animate-pulse" />
                  <span className="tracking-widest">TAP FOR SIGNAL</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] select-none animate-pulse">
            Click core to simulate wireless signal
          </div>
        </div>

        {/* Right Column: Dynamic Form Customizer details */}
        <div className="lg:col-span-6 flex flex-col items-start gap-6 text-left">

          {/* Engraving Form Customizer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-2">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
                Engraving Name
              </span>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value.toUpperCase())}
                maxLength={22}
                className="w-full px-4 py-2.5 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-primary)] text-xs font-semibold tracking-wide text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-secondary)] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
                Professional Title
              </span>
              <input
                type="text"
                value={userTitle}
                onChange={(e) => setUserTitle(e.target.value.toUpperCase())}
                maxLength={28}
                className="w-full px-4 py-2.5 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-primary)] text-xs font-semibold tracking-wide text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-secondary)] transition-all"
              />
            </div>
          </div>

          {/* Metallic Material Pickers */}
          <div className="flex flex-col gap-2 w-full mt-2">
            <span className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
              Materials Cores
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {nfcContent.materials.map((mat) => (
                <button
                  key={mat.id}
                  onClick={() => { setSelectedMat(mat); if (mat.id === "custom") setShowCustomPanel(true); }}
                  className={`flex items-center gap-2 p-3 rounded-2xl border transition-all ${selectedMat.id === mat.id
                    ? "border-[var(--text-primary)] bg-[var(--bg-primary)] shadow-soft"
                    : "border-[var(--border-primary)] bg-transparent hover:border-[var(--text-secondary)]"
                    }`}
                >
                  <div
                    className="w-4 h-4 rounded-full border border-black/10 dark:border-white/10 shrink-0"
                    style={{
                      background: mat.id === "custom" ? mat.color : mat.color,
                      ...(mat.id === "custom" && { border: "1.5px solid rgba(123,63,242,0.5)" })
                    }}
                  />
                  {mat.id === "custom" && <Palette className="w-3 h-3 text-[var(--accent-base)] shrink-0 -ml-0.5" />}
                  <span className="text-[10px] font-bold text-[var(--text-primary)] truncate">{mat.name}</span>
                </button>
              ))}
            </div>

            {/* ═══ Custom Design Configurator Panel ═══ */}
            {selectedMat.id === "custom" && (
              <div className="mt-3 w-full">
                <button
                  onClick={() => setShowCustomPanel(!showCustomPanel)}
                  className="flex items-center justify-between w-full px-4 py-2.5 rounded-2xl border border-[var(--accent-base)]/30 bg-[var(--accent-glow)] text-left transition-all hover:border-[var(--accent-base)]/60"
                >
                  <div className="flex items-center gap-2">
                    <Paintbrush className="w-3.5 h-3.5 text-[var(--accent-base)]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-primary)]">Design Studio</span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-[var(--text-tertiary)] transition-transform duration-300 ${showCustomPanel ? "rotate-180" : ""}`} />
                </button>

                <div className={`overflow-hidden transition-all duration-500 ease-out ${showCustomPanel ? "max-h-[350px] opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
                  <div className="p-4 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-primary)] space-y-5 max-h-[330px] overflow-y-auto pr-1.5">

                    {/* Color Pickers Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[9px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold">Primary Color</span>
                        <div className="relative">
                          <input
                            type="color"
                            value={customPrimary}
                            onChange={(e) => setCustomPrimary(e.target.value)}
                            className="w-full h-10 rounded-xl cursor-pointer border border-[var(--border-primary)] bg-transparent [&::-webkit-color-swatch-wrapper]:p-1 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-0"
                          />
                          <span className="absolute bottom-[-16px] left-0 text-[8px] font-mono text-[var(--text-tertiary)] uppercase">{customPrimary}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[9px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold">Secondary Color</span>
                        <div className="relative">
                          <input
                            type="color"
                            value={customSecondary}
                            onChange={(e) => setCustomSecondary(e.target.value)}
                            className="w-full h-10 rounded-xl cursor-pointer border border-[var(--border-primary)] bg-transparent [&::-webkit-color-swatch-wrapper]:p-1 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-0"
                          />
                          <span className="absolute bottom-[-16px] left-0 text-[8px] font-mono text-[var(--text-tertiary)] uppercase">{customSecondary}</span>
                        </div>
                      </div>
                    </div>

                    {/* Live Gradient Preview Bar */}
                    <div className="mt-3">
                      <div
                        className="w-full h-3 rounded-full shadow-inner"
                        style={{ background: `linear-gradient(${gradientDir}, ${customPrimary}, ${customSecondary})` }}
                      />
                    </div>

                    {/* Gradient Direction */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold">Gradient Direction</span>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { label: "↘", value: "135deg" },
                          { label: "→", value: "90deg" },
                          { label: "↓", value: "180deg" },
                          { label: "↗", value: "45deg" },
                        ].map((dir) => (
                          <button
                            key={dir.value}
                            onClick={() => setGradientDir(dir.value)}
                            className={`flex items-center justify-center gap-1 py-2 rounded-xl border text-xs font-bold transition-all ${gradientDir === dir.value
                              ? "border-[var(--accent-base)] bg-[var(--accent-glow)] text-[var(--accent-base)]"
                              : "border-[var(--border-primary)] text-[var(--text-tertiary)] hover:border-[var(--text-secondary)]"
                              }`}
                          >
                            <span className="text-sm">{dir.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Surface Finish */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold">Surface Finish</span>
                      <div className="grid grid-cols-3 gap-2">
                        {([
                          { label: "Matte", value: "matte" as const },
                          { label: "Glossy", value: "glossy" as const },
                          { label: "Brushed", value: "brushed" as const },
                        ]).map((f) => (
                          <button
                            key={f.value}
                            onClick={() => setFinishType(f.value)}
                            className={`py-2 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all ${finishType === f.value
                              ? "border-[var(--accent-base)] bg-[var(--accent-glow)] text-[var(--accent-base)]"
                              : "border-[var(--border-primary)] text-[var(--text-tertiary)] hover:border-[var(--text-secondary)]"
                              }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Presets */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold">Quick Presets</span>
                      <div className="flex gap-2 flex-wrap">
                        {[
                          { name: "Midnight", p: "#0d0d2b", s: "#4a1a8a" },
                          { name: "Rose Gold", p: "#8c5040", s: "#e8c4a0" },
                          { name: "Ocean", p: "#0a2342", s: "#1c92d2" },
                          { name: "Emerald", p: "#0b3d2e", s: "#11998e" },
                          { name: "Sunset", p: "#3d1200", s: "#ff6b35" },
                        ].map((preset) => (
                          <button
                            key={preset.name}
                            onClick={() => { setCustomPrimary(preset.p); setCustomSecondary(preset.s); }}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[var(--border-primary)] hover:border-[var(--text-secondary)] transition-all group"
                          >
                            <div
                              className="w-3 h-3 rounded-full shrink-0"
                              style={{ background: `linear-gradient(135deg, ${preset.p}, ${preset.s})` }}
                            />
                            <span className="text-[9px] font-bold text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] transition-colors">{preset.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Artwork Image Uploader */}
                    <div className="flex flex-col gap-2 border-t border-[var(--border-primary)] pt-4">
                      <span className="text-[9px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold">Custom Card Artwork</span>
                      <div className="flex items-center gap-4">
                        <label className="flex flex-col items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl border border-dashed border-[var(--border-primary)] hover:border-[var(--accent-base)]/50 bg-[var(--surface-glass)] hover:bg-[var(--accent-glow)] transition-all cursor-pointer grow group text-center">
                          <Upload className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-[var(--accent-base)] transition-colors" />
                          <span className="text-[10px] font-bold text-[var(--text-secondary)] group-hover:text-[var(--accent-base)] transition-colors">Upload Artwork</span>
                          <span className="text-[8px] text-[var(--text-tertiary)]">PNG, JPG, SVG (Max 3MB)</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>

                        {uploadedImage && (
                          <div className="relative shrink-0 w-[72px] h-[48px] rounded-lg border border-[var(--border-primary)] overflow-hidden bg-cover bg-center group" style={{ backgroundImage: `url(${uploadedImage})` }}>
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button
                                onClick={handleRemoveImage}
                                className="p-1 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Inspect features drawer */}
          <div className="flex flex-col gap-3 w-full mt-2">
            {nfcContent.features.map((feat, idx) => {
              const isOpen = expandedId === idx

              return (
                <div
                  key={idx}
                  className="border-b border-[var(--border-primary)] pb-3"
                >
                  <button
                    onClick={() => setExpandedId(isOpen ? null : idx)}
                    className="flex justify-between items-center w-full text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-2 text-[var(--text-primary)]">
                      <Check className="h-4 w-4 text-[var(--accent-secondary)]" />
                      <span className="text-xs font-bold uppercase tracking-wider">{feat.title}</span>
                    </div>
                    <span className="text-xs text-[var(--text-tertiary)] font-bold uppercase">
                      {isOpen ? "[ Collapse ]" : "[ Inspect ]"}
                    </span>
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[80px] opacity-100 mt-2" : "max-h-0 opacity-0"
                    }`}>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-6">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <Button
            size="lg"
            onClick={handleDownload}
            disabled={isGenerating}
            className={`rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all w-full sm:w-auto mt-4 ${isGenerating
              ? "bg-[var(--accent-glow)] border border-[var(--accent-base)]/40 text-[var(--accent-base)] animate-pulse"
              : "bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 cursor-pointer"
              }`}
          >
            {isGenerating ? generationStep : "Get Your NFC Card"}
          </Button>
        </div>

        </div>

      </Container>
    </Section>
  )
}
