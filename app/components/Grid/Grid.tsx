"use client"

import { useSelector, selectChildren } from "@/lib/redux"

import GridHeader from "./GridHeader"
import GridRow from "./GridRow"

interface GridProps {
  parentId?: number
}

export default function Grid({ parentId }: GridProps) {
  const items = useSelector(selectChildren(parentId))

  if (items.length < 1) {
    return null
  }

  return (
    <>
      <table className="text-center">
        <thead>
          <GridHeader key={`gh-${items[0].Id}`} itemId={items[0].Id} />
        </thead>
        <tbody>
          {items.map((item, index) => (
            <GridRow
              key={`gr-${item.Id}`}
              itemId={item.Id}
              striped={index % 2 == 1}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}
