import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

export function FilterFormSelect({
  id,
  label,
  selectedValue,
  handleValueChange,
  options,
}) {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id={`${id}-label`} shrink>
        {label}
      </InputLabel>
      <Select
        labelId={`${id}-label`}
        value={selectedValue}
        onChange={handleValueChange}
        displayEmpty
        id={id}
        label={label}
      >
        <MenuItem value="">Nenhum</MenuItem>
        {options?.map((opt) => (
          <MenuItem key={opt.id} value={opt.id}>
            {opt.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
