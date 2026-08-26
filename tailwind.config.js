/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#0A0E12",
          900: "#10151B",
          800: "#161D26",
          700: "#1F2933",
          600: "#2C3742",
        },
        line: "#26313C",
        signal: {
          ok: "#3DDC97",
          warn: "#F2B84B",
          crit: "#F0553D",
          info: "#4F9DF2",
        },
        ink: {
          hi: "#EDF2F5",
          mid: "#9AACB8",
          lo: "#5D6F7A",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        panel: "0 0 0 1px #26313C, 0 8px 24px -12px rgba(0,0,0,0.6)",
      },
      keyframes: {
        pulse_dot: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.35 },
        },
      },
      animation: {
        pulse_dot: "pulse_dot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
