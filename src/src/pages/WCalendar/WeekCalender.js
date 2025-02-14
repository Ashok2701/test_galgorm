// import moment from "moment";
// import { useEffect, useState } from "react";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import { getFullDate } from "./foramatterFunctions";
// import { IconButton, Tooltip } from "@material-ui/core";

// const WeekCalender = (props) => {
//   const [week, setWeek] = useState({ weekDate: null, weekObject: null });

//   const position = {
//     fontSize: 17,
//     fontWeight: 600,
//     fontFamily: "sans-serif",
//   };

//   const leftIcon = {
//     position: "relative",
//     top: 17,
//     // backgroundColor: "red",
//     borderRadius: "100%",
//     fontSize: 24,
//     color: "white",
//   };

//   useEffect(() => {
//     let startmonthInNumber = moment().startOf("week").get("month");
//     let StartMonth = moment().month(startmonthInNumber).format("MMMM");
//     let StartDate = moment().startOf("week").get("date") + 1;
//     let fetchStartDate = moment().startOf("isoWeek");
//     let startFullDate = getFullDate(fetchStartDate);

//     let endmonthInNumber = moment().endOf("week").get("month");
//     let EndMonth = moment().month(endmonthInNumber).format("MMMM");
//     let EndDate = moment().endOf("week").get("date") + 1;
//     console.log(EndDate,"End Date ")
//     let fetchEndDate = moment().endOf("week").add(1, "days");

//     let endFullDate = getFullDate(fetchEndDate);

//     let actualValue =
//       StartDate + " " + StartMonth + " - " + EndDate + " " + EndMonth;
//     setWeek({ weekDate: actualValue, weekObject: moment().startOf("week")._d });
//     props.startEndDates(startFullDate, endFullDate);
//   }, []);
//   useEffect(() => {
//     let date = moment(new Date(props.calenderDate));
//     let StartWeek = date.startOf("week").get("date");

//     let startmonthInNumber = date.startOf("week").get("month");
//     let endmonthInNumber1 = date.endOf("week").get("month");
//     let StartMonth = "";
//     let StartDate = "";
//     let increment = false;
//     let flag = 0;

//     console.log("TYYY WeekCalendar StartWeek", StartWeek);
//     console.log("TYYY WeekCalendar startmonthInNumber", startmonthInNumber);
//     console.log("TYYY WeekCalendar endmonth1", endmonthInNumber1);

//     if (StartWeek == 30) {
//       switch (startmonthInNumber) {
//         case 0:
//           increment = true;
//           flag = 3;
//           break;
//         case 1:
//           increment = false;
//           flag = 3;
//           break;
//         case 2:
//           increment = true;
//           flag = 3;
//           break;
//         case 3:
//           increment = false;
//           flag = 3;
//           break;
//         case 4:
//           increment = true;
//           flag = 3;
//           break;
//         case 5:
//           increment = false;
//           flag = 3;
//           break;
//         case 6:
//           increment = true;
//           flag = 3;
//           break;
//         case 7:
//           increment = true;
//           flag = 3;
//           break;
//         case 8:
//           increment = false;
//           flag = 3;
//           break;
//         case 9:
//           increment = true;
//           flag = 3;
//           break;
//         case 10:
//           increment = false;
//           flag = 3;
//           break;
//         case 11:
//           increment = true;
//           flag = 3;
//           break;
//       }
//     } else if (StartWeek == 31) {
//       switch (startmonthInNumber) {
//         case 0:
//           increment = true;
//           flag = 4;
//           break;
//         case 1:
//           increment = false;
//           flag = 4;
//           break;
//         case 2:
//           increment = true;
//           flag = 4;
//           break;
//         case 3:
//           increment = false;
//           flag = 4;
//           break;
//         case 4:
//           increment = true;
//           flag = 4;
//           break;
//         case 5:
//           increment = false;
//           flag = 4;
//           break;
//         case 6:
//           increment = true;
//           flag = 4;
//           break;
//         case 7:
//           increment = true;
//           flag = 4;
//           break;
//         case 8:
//           increment = false;
//           flag = 4;
//           break;
//         case 9:
//           increment = true;
//           flag = 4;
//           break;
//         case 10:
//           increment = false;
//           flag = 4;
//           break;
//         case 11:
//           increment = true;
//           flag = 4;
//           break;
//       }
//     }

