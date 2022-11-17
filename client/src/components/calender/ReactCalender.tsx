import React from "react";
//@ts-ignore
import Calendar from "react-calendar";
import { useState } from "react";
import 'react-calendar/dist/Calendar.css';

function ReactCalender() {
  const [date, setDate] = useState(new Date());

  const onChange = (date:Date) => {
    setDate(date);
  };

  return (
    <div>
      <Calendar calendarType="Hebrew" onChange={onChange} value={date} />
      <p>{`${date}`}</p>
    </div>
  );
}

export default ReactCalender;
