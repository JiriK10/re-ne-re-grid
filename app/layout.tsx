import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "@/lib/providers"

import styles from "./styles/layout.module.css" // TODO: Smazat???
import "./styles/globals.css"

import { Nav } from "./components/Nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "React/Next/Redux grid",
  description: "My React/Next/Redux playground 😉",
}

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <section className={styles.container}>
            <Nav />
            <main className={styles.main}>{props.children}</main>
          </section>
        </body>
      </html>
    </Providers>
  )
}
