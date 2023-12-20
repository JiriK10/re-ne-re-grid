"use client"

import { useState } from "react"
import { useSnackbar } from "notistack"

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"

import {
  exampleDataSlice,
  useDispatch,
  useSelector,
  selectItem,
  selectChildrenTree,
} from "@/lib/redux"

interface GridRowDeleteDialogProps {
  itemId: number
  open: boolean
  onClose(): void
}

export default function GridRowDeleteDialog({
  itemId,
  open,
  onClose,
}: GridRowDeleteDialogProps) {
  const item = useSelector(selectItem(itemId))
  if (item == null) {
    console.error("GridRowDeleteDialog: itemId not found", itemId)
    return null
  }

  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const [deleting, setDeleting] = useState(false)
  const childrenTree = useSelector(selectChildrenTree(itemId))

  const onConfirm = async function (): Promise<void> {
    setDeleting(true)

    await new Promise((r) => setTimeout(r, 1000))

    let deletedIds = [itemId, ...childrenTree.map((ch) => ch.Id)]
    enqueueSnackbar(`Deleted ID(s): ${deletedIds.join(", ")}`, {
      variant: "success",
    })

    dispatch(exampleDataSlice.actions.remove(itemId))

    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you want to delete this row with its children?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          className="text-neutral-500"
          disabled={deleting}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button color="error" disabled={deleting} autoFocus onClick={onConfirm}>
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
