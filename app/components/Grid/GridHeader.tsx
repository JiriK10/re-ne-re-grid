"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons"

import { useSelector, selectItem, ExampleDataItem } from "@/lib/redux"

import GridRowAddDialog from "./GridRowAddDialog"

interface GridHeaderProps {
  itemId: number | null
}

export default function GridHeader({ itemId }: GridHeaderProps) {
  const item =
    itemId != null
      ? useSelector(selectItem(itemId))
      : ({ data: {} } as ExampleDataItem)
  if (item == null) {
    console.error("GridHeader: itemId not found", itemId)
    return null
  }

  const rowProps = Object.keys(item.data)
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <tr className="bg-primary text-white">
        <th
          title="Add new item"
          className="px-4 py-2 text-xl hover:text-neutral-200 cursor-pointer"
          onClick={() => setDialogOpen(true)}
        >
          <FontAwesomeIcon icon={faSquarePlus} />
        </th>
        {rowProps.map((prop) => (
          <th key={`ghc-${prop}`} className="px-4 py-2">
            {prop}
          </th>
        ))}
        <th></th>
      </tr>
      <GridRowAddDialog
        parentId={item.parentId}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  )
}
