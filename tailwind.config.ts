import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        inter: ["var(--font-inter)"],
      },
      colors: {
        // Core Brand Colors
        gecko: {
          green: "#4BCC00",
          yellow: "#FFDD33",
          night: "#0D1217",
          light: "#FFFFFF",
        },
        // Secondary Colors
        secondary: {
          "apple-green": "#409533",
          "everglade-mint": "#19412D",
          "sushi-green": "#6DC839",
          "sulu-citron": "#D4F266",
          "mindaro-lime": "#CDF995",
          "cornflower-purple": "#8465F2",
          "heliotrope-violet": "#CE82FF",
          "dodger-blue": "#4596F7",
          "malibu-cyan": "#65D3F2",
          "hibiscus-rose": "#CA376D",
          "persian-magenta": "#F265D3",
          "illusion-pink": "#F39FE3",
          "fire-orange": "#FF9932",
          "smoke-green": "#99A765",
          "axolotl-green": "#596D4D",
          "comet-indigo": "#3C4157",
          "mortar-violet": "#514256",
          "tacha-amber": "#D6B45C",
          "corn-amber": "#9E8953",
        },
        // Semantic Colors
        semantic: {
          success: "#00A83E",
          danger: "#FF3A33",
          warning: "#FFDD33",
          info: "#33C0FF",
        },
        // Light Neutrals
        "moon-dust": {
          10: "#0F172A",
          9: "#1E293B",
          8: "#334155",
          7: "#475569",
          6: "#64748B",
          5: "#94A3B8",
          4: "#CBD5E1",
          3: "#EFF2F5",
          2: "#F1F5F9",
          1: "#F8FAFC",
        },
        // Dark Neutrals
        "star-dust": {
          10: "#0D1217",
          9: "#1B232D",
          8: "#212D3B",
          7: "#384A61",
          6: "#4A6382",
          5: "#5D7CA2",
          4: "#7D96B5",
          3: "#8EA3BE",
          2: "#BECBDA",
          1: "#DFE5EC",
        },
        // UI System Colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 0 0 rgba(75, 204, 0, 0.7)",
          },
          "50%": {
            opacity: "0.8",
            boxShadow: "0 0 0 10px rgba(75, 204, 0, 0)",
          },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gecko-pattern": "url('/patterns/gecko-pattern.svg')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

