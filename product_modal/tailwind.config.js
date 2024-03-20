// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        "lx-h": {
          raw: "(min-height: 1000px) and (max-height: 1700px)",
        },
      },
      colors: {
        bg: "var(--color-bg)",
        "bg-secondary": "var(--color-bg-secondary)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        text: "var(--color-text)",
        "text-light": "var(--color-text-light)",
        "text-secondary": "var(--color-text-secondary)",
        "text-secondary-light": "var(--color-text-secondary-light)",
        "text-secondary-lighter": "var(--color-text-secondary-lighter)",
        border: "var(--color-border)",
        "border-secondary": "var(--color-border-secondary)",
        button: "var(--color-button)",
        "button-light": "var(--color-button-light)",
        "button-secondary": "var(--color-button-secondary)",
        "button-secondary-light": "var(--color-button-secondary-light)",
      },
      fontSize: {
        text: "var(--font-size-text)",
        "text-light": "var(--font-size-text-light)",
        "text-secondary": "var(--font-size-text-secondary)",
        "text-secondary-light": "var(--font-size-text-secondary-light)",
        button: "var(--font-size-button)",
        "button-light": "var(--font-size-button-light)",
        "button-secondary": "var(--font-size-button-secondary)",
        "button-secondary-light": "var(--font-size-button-secondary-light)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
