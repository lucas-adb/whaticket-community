import React from "react";
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formField: {
    flexGrow: 1,
  },
}));

export function FilterFormSelect({
  id,
  label,
  selectedValue,
  handleValueChange,
  options,
}) {
  const classes = useStyles();

  return (
    <FormControl margin="normal" className={classes.formField}>
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
