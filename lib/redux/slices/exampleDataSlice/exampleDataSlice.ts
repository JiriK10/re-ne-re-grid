import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import { ExampleDataItem } from "./types"
import { fetchAsync } from "./thunks"

export interface ExampleDataSliceState {
  items: Array<ExampleDataItem>
  status: "idle" | "loading" | "failed"
}

const initialState: ExampleDataSliceState = {
  items: [],
  status: "idle",
}

export const exampleDataSlice = createSlice({
  name: "exampleData",
  initialState,
  reducers: {
    // Open/close item
    toggle: (state, itemId: PayloadAction<number>) => {
      let item = state.items.find((item) => item.Id == itemId.payload)
      if (item != null) {
        item.opened = !item.opened
      }
    },
    // Adds new item
    add: (state, item: PayloadAction<ExampleDataItem>) => {
      state.items.push(item.payload)
      // Open parent if collapsed
      let parentItem =
        item.payload.parentId != null
          ? state.items.find((si) => si.Id == item.payload.parentId)
          : null
      if (parentItem != null && !parentItem.opened) {
        parentItem.opened = true
      }
    },
    // Removes item and whole tree of its children
    remove: (state, itemId: PayloadAction<number>) => {
      let itemsToRemove: Array<number> = []
      let queue = [itemId.payload]
      while (queue.length > 0) {
        let queueItemId = queue.shift() as number
        itemsToRemove.push(queueItemId)
        queue.push(
          ...state.items
            .filter((item) => item.parentId == queueItemId)
            .map((item) => item.Id)
        )
      }
      state.items = state.items.filter(
        (item) => !itemsToRemove.includes(item.Id)
      )
    },
    update: (state, item: PayloadAction<ExampleDataItem>) => {
      let currItem = state.items.find((si) => si.Id == item.payload.Id)
      if (currItem != null) {
        currItem.data = {
          ID: currItem.data.ID,
          ...item.payload.data,
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.items = action.payload ?? []
      })
  },
})