//     if (increment) {
//       StartMonth = date.month(startmonthInNumber).format("MMMM");
//       StartDate = date.startOf("week").get("date") + 2;
//       flag = 1;
//     } else {
//       if (flag !== 0) {
//         StartMonth = date.month(startmonthInNumber + 1).format("MMMM");
//         StartDate = 1;
//         flag = 2;
//       }
//     }

//     console.log("TYYY WeekCalendar flag", flag);
//     if (flag == 0) {
//       StartMonth = date.month(startmonthInNumber).format("MMMM");

//       console.log("TYYY WeekCalendar StartMonth", StartMonth);
//       StartDate = date.startOf("week").get("date") + 1;
//       console.log("TYYY WeekCalendar StartDAte", StartDate);
//     }
//     let endmonthInNumber = date.endOf("week").get("month");

//     console.log("TYYY endmonthInNumber ", endmonthInNumber);
//     let EndMonth = date.month(endmonthInNumber).format("MMMM");
//     let EndDate = date.endOf("week").get("date") + 0;

//     console.log("TYYY WeekCalendar EndDate", EndDate);

//     console.log("TYYY WeekCalendar EndMonth", EndMonth);

//     let actualValue =
//       StartDate + " " + StartMonth + " - " + EndDate + " " + EndMonth;
//     setWeek({ weekDate: actualValue, weekObject: date.startOf("week")._d });

//     let fetchStartDate = moment(new Date(props.calenderDate)).startOf(
//       "isoWeek"
//     );
//     let startFullDate = getFullDate(fetchStartDate);
//     console.log("startFullDate", startFullDate);
//     let fetchEndDate = moment(new Date(props.calenderDate))
//       .endOf("week")
//       .add(1, "days");

//     let endFullDate = getFullDate(fetchEndDate);

//     console.log("TYYY WeekCalendar props.date", props.calenderDate);
//     console.log("TYYY WeekCalendar StartDate", StartDate);
//     console.log("TYYY WeekCalendar EndDate", EndDate);
//     console.log("TYYY WeekCalendar fetchStartDate", fetchStartDate);
//     console.log("TYYY WeekCalendar startFullDate", startFullDate);
//     console.log("TYYY WeekCalendar fetchEndDate", fetchEndDate);
//     console.log("TYYY WeekCalendar endFullDate", endFullDate);

//     props.startEndDates(startFullDate, endFullDate);
//     //  changeDate(startFullDate, endFullDate)
//   }, [props.calenderDate]);

//   const changeDate = (start, end) => {
//     console.log("1 Start Date =", start);
//     console.log("1 end Date =", start);
//     let startDate = moment(week.weekObject).day(start);
//     let endDate = moment(week.weekObject).day(end);
//     let startFullDate = getFullDate(startDate);
//     let endFullDate = getFullDate(endDate);
//     let startmonthInNumber = startDate.get("month");
//     let StartMonth = moment().month(startmonthInNumber).format("MMMM");
//     let StartDate = startDate.get("date");

//     console.log("2 Start Date =", StartDate);
//     console.log("2 end Date =", startmonthInNumber);

//     let endmonthInNumber = endDate.get("month");
//     let EndMonth = moment().month(endmonthInNumber).format("MMMM");
//     let EndDate = endDate.get("date");
//     console.log("3. end month no  =", endmonthInNumber);
//     console.log("3 end month =", EndMonth);
//     console.log("3 end Date =", EndDate);

//     let actualValue =
//       StartDate + " " + StartMonth + " - " + EndDate + " " + EndMonth;
//     props.startEndDates(startFullDate, endFullDate);
//     setWeek({ weekDate: actualValue, weekObject: startDate._d });
//   };
//   return (
//     <div>
//       <Tooltip title="Previous">
//         <IconButton>
//           <ChevronLeftIcon
//             // style={leftIcon}
//             className="bg-primary text-white rounded-circle"
//             onClick={() => {
//               changeDate(-6, 0);
//             }}
//           />
//         </IconButton>
//       </Tooltip>

//       <span style={position}> {week.weekDate} </span>

//       <Tooltip title="Next">
//         <IconButton>
//           <ChevronRightIcon
//             // style={leftIcon}
//             className="bg-primary text-white rounded-circle"
//             onClick={() => {
//               changeDate(8, 14);
//             }}
//           />
//         </IconButton>
//       </Tooltip>
//     </div>
//   );
// };

// export default WeekCalender;
import moment from "moment";
import { useEffect, useState } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { getFullDate } from "./foramatterFunctions";
import { IconButton, Tooltip } from "@material-ui/core";

