import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "@/lib/providers"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import styles from "./styles/layout.module.css" // TODO: Smazat???
import "./styles/globals.css"

import { Nav } from "./components/Nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "React/Next/Redux grid",
  description: "My React/Next/Redux playground 😉",
}
export const viewport = { width: "device-width", initialScale: 1 }

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <section className={styles.container}>
            <Nav />
            {children}
          </section>
        </body>
      </html>
    </Providers>
  )
}
