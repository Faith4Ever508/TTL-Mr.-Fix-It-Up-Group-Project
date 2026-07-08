import { useState } from "react";
import {
  Wrench, Bell, Home, Search, Users, BookOpen,
  ArrowLeft, ChevronRight, Plus, ThumbsUp, Star,
  CheckCircle, Lightbulb, Hammer, Droplets, Wifi,
  Zap, Filter,
} from "lucide-react";

type Screen = "ask" | "community" | "solution";

// ─── Memphis Hi-Fi palette ────────────────────────────────────────────────────
const M = {
  orange: "#E8380D",
  blue: "#1440D8",
  yellow: "#FFD000",
  green: "#00B87A",
  cream: "#FAF8F4",
  white: "#FFFFFF",
  dark: "#1A1A1A",
  muted: "#6B6862",
  border: "#E5DFD3",
  mutedBg: "#F0ECE4",
  lightBlue: "#EEF2FF",
  lightOrange: "#FFF0EC",
};

// ─── Lo-Fi palette ────────────────────────────────────────────────────────────
const L = {
  bg: "#F0F0F0",
  card: "#E4E4E4",
  block: "#CCCCCC",
  dark: "#9A9A9A",
  text: "#555555",
  light: "#AAAAAA",
  border: "#C0C0C0",
};

