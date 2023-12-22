"use client"

import { exampleDataSlice, useDispatch } from "@/lib/redux"

import GridRowFormDialog from "./GridRowFormDialog"

interface GridRowAddDialogProps {
  parentId?: number
  itemId?: number
  open: boolean
  title?: string
  submitText?: string
  submittingText?: string
  onClose(): void
}

export default function GridRowAddDialog({
  parentId,
  itemId,
  open,
  title = "Add new item",
  submitText = "Add item",
  submittingText = "Adding...",
  onClose,
}: GridRowAddDialogProps) {
  const dispatch = useDispatch()

  async function addItem(itemData: any, parentId?: number, itemId?: number) {
    await new Promise((r) => setTimeout(r, 1000))

    const newItemId = new Date().getTime()
    dispatch(
      exampleDataSlice.actions.add({
        parentId: parentId,
        Id: newItemId,
        opened: false,
        data: {
          ID: newItemId.toString(),
          ...itemData,
        },
      })
    )
  }
  return (
    <GridRowFormDialog
      parentId={parentId}
      itemId={itemId}
      open={open}
      title={title}
      submitText={submitText}
      submittingText={submittingText}
      onSubmit={addItem}
      onClose={onClose}
    />
  )
}
