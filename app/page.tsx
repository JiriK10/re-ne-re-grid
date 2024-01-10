"use client"

import { useDispatch, fetchExampleData } from "@/lib/redux"

import Grid from "./components/Grid/Grid"

export default function IndexPage() {
  const dispatch = useDispatch()
  dispatch(fetchExampleData())

  return <Grid />
}
