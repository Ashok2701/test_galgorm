import React from "react";
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { useEffect, useState } from 'react';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";

const Calendar = (props) => {
    const [selectedDate, setselectedDate] = useState(new Date());

    const onDateChange = date => {
        if (props.type === 'maps') {

            props.onMapDateChange(date);
        } else {
            props.onCalenderDateChage(date);
        }
        setselectedDate(date);
    }

    useEffect(() => {

           if(props.type === 'maps'){
               setselectedDate(props.calenderMapDate)
               }
               else {

               setselectedDate(props.weekStartDate)
               console.log("inside calendar",props.weekStartDate);
        }
    }, [props])
console.log("props.weekStartDate",props.weekStartDate)
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                style={{
                    marginTop: 4, marginBottom: 0, width: 148,
                    backgroundColor: "#424B4D", borderRadius: 4
                }}
                margin="normal"
                id="date-picker-dialog"
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={onDateChange}
                KeyboardButtonProps={{
                    "aria-label": "change date",
                }}

                inputProps={{ style: { color: 'white', paddingLeft: 4 } }}
            />
        </MuiPickersUtilsProvider>
    )
}

export default Calendar;