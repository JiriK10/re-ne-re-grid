"use client"

import { useSelector, selectChildren } from "@/lib/redux"

import GridHeader from "./GridHeader"
import GridRow from "./GridRow"

interface GridProps {
  parentId?: number
}

export default function Grid({ parentId }: GridProps) {
  const items = useSelector(selectChildren(parentId))

  if (items.length < 1) {
    return null
  }

  //<ConfirmDialog />
  //<Toast position="bottom-center" />

  return (
    <>
      <table className="text-center">
        <thead>
          <GridHeader key={`gh-${items[0].Id}`} itemId={items[0].Id} />
        </thead>
        <tbody>
          {items.map((item, index) => (
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

/* 
import { useConfirm } from "primevue/useconfirm"
import ConfirmDialog from "primevue/confirmdialog"
import { useToast } from "primevue/usetoast"
import Toast from "primevue/toast"
import { GridItem } from "../models/GridItem"
import GridHeader from "./GridHeader.vue"
import GridRow from "./GridRow.vue"


const confirmDialog = useConfirm()
const toast = useToast()

function confirmDelete(item: GridItem) {
  confirmDialog.require({
    header: "Confirm delete",
    message: "Do you want to delete this row with its children?",
    acceptClass: "bg-primary text-gray-900 px-10",
    rejectClass: "p-button-text text-primary px-10",
    accept: () => {
      confirmDialog.close()
      deleteItem(item)
    },
    reject: () => {
      confirmDialog.close()
    },
    onHide: () => {
      confirmDialog.close()
    },
  })
}

function deleteItem(item: GridItem) {
  let itemIndex = props.items!.findIndex((i) => i == item)
  if (itemIndex > -1) {
    let deletedIDs: Array<number> = []
    let query = [props.items![itemIndex]]
    while (query.length > 0) {
      let queryItem: GridItem = query.shift()!
      deletedIDs.push(queryItem.data.ID ?? "???")
      query.push(...queryItem.children!)
    }
    toast.add({
      severity: "error",
      summary: "Deleted IDs",
      detail: deletedIDs.join(", "),
      life: 3000,
    })

    props.items!.splice(itemIndex, 1)
    emit("item-deleted")
  }
}
</script>

*/
