/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#08080A",
          dark: "#0E0E14",
          card: "#121218",
          cardHover: "#181822",
          border: "rgba(255, 255, 255, 0.08)",
          borderBright: "rgba(212, 255, 0, 0.35)",
        },
        volt: {
          DEFAULT: "#D4FF00",
          hover: "#BCE600",
          dim: "#8CA800",
          glow: "rgba(212, 255, 0, 0.25)",
        },
        electric: {
          cyan: "#00F0FF",
          purple: "#7928CA",
        },
        silver: {
          DEFAULT: "#E2E8F0",
          muted: "#94A3B8",
          dark: "#475569",
        }
      },
      fontFamily: {
        kanit: ["'Kanit'", "sans-serif"],
        display: ["'Kanit'", "sans-serif"],
        mono: ["'Space Grotesk'", "'JetBrains Mono'", "monospace"],
        sans: ["'Kanit'", "sans-serif"],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'marquee-slow': 'marquee 35s linear infinite',
        'marquee-reverse': 'marqueeRev 35s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
        'radar': 'radarWave 2s cubic-bezier(0, 0.2, 0.8, 1) infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(212,255,0,0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(212,255,0,0.8))' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRev: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        radarWave: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        }
      },
      boxShadow: {
        'volt-sm': '0 0 10px rgba(212, 255, 0, 0.25)',
        'volt-md': '0 0 20px rgba(212, 255, 0, 0.4)',
        'volt-lg': '0 0 35px rgba(212, 255, 0, 0.55)',
        'card-glow': '0 10px 30px -10px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)',
        'inner-glow': 'inset 0 1px 1px rgba(255,255,255,0.15)',
      }
    },
  },
  plugins: [],
}
