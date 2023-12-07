"use client"

import { useSelector, selectItemData } from "@/lib/redux"

interface GridHeaderProps {
  itemId: number
}

export default function GridHeader({ itemId }: GridHeaderProps) {
  const itemData = useSelector(selectItemData(itemId)) ?? {}

  return (
    <tr className="bg-primary text-white">
      <th></th>
      {Object.keys(itemData).map((prop) => (
        <th key={`ghc-${prop}`} className="px-4 py-2">
          {prop}
        </th>
      ))}
      <th className="px-4 py-2">Delete</th>
    </tr>
  )
}
