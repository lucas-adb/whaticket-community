import React, { useState } from "react";

export default function BasicDatePicker({ selectedDate, setSelectedDate }) {
  // const [selectedDate, setSelectedDate] = useState(
  //   new Date().toISOString().split("T")[0]
  // );

  const handleDateChange = (event) => {
    console.log("date selected: ", event.target.value);
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <input type="date" value={selectedDate} onChange={handleDateChange} />
    </div>
  );
}
