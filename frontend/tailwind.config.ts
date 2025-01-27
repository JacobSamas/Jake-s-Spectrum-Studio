import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E1E2E',  // Dark theme primary color
        secondary: '#FABD2F', // Accent color
        background: '#0F172A',
        textLight: '#CBD5E1',
        textDark: '#94A3B8'
      },
    },
  },
  plugins: [],
} satisfies Config;
