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
        <FormGroup key={property}>
          <FormControlLabel
            label={label}
            control={
              <Checkbox name={property} defaultChecked={Boolean(value)} />
            }
          />
          <FormHelperText>{error}</FormHelperText>
        </FormGroup>
      )
    case SchemaFieldType.DateTime:
      return (
        <DateTimePicker
          key={property}
          name={property}
          label={label}
          format="YYYY-MM-DDTHH:mm:ssZ" // ISO8601
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
          key={property}
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
