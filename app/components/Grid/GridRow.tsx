"use client"

import { useState } from "react"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCaretDown,
  faCaretRight,
  faCopy,
  faEdit,
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
import GridRowEditDialog from "./GridRowEditDialog"
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
  const [copyDialogOpen, setCopyDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
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
        <td
          className="px-4 py-2 whitespace-nowrap"
          onClick={(e) => e.stopPropagation()}
        >
          <FontAwesomeIcon
            icon={faSquarePlus}
            title="Add new child"
            className="p-3 text-xl text-green-600 hover:text-green-800 cursor-pointer"
            onClick={() => setAddDialogOpen(true)}
          />
          <FontAwesomeIcon
            icon={faCopy}
            title="Copy item"
            className="p-3 text-xl text-green-600 hover:text-green-800 cursor-pointer"
            onClick={() => setCopyDialogOpen(true)}
          />
          <FontAwesomeIcon
            icon={faEdit}
            title="Edit item"
            className="p-3 text-xl text-primary hover:text-primary-dark cursor-pointer"
            onClick={() => setEditDialogOpen(true)}
          />
          <FontAwesomeIcon
            icon={faTrashCan}
            title="Delete item"
            className="p-3 text-xl text-red-500 hover:text-red-700 cursor-pointer"
            onClick={() => setDeleteDialogOpen(true)}
          />
        </td>
      </tr>
      {subGrid}
      <GridRowAddDialog
        parentId={itemId}
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
      />
      <GridRowAddDialog
        itemId={itemId}
        open={copyDialogOpen}
        title="Copy item"
        onClose={() => setCopyDialogOpen(false)}
      />
      <GridRowEditDialog
        itemId={itemId}
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
      />
      <GridRowDeleteDialog
        itemId={itemId}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </>
  )
}
