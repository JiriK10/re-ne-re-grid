"use client"

import { useDispatch, fetchAsync } from "@/lib/redux"

import Grid from "./components/Grid/Grid"

// TODO: dogs page s redux api fetch ????

export default function IndexPage() {
  const dispatch = useDispatch()
  dispatch(fetchAsync())

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <Grid />
    </main>
  )
}
