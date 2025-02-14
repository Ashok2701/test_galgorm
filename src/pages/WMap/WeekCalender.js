import moment from 'moment'
import { useEffect, useState } from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { getFullDate } from './foramatterFunctions';

const WeekCalender = (props) => {

    const [week, setWeek] = useState({ weekDate: null, weekObject: null });

    const position = {
        position: 'relative',
        top: 11,
        fontSize: 17,
        fontWeight: 600,
        fontFamily: 'sans-serif'
    }

    const leftIcon = {
        position: 'relative',
        top: 17,
        backgroundColor: '#424B4D',
        borderRadius: '100%',
        fontSize: 24,
        color: 'white'
    }

    useEffect(() => {
        let startmonthInNumber = moment().startOf('week').get('month');
        let StartMonth = moment().month(startmonthInNumber).format('MMMM')
        let StartDate = moment().startOf('week').get('date') + 1;
        let fetchStartDate = moment().startOf('isoWeek');
        let startFullDate = getFullDate(fetchStartDate);

        let endmonthInNumber = moment().endOf('week').get('month');
        let EndMonth = moment().month(endmonthInNumber).format('MMMM')
        let EndDate = moment().endOf('week').get('date') + 1;
        let fetchEndDate = moment().endOf('week').add(1, 'days');

        let endFullDate = getFullDate(fetchEndDate);

        let actualValue = StartDate + " " + StartMonth + " - " + EndDate + " " + EndMonth
        setWeek({ weekDate: actualValue, weekObject: moment().startOf('week')._d })
        props.startEndDates(startFullDate, endFullDate)
    }, [])
    useEffect(() => {
        let date = moment(new Date(props.calenderDate));
        let StartDate = date.startOf('week').get('date') + 1;
        let startmonthInNumber = date.startOf('week').get('month');
        let StartMonth = date.month(startmonthInNumber).format('MMMM');

        let endmonthInNumber = date.endOf('week').get('month');
        let EndMonth = date.month(endmonthInNumber).format('MMMM')
        let EndDate = date.endOf('week').get('date') + 1;

        let actualValue = StartDate + " " + StartMonth + " - " + EndDate + " " + EndMonth
        setWeek({ weekDate: actualValue, weekObject: date.startOf('week')._d });

        let fetchStartDate = moment(new Date(props.calenderDate)).startOf('isoWeek');
        let startFullDate = getFullDate(fetchStartDate);
        console.log("startFullDate",startFullDate)
        let fetchEndDate = moment(new Date(props.calenderDate)).endOf('week').add(1, 'days');

        let endFullDate = getFullDate(fetchEndDate);

        props.startEndDates(startFullDate, endFullDate)

    }, [props.calenderDate])

    const changeDate = (start, end) => {
        let startDate = moment(week.weekObject).day(start);
        let endDate = moment(week.weekObject).day(end);
        let startFullDate = getFullDate(startDate);
        let endFullDate = getFullDate(endDate);
        let startmonthInNumber = startDate.get('month');
        let StartMonth = moment().month(startmonthInNumber).format('MMMM')
        let StartDate = startDate.get('date');

        let endmonthInNumber = endDate.get('month');
        let EndMonth = moment().month(endmonthInNumber).format('MMMM')
        let EndDate = endDate.get('date');


        let actualValue = StartDate + " " + StartMonth + " - " + EndDate + " " + EndMonth;
        props.startEndDates(startFullDate, endFullDate)
        setWeek({ weekDate: actualValue, weekObject: startDate._d })
    }
    return (
        <div >
            <ChevronLeftIcon style={leftIcon} onClick={() => { changeDate(-6, 0) }} />
            <span style={position}>  {week.weekDate} </span>
            <ChevronRightIcon style={leftIcon} onClick={() => { changeDate(8, 14) }} />
        </div>
    )
}

export default WeekCalender;