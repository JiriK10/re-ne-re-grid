import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0277BD",
      },
    },
  },
  plugins: [],
}
export default config
