import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        title: "#1a1a2e",
        body: "#4a5568",
        // Modern AI-tool inspired palette (same as extension)
        brand: {
          950: "#0f0a1e",
          900: "#1a1033",
          800: "#2d1b4e",
          700: "#4c2889",
          600: "#7c3aed", // Vibrant purple
          500: "#8b5cf6", // Primary brand color - Modern violet
          400: "#a78bfa",
          300: "#c4b5fd",
          200: "#ddd6fe",
          100: "#ede9fe",
          50: "#f5f3ff",
          25: "#faf8ff",
        },
        // Accent color - Cyan/Teal for CTAs and highlights
        accent: {
          900: "#083344",
          800: "#155e75",
          700: "#0e7490",
          600: "#0891b2",
          500: "#06b6d4", // Primary accent - Cyan
          400: "#22d3ee",
          300: "#67e8f9",
          200: "#a5f3fc",
          100: "#cffafe",
          50: "#ecfeff",
        },
        // Secondary accent - Magenta/Pink for premium features
        magenta: {
          900: "#4a044e",
          800: "#6b216e",
          700: "#9333ea",
          600: "#c026d3",
          500: "#d946ef", // Magenta
          400: "#e879f9",
          300: "#f0abfc",
          200: "#f5d0fe",
          100: "#fae8ff",
          50: "#fdf4ff",
        },
        grayblue: {
          900: "#0f172a",
          800: "#1e293b",
          700: "#334155",
          600: "#475569",
          500: "#64748b",
          400: "#94a3b8",
          300: "#cbd5e1",
          200: "#e2e8f0",
          100: "#f1f5f9",
          50: "#f8fafc",
          8: "#fafbfc",
        },
        gray: {
          50: "#fafafa",
          75: "#f7f7f8",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
        // Semantic colors
        success: {
          500: "#10b981",
          400: "#34d399",
          100: "#d1fae5",
        },
        warning: {
          500: "#f59e0b",
          400: "#fbbf24",
          100: "#fef3c7",
        },
        error: {
          500: "#ef4444",
          400: "#f87171",
          100: "#fee2e2",
        },
      },
      backgroundImage: {
        // Modern gradients like extension
        'gradient-brand': 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #06b6d4 100%)',
        'gradient-brand-soft': 'linear-gradient(135deg, #c4b5fd 0%, #f0abfc 50%, #67e8f9 100%)',
        'gradient-accent': 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
        'gradient-premium': 'linear-gradient(135deg, #d946ef 0%, #8b5cf6 100%)',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        's1': '0px 1px 20px 0px rgba(0, 0, 0, 0.04)',
        's2': '0px 8px 40px 0px rgba(0, 0, 0, 0.06), 0px 0px 1px 0px rgba(0, 0, 0, 0.06)',
        's3': '0px 12px 40px -4px rgba(0, 0, 0, 0.10), 0px 0px 2px 0px rgba(0, 0, 0, 0.06)',
        'brand': '0 4px 14px 0 rgba(139, 92, 246, 0.3)',
        'brand-lg': '0 8px 25px -5px rgba(139, 92, 246, 0.4)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'fadeInUp': 'fadeInUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;

