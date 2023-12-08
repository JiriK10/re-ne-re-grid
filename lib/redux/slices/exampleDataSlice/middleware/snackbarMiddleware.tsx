import { createListenerMiddleware } from "@reduxjs/toolkit"

import { exampleDataSlice } from "../exampleDataSlice"
import { ReduxState } from "@/lib/redux"

const snackbarMiddleware = createListenerMiddleware()

snackbarMiddleware.startListening({
  actionCreator: exampleDataSlice.actions.remove,
  effect: async (action, listenerApi) => {
    let origState = listenerApi.getOriginalState() as ReduxState
    let origIds = origState.exampleData.items.map((item) => item.Id)

    let state = listenerApi.getState() as ReduxState
    let currIds = state.exampleData.items.map((item) => item.Id)

    let deletedIds = origIds.filter((origId) => !currIds.includes(origId))

    console.log(`Deleted ID(s): ${deletedIds.join(", ")}`)
  },
})

export default snackbarMiddleware
