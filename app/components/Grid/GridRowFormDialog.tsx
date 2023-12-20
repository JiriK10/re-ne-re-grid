"use client"

import { useFormState, useFormStatus } from "react-dom"
import { ZodError } from "zod"

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"

import { useSelector, selectItem, selectFirstChild } from "@/lib/redux"
import {
  SchemaFieldInfosFromObject,
  SchemaFieldType,
  SchemaFromFieldInfos,
} from "@/lib/example-data-helpers"

import GridRowFormField from "./GridRowFormField"

interface GridRowFormDialogSubmitButtonProps {
  submitText: string
  submittingText: string
  onClose(): void
}

interface GridRowFormDialogProps extends GridRowFormDialogSubmitButtonProps {
  parentId?: number
  itemId?: number
  open: boolean
  title: string
  onSubmit(itemData: any, parentId?: number, itemId?: number): Promise<void>
}

function DialogButtons({
  submitText,
  submittingText,
  onClose,
}: GridRowFormDialogSubmitButtonProps) {
  const { pending } = useFormStatus()
  return (
    <>
      <Button className="text-neutral-500" disabled={pending} onClick={onClose}>
        Cancel
      </Button>
      <Button type="submit" color="primary" disabled={pending} autoFocus>
        {pending ? submittingText : submitText}
      </Button>
    </>
  )
}

export default function GridRowFormDialog({
  parentId,
  itemId,
  open,
  title,
  submitText,
  submittingText,
  onSubmit,
  onClose,
}: GridRowFormDialogProps) {
  const firstChild = useSelector(selectFirstChild(parentId))
  if (firstChild == null) {
    console.error("GridRowFormDialog: parentId not found", parentId)
    return null
  }
  let item = itemId != null ? useSelector(selectItem(itemId)) : null
  if (item != null && item.parentId != parentId) {
    console.error(
      "GridRowFormDialog: item has different parentId",
      parentId,
      item.parentId
    )
    item = null
  }

  const rowProps = Object.keys(firstChild.data).filter(
    (prop) => prop.toLowerCase() != "id"
  )

  const fieldInfos = SchemaFieldInfosFromObject(firstChild.data)
  const validationSchema = SchemaFromFieldInfos(fieldInfos)
  const onFormAction = async function (
    prevState: any,
    formData: FormData
  ): Promise<ZodError | undefined> {
    let itemData: any = {}
    rowProps.forEach((prop) => {
      let value = formData.get(prop)?.toString()
      if (fieldInfos[prop].type == SchemaFieldType.Boolean) {
        value = (!!value).toString()
      }
      itemData[prop] = value
    })

    const validated = validationSchema.safeParse(itemData)
    if (!validated.success) {
      return validated.error
    }

    await onSubmit(itemData, parentId, itemId)
    onClose()
  }

  const [formError, formAction] = useFormState(onFormAction, null)
  const fieldErrors: any = formError?.formErrors.fieldErrors || {}

  return (
    <Dialog open={open} onClose={onClose}>
      <form action={formAction}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: 400 }} className="flex flex-col">
            {rowProps.map((prop) => (
              <GridRowFormField
                fieldInfo={fieldInfos[prop]}
                value={item != null ? item.data[prop] : null}
                error={
                  Object.hasOwn(fieldErrors, prop) ? fieldErrors[prop] : null
                }
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <DialogButtons
            submitText={submitText}
            submittingText={submittingText}
            onClose={onClose}
          />
        </DialogActions>
      </form>
    </Dialog>
  )
}
