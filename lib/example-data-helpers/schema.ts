import { z } from "zod"

export enum SchemaFieldType {
  String = "string",
  Number = "number",
  Boolean = "boolean",
  DateTime = "datetime",
}

export interface SchemaFieldInfo {
  property: string
  type: SchemaFieldType
  required: boolean
}

export interface SchemaFieldInfos {
  [key: string]: SchemaFieldInfo
}

const fieldIgnore = ["id"]

const fieldMap: { [key: string]: SchemaFieldType } = {
  "Is alive?": SchemaFieldType.Boolean,
  "Knows the answer?": SchemaFieldType.Boolean,

  "Beer consumption (l/y)": SchemaFieldType.Number,
  "Character ID": SchemaFieldType.Number,
  "Minimal distance": SchemaFieldType.Number,
  "Nemesis ID": SchemaFieldType.Number,
  Weight: SchemaFieldType.Number,
  Years: SchemaFieldType.Number,

  Born: SchemaFieldType.DateTime,
  "In space since": SchemaFieldType.DateTime,
}

export function SchemaFieldInfosFromObject(data: any) {
  let fieldInfos: SchemaFieldInfos = {}
  Object.keys(data)
    .filter((prop) => !fieldIgnore.includes(prop.toLowerCase()))
    .forEach((prop, index) => {
      const type = fieldMap[prop] || SchemaFieldType.String
      fieldInfos[prop] = {
        type,
        property: prop,
        required: index < 3 && type != SchemaFieldType.Boolean,
      }
    })
  return fieldInfos
}

export function SchemaFromFieldInfos(fieldInfos: SchemaFieldInfos) {
  let schema: any = {}
  Object.values(fieldInfos).forEach(({ property, type, required }) => {
    let schemaProp
    let params = {
      required_error: `'${property}' is required`,
      invalid_type_error: `'${property}' must be ${type}`,
    }
    switch (type) {
      case SchemaFieldType.Boolean:
        schemaProp = z.coerce.boolean(params)
        break
      case SchemaFieldType.Number:
        schemaProp = z.coerce.number(params).finite().safe()
        if (required) {
          schemaProp = z
            .string(params)
            .min(1, params.required_error)
            .pipe(schemaProp)
        }
        break
      case SchemaFieldType.DateTime:
        schemaProp = z
          .string(params)
          .datetime({ message: params.invalid_type_error, offset: true })
        if (required) {
          schemaProp = z
            .string(params)
            .min(1, params.required_error)
            .pipe(schemaProp)
        } else {
          schemaProp = schemaProp.or(z.string().max(0))
        }
        break
      //case SchemaFieldType.String:
      default:
        schemaProp = z.string(params)
        if (required) {
          schemaProp = schemaProp.min(1, params.required_error)
        }
        break
    }
    schema[property] = schemaProp
  })
  return z.object(schema).strict()
}