// ─── Lo-Fi helpers ────────────────────────────────────────────────────────────
function GB({ h, w = "100%", label }: { h: number; w?: string | number; label?: string }) {
  return (
    <div
      style={{
        height: h,
        width: w,
        backgroundColor: L.block,
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {label && (
        <span style={{ fontSize: 7, color: L.dark, fontFamily: "JetBrains Mono, monospace" }}>
          {label}
        </span>
      )}
    </div>
  );
}

function GL({ w = "100%", op = 1 }: { w?: string | number; op?: number }) {
  return (
    <div
      style={{
        height: 7,
        width: w,
        backgroundColor: L.block,
        borderRadius: 3,
        opacity: op,
      }}
    />
  );
}

function GC({ s = 30 }: { s?: number }) {
  return (
    <div
      style={{ width: s, height: s, borderRadius: "50%", backgroundColor: L.dark, flexShrink: 0 }}
    />
  );
}

function GP({ t }: { t: string }) {
  return (
    <span
      style={{
        padding: "3px 9px",
        backgroundColor: L.dark,
        borderRadius: 20,
        fontSize: 8,
        color: "#EEE",
        fontFamily: "JetBrains Mono, monospace",
        whiteSpace: "nowrap",
      }}
    >
      {t}
    </span>
  );
}

function AL({ t }: { t: string }) {
  return (
    <div
      style={{
        fontSize: 7.5,
        color: "#BBBBBB",
        fontFamily: "JetBrains Mono, monospace",
        letterSpacing: 0.3,
        marginTop: 2,
      }}
    >
      ← {t.toUpperCase()}
    </div>
  );
}

function GBtn({ t, dark = false }: { t: string; dark?: boolean }) {
  return (
    <div
      style={{
        padding: "9px 16px",
        backgroundColor: dark ? L.text : L.dark,
        borderRadius: 8,
        textAlign: "center",
        fontSize: 9,
        color: "#EEE",
        fontFamily: "JetBrains Mono, monospace",
        fontWeight: 700,
      }}
    >
      {t}
    </div>
  );
}

// ─── Lo-Fi Bottom Nav ─────────────────────────────────────────────────────────
function LoNav({ active }: { active: number }) {
  return (
    <div
      style={{
        backgroundColor: L.card,
        borderTop: `1px solid ${L.border}`,
        padding: "6px 0 8px",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {["HOME", "SEARCH", "COMM.", "PROFILE"].map((n, i) => (
        <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <GB h={18} w={18} />
          <span
            style={{
              fontSize: 7,
              color: i === active ? L.text : L.light,
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            {n}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Hi-Fi Bottom Nav ─────────────────────────────────────────────────────────
function HiNav({ active }: { active: number }) {
  const items = [
    { icon: Home, label: "Home" },
    { icon: Search, label: "Search" },
    { icon: Users, label: "Community" },
    { icon: BookOpen, label: "Solutions" },
  ];
  return (
    <div
      style={{
        backgroundColor: M.white,
        borderTop: `1px solid ${M.border}`,
        padding: "8px 0 12px",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {items.map(({ icon: Icon, label }, i) => (
        <div
          key={label}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer" }}
        >
          <Icon
            size={20}
            color={i === active ? M.orange : M.muted}
            strokeWidth={i === active ? 2.5 : 1.5}
          />
          <span
            style={{
              fontSize: 9,
              color: i === active ? M.orange : M.muted,
              fontWeight: i === active ? 800 : 400,
              fontFamily: "Nunito, sans-serif",
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Lo-Fi: Ask Screen ────────────────────────────────────────────────────────
function LoAsk() {
  return (
    <div style={{ backgroundColor: L.bg, minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          backgroundColor: L.card,
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderBottom: `1px solid ${L.border}`,
        }}
      >
        <GB h={22} w={22} />
        <GB h={13} w={100} />
        <div style={{ flex: 1 }} />
        <GC s={20} />
      </div>

      <div style={{ padding: "12px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Hero card */}
        <div style={{ backgroundColor: L.card, borderRadius: 8, padding: 12 }}>
          <GL w="65%" />
          <div style={{ marginTop: 5 }} />
          <GL w="85%" op={0.7} />
          <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
            <GP t="COMMUNITY" />
            <GP t="FREE" />
          </div>
        </div>
        <AL t="Hero prompt card" />

        {/* Input area */}
        <div
          style={{
            backgroundColor: L.card,
            borderRadius: 8,
            padding: 12,
            border: `1.5px dashed ${L.border}`,
          }}
        >
          <GL w="55%" op={0.6} />
          <div style={{ marginTop: 6 }} />
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <GL op={0.4} />
              <div style={{ marginTop: 4 }} />
            </div>
          ))}
          <GL w="70%" op={0.35} />
        </div>
        <AL t="Problem text input area" />

        {/* Categories */}
        <div>
          <GL w="45%" />
          <div style={{ marginTop: 7, display: "flex", gap: 5, flexWrap: "wrap" }}>
            {["PLUMBING", "ELECTRIC", "DIY", "APPLIANCE"].map((c) => (
              <GP key={c} t={c} />
            ))}
          </div>
        </div>
        <AL t="Category selector chips" />

        <GBtn t="GET SOLUTIONS →" dark />
        <AL t="Primary CTA button" />

        {/* Recent problems */}
        <div>
          <GL w="50%" />
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  backgroundColor: L.card,
                  borderRadius: 8,
                  padding: 10,
                  display: "flex",
                  gap: 8,
                }}
              >
                <GC s={26} />
                <div style={{ flex: 1 }}>
                  <GL w="80%" />
                  <div style={{ marginTop: 4 }} />
                  <GL w="55%" op={0.6} />
                  <div style={{ marginTop: 6, display: "flex", gap: 8 }}>
                    <GB h={11} w={28} />
                    <GB h={11} w={28} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <AL t="Recent problems feed" />
      </div>

      <LoNav active={0} />
      <AL t="Bottom navigation bar" />
    </div>
  );
}

// ─── Lo-Fi: Community Screen ──────────────────────────────────────────────────
function LoCommunity() {
  return (
    <div style={{ backgroundColor: L.bg, minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          backgroundColor: L.card,
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderBottom: `1px solid ${L.border}`,
        }}
      >
        <GB h={20} w={20} />
        <GB h={13} w={130} />
        <div style={{ flex: 1 }} />
        <GB h={14} w={38} label="47 ANS" />
      </div>

      <div style={{ padding: "12px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Problem summary */}
        <div
          style={{
            backgroundColor: L.card,
            borderRadius: 8,
            padding: 12,
            borderLeft: `3px solid ${L.dark}`,
          }}
        >
          <GL w="90%" />
          <div style={{ marginTop: 5 }} />
          <GL w="65%" op={0.7} />
          <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
            <GP t="PLUMBING" />
            <GB h={16} w={60} label="47 answers" />
          </div>
        </div>
        <AL t="Problem summary card" />

        {/* Filters */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <GP t="BEST ★" />
          <GP t="RECENT" />
          <GP t="POPULAR" />
          <div style={{ flex: 1 }} />
          <GB h={22} w={22} />
        </div>
        <AL t="Filter / sort controls" />

        {/* Answer cards */}
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ backgroundColor: L.card, borderRadius: 8, padding: 12 }}>
            {i === 1 && (
              <div
                style={{
                  backgroundColor: L.dark,
                  padding: "2px 8px",
                  borderRadius: 4,
                  width: "fit-content",
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 7, color: "#EEE", fontFamily: "JetBrains Mono, monospace" }}>
                  ★ BEST ANSWER
                </span>
              </div>
            )}
            <div style={{ display: "flex", gap: 8 }}>
              <GC s={32} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <GL w="45%" />
                  <GB h={11} w={25} />
                </div>
                <div style={{ marginTop: 5 }} />
                <GL op={0.8} />
                <div style={{ marginTop: 4 }} />
                <GL w="75%" op={0.6} />
                <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between" }}>
                  <GB h={16} w={65} label={`${i + 3} STEPS`} />
                  <div style={{ display: "flex", gap: 6 }}>
                    <GB h={16} w={32} />
                    <GB h={16} w={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <AL t="Community answer cards" />

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <GC s={44} />
        </div>
        <AL t="Add solution FAB" />
      </div>

      <LoNav active={2} />
    </div>
  );
}

// ─── Lo-Fi: Solution Screen ───────────────────────────────────────────────────
function LoSolution({ step, setStep }: { step: number; setStep: (s: number) => void }) {
  const total = 5;
  return (
    <div style={{ backgroundColor: L.bg, minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          backgroundColor: L.card,
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderBottom: `1px solid ${L.border}`,
        }}
      >
        <GB h={20} w={20} />
        <GL w="55%" />
        <div style={{ flex: 1 }} />
        <GB h={14} w={35} label={`${step}/${total}`} />
      </div>

      <div style={{ padding: "10px 14px 0" }}>
        <div style={{ display: "flex", gap: 3 }}>
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 3,
                backgroundColor: i < step ? L.dark : L.block,
              }}
            />
          ))}
        </div>
      </div>
      <div style={{ padding: "0 14px" }}>
        <AL t="Step progress bar" />
      </div>

      <div style={{ padding: "10px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <GB h={140} label="STEP IMAGE / MEDIA PLACEHOLDER" />
        <AL t="Step illustration / photo" />

        <div style={{ backgroundColor: L.card, borderRadius: 8, padding: 12 }}>
          <GB h={14} w={60} label={`STEP ${step} OF ${total}`} />
          <div style={{ marginTop: 8 }} />
          <GL w="80%" />
          <div style={{ marginTop: 8 }} />
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <GL op={0.7} />
              <div style={{ marginTop: 4 }} />
            </div>
          ))}
        </div>
        <AL t="Step title + description" />

        <div>
          <GL w="45%" />
          <div style={{ marginTop: 7, display: "flex", gap: 5, flexWrap: "wrap" }}>
            {["TOOL 1", "MATERIAL 2", "TOOL 3"].map((t) => (
              <GP key={t} t={t} />
            ))}
          </div>
        </div>
        <AL t="Tools & materials needed" />

        <div
          style={{
            backgroundColor: L.card,
            borderRadius: 8,
            padding: 12,
            borderLeft: `3px solid ${L.dark}`,
          }}
        >
          <GL w="30%" />
          <div style={{ marginTop: 6 }} />
          <GL op={0.7} />
          <div style={{ marginTop: 4 }} />
          <GL w="70%" op={0.6} />
        </div>
        <AL t="Pro tip / alert callout" />

        <div style={{ display: "flex", gap: 8 }}>
          <div onClick={() => setStep(Math.max(1, step - 1))} style={{ flex: 1, cursor: "pointer" }}>
            <GBtn t="← PREV" />
          </div>
          <div onClick={() => setStep(Math.min(total, step + 1))} style={{ flex: 1, cursor: "pointer" }}>
            <GBtn t="NEXT →" dark />
          </div>
        </div>

        <GBtn t="✓ MARK AS COMPLETE" />
        <AL t="Completion CTA" />
      </div>

      <LoNav active={3} />
    </div>
  );
}

// ─── Hi-Fi: Ask Screen ────────────────────────────────────────────────────────
function HiAsk() {
  const categories = [
    { icon: Droplets, label: "Plumbing", bg: M.blue, fg: "#FFF" },
    { icon: Zap, label: "Electrical", bg: M.yellow, fg: M.dark },
    { icon: Hammer, label: "DIY", bg: M.orange, fg: "#FFF" },
    { icon: Wifi, label: "Tech", bg: M.green, fg: "#FFF" },
  ];

  const recent = [
    { icon: Droplets, title: "Leaky faucet under bathroom sink", tag: "Plumbing", count: 23, time: "2h ago", accent: M.blue },
    { icon: Zap, title: "Breaker keeps tripping on outlet", tag: "Electrical", count: 17, time: "4h ago", accent: M.yellow },
    { icon: Wifi, title: "Router won't connect to ISP", tag: "Tech", count: 34, time: "1d ago", accent: M.green },
  ];

  return (
    <div style={{ backgroundColor: M.cream, minHeight: "100%", display: "flex", flexDirection: "column", fontFamily: "Nunito, sans-serif" }}>
      {/* Top nav */}
      <div
        style={{
          backgroundColor: M.dark,
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            backgroundColor: M.orange,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Wrench size={16} color="#FFF" />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 900, color: "#FFF", fontFamily: "Unbounded, sans-serif", letterSpacing: -0.3 }}>
            Mr. Fix It Up
          </div>
          <div style={{ fontSize: 9, color: "#999", fontWeight: 400 }}>Problem Solver Community</div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ position: "relative" }}>
          <Bell size={20} color="#FFF" />
          <div
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: M.orange,
            }}
          />
        </div>
      </div>

      {/* Hero card */}
      <div
        style={{
          margin: "12px 14px 0",
          backgroundColor: M.orange,
          borderRadius: 14,
          padding: "14px 16px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -16,
            right: -16,
            width: 72,
            height: 72,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.13)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -18,
            right: 24,
            width: 44,
            height: 44,
            backgroundColor: "rgba(0,0,0,0.12)",
            transform: "rotate(45deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 36,
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: M.yellow,
          }}
        />
        <div
          style={{
            fontSize: 9,
            color: "rgba(255,255,255,0.65)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 1.2,
          }}
        >
          Got a problem?
        </div>
        <div
          style={{
            fontSize: 17,
            fontWeight: 900,
            color: "#FFF",
            lineHeight: 1.2,
            marginTop: 4,
            fontFamily: "Unbounded, sans-serif",
          }}
        >
          We have step-by-step fixes
        </div>
        <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
          <span
            style={{
              padding: "3px 10px",
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: 20,
              fontSize: 9,
              color: "#FFF",
              fontWeight: 700,
            }}
          >
            Community-powered
          </span>
          <span
            style={{
              padding: "3px 10px",
              backgroundColor: M.yellow,
              borderRadius: 20,
              fontSize: 9,
              color: M.dark,
              fontWeight: 800,
            }}
          >
            Always free
          </span>
        </div>
      </div>

      {/* Input card */}
      <div
        style={{
          margin: "10px 14px 0",
          backgroundColor: M.white,
          borderRadius: 14,
          padding: "12px 14px",
          boxShadow: "0 2px 14px rgba(0,0,0,0.07)",
          border: `1px solid ${M.border}`,
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 800, color: M.dark, marginBottom: 8 }}>
          What broke? What&#39;s stuck?
        </div>
        <div
          style={{
            backgroundColor: M.mutedBg,
            borderRadius: 8,
            padding: "10px 12px",
            minHeight: 56,
          }}
        >
          <span style={{ fontSize: 11, color: M.muted }}>Describe your problem in detail...</span>
        </div>
        <div
          style={{
            marginTop: 10,
            padding: "10px 14px",
            backgroundColor: M.orange,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 800, color: "#FFF" }}>Find Solutions</span>
          <ChevronRight size={14} color="#FFF" />
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: "12px 14px 0" }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: M.dark, marginBottom: 8 }}>
          Browse by category
        </div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4 }}>
          {categories.map(({ icon: Icon, label, bg, fg }) => (
            <div
              key={label}
              style={{
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 5,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={20} color={fg} />
              </div>
              <span style={{ fontSize: 9, fontWeight: 700, color: M.muted }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent problems */}
      <div style={{ padding: "12px 14px 0", flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 800, color: M.dark }}>Hot Problems Right Now 🔥</div>
          <span style={{ fontSize: 10, color: M.orange, fontWeight: 800, cursor: "pointer" }}>
            See all
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {recent.map(({ icon: Icon, title, count, time, accent }, i) => (
            <div
              key={i}
              style={{
                backgroundColor: M.white,
                borderRadius: 10,
                padding: 12,
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
                borderLeft: `3px solid ${accent}`,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={14} color={accent === M.yellow ? M.dark : "#FFF"} />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{ fontSize: 11, fontWeight: 700, color: M.dark, lineHeight: 1.3 }}
                >
                  {title}
                </div>
                <div style={{ marginTop: 4, display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 9, color: M.muted }}>{count} solutions</span>
                  <span
                    style={{
                      width: 3,
                      height: 3,
                      borderRadius: "50%",
                      backgroundColor: M.muted,
                      display: "inline-block",
                    }}
                  />
                  <span style={{ fontSize: 9, color: M.muted }}>{time}</span>
                </div>
              </div>
              <ChevronRight size={14} color={M.muted} style={{ flexShrink: 0, marginTop: 2 }} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 10 }} />
      <HiNav active={0} />
    </div>
  );
}

// ─── Hi-Fi: Community Screen ──────────────────────────────────────────────────
function HiCommunity() {
  const [activeFilter, setActiveFilter] = useState("best");

  const answers = [
    {
      name: "Mike Chen",
      initial: "M",
      rating: 4.9,
      steps: 5,
      votes: 234,
      preview: "First, turn off the water supply valves under the sink. Dry the area completely before you start...",
      best: true,
      time: "3h ago",
      color: M.orange,
    },
    {
      name: "Sarah Kowalski",
      initial: "S",
      rating: 4.7,
      steps: 4,
      votes: 89,
      preview: "You'll need a wrench and plumber's tape. Start by checking if the O-ring is worn out...",
      best: false,
      time: "5h ago",
      color: M.blue,
    },
    {
      name: "James Rivera",
      initial: "J",
      rating: 4.5,
      steps: 6,
      votes: 52,
      preview: "Check the valve seat first — this is the most common cause of bathroom faucet drips...",
      best: false,
      time: "1d ago",
      color: M.green,
    },
  ];

  return (
    <div style={{ backgroundColor: M.cream, minHeight: "100%", display: "flex", flexDirection: "column", fontFamily: "Nunito, sans-serif" }}>
      <div
        style={{
          backgroundColor: M.dark,
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <ArrowLeft size={20} color="#FFF" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: 14, fontWeight: 800, color: "#FFF", flex: 1 }}>
          Community Answers
        </div>
        <div
          style={{
            padding: "4px 10px",
            backgroundColor: M.orange,
            borderRadius: 20,
          }}
        >
          <span style={{ fontSize: 10, color: "#FFF", fontWeight: 700 }}>47 answers</span>
        </div>
      </div>

      {/* Problem card */}
      <div
        style={{
          margin: "12px 14px 0",
          backgroundColor: M.white,
          borderRadius: 12,
          padding: "12px 14px",
          borderLeft: `4px solid ${M.orange}`,
        }}
      >
        <div
          style={{ fontSize: 12, fontWeight: 800, color: M.dark, lineHeight: 1.4 }}
        >
          My bathroom faucet drips every 5 seconds, even when fully closed. Started last week.
        </div>
        <div style={{ marginTop: 8, display: "flex", gap: 6, alignItems: "center" }}>
          <span
            style={{
              padding: "3px 10px",
              backgroundColor: M.lightBlue,
              borderRadius: 20,
              fontSize: 9,
              color: M.blue,
              fontWeight: 700,
            }}
          >
            Plumbing
          </span>
          <span style={{ fontSize: 9, color: M.muted }}>@user_marcus · 6h ago</span>
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: "10px 14px", display: "flex", gap: 6, alignItems: "center" }}>
        {[["best", "Best ★"], ["recent", "Recent"], ["popular", "Popular"]].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setActiveFilter(k)}
            style={{
              padding: "5px 12px",
              borderRadius: 20,
              border: "none",
              cursor: "pointer",
              fontSize: 10,
              fontWeight: 700,
              backgroundColor: activeFilter === k ? M.orange : M.white,
              color: activeFilter === k ? "#FFF" : M.muted,
              fontFamily: "Nunito, sans-serif",
              transition: "all 0.2s",
            }}
          >
            {l}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            border: `1px solid ${M.border}`,
            backgroundColor: M.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Filter size={12} color={M.muted} />
        </div>
      </div>

      {/* Answer cards */}
      <div style={{ padding: "0 14px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        {answers.map((a, i) => (
          <div
            key={i}
            style={{
              backgroundColor: M.white,
              borderRadius: 12,
              padding: 14,
              boxShadow: a.best
                ? "0 2px 16px rgba(232,56,13,0.12)"
                : "0 1px 6px rgba(0,0,0,0.05)",
              border: a.best ? `1px solid rgba(232,56,13,0.2)` : `1px solid ${M.border}`,
            }}
          >
            {a.best && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  marginBottom: 10,
                  padding: "4px 10px",
                  backgroundColor: "#FFF8E6",
                  borderRadius: 6,
                  width: "fit-content",
                }}
              >
                <Star size={10} fill={M.yellow} color={M.yellow} />
                <span style={{ fontSize: 9, fontWeight: 800, color: "#9B7800" }}>BEST ANSWER</span>
              </div>
            )}
            <div style={{ display: "flex", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 14,
                  color: a.color === M.yellow ? M.dark : "#FFF",
                  backgroundColor: a.color,
                  fontFamily: "Unbounded, sans-serif",
                }}
              >
                {a.initial}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: M.dark }}>{a.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 1 }}>
                      <Star size={9} fill={M.yellow} color={M.yellow} />
                      <span style={{ fontSize: 9, color: M.muted }}>
                        {a.rating} · {a.time}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "3px 8px",
                      backgroundColor: M.mutedBg,
                      borderRadius: 6,
                    }}
                  >
                    <span style={{ fontSize: 9, fontWeight: 700, color: M.dark }}>
                      {a.steps} steps
                    </span>
                  </div>
                </div>
                <div style={{ marginTop: 8, fontSize: 11, color: M.muted, lineHeight: 1.4 }}>
                  {a.preview}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <ThumbsUp size={12} color={M.muted} />
                    <span style={{ fontSize: 10, color: M.muted }}>{a.votes}</span>
                  </div>
                  <div
                    style={{
                      padding: "5px 12px",
                      backgroundColor: a.best ? M.orange : M.mutedBg,
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: a.best ? "#FFF" : M.dark,
                      }}
                    >
                      View Solution →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <div style={{ padding: "12px 14px", display: "flex", justifyContent: "flex-end" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "10px 18px",
            backgroundColor: M.orange,
            borderRadius: 28,
            boxShadow: "0 4px 18px rgba(232,56,13,0.38)",
            cursor: "pointer",
          }}
        >
          <Plus size={16} color="#FFF" />
          <span style={{ fontSize: 12, fontWeight: 800, color: "#FFF" }}>Add Solution</span>
        </div>
      </div>

      <HiNav active={2} />
    </div>
  );
}

// ─── Hi-Fi: Solution Screen ───────────────────────────────────────────────────
function HiSolution({ step, setStep }: { step: number; setStep: (s: number) => void }) {
  const total = 5;
  const steps = [
    {
      title: "Gather your tools",
      desc: "Collect an adjustable wrench, plumber's tape, replacement O-ring kit, and a bucket. Turn off main water if needed.",
      icon: Hammer,
    },
    {
      title: "Turn off water supply",
      desc: "Locate the shutoff valves under the sink. Turn them clockwise until fully closed. Open the tap to drain remaining water.",
      icon: Droplets,
    },
    {
      title: "Remove the faucet handle",
      desc: "Pop off the decorative cap with a flathead screwdriver. Unscrew the handle screw, then gently pull the handle straight up.",
      icon: Wrench,
    },
    {
      title: "Replace the O-ring",
      desc: "Slide the old O-ring off the stem. Coat the new O-ring in plumber's grease before installing it on the stem.",
      icon: CheckCircle,
    },
    {
      title: "Reassemble and test",
      desc: "Reverse the disassembly steps carefully. Turn water supply back on slowly and check for leaks. Run the tap to confirm the drip is gone.",
      icon: Star,
    },
  ];

  const current = steps[step - 1] || steps[0];
  const StepIcon = current.icon;
  const materials = ["Adjustable Wrench", "O-Ring Kit", "Plumber\'s Grease", "Bucket"];

  return (
    <div style={{ backgroundColor: M.cream, minHeight: "100%", display: "flex", flexDirection: "column", fontFamily: "Nunito, sans-serif" }}>
      <div
        style={{
          backgroundColor: M.dark,
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <ArrowLeft size={20} color="#FFF" style={{ flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div
            style={{ fontSize: 12, fontWeight: 800, color: "#FFF", fontFamily: "Unbounded, sans-serif" }}
          >
            Fix: Leaky Faucet
          </div>
          <div style={{ fontSize: 9, color: "#999" }}>
            Step {step} of {total}
          </div>
        </div>
        <div
          style={{
            padding: "4px 10px",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 20,
          }}
        >
          <span style={{ fontSize: 9, color: "#CCC" }}>Intermediate</span>
        </div>
      </div>

      {/* Progress */}
      <div style={{ padding: "12px 14px 0" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 3,
                backgroundColor: i < step ? M.orange : M.border,
                transition: "background-color 0.3s",
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  backgroundColor: i < step ? M.orange : M.border,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 9,
                  fontWeight: 900,
                  color: i < step ? "#FFF" : M.muted,
                  transition: "background-color 0.3s",
                }}
              >
                {i < step - 1 ? <CheckCircle size={11} color="#FFF" /> : i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step image */}
      <div
        style={{
          margin: "12px 14px 0",
          backgroundColor: M.dark,
          borderRadius: 14,
          height: 130,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 90,
            height: 90,
            borderRadius: "50%",
            backgroundColor: M.orange,
            opacity: 0.2,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -24,
            left: -16,
            width: 72,
            height: 72,
            backgroundColor: M.blue,
            opacity: 0.2,
            transform: "rotate(45deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 18,
            width: 14,
            height: 14,
            borderRadius: "50%",
            backgroundColor: M.yellow,
          }}
        />
        <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              backgroundColor: M.orange,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 8px",
            }}
          >
            <StepIcon size={24} color="#FFF" />
          </div>
          <div
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,0.5)",
              fontFamily: "JetBrains Mono, monospace",
              letterSpacing: 0.5,
            }}
          >
            STEP {step} · ILLUSTRATION
          </div>
        </div>
      </div>

      {/* Step content */}
      <div
        style={{
          margin: "12px 14px 0",
          backgroundColor: M.white,
          borderRadius: 12,
          padding: "14px",
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              backgroundColor: M.orange,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: 2,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 900, color: "#FFF" }}>{step}</span>
          </div>
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 900,
                color: M.dark,
                fontFamily: "Unbounded, sans-serif",
                lineHeight: 1.3,
              }}
            >
              {current.title}
            </div>
            <div style={{ fontSize: 11, color: M.muted, lineHeight: 1.5, marginTop: 6 }}>
              {current.desc}
            </div>
          </div>
        </div>
      </div>

      {/* Materials */}
      <div style={{ padding: "10px 14px 0" }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: M.dark, marginBottom: 7 }}>
          You&#39;ll need:
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {materials.map((m) => (
            <span
              key={m}
              style={{
                padding: "4px 10px",
                backgroundColor: M.mutedBg,
                borderRadius: 20,
                fontSize: 9,
                fontWeight: 700,
                color: M.dark,
              }}
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Pro tip */}
      <div
        style={{
          margin: "10px 14px 0",
          backgroundColor: "#FFFAE8",
          borderRadius: 10,
          padding: "10px 12px",
          display: "flex",
          gap: 8,
          alignItems: "flex-start",
          border: "1px solid #FFE870",
        }}
      >
        <Lightbulb size={14} color="#C89600" style={{ flexShrink: 0, marginTop: 1 }} />
        <div style={{ fontSize: 10, color: "#7A6500", lineHeight: 1.4 }}>
          <strong>Pro tip:</strong> Photograph the assembly before disassembly — it helps when putting things back together.
        </div>
      </div>

      {/* Nav buttons */}
      <div style={{ padding: "12px 14px 0", display: "flex", gap: 8 }}>
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          style={{
            flex: 1,
            padding: "10px 0",
            borderRadius: 10,
            border: `1.5px solid ${M.border}`,
            backgroundColor: M.white,
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 700,
            color: M.dark,
            fontFamily: "Nunito, sans-serif",
          }}
        >
          ← Previous
        </button>
        <button
          onClick={() => setStep(Math.min(total, step + 1))}
          style={{
            flex: 2,
            padding: "10px 0",
            borderRadius: 10,
            border: "none",
            backgroundColor: step === total ? M.green : M.orange,
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 800,
            color: "#FFF",
            fontFamily: "Nunito, sans-serif",
            transition: "background-color 0.3s",
          }}
        >
          {step === total ? "✓ Complete!" : "Next Step →"}
        </button>
      </div>

      <div style={{ height: 10 }} />
      <HiNav active={3} />
    </div>
  );
}

