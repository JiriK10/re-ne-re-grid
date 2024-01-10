import { selectStatus } from "@/lib/redux"
import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk"

export const fetchExampleData = createAppAsyncThunk(
  "exampleData/fetch",
  async () => {
    const response = await fetch("http://localhost:3000/api/example-data", {
      method: "GET",
    })
    return await response.json()
  },
  {
    condition: (_, { getState }) => {
      const status = selectStatus(getState())
      return status != "loading"
    },
  }
)
