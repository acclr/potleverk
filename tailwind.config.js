/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      xlup: {
        min: "1040px"
      },
      xl: {
        max: "1039px"
      },
      lgup: {
        min: "1024px"
      },
      lg: {
        max: "1023px"
      },
      mdup: {
        min: "768px"
      },
      md: {
        max: "767px"
      },
      smup: {
        min: "640px"
      },
      sm: {
        max: "639px"
      },
      xsup: {
        min: "380px"
      },
      xs: {
        max: "379px"
      }
    },
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "xl": "1180px",
        "2xl": "1180px",
        "3xl": "1240px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          '50': '#effefb',
          '100': '#c7fff5',
          '200': '#90ffeb',
          '300': '#51f7e1',
          '400': '#1de4cf',
          '500': '#04c8b6',
          '600': '#00b4a8',
          '700': '#058079',
          '800': '#0a6561',
          '900': '#0d5451',
          '950': '#003333',
          DEFAULT: "#00b4a8",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          '50': '#fef1fa',
          '100': '#fee5f6',
          '200': '#ffcbf0',
          '300': '#ffa0e2',
          '400': '#ff66cc',
          '500': '#fc38b4',
          '600': '#ec1693',
          '700': '#ce0876',
          '800': '#aa0a61',
          '900': '#8d0e53',
          '950': '#52002c',
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
    },
  },
  plugins: [require("tailwindcss-animate")],
}

