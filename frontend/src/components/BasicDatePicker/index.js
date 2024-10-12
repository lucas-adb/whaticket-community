import { FormControl, Input, InputLabel, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  formField: {
    flexGrow: 1,
  },
}));

export default function BasicDatePicker({ selectedDate, setSelectedDate }) {
  const classes = useStyles();

  const handleDateChange = (event) => {
    console.log("date selected: ", event.target.value);
    setSelectedDate(event.target.value);
  };

  return (
    <FormControl margin="normal" className={classes.formField}>
      <InputLabel id="date-filter" shrink>
        Data
      </InputLabel>
      <Input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        label="date-filter"
      />
    </FormControl>
  );
}

// return (
//   <div>
//     <input type="date" value={selectedDate} onChange={handleDateChange} />
//   </div>
// );
