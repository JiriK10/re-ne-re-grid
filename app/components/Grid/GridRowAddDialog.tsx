"use client"

import { exampleDataSlice, useDispatch } from "@/lib/redux"

import GridRowFormDialog from "./GridRowFormDialog"

interface GridRowAddDialogProps {
  parentId?: number
  itemId?: number
  open: boolean
  onClose(): void
}

export default function GridRowAddDialog({
  parentId,
  itemId,
  open,
  onClose,
}: GridRowAddDialogProps) {
  const dispatch = useDispatch()

  async function addItem(itemData: any, parentId: number, itemId: number) {
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
      title="Add new item"
      submitText="Add item"
      submittingText="Adding..."
      onSubmit={addItem}
      onClose={onClose}
    />
  )
}
