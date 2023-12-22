"use client"

import { exampleDataSlice, useDispatch } from "@/lib/redux"

import GridRowFormDialog from "./GridRowFormDialog"

interface GridRowEditDialogProps {
  itemId?: number
  open: boolean
  onClose(): void
}

export default function GridRowEditDialog({
  itemId,
  open,
  onClose,
}: GridRowEditDialogProps) {
  const dispatch = useDispatch()

  async function editItem(itemData: any, parentId?: number, itemId?: number) {
    await new Promise((r) => setTimeout(r, 1000))

    dispatch(
      exampleDataSlice.actions.update({
        Id: itemId!,
        data: itemData,
      })
    )
  }
  return (
    <GridRowFormDialog
      itemId={itemId}
      open={open}
      title="Edit item"
      submitText="Save"
      submittingText="Saving..."
      onSubmit={editItem}
      onClose={onClose}
    />
  )
}
