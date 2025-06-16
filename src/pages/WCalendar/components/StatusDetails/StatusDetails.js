import React, { Fragment } from "react";
import moment from "moment";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Imagecard from "../Imagecard";
import StatusCard from "./StatusCard";
import mockData from "./mockData.json";
import { getFullDate } from "../../foramatterFunctions";
import { Table } from "reactstrap";
import { Alert } from "reactstrap";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
const useStyles = makeStyles((theme) => ({
  // root: {
  //     display: 'flex',
  //     flexDirection: 'row',
  //     width: '100%',
  //     padding: 4,
  //     marginTop: 16,
  //     background: "white",
  //     justifyContent: "space-between"
  // },
  headerContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  body2: {
    color: "#2C3A3D",
    fontWeight: 600,
    fontSize: 12,
    fontFamily: "SF Pro Display",
  },
  divheader: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#2C3A3D",
    height: 48,
    marginBottom: 10,
    marginTop: 10,
  },
  divider: {
    width: 2,
    // backgroundColor: "#707070"'
  },

  itemText: {
    color: "white",
    fontWeight: 500,
    // backgroundColor:"red"
  },
}));

export default function StatusDetails(props) {
  const classes = useStyles();
  const theme = useTheme();
  let dates = [];
  var from = new Date(props.weekStartDate);
  
  
  var to = new Date(props.weekEndDate);
  
  
  for (var day = from; day < to; day.setDate(day.getDate() + 1)) {
    
    dates.push(new Date(day));
  } 
  let vehicleList = [...new Set(props.tripDetails.map((item) => item.name))];
  
  return (
    <div>
      {/* <Table bordered className="mt-3">
        <thead className="bg-secondary text-white">
          <tr>
            <th>Vehicle/Week</th>
   
            {dates &&
              dates.length > 0 &&
              dates.slice(0, 5).map((date, index) => {
                const parseDate = new Date(Date.parse(date)).toString();
                const SelParsedate = moment
                  .tz(parseDate, "")
                  .format("YYYY/MM/DD");
                
                return (
                  <th key={index} className="text-nowrap text-center">
                    {moment.tz(SelParsedate, "").format("ddd DD-MMM-YYYY")}
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {vehicleList.map((trip, outerIndex) => {
            return (
              <tr key={outerIndex}>
                <td
                  className="border-bottom border-secondary"
                  style={{ borderRight: "1px solid #d9ddde" }}
                >
                  <Imagecard vehicleNumber={trip} />
                </td>
                {props.tripDetails.map((item, innerIndex) => {
                  if (trip === item.name) {
                    return (
                      <td
                        className="border-bottom border-secondary"
                        key={innerIndex}
                        // style={{ borderRight: "1px solid #d9ddde" }}
                      >
                        <div>
                          <StatusCard dataList={item.tripList} dates={dates} />
                        </div>
                      </td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </Table> */}
      <Table bordered className="mt-3">
  <thead className=" text-white font-bold" style={{backgroundColor:"#007b788f"}}>
    <tr>
      <th>Vehicle/Week</th>
      {dates &&
        dates.length > 0 &&
        dates.slice(0, 5).map((date, index) => {
          const parseDate = new Date(Date.parse(date)).toString();
          const SelParsedate = moment
            .tz(parseDate, "")
            .format("YYYY/MM/DD");
          
          return (
            <th key={index} className="text-nowrap text-center">
              {moment.tz(SelParsedate, "").format("ddd DD-MMM-YYYY")}
            </th>
          );
        })}
    </tr>
  </thead>
  <tbody >
    {vehicleList.map((trip, outerIndex) => {
      return (
        <tr key={outerIndex}>
          <td
            className="border-bottom border-secondary"
            style={{ borderRight: "1px solid #d9ddde" }}
          >
            <Imagecard vehicleNumber={trip} />
          </td>
          {props.tripDetails.map((item, innerIndex) => {
            if (trip === item.name) {
              return (
                <td
                  className="border-bottom border-secondary"
                  key={innerIndex}
                >
                  {item.tripList.length > 0 ? (
                    <div>
                      <StatusCard dataList={item.tripList} dates={dates} />
                    </div>
                  ) : (
                    <div >
                      <div  color=" w-100 font-bold" style={{fontSize:"20px",textAlign:"center", marginTop:"50%"}}>No Data found</div>
                    </div>
                  )}
                </td>
              );
            }
          })}
        </tr>
      );
    })}

 
  </tbody>

</Table>
<div style={{width:"100%"}} >
  {
      vehicleList.length === 0 && <Alert   color= "w-100 text-light" style={{fontSize:"20px",textAlign:"center",background:"#007b788f"}}>No Data found</Alert>
    }
  </div>
    </div>
  );
}
