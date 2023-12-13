"use client"

import { useDispatch, fetchAsync } from "@/lib/redux"

import Grid from "./components/Grid/Grid"

export default function IndexPage() {
  const dispatch = useDispatch()
  dispatch(fetchAsync())

  return <Grid />
}
