import React, { Fragment } from 'react';
import moment from 'moment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Imagecard from "../Imagecard";
import StatusCard from "./StatusCard";
import mockData from "./mockData.json";
import { getFullDate } from '../../foramatterFunctions';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: 4,
        marginTop: 16,
        background: "white",
        justifyContent: "space-between"
    },
    headerContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    body2: {
        color: "#2C3A3D",
        fontWeight: 600,
        fontSize: 12,
        fontFamily: "SF Pro Display"
    },
    divheader: {
        display: "flex",
        justifyContent: 'space-around',
        alignItems: "center",
        backgroundColor: "#2C3A3D",
        height: 48,
        marginBottom: 10,
        marginTop: 10

    },
    divider: {
        width: 2,
        backgroundColor: "#707070"
    },

    itemText: {
        color: "white",
        fontWeight: 500
    }

}));

export default function StatusDetails(props) {
    const classes = useStyles();
    const theme = useTheme();
    let dates = [];
    var from = new Date(props.weekStartDate);
    console.log("weekStartDate==>",props.weekStartDate)
    var to = new Date(props.weekEndDate);
    for (var day = from; day <= to; day.setDate(day.getDate() + 1)) {
        dates.push(new Date(day))
    }
    let vehicleList = [...new Set(props.tripDetails.map(item => item.code))];

    return (
        <div>

            <div className={classes.divheader}>
                <Typography className={classes.itemText} style={{ width: '99px' }}>Vehicle/Week</Typography>
                <Divider orientation="vertical"
                    classes={{
                        root: classes.divider
                    }}
                />
                {dates && dates.length > 0 &&
                    dates.map((date) => {
                        return (
                            <Fragment>
                                <Typography className={classes.itemText}>
                                    {moment(date).format('ddd DD-MMM-YYYY')}
                                </Typography>
                                <Divider orientation="vertical"
                                    classes={{
                                        root: classes.divider
                                    }}
                                />
                            </Fragment>
                        )
                    })}
            </div>

            {vehicleList.map(trip => {
                return (
                    <paper className={classes.root} elevation={0}>
                        <div style={{ paddingRight: 12, marginRight: 8, borderRight: '1px solid #d9ddde' }}>
                            <Imagecard vehicleNumber={trip} />
                        </div>
                        {props.tripDetails.map((item) => {
                            if (trip === item.code) {
                                return (
                                    <div style={{ width: 270, marginRight: 15, borderRight: '1px solid #d9ddde' }}>
                                        <div>
                                            <StatusCard
                                                dataList={item.tripList} dates={dates}
                                            />
                                            {/* <StatusCard color='yellow' dataList={item.tripList} /> */}
                                        </div>
                                    </div>
                                )
                            }
                        })
                        }
                    </paper>
                )
            })}
        </div>
    );
}