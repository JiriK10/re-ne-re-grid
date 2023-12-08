"use client"

import { useState } from "react"
import classNames from "classnames"
import { useSnackbar } from "notistack"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCaretDown,
  faCaretRight,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons"

import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

import {
  exampleDataSlice,
  useDispatch,
  useSelector,
  selectItem,
  selectChildrenTree,
} from "@/lib/redux"

import Grid from "./Grid"

interface GridRowProps {
  itemId: number
  striped?: Boolean
}

export default function GridRow({ itemId, striped = false }: GridRowProps) {
  const item = useSelector(selectItem(itemId))
  if (item == null) {
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

  const { enqueueSnackbar } = useSnackbar()
  const [dialogOpen, setDialogOpen] = useState(false)

  function closeDialog() {
    setDialogOpen(false)
  }

  function confirmDialog() {
    closeDialog()

    let deletedIds = [itemId, ...childrenTree.map((ch) => ch.Id)]
    enqueueSnackbar(`Deleted ID(s): ${deletedIds.join(", ")}`, {
      variant: "success",
    })

    dispatch(exampleDataSlice.actions.remove(itemId))
  }

  return (
    <>
      <tr
        className={classNames("text-neutral-800", rowColor, {
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
          title="Delete item"
          className="w-20 text-lg text-red-500 hover:text-red-700 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            setDialogOpen(true)
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </td>
      </tr>
      {subGrid}
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>Confirm delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete this row with its children?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button color="error" onClick={confirmDialog} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
