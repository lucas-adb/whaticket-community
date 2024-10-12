import { FormControl, Input, InputLabel, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";

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

  // useEffect to prevent errors when user clicks on clear button
  useEffect(() => {
    if (selectedDate === "") {
      setSelectedDate(new Date().toISOString());
    }
  }, [selectedDate]);

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
