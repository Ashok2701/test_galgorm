import React, { useEffect, useState } from "react";
import * as moment from 'moment-timezone';
import { blue } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import eye from "../../Images/eye.svg";
import lock from "../../Images/lock.svg";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import SvgIcon from '@material-ui/core/SvgIcon';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import LockRounded from '@material-ui/icons/LockRounded';
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ProgressBar from "../ProgressBar";
import mockData from "./mockData2.json";
import TableHeader from "../TableHeader";
import TimeLines from "./TableCell";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    marginBottom : "90px",

  },
  dailyStatusBtn: {
    border: "1px solid #F8953F",
    borderRadius: 4,
    background: "#FFFDC7",
    color: "#BA6419",
  },
  btnLabel: {
    fontSize: 10,
    fontWeight: 600,
  },
  arrivalColumn: {
    width: 44,
    height: 12,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 0.24,
    color: "#2C3A3D",
    opacity: 1,
    fontFamily: "sf - pro - display",
    padding: 10,
    textAlign: "center",
  },
  vehicleInfo: {
    width: 100,
    height: 24,
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: 0.24,
    color: "#2C3A3D",
    opacity: 1,
    fontFamily: "sf - pro - display",
    padding: 10,
    textAlign: "center",
  },
   route: {
      width: 150,
      height: 24,
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: 0.24,
      color: "#2C3A3D",
      opacity: 1,
      fontFamily: "sf - pro - display",
      padding: 10,
      textAlign: "center",
    },
  driverName: {
    width: 108,
    height: 24,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 0.24,
    color: "#2C3A3D",
    opacity: 1,
    fontFamily: "sf - pro - display",
    padding: 10,
    textAlign: "center",
  },

  capacity: {
    width: 32,
    textAlign: "center",
  },
  tripColumn: {
    width: 70,
    textAlign: "center",
  },
  tableRow: {
    height: 24,
    background: "#2c3a3d",
  },
  tableCell: {
    padding: 8,
    textAlign: "center",
    color: "#929D9F",
    fontFamily: "sf - pro - display",
    fontSize: 12,
  },
  title: {
    color: "white",
    paddingRight: 10,
  },
  tablePadding: {
    padding: 0,
    overflowY: "hidden",
    overflowX: "scroll",
    maxWidth: 528,
    height: 74,
  },
}));
const DataTable = (props) => {
  const [changeEyeIcon, setChangeEyeIcon] = useState(true);
  const [changeAllEyeIcon, setChangeAllEyeIcon] = useState(true);
  const colorCodes = ["#CD5C5C", "#F08080", "#FA8072", "#E9967A", "#FFA07A"];
  let status_background = "#FFFDC7";



  const dailyStatusBtn1 = {
    border: "1px solid #F8953F",
    borderRadius: 4,
    background: { status_background },
    color: "#BA6419",
  }
  const classes = useStyles();

  const getlvsstatus = (x) => {

    switch (x) {
      case 1:
        status_background = "#ffe1c7";
        return ("To Load");
      case 2:
        status_background = "#c7e5ff";
        return ("To Load");
      case 3:
        status_background = "#ffc7e5";
        return ("Loaded");
      case 4:
        status_background = "#ffb87b";
        return ("Confirmed");
      case 5:
        status_background = "#c9ffc7";
        return ("Trip Completed");
      case 6:
        status_background = "#7fff7b";
        return ("Unloaded");
      case 7:
        status_background = "#e2ffe1";
        return ("Returned");
      case 8:
        status_background = "#FFFDC7";
        return ("ALL");
      default:
        status_background = "#FFFDC7";
        return ("To-Load");
    }

  }


  const getlock = (lock) => {
    if (lock) {
      return (
        <span>
          <LockRounded style={{ fontSize: 18 }} />
          <SvgIcon>
            <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" />
          </SvgIcon>
        </span>
      )
    }
    else {
      return (
        <span >
          <LockOpenRoundedIcon color="primary" style={{ fontSize: 18 }} />
          <SvgIcon>
            <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z" />
          </SvgIcon>
        </span>
      )
    }
  }
  const onEyeIconClick = (type, status, itemcode, index) => {

    if (type === "all") {
      props.onEyeClick(type, status, itemcode, index);
      setChangeAllEyeIcon(status)
    } else {
      props.onEyeClick(type, status, itemcode, index);
      setChangeEyeIcon(status)
    }
  }
  useEffect(() => {
    let result;
    result = props.tripList && props.tripList.length > 0 && props.tripList.every(trips => (trips.eyeIcon === true));
    if (result && result === true) {
      setChangeAllEyeIcon(false)
    } else {
      setChangeAllEyeIcon(true)
    }
  }, [props])
  return (
    <>
      <div style={{}}>
        <TableHeader onMapDateChange={props.onMapDateChange} tripList={props.tripList}
        totalDistance = {props.totalDistance}
        totalWeight = {props.totalWeight}
        totalVolume = {props.totalVolume}
        onDaysChanged = {props.onDaysChanged}
        calenderMapDate = {props.calenderMapDate}
       sitelist={props.sitelist}
       selectedSite={props.selectedSite}
       handleSiteChange={props.handleSiteChange}
       sitesArr={props.sitesArr}

        />
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.tableRow}>
              <TableCell
                className={classes.tableCell}
                style={{ width: 12, height: 16, marginRight: 16 }}
              >
                <img src={lock} />

              </TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ width: 12, height: 16, marginRight: 16 }}
              >
                {changeAllEyeIcon ?
                  <VisibilityIcon
                    style={{ color: blue[500] }}
                    onClick={() => onEyeIconClick("all", false, null, null)}
                  /> :
                  <VisibilityOffIcon
                    style={{ color: blue[500] }}
                    onClick={() => onEyeIconClick("all", true, null, null)}
                  />
                }

              </TableCell>
              <TableCell className={classes.tableCell}>Driver</TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ width: 100, height: 16 }}
              >
                Trip ID
              </TableCell>
              <TableCell className={classes.tableCell}>Trip</TableCell>
              <TableCell className={classes.tableCell}>Vehicle</TableCell>
              <TableCell className={classes.tableCell}>Depart Site</TableCell>
              <TableCell className={classes.tableCell}>Return Site</TableCell>
              <TableCell className={classes.tableCell}>Departure</TableCell>
              <TableCell className={classes.tableCell}>Arrival</TableCell>
              <TableCell className={classes.tableCell}>Capacity</TableCell>
              <TableCell className={classes.tableCell}>TrackingID</TableCell>
              <TableCell className={classes.tableCell}>Trip Status</TableCell>
              <TableCell className={classes.tableCell}>Trip Tracking</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tripList && props.tripList.map((row, index) => {
              var arr = row.times;
     const vr_url = "https://wfs-dev.mycloudatwork.com:8443/html/main.html?url=/trans/x3/erp/LIVE/$sessions?f=GESXX10CPLC/2//M/" + row.itemCode;
        const loadvehstock_url = "https://wfs-dev.mycloudatwork.com:8443/html/main.html?url=/trans/x3/erp/LIVE/$sessions?f=GESXX10CS/2//M/" + row.lvsno;

              arr.forEach(element => {
                if (element.display == null) {
                  delete element.display;
                }
              });
              return (
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    {row.lock ? <LockRounded style={{ fontSize: 18 }} /> : <LockOpenRoundedIcon color="primary" style={{ fontSize: 18 }} />}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.eyeIcon ?

                      <VisibilityOffIcon
                        style={{ color: row.bgcolor }}
                        // style={{ color: "red" }}

                        onClick={() => onEyeIconClick("single", false, row.itemCode, index)}
                      //4 params
                      /> :
                      <VisibilityIcon
                        style={{ color: row.bgcolor }}
                        // style={{ color: "red" }}

                        onClick={() => onEyeIconClick("single", true, row.itemCode, index)}
                      />

                    }
                  </TableCell>
                  <TableCell className={classes.driverName}>
                    {row.driverName}
                  </TableCell>
                  <TableCell className={classes.route}>
                    <a style={{color:"black"}} target="_blank" href={vr_url}>{row.itemCode}</a>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.trips}
                  </TableCell>
                  <TableCell className={classes.vehicleInfo}>
                    {row.code}
                  </TableCell>
                  <TableCell className={classes.arrivalColumn}>
                    {row.depSite}
                  </TableCell>
                  <TableCell className={classes.arrivalColumn}>
                    {row.arrSite}
                  </TableCell>
                  <TableCell className={classes.arrivalColumn}>
                    {row.startTime}
                  </TableCell>
                  <TableCell className={classes.arrivalColumn}>
                    {row.endTime}
                  </TableCell>
                  <TableCell className={classes.capacity}>
                    <ProgressBar capacity={row.weightPercentage} />
                  </TableCell>
                  <TableCell className={classes.driverName}>
                    <a style={{color:"black"}} target="_blank" href={loadvehstock_url}>{row.lvsno}</a>
                  </TableCell>

                  <TableCell className="in-progress">
                    <Button
                      variant="outlined"
                      className={classes.dailyStatusBtn}
                      classes={{
                        label: classes.btnLabel,
                      }}
                    >
                      {getlvsstatus(row.dlvystatus)}
                    </Button>
                  </TableCell>
                  <TableCell className={`${classes.tablePadding} timeline-cell`}>
                    <TimeLines
                      data={arr}
                      width={4000}
                      date={moment.tz(props.calenderMapDate, "UTC").format('MM/DD/YYYY')}
                    ></TimeLines>
                  </TableCell>
                </TableRow>
              )
            })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DataTable;