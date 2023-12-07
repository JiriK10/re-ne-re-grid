import { createSelector } from "@reduxjs/toolkit"

import type { ReduxState } from "@/lib/redux"

export const selectItems = (state: ReduxState) => state.exampleData.items

export const selectChildren = (parentId?: number) =>
  createSelector(selectItems, (items) =>
    items.filter((item) => item.parentId === parentId)
  )

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
