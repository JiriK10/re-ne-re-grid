"use client"

import { useSelector, selectChildren } from "@/lib/redux"

import GridHeader from "./GridHeader"
import GridRow from "./GridRow"

interface GridProps {
  parentId?: number
}

export default function Grid({ parentId }: GridProps) {
  const items = useSelector(selectChildren(parentId))

  if (parentId != null && items.length < 1) {
    return null
  }

  const firstChildId = items?.length > 0 ? items[0].Id : null
  return (
    <>
      <table className="text-center">
        <thead>
          <GridHeader key={`gh-${firstChildId}`} itemId={firstChildId} />
        </thead>
        <tbody>
          {items?.map((item, index) => (
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
