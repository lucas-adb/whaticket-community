import { FormControl, Input, InputLabel } from "@material-ui/core";
import React from "react";

export default function BasicDatePicker({ selectedDate, setSelectedDate }) {
  const handleDateChange = (event) => {
    console.log("date selected: ", event.target.value);
    setSelectedDate(event.target.value);
  };

  return (
    <FormControl fullWidth margin="normal">
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
