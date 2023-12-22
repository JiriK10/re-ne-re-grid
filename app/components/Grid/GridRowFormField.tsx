"use client"

import moment from "moment"
import {
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Checkbox,
  TextField,
} from "@mui/material"
import { DateTimePicker } from "@mui/x-date-pickers"

import { SchemaFieldInfo, SchemaFieldType } from "@/lib/example-data-helpers"

interface GridRowFormFieldProps {
  fieldInfo: SchemaFieldInfo
  value: any
  error?: string
}

export default function GridRowFormField({
  fieldInfo,
  value,
  error,
}: GridRowFormFieldProps) {
  const { property, required } = fieldInfo
  const label = `${property}${required ? " *" : ""}`

  switch (fieldInfo.type) {
    case SchemaFieldType.Boolean:
      return (
        <FormGroup>
          <FormControlLabel
            label={label}
            control={
              <Checkbox
                name={property}
                defaultChecked={
                  value === true || value?.toLowerCase() === "true"
                }
              />
            }
          />
          <FormHelperText>{error}</FormHelperText>
        </FormGroup>
      )
    case SchemaFieldType.DateTime:
      return (
        <DateTimePicker
          name={property}
          label={label}
          format="YYYY-MM-DD HH:mm:ss"
          ampm={false}
          slotProps={{
            field: { clearable: true },
            textField: {
              size: "small",
              margin: "dense",
              error: (error?.length ?? 0) > 0,
              helperText: error,
            },
          }}
          defaultValue={value ? moment(value) : null}
        />
      )
    //case SchemaFieldType.Number:
    //case SchemaFieldType.String:
    default:
      return (
        <TextField
          name={property}
          label={label}
          size="small"
          margin="dense"
          defaultValue={value}
          error={(error?.length ?? 0) > 0}
          helperText={error}
        />
      )
  }
}
