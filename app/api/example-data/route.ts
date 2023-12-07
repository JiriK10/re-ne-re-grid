/* Core */
import { NextResponse } from "next/server"

import exampleData from "@/public/example-data.json"

let mapItem = (item: any, parentId?: Number) => ({
  Id: Number(item.data.ID),
  parentId,
  data: item.data,
})

let getChildren = (item: any): Array<any> => {
  let childrenProps = Object.keys(item.children || {})
  if (childrenProps.length > 0) {
    return item.children[childrenProps[0]].records ?? []
  }
  return []
}

let getFlattenItems = (children: Array<any>, parentId?: Number): Array<any> => {
  return children.flatMap((child) => {
    let item = mapItem(child, parentId)
    return [item, ...getFlattenItems(getChildren(child), item.Id)]
  })
}

export async function GET() {
  // simulate latency
  await new Promise((r) => setTimeout(r, 500))

  return NextResponse.json(getFlattenItems(exampleData))
}
