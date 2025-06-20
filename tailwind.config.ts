import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    "from-amber-500",
    "from-blue-50",
    "from-blue-500",
    "from-blue-950",
    "from-cyan-500",
    "from-emerald-500",
    "from-gray-500",
    "from-gray-600",
    "from-green-400",
    "from-green-500",
    "from-indigo-500",
    "from-orange-500",
    "from-pink-500",
    "from-purple-400",
    "from-purple-500",
    "from-purple-600",
    "from-red-500",
    "from-rose-500",
    "from-slate-500",
    "from-teal-500",
    "from-violet-500",
    "from-yellow-400",
    "from-yellow-500",
    "to-amber-600",
    "to-blue-500",
    "to-blue-600",
    "to-blue-700",
    "to-cyan-600",
    "to-emerald-600",
    "to-gray-600",
    "to-gray-700",
    "to-green-600",
    "to-indigo-500",
    "to-indigo-600",
    "to-orange-500",
    "to-orange-600",
    "to-pink-500",
    "to-pink-600",
    "to-purple-50",
    "to-purple-600",
    "to-purple-950",
    "to-red-600",
    "to-rose-600",
    "to-slate-600",
    "to-teal-500",
    "to-teal-600",
    "to-violet-600",
    "to-yellow-600",
    "via-purple-500",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