// ─── Phone Frame ──────────────────────────────────────────────────────────────
function PhoneFrame({
  label,
  sublabel,
  fidelity,
  children,
}: {
  label: string;
  sublabel: string;
  fidelity: "lo" | "hi";
  children: React.ReactNode;
}) {
  const frameColor = fidelity === "lo" ? "#B0B0B0" : "#1A1A1A";
  const frameInner = fidelity === "lo" ? L.card : M.dark;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 900,
            color: fidelity === "lo" ? "#777" : M.dark,
            fontFamily: "Unbounded, sans-serif",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 9,
            color: "#AAAAAA",
            fontFamily: "JetBrains Mono, monospace",
            marginTop: 3,
            letterSpacing: 0.3,
          }}
        >
          {sublabel}
        </div>
      </div>

      {/* Phone shell */}
      <div
        style={{
          width: 280,
          border: `6px solid ${frameColor}`,
          borderRadius: 44,
          backgroundColor: frameInner,
          boxShadow:
            fidelity === "hi"
              ? "0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04)"
              : "0 8px 32px rgba(0,0,0,0.12)",
          position: "relative",
        }}
      >
        {/* Side buttons */}
        <div
          style={{
            position: "absolute",
            left: -10,
            top: 68,
            width: 4,
            height: 26,
            backgroundColor: frameColor,
            borderRadius: "3px 0 0 3px",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -10,
            top: 106,
            width: 4,
            height: 42,
            backgroundColor: frameColor,
            borderRadius: "3px 0 0 3px",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -10,
            top: 88,
            width: 4,
            height: 50,
            backgroundColor: frameColor,
            borderRadius: "0 3px 3px 0",
          }}
        />

        {/* Notch / pill */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 76,
            height: 24,
            backgroundColor: frameColor,
            borderRadius: "0 0 16px 16px",
            zIndex: 20,
          }}
        />

        {/* Status bar */}
        <div
          style={{
            height: 28,
            backgroundColor: frameInner,
            display: "flex",
            alignItems: "flex-end",
            paddingLeft: 14,
            paddingRight: 14,
            paddingBottom: 3,
            position: "relative",
            zIndex: 5,
          }}
        >
          <span
            style={{
              fontSize: 9,
              color: fidelity === "lo" ? L.text : "#FFF",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            9:41
          </span>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", gap: 3, alignItems: "flex-end" }}>
            {[1, 2, 3, 4].map((v) => (
              <div
                key={v}
                style={{
                  width: 3,
                  height: 3 + v * 1.5,
                  backgroundColor: fidelity === "lo" ? L.dark : "#FFF",
                  borderRadius: 1,
                  opacity: 0.85,
                }}
              />
            ))}
            <div
              style={{
                width: 18,
                height: 9,
                border: `1.5px solid ${fidelity === "lo" ? L.dark : "#FFF"}`,
                borderRadius: 3,
                marginLeft: 5,
                position: "relative",
                opacity: 0.85,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 1,
                  top: 1,
                  width: "65%",
                  height: "calc(100% - 2px)",
                  backgroundColor: fidelity === "lo" ? L.dark : "#FFF",
                  borderRadius: 2,
                }}
              />
            </div>
          </div>
        </div>

        {/* Screen */}
        <div
          style={{
            height: 556,
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "none",
          }}
        >
          {children}
        </div>

        {/* Home indicator */}
        <div
          style={{
            height: 22,
            backgroundColor: frameInner,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 80,
              height: 4,
              borderRadius: 4,
              backgroundColor: fidelity === "lo" ? L.dark : "#FFF",
              opacity: 0.35,
            }}
          />
        </div>
      </div>

      {/* Badge */}
      <div
        style={{
          padding: "5px 14px",
          borderRadius: 20,
          backgroundColor: fidelity === "lo" ? "#DCDCDC" : M.dark,
        }}
      >
        <span
          style={{
            fontSize: 9,
            fontFamily: "JetBrains Mono, monospace",
            color: fidelity === "lo" ? "#666" : "#FFF",
            letterSpacing: 0.5,
          }}
        >
          {fidelity === "lo" ? "WIREFRAME · ANNOTATED" : "HI-FI · MEMPHIS DESIGN"}
        </span>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>("ask");
  const [step, setStep] = useState(2);

  const screenOptions: { key: Screen; label: string }[] = [
    { key: "ask", label: "① Ask a Problem" },
    { key: "community", label: "② Community Answers" },
    { key: "solution", label: "③ Solution Flow" },
  ];

  const loScreen =
    screen === "ask" ? (
      <LoAsk />
    ) : screen === "community" ? (
      <LoCommunity />
    ) : (
      <LoSolution step={step} setStep={setStep} />
    );

  const hiScreen =
    screen === "ask" ? (
      <HiAsk />
    ) : screen === "community" ? (
      <HiCommunity />
    ) : (
      <HiSolution step={step} setStep={setStep} />
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#EDEAE4",
        fontFamily: "Nunito, sans-serif",
      }}
    >
      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; }
      `}</style>

      {/* Page header */}
      <div style={{ textAlign: "center", paddingTop: 44, paddingBottom: 28 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: M.dark,
            color: "#FFF",
            padding: "6px 16px",
            borderRadius: 20,
            fontSize: 9,
            fontFamily: "JetBrains Mono, monospace",
            letterSpacing: 1.2,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          <Wrench size={11} />
          Mobile App Wireframes · Figma-style
        </div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 900,
            color: M.dark,
            margin: 0,
            fontFamily: "Unbounded, sans-serif",
            lineHeight: 1.2,
            letterSpacing: -0.5,
          }}
        >
          Problem Solver Community
        </h1>
        <p
          style={{
            fontSize: 12,
            color: "#999",
            marginTop: 7,
            fontFamily: "JetBrains Mono, monospace",
            letterSpacing: 0.3,
          }}
        >
          Mr. Fix It Up · Lo-Fidelity vs Hi-Fidelity Wireframe Comparison
        </p>
      </div>

      {/* Screen tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 40 }}>
        {screenOptions.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setScreen(key)}
            style={{
              padding: "8px 18px",
              borderRadius: 24,
              border: "none",
              cursor: "pointer",
              fontFamily: "Nunito, sans-serif",
              fontSize: 12,
              fontWeight: 800,
              backgroundColor: screen === key ? M.dark : "#FFF",
              color: screen === key ? "#FFF" : "#888",
              boxShadow:
                screen === key
                  ? "0 3px 14px rgba(0,0,0,0.22)"
                  : "0 1px 5px rgba(0,0,0,0.09)",
              transition: "all 0.2s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Column labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 60,
          marginBottom: 12,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        {["LO-FIDELITY", "HI-FIDELITY"].map((l) => (
          <div
            key={l}
            style={{
              width: 280,
              textAlign: "center",
              fontSize: 9,
              fontFamily: "JetBrains Mono, monospace",
              color: "#BBBBBB",
              letterSpacing: 1.5,
            }}
          >
            {l}
          </div>
        ))}
      </div>

      {/* Phones */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 60,
          paddingBottom: 64,
          alignItems: "flex-start",
          flexWrap: "wrap",
          padding: "0 20px 64px",
        }}
      >
        <PhoneFrame
          label="Wireframe"
          sublabel="Grayscale · Structural · Annotated"
          fidelity="lo"
        >
          {loScreen}
        </PhoneFrame>

        <PhoneFrame
          label="Prototype"
          sublabel="Memphis · Colorful · Interactive"
          fidelity="hi"
        >
          {hiScreen}
        </PhoneFrame>
      </div>
    </div>
  );
}
