"use client"

import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCaretDown,
  faCaretRight,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons"

import {
  exampleDataSlice,
  useDispatch,
  useSelector,
  selectItem,
  selectItemHasChildren,
} from "@/lib/redux"

import Grid from "./Grid"

interface GridRowProps {
  itemId: number
  striped?: Boolean
}

export default function GridRow({ itemId, striped = false }: GridRowProps) {
  const item = useSelector(selectItem(itemId))
  if (item == null) {
    return null
  }

  const dispatch = useDispatch()

  const rowProps = Object.keys(item.data)
  const rowColor = striped ? "bg-neutral-300" : "bg-neutral-100"
  const hasChildren = useSelector(selectItemHasChildren(itemId))

  let subGrid = null
  if (item.opened && hasChildren) {
    subGrid = (
      <tr className={rowColor}>
        <td colSpan={rowProps.length + 2} className="pl-12">
          <Grid parentId={itemId} />
        </td>
      </tr>
    )
  }

  return (
    <>
      <tr
        className={classNames("text-neutral-800", rowColor, {
          "cursor-pointer": hasChildren,
        })}
        onClick={(e) =>
          hasChildren && dispatch(exampleDataSlice.actions.toggle(itemId))
        }
      >
        <td className="w-28">
          <FontAwesomeIcon
            icon={item.opened && hasChildren ? faCaretDown : faCaretRight}
            className={classNames({ "opacity-20": !hasChildren })}
          />
        </td>
        {rowProps.map((prop) => (
          <td key={`grc-${prop}`} className="px-4 py-2">
            {item.data[prop]}
          </td>
        ))}
        <td
          title="Delete item"
          className="w-20 text-lg text-red-500 hover:text-red-700 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            dispatch(exampleDataSlice.actions.remove(itemId))
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </td>
      </tr>
      {subGrid}
    </>
  )
}
