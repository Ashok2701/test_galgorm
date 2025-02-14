import React from "react";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
const Calendar = (props) => {
  const [selectedDate, setselectedDate] = useState();

  const onDateChange = (date) => {
    if (props.type === "maps") {
      console.log("TYYY Date Changed at Maps");
      props.onMapDateChange(date);
    } else {
      console.log("TYYY Date Changed at Calendar");
      props.onCalenderDateChage(date);
    }
    setselectedDate(date);
  };

  useEffect(() => {
    if (props.type === "maps") {
      setselectedDate(props.calenderMapDate);
    } else {
      if (props.weekStartDate.length > 0) {
        const dateComponents = props.weekStartDate.split("-");
        const day = parseInt(dateComponents[1], 10);
        const month = parseInt(dateComponents[0], 10) - 1; // Months are 0-indexed in JavaScript (0 = January, 11 = December)
        const year = parseInt(dateComponents[2], 10);

        const jsDate = new Date(year, month, day);
        setselectedDate(jsDate);
        // console.log(jsDate, "This is js date from calendar")
        // console.log("inside calendar", props.weekStartDate);
      }
    }
  }, [props]);
  // console.log("props.weekStartDate", props.weekStartDate);
  // console.log("props.weekStartDate object", selectedDate);
  return (
    <div style={{ position: "relative" }}>
      <Flatpickr
        dateFormat="d-m-Y"
        value={selectedDate}
        onChange={onDateChange}
        className="shadow-lg border-0 rounded-lg p-2 w-100"
      
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      >
        <CalendarTodayIcon className="text-primary" />
      </div>
    </div>
  );
};

export default Calendar;
