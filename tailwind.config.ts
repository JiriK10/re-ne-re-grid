import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0277BD",
          light: "#22ABFD",
          dark: "#015384",
        },
      },
    },
  },
  plugins: [],
}
export default config
