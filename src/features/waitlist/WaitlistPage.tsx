import { useState, useEffect, useRef, useCallback } from "react";
import { gasRequestSucceeded, postToGoogleAppsScript } from "../../config/googleAppsScript";
import "./waitlist.css";

const WHATSAPP_LINK = "https://chat.whatsapp.com/H5w6deN2uJf3pc197K5GWu";

const EXPERIENCE_OPTIONS = [
  { value: "beginner", title: "Complete Beginner", desc: "No prior design experience" },
  { value: "some-knowledge", title: "Some Knowledge", desc: "Dabbled in design, need structure" },
  { value: "intermediate", title: "Intermediate", desc: "Have experience, want to level up" },
  { value: "career-switcher", title: "Career Switcher", desc: "Transitioning from another field" },
] as const;

const CONFETTI_COLORS = [
  "#7AA8FF", "#AEBEFF", "#FFD700", "#FF6B6B", "#4ADE80",
  "#A78BFA", "#FB923C", "#38BDF8", "#F472B6", "#FFFFFF",
];

export function WaitlistPage() {
  const [scrolled, setScrolled] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);
  const [stepVisibility, setStepVisibility] = useState<Record<number, boolean>>({ 1: true, 2: false, 3: false });
  const [stepAnimClass, setStepAnimClass] = useState<Record<number, string>>({ 1: "", 2: "", 3: "" });
  const currentStepRef = useRef(0);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("beginner");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const submittedRef = useRef(false);

  const submitToSheet = useCallback(
    (joinedWhatsApp: boolean) => {
      const experienceTitle =
        EXPERIENCE_OPTIONS.find((o) => o.value === selectedExperience)?.title ?? selectedExperience;

      void postToGoogleAppsScript({
        name: fullName.trim(),
        email: email.trim(),
        phone: mobile.trim(),
        experience: experienceTitle,
        joinedWhatsApp,
        source: "waitlist",
      })
        .then(async (res) => {
          if (!(await gasRequestSucceeded(res))) {
            console.error(
              "[waitlist] Google Apps Script returned an error page — fix doPost / execution logs in Apps Script."
            );
          }
        })
        .catch(() => {});
    },
    [fullName, email, mobile, selectedExperience],
  );

  // ── Body class management ──────────────────────────────────────────────
  useEffect(() => {
    document.body.classList.add("waitlist-active");
    return () => {
      document.body.classList.remove("waitlist-active");
    };
  }, []);

  // ── Navbar scroll effect ───────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Confetti burst ─────────────────────────────────────────────────────
  const launchConfetti = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = "block";

    const particles = Array.from({ length: 150 }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height * 0.15,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.7) * 14 - 2,
      w: Math.random() * 10 + 3,
      h: Math.random() * 6 + 2,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 16,
      gravity: 0.14 + Math.random() * 0.1,
      opacity: 1,
      fadeSpeed: 0.004 + Math.random() * 0.005,
    }));

    const w = canvas.width;
    const h = canvas.height;
    let animFrame: number;

    function animate() {
      ctx!.clearRect(0, 0, w, h);
      let alive = false;

      for (const p of particles) {
        if (p.opacity <= 0) continue;
        alive = true;

        p.x += p.vx;
        p.vy += p.gravity;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity -= p.fadeSpeed;
        p.vx *= 0.99;

        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate((p.rotation * Math.PI) / 180);
        ctx!.globalAlpha = Math.max(0, p.opacity);
        ctx!.fillStyle = p.color;
        ctx!.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx!.restore();
      }

      if (alive) {
        animFrame = requestAnimationFrame(animate);
      } else {
        ctx!.clearRect(0, 0, w, h);
        cancelAnimationFrame(animFrame);
        canvas!.style.display = "none";
      }
    }

    animate();
  }, []);

  // ── Modal step transitions ─────────────────────────────────────────────
  const showStep = useCallback(
    (step: number) => {
      const prev = currentStepRef.current;

      if (prev > 0 && prev !== step) {
        setStepAnimClass((s) => ({ ...s, [prev]: "animating-out" }));

        setTimeout(() => {
          setStepVisibility((s) => ({ ...s, [prev]: false }));
          setStepAnimClass((s) => ({ ...s, [prev]: "" }));

          setStepVisibility((s) => ({ ...s, [step]: true }));
          setStepAnimClass((s) => ({ ...s, [step]: "animating-in" }));
          currentStepRef.current = step;

          if (step === 3) setTimeout(launchConfetti, 300);
        }, 250);
      } else {
        setStepVisibility((s) => ({ ...s, [step]: true }));
        setStepAnimClass((s) => ({ ...s, [step]: "animating-in" }));
        currentStepRef.current = step;

        if (step === 3) setTimeout(launchConfetti, 300);
      }
    },
    [launchConfetti],
  );

  const openModal = useCallback(() => {
    document.body.classList.add("modal-open");
    setOverlayActive(true);
    showStep(1);
  }, [showStep]);

  const closeModal = useCallback(() => {
    document.body.classList.remove("modal-open");
    setOverlayActive(false);
    currentStepRef.current = 0;

    setTimeout(() => {
      setStepVisibility({ 1: true, 2: false, 3: false });
      setStepAnimClass({ 1: "", 2: "", 3: "" });
    }, 400);
  }, []);

  // ── Escape key ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && currentStepRef.current > 0) closeModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeModal]);

  // ── Form submit (Step 1 → Step 2) ─────────────────────────────────────
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;
    showStep(2);
  };

  // ── Overlay click (close on backdrop) ──────────────────────────────────
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  // ─────────────────────────────────────────────────────────────────── JSX
  return (
    <div className="waitlist-root">
      {/* ── Navbar ────────────────────────────────────────────────────── */}
      <nav className={`wl-navbar${scrolled ? " scrolled" : ""}`}>
        <div className="wl-nav-pill">
          <a href="/" className="wl-logo">
            <div className="wl-logo-icon">
              <svg width="30" height="33" viewBox="0 0 30 33" fill="none">
                <rect width="14" height="20" rx="2" fill="url(#lg1)" />
                <rect x="14" y="33" width="14" height="11" rx="2" transform="rotate(180 14 33)" fill="url(#lg2)" />
                <rect x="16" width="14" height="11" rx="2" fill="url(#lg3)" />
                <rect width="14" height="20" rx="2" transform="matrix(1 0 0 -1 16 33)" fill="url(#lg4)" />
                <defs>
                  <linearGradient id="lg1" x1="7" y1="0" x2="7" y2="22.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0039C0" />
                    <stop offset="0.899" stopColor="white" />
                    <stop offset="1" stopColor="#0039C0" />
                  </linearGradient>
                  <linearGradient id="lg2" x1="21" y1="33" x2="21" y2="45.375" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0039C0" />
                    <stop offset="0.899" stopColor="white" />
                    <stop offset="1" stopColor="#0039C0" />
                  </linearGradient>
                  <linearGradient id="lg3" x1="23" y1="0" x2="23" y2="12.375" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0039C0" />
                    <stop offset="0.899" stopColor="white" />
                    <stop offset="1" stopColor="#0039C0" />
                  </linearGradient>
                  <linearGradient id="lg4" x1="7" y1="0" x2="7" y2="22.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0039C0" />
                    <stop offset="0.899" stopColor="white" />
                    <stop offset="1" stopColor="#0039C0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="wl-logo-text">
              <span className="wl-logo-name">Grid and Goal</span>
              <span className="wl-logo-tagline">Your design Journey Begins</span>
            </div>
          </a>
          <button className="wl-btn-nav" onClick={openModal}>
            Enroll Now
          </button>
        </div>
      </nav>

      {/* ── Hero Section ──────────────────────────────────────────────── */}
      <section className="wl-hero">
        <div className="wl-grid-overlay" />
        <div className="wl-hero-glow" />
        <div className="wl-container wl-hero-container">
          <div className="wl-badge">
            <SparkleIcon size={14} fill="#7AA8FF" />
            Second cohort starts June 26
          </div>
          <h1 className="wl-hero-title">
            Not Another{" "}
            <span className="wl-text-gradient-blue wl-font-serif wl-italic">UI/UX Course</span> -
            <br />
            60-day structured program
          </h1>
          <p className="wl-hero-subtitle">
            Go from confused beginner to confident UI/UX designer with a practical,
            <br className="wl-desktop-only" /> industry-focused learning approach.
          </p>
          <div className="wl-hero-cta">
            <button className="wl-hero-btn" onClick={openModal}>
              <span className="wl-hero-btn-shimmer" />
              <SparkleIcon size={16} fill="#DBE5FF" />
              <span className="wl-hero-btn-text">Reserve My Spot</span>
            </button>
          </div>
          <p className="wl-waitlist-note">Waitlist members get launch discount.</p>
        </div>
      </section>

      {/* ── Modal Overlay ─────────────────────────────────────────────── */}
      <div
        className={`wl-modal-overlay${overlayActive ? " active" : ""}`}
        onClick={handleOverlayClick}
      >
        {/* Step 1: Personal Info */}
        {stepVisibility[1] && (
          <div className={`wl-modal wl-modal-step ${stepAnimClass[1]}`}>
            <div className="wl-modal-header">
              <span className="wl-step-badge">Step 1 of 2</span>
              <ModalCloseButton onClick={closeModal} />
            </div>
            <div className="wl-progress-bar">
              <div className="wl-progress-track">
                <div className="wl-progress-fill" style={{ width: "50%" }} />
              </div>
              <div className="wl-progress-track">
                <div className="wl-progress-fill" style={{ width: "0%" }} />
              </div>
            </div>
            <div className="wl-modal-body">
              <h2 className="wl-modal-title">Let's get started</h2>
              <p className="wl-modal-subtitle">
                We'll use this to keep you updated on the course launch
              </p>
              <form onSubmit={handleStep1Submit}>
                <div className="wl-form-group">
                  <label htmlFor="wl-full-name">Full Name *</label>
                  <div className="wl-input-wrapper">
                    <input
                      type="text"
                      id="wl-full-name"
                      placeholder="Enter Full Name"
                      required
                      autoComplete="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="wl-form-group">
                  <label htmlFor="wl-email-id">Email ID *</label>
                  <div className="wl-input-wrapper">
                    <input
                      type="email"
                      id="wl-email-id"
                      placeholder="Enter Email ID"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="wl-form-group">
                  <label htmlFor="wl-mobile-number">Mobile Number (WhatsApp)</label>
                  <div className="wl-input-wrapper">
                    <input
                      type="tel"
                      id="wl-mobile-number"
                      placeholder="Enter Mobile Number"
                      autoComplete="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className="wl-btn-primary-glow wl-btn-full">
                  <SparkleIcon size={14} fill="white" />
                  Continue →
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Step 2: Experience Level */}
        {stepVisibility[2] && (
          <div className={`wl-modal wl-modal-step ${stepAnimClass[2]}`}>
            <div className="wl-modal-header">
              <span className="wl-step-badge">Step 2 of 2</span>
              <ModalCloseButton onClick={closeModal} />
            </div>
            <div className="wl-progress-bar">
              <div className="wl-progress-track">
                <div className="wl-progress-fill" style={{ width: "100%" }} />
              </div>
              <div className="wl-progress-track">
                <div className="wl-progress-fill" style={{ width: "100%" }} />
              </div>
            </div>
            <div className="wl-modal-body">
              <h2 className="wl-modal-title">Your experience</h2>
              <p className="wl-modal-subtitle">This helps us tailor the course to your level</p>
              <div className="wl-experience-options">
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`wl-experience-option${selectedExperience === opt.value ? " selected" : ""}`}
                    onClick={() => setSelectedExperience(opt.value)}
                  >
                    <div className="wl-radio-circle">
                      <div className="wl-radio-dot" />
                    </div>
                    <div className="wl-option-text">
                      <span className="wl-option-title">{opt.title}</span>
                      <span className="wl-option-desc">{opt.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
              <div className="wl-step2-actions">
                <button className="wl-btn-back" onClick={() => showStep(1)} aria-label="Go back">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                </button>
                <button
                  className="wl-btn-primary-glow wl-btn-full"
                  onClick={() => {
                    if (!submittedRef.current) {
                      submittedRef.current = true;
                      submitToSheet(false);
                    }
                    showStep(3);
                  }}
                >
                  <SparkleIcon size={14} fill="white" />
                  Reserve My Spot
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {stepVisibility[3] && (
          <div className={`wl-modal wl-modal-success ${stepAnimClass[3]}`}>
            <div className="wl-modal-body wl-success-body">
              <div className="wl-success-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="rgba(255,255,255,0.15)"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 12l3 3 5-5"
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="wl-success-title">You're In! Early Access Secured 🎉</h2>
              <p className="wl-success-subtitle">
                You're officially on the waitlist for the practical UI/UX design course.
              </p>
              <div className="wl-success-info-box">
                <p className="wl-info-primary">
                  We'll notify you when enrollment opens for the second cohort starting June 26.
                </p>
                <p className="wl-info-secondary">
                  "Waitlist members will receive early-bird pricing."
                </p>
              </div>
              <button
                className="wl-btn-primary-glow wl-btn-full wl-shimmer-btn"
                onClick={() => {
                  submitToSheet(true);
                  window.open(WHATSAPP_LINK, "_blank");
                }}
              >
                <span className="wl-shimmer" />
                <svg className="wl-whatsapp-icon" width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Join Our WhatsApp Community
              </button>
              <button className="wl-btn-close-subtle" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confetti canvas */}
      <canvas ref={canvasRef} className="wl-confetti-canvas" />
    </div>
  );
}

/* ── Shared small components ──────────────────────────────────────────── */

function SparkleIcon({ size, fill }: { size: number; fill: string }) {
  return (
    <svg className="wl-sparkle-icon" width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
    </svg>
  );
}

function ModalCloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="wl-modal-close" onClick={onClick} aria-label="Close modal">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
}
