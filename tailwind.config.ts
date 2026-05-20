import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", lg: "4rem" }, screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        // Coastal Heritage
        navy: {
          DEFAULT: "#234B6B",
          50: "#EEF3F8",
          100: "#D4E1EC",
          200: "#A8C2D8",
          300: "#7DA3C3",
          400: "#5185AF",
          500: "#234B6B",
          600: "#1C3D58",
          700: "#152E42",
          800: "#0E1F2C",
          900: "#070F16",
        },
        laguna: { DEFAULT: "#5E8FA8", light: "#9BBBCC", dark: "#3F6E87" },
        sand: { DEFAULT: "#E8DCCB", light: "#F1E9DC", dark: "#CFBFA6" },
        gold: { DEFAULT: "#D7B25F", light: "#E6CB91", dark: "#B69240" },
        shell: { DEFAULT: "#F8F6F1", warm: "#FBF8F2" },
        graphite: { DEFAULT: "#2E3740", soft: "#4A555F" },
      },
      fontFamily: {
        display: ["var(--font-display)", "EB Garamond", "serif"],
        sans: ["var(--font-sans)", "Manrope", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "500" }],
        "display-md": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "500" }],
        "headline": ["clamp(1.75rem, 3vw, 2.25rem)", { lineHeight: "1.2", fontWeight: "500" }],
        "label": ["0.75rem", { lineHeight: "1", letterSpacing: "0.14em", fontWeight: "600" }],
      },
      borderRadius: { xl: "1rem", "2xl": "1.5rem", "3xl": "2rem" },
      boxShadow: {
        coastal: "0 12px 32px rgba(35, 75, 107, 0.08)",
        "coastal-lg": "0 24px 60px rgba(35, 75, 107, 0.14)",
      },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        wave: { "0%, 100%": { transform: "translateX(-25%)" }, "50%": { transform: "translateX(25%)" } },
      },
      animation: { "fade-up": "fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both", wave: "wave 8s ease-in-out infinite" },
    },
  },
  plugins: [],
};
export default config;