const WeekCalender = (props) => {
  const [week, setWeek] = useState({ weekDate: null, weekObject: null });

  useEffect(() => {
    updateWeekDates(props.calenderDate); // Update week dates when the component mounts
  }, [props.calenderDate]);

  // const updateWeekDates = (selectedDate) => {
  //   // Ensure selectedDate is in Date object format
  //   const currentDate = new Date(selectedDate);

  //   // Get the start and end of the week containing the selected date
  //   const startOfWeek = moment(currentDate).startOf('isoWeek');
  //   const endOfWeek = moment(currentDate).endOf('isoWeek');

  //   // Format the start and end dates for display
  //   const startOfWeekFormatted = startOfWeek.format('YYYY-MM-DD');
  //   const endOfWeekFormatted = endOfWeek.format('YYYY-MM-DD');

  //   // Construct the week date range string
  //   const weekDateRange = `${startOfWeekFormatted} - ${endOfWeekFormatted}`;

  //   // Update state with the week's date range
  //   setWeek({ weekDate: weekDateRange, weekObject: startOfWeek.toDate() });

  //   // Pass start and end dates to the parent component
  //   const startFullDate = getFullDate(startOfWeek);
  //   const endFullDate = getFullDate(endOfWeek.add(1, 'day')); // Add 1 day to include end date
  //   props.startEndDates(startFullDate, endFullDate);
  // };


  const updateWeekDates = (selectedDate) => {
    // Ensure selectedDate is in Date object format
    const currentDate = new Date(selectedDate);

    // Get the start of the week containing the selected date
    const startOfWeek = moment(currentDate).startOf('isoWeek');

    // Get the end of the week containing the selected date
    const endOfWeek = moment(currentDate).endOf('isoWeek');

    // Initialize variables for start and end dates
    let startDate = startOfWeek;
    let endDate = endOfWeek;

    // If the start date is Saturday or Sunday, adjust it to the following Monday
    if (startOfWeek.day() === 6 || startOfWeek.day() === 0) {
        startDate = moment(startOfWeek).startOf('week').add(1, 'day'); // Start from Monday
    }

    // If the end date is Saturday or Sunday, adjust it to the previous Friday
    if (endOfWeek.day() === 6 || endOfWeek.day() === 0) {
        endDate = moment(endOfWeek).subtract(2, 'days'); // End on Friday
    }

    // Format the start and end dates for display
    // const startOfWeekFormatted = startDate.format('YYYY-MM-DD');
    // const endOfWeekFormatted = endDate.format('YYYY-MM-DD');


    const startOfWeekFormatted = startDate.format(process.env.REACT_APP_DATEFORMAT);
    const endOfWeekFormatted = endDate.format(process.env.REACT_APP_DATEFORMAT);

    // Construct the week date range string
    const weekDateRange = `${startOfWeekFormatted} - ${endOfWeekFormatted}`;

    // Update state with the week's date range
    setWeek({ weekDate: weekDateRange, weekObject: startDate.toDate() });

    // Pass start and end dates to the parent component
    const startFullDate = getFullDate(startDate);
    const endFullDate = getFullDate(endDate.add(1, 'day')); // Add 1 day to include end date
    props.startEndDates(startFullDate, endFullDate);
};

  const changeDate = (startOffset, endOffset) => {
    // Update week dates based on offsets
    const newStartDate = moment(week.weekObject).add(startOffset, 'days');
    const newEndDate = moment(week.weekObject).add(endOffset, 'days');

    // Update week dates and pass to parent component
    updateWeekDates(newStartDate.toDate());

    // Optionally, you can set the weekObject state to the new start date if needed
    // setWeek({ ...week, weekObject: newStartDate.toDate() });
  };

  return (
    <div>
      <Tooltip title="Previous">
        <IconButton>
          <ChevronLeftIcon
            className="bg-primary text-white rounded-circle"
            onClick={() => changeDate(-7, -1)} // Go to previous week by subtracting 1 week and 1 day
          />
        </IconButton>
      </Tooltip>

      <span style={{ fontSize: 17, fontWeight: 600, fontFamily: "sans-serif" }}>
        {week.weekDate}
      </span>

      <Tooltip title="Next">
        <IconButton>
          <ChevronRightIcon
            className="bg-primary text-white rounded-circle"
            onClick={() => changeDate(7, 6)} // Go to next week by adding 1 week and 6 days
          />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default WeekCalender;
