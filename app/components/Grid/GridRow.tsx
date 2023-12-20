"use client"

import { useState } from "react"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCaretDown,
  faCaretRight,
  faSquarePlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons"

import {
  exampleDataSlice,
  useDispatch,
  useSelector,
  selectItem,
  selectChildrenTree,
} from "@/lib/redux"

import Grid from "./Grid"
import GridRowAddDialog from "./GridRowAddDialog"
import GridRowDeleteDialog from "./GridRowDeleteDialog"

interface GridRowProps {
  itemId: number
  striped?: Boolean
}

export default function GridRow({ itemId, striped = false }: GridRowProps) {
  const item = useSelector(selectItem(itemId))
  if (item == null) {
    console.error("GridRow: itemId not found", itemId)
    return null
  }

  const dispatch = useDispatch()

  const rowProps = Object.keys(item.data)
  const rowColor = striped ? "bg-neutral-300" : "bg-neutral-100"
  const childrenTree = useSelector(selectChildrenTree(itemId))
  const hasChildren = childrenTree.length > 0

  let subGrid = null
  if (item.opened && hasChildren) {
    subGrid = (
      <tr className={rowColor}>
        <td colSpan={rowProps.length + 2} className="pl-12">
          <Grid parentId={itemId} />
        </td>
      </tr>
    )
  }

  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  return (
    <>
      <tr
        className={classNames("text-neutral-800 hover:text-primary", rowColor, {
          "cursor-pointer": hasChildren,
        })}
        onClick={() =>
          hasChildren && dispatch(exampleDataSlice.actions.toggle(itemId))
        }
      >
        <td className="w-28">
          <FontAwesomeIcon
            icon={item.opened && hasChildren ? faCaretDown : faCaretRight}
            className={classNames({ "opacity-20": !hasChildren })}
          />
        </td>
        {rowProps.map((prop) => (
          <td key={`grc-${prop}`} className="px-4 py-2">
            {item.data[prop]}
          </td>
        ))}
        <td className="px-4 py-2 whitespace-nowrap">
          <FontAwesomeIcon
            icon={faSquarePlus}
            title="Add new child"
            className="p-3 text-xl text-green-600 hover:text-green-800 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              setAddDialogOpen(true)
            }}
          />
          <FontAwesomeIcon
            icon={faTrashCan}
            title="Delete item"
            className="p-3 text-xl text-red-500 hover:text-red-700 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              setDeleteDialogOpen(true)
            }}
          />
        </td>
      </tr>
      {subGrid}
      <GridRowAddDialog
        parentId={itemId}
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
      />
      <GridRowDeleteDialog
        itemId={itemId}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </>
  )
}
