import { createSelector } from "@reduxjs/toolkit"

import type { ExampleDataItem, ReduxState } from "@/lib/redux"

export const selectStatus = (state: ReduxState) => state.exampleData.status

export const selectItems = (state: ReduxState) => state.exampleData.items

export const selectChildren = (parentId?: number) =>
  createSelector(selectItems, (items) =>
    items.filter((item) => item.parentId === parentId)
  )

export const selectFirstChild = (parentId?: number) =>
  createSelector(selectChildren(parentId), (items) => items[0])

let getFlattenChildrenTree = (
  items: Array<ExampleDataItem>,
  itemId: number
): Array<ExampleDataItem> => {
  const children = items.filter((i) => i.parentId == itemId)
  return children.flatMap((child) => {
    return [child, ...getFlattenChildrenTree(items, child.Id)]
  })
}

export const selectChildrenTree = (itemId: number) =>
  createSelector(selectItems, (items) => getFlattenChildrenTree(items, itemId))

export const selectItem = (itemId: number) =>
  createSelector(selectItems, (items) =>
    items.find((item) => item.Id === itemId)
  )

export const selectItemHasChildren = (itemId: number) =>
  createSelector(
    selectItems,
    (items) => items.filter((item) => item.parentId === itemId).length
  )

export const selectItemData = (itemId: number) =>
  createSelector(
    selectItems,
    (items) => items.find((item) => item.Id === itemId)?.data
  )
