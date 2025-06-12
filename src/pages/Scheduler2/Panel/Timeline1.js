import React, { useEffect } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { withNamespaces } from "react-i18next";
import Alert from "./Alert";
import "moment-timezone";
// import truck_dep from "./truck01_dep.png";
// import truck_arr from "./truck01_arr.png";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Nav,
  NavLink,
  TabContent,
  TabPane,
  ButtonGroup,
  Button,
  Input,
  Label,
  FormGroup,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import classnames from "classnames";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";
import { withTranslation } from "react-i18next";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Switch from "@mui/material/Switch";
import "../Nav1/RouteSchedulerStyles.css";
import {
  convertSecToHr,
  splitTime,
  formatHrMin,
  nullAndNanChecking,
  formatTime,
  convertHrToSec,
  convertMinToSec,
  convertMinToHr,
} from "../converterFunctions/converterFunctions";
import DisplayInformationIconDetails from "./DisplayInformationIconDetails";
import DisplayTomTomInfo from "./DisplayTomTomInfo";

function Timeline(props) {
  const [totalTime, setTotalTime] = React.useState(0);
  const [totalDistance, setTotalDistance] = React.useState(0);
  const [endTime, setEndTime] = React.useState();
  const [tomTomMessage, setTomTomMessage] = React.useState({});
  const [title, setTitle] = React.useState({});
  const [loader, setLoader] = React.useState(false);
  const [tomTomNotification, setTomTomNotification] = React.useState(false);
  const [addAlertClose, setaddAlertClose] = React.useState(true);
  const [addAlertShow, setAddAlertShow] = React.useState(false);
  const [ErrorMessage, setErrorMessage] = React.useState("");
  const [getHr, setHr] = React.useState(0);
  const [getMin, setMin] = React.useState(0);
  const [selectedDate, setHandleDateChange] = React.useState(date);

  const [loadHrs, setLoadHrs] = React.useState();
  const [unLoadHrs, setUnLoadHrs] = React.useState();
  const [currency, setCurrency] = React.useState();
  const [distunts, setDistunts] = React.useState();
  const [volunits, setVolunits] = React.useState();
  const [massunit, setMassunit] = React.useState();
  const [distErrorMessage, setDistErrorMessage] = React.useState("");
  const [timeErrorMessage, setTimeErrorMessage] = React.useState("");
  const [tripsClosedErrorMessage, setTripsClosedErrorMessage] =
    React.useState("");
  const [tripClosedError, setTripClosedError] = React.useState(false);
  const [distError, setDistError] = React.useState(false);
  const [timeError, setTimeError] = React.useState(false);
  const [optimizationMessage, setOptimizationMessage] = React.useState("");
  const [optiStatusError, setOptiStatusError] = React.useState(false);
  const [modelTime, setModelTime] = React.useState(false);
  const [optimizationFailedStatus, setOptimizationFailedStatus] =
    React.useState(false);
  // const [currentStartTime, setCurrentStartTime] = React.useState(date);
  const [modalTimeMessage, setModalTimeMessage] = React.useState("");
  const [autooptimise, setAutooptimise] = React.useState(false);

  // console.log("2 Routeshc",props.data);
  // console.log("T223  Routeshc timeline",props.data.docdate);

  if (props.optimisedClickedTrip) {
    // console.log("TSSS at Timeline - true");
    // console.log("TSSS at Trips - optimise ",props.data);
    CheckedOptimisationRoute(props.data);
  }

  // var date = new Date();
  var date = props.data.docdate;
  // console.log("T223 inside Timeline-Date =",date);
  let distanceCost = 0;
  let timeCost = 0;
  let totalCost = 0;
  let Regularcost = 0;
  let overtimecost = 0;
  let c, d, m, v;

  var lang = "en";

  const onchangeSwitch = () => {
    let autoop = autooptimise;
    // console.log("auto op",autooptimise);
    setAutooptimise(!autooptimise);
  };

  const costCalculation = (vehiclePanel, totalTime, totalDistance, code) => {
    let hr = Number(totalTime.split(":")[0]);
    let min = Number(totalTime.split(":")[1]);
    totalTime = hr + convertMinToHr(min);
    if (vehiclePanel && code) {
      vehiclePanel.vehicles.map((vehicle) => {
        if (vehicle.codeyve === code) {
          distanceCost = vehicle.costperunitd * Number(totalDistance);
          if (totalTime > vehicle.overtimestar) {
            overtimecost =
              (totalTime - vehicle.overtimestar) * vehicle.costperunito;
            Regularcost = vehicle.overtimestar * vehicle.costperunitt;
            timeCost = Math.round(overtimecost + Regularcost);
          } else {
            Regularcost = vehicle.costperunitt * totalTime;
            timeCost = Regularcost;
          }
          totalCost = vehicle.fixedcost + distanceCost + timeCost;
        }
      });
    }
    return { distanceCost, timeCost, totalCost, overtimecost, Regularcost };
  };

  const warningWindowClose = () => {
    setModelTime(false);
    setTripClosedError(false);
    setDistError(false);
    setTimeError(false);
    setOptiStatusError(false);
    setTomTomNotification(false);
    setOptimizationFailedStatus(false);
  };

  const AlertClose = () => {
    setErrorMessage("");
    setAddAlertShow(false);
    setaddAlertClose(true);
  };

  const getEndDate = () => {
    if (!(props.data.optistatus === "Open") && props.data.endDate) {
      return moment.tz(props.data.endDate, "").format("YYYY-MM-DD");
    }

    /*
         let x;
         const dummyDate = moment(props.data.endDate).format('yyyy-MM-DD');
         const status =  props.data.optistatus;
         if(dummyDate === '1899-12-31' || status === "Open"){
            x = "";
            return x;
         }
         else{
          return dummyDate;
         }
         */
  };

  const handleDateChange = (date) => {
    // console.log("T223 inside Timeine- date ",date);
    let hr = Number(formatHrMin(date.getHours()));
    let min = Number(formatHrMin(date.getMinutes()));
    let loadingTime = loadingSecs(hr, min, loadHrs);
    hr = loadingTime.split(":")[0];
    min = loadingTime.split(":")[1];
    if (props.data && props.data.trips > 1) {
      let endHr;
      let endMin;
      props.tripsPanel.map((tripPanel) => {
        if (tripPanel.code === props.data.code) {
          if (tripPanel.trips === props.data.trips - 1) {
            endHr = tripPanel.endTime.split(":")[0];
            endMin = tripPanel.endTime.split(":")[1];
          }
        }
      });
      if (Number(hr) >= Number(endHr)) {
        if (Number(endHr) == Number(hr) && Number(min) > Number(endMin)) {
          hr = hr;
          min = min;
        } else if (Number(hr) > Number(endHr)) {
          hr = hr;
          min = min;
        } else {
          hr = Number(endHr);
          min = Number(endMin);
          setModelTime(true);
          setModalTimeMessage(
            `Please select time greater than "${endHr}:${endMin}".`
          );
        }
      } else {
        hr = Number(endHr);
        min = Number(endMin);
        setModelTime(true);
        setModalTimeMessage(
          `Please select time greater than "${endHr}:${endMin}".`
        );
      }
    }

    setHr(hr);
    setMin(min);
    date.setHours(hr);
    date.setMinutes(parseInt(min));
    setHandleDateChange(date);
  };

  const nullAndTime = (data) => {
    let time = nullAndNanChecking(data, "hr") * 60 * 60;
    if (time > 0) {
      return formatTime(time);
    } else {
      return "";
    }
  };

  const loadingSecs = (hr, min, loadingHrs) => {
    if (loadingHrs) {
      return formatTime(
        convertHrToSec(hr) + convertMinToSec(min) + convertHrToSec(loadingHrs)
      );
    } else {
      return formatTime(convertHrToSec(hr) + convertMinToSec(min));
    }
  };

  const CheckedOptimisationRoute = (data) => {
    // console.log("T000 data =",data);
    // console.log("T000 props data =",props.data);

    console.log(data, "before optimize data is here");
    if (data.driverId === "") {
      setAddAlertShow(true);
      setErrorMessage(
        "Driver is not assigned for the Trip, please assign then proceed for Optimisation"
      );
    } else {
      // console.log("T000 inside else");
      optimizeRoute(data);
    }
  };

  const optimizeRoute = (data) => {
    // console.log("T000 data =",data);

    // console.log("T000 props data",props.data);

    setLoader(true);
    let siteLat;
    let siteLang;
    let arrSiteLat;
    let arrSiteLang;

    props.sites.map((site) => {
      if (props.data.depSite === site.id) {
        siteLat = site.lat;
        siteLang = site.lng;
      }
      if (props.data.arrSite === site.id) {
        arrSiteLat = site.lat;
        arrSiteLang = site.lng;
      }
    });

    let apiurl;
    let jsonUrl;

    if (autooptimise) {
      apiurl = "https://api.tomtom.com/routing/1/calculateRoute/";
      jsonUrl = `/json?computeBestOrder=true&routeRepresentation=summaryOnly&computeTravelTimeFor=all&avoid=unpavedRoads&travelMode=truck&vehicleMaxSpeed=${
        data.vehicleObject.maxspeed
      }&vehicleWeight=${data.vehicleObject.capacities}&vehicleLength=${
        data.vehicleObject.length / 100
      }&vehicleWidth=${data.vehicleObject.width / 100}&vehicleHeight=${
        data.vehicleObject.heigth / 100
      }&vehicleCommercial=true&vehicleLoadType=otherHazmatGeneral&vehicleEngineType=combustion&key=ctZzLlfGUpaNdfHiIobOeub8NBzzGkNG`;
    } else {
      apiurl = "https://api.tomtom.com/routing/1/calculateRoute/";
      jsonUrl = `/json?computeBestOrder=false&routeRepresentation=summaryOnly&computeTravelTimeFor=all&avoid=unpavedRoads&travelMode=truck&vehicleMaxSpeed=${
        data.vehicleObject.maxspeed
      }&vehicleWeight=${data.vehicleObject.capacities}&vehicleLength=${
        data.vehicleObject.length / 100
      }&vehicleWidth=${data.vehicleObject.width / 100}&vehicleHeight=${
        data.vehicleObject.heigth / 100
      }&vehicleCommercial=true&vehicleLoadType=otherHazmatGeneral&vehicleEngineType=combustion&key=ctZzLlfGUpaNdfHiIobOeub8NBzzGkNG`;
    }

    let prevTripsDist = 0;
    let prevTripsTime = 0;
    var summaryData = [];
    var optiindex = [];
    let serviceTime = [];
    let waitingTime = [];
    let lanLat = siteLat + "," + siteLang;
    data.totalObject.selectedTripData.map((tripData) => {
      if (Object.keys(tripData).length > 0) {
        serviceTime.push(tripData.serviceTime);
        waitingTime.push(tripData.waitingTime);
        lanLat = lanLat + ":" + tripData.lat + "," + tripData.lng;
      }
    });
    //change end depo lan n lat below siteLat + ',' + siteLang
    lanLat = lanLat + ":" + arrSiteLat + "," + arrSiteLang;
    let url = apiurl + encodeURIComponent(lanLat) + jsonUrl;
    return fetch(url)
      .then(function (response) {
        if (response.status === 200) {
          setLoader(false);
          return response.json();
        } else {
          setOptimizationFailedStatus(true);
          setLoader(false);
        }
      })
      .then((res) => {

        console.log(data ,"this is trip checking")

        console.log("T6565 auto - opti result",res);

        if (res && res.optimizedWaypoints) {
          optiindex.push(res.optimizedWaypoints);
        }

        if (res && res.routes) {
          summaryData.push(res.routes);
        }
        let summaryResult = {
          summarydata: [...summaryData],
          serviceTime: serviceTime,
          waitingTime: waitingTime,
        };
        if (
          summaryResult &&
          summaryResult.summarydata &&
          summaryResult.serviceTime &&
          summaryResult.waitingTime
        ) {
          let summaryData = summaryResult.summarydata;
          let serviceTime = summaryResult.serviceTime;
          let waitingTime = summaryResult.waitingTime;
          let results = summaryData[0];

          console.log(serviceTime,waitingTime ,"this is service time and waiting time 363");

          if (results) {
            let legs = results[0].legs;
            console.log(legs ,"checking legs here 364")
            if (
              props.data &&
              legs &&
              props.data.stops < results[0].legs.length
            ) {
              let dateformatter = (date, index) => {
                let d = date.toDateString();
                let t = date.toTimeString();
                t = t.split(" ")[0];
                return d + " " + t;
              };
              let resultsData = [];
              var departure = new Date();
              let optimisedTrips = [];
              props.tripsPanel.map((tripData) => {
                if (
                  (tripData.optistatus === "Optimized" ||
                    tripData.optistatus === "optimized") &&
                  tripData.itemCode !== props.data.itemCode
                ) {
                  optimisedTrips.push(tripData);
                }
              });
              let currTripTimeHr = getHr;
              let currTripTimeMin = getMin;
              // console.log("T6565 getHr",getHr);
              // console.log("T6565 getMin",getMin);
              departure.setHours(Number(currTripTimeHr));
              departure.setMinutes(Number(currTripTimeMin));
              let sameTrips = [];
              let startTimeInSec;
              if (optimisedTrips.length > 0) {
                optimisedTrips.map((optiTrip) => {
                  if (
                    optiTrip.code === props.data.code &&
                    optiTrip.docdate === props.data.docdate
                  ) {
                    sameTrips.push(optiTrip);
                  }
                });
              }
              let previousCheck = [];
              props.tripsPanel.map((tripPanel) => {
                if (
                  tripPanel.code === props.data.code &&
                  tripPanel.docdate === props.data.docdate
                ) {
                  if (tripPanel.trips === props.data.trips - 1) {
                    previousCheck.push(tripPanel);
                  }
                }
              });
              let optimizationStatus = false;
              if (previousCheck.length > 0) {
                if (previousCheck[0].optistatus === "Optimized") {
                  optimizationStatus = false;
                } else {
                  optimizationStatus = true;
                }
              }

              if (sameTrips.length > 0) {
                let sameTripTime = [];
                sameTrips.map((times, index) => {
                  sameTripTime.push({
                    hr: times.endTime.split(":")[0],
                    min: times.endTime.split(":")[1],
                  });
                });
                sameTripTime.sort((a, b) => {
                  return Number(b.hr) - Number(a.hr);
                });
                if (sameTripTime.length > 0) {
                  currTripTimeHr = sameTripTime[0].hr;
                  currTripTimeMin = sameTripTime[0].min;
                  setHr(currTripTimeHr);
                  setMin(currTripTimeMin);

                  let sametripTime = formatTime(
                    convertHrToSec(currTripTimeHr) +
                      convertMinToSec(currTripTimeMin) +
                      convertHrToSec(unLoadHrs) +
                      convertHrToSec(loadHrs)
                  );
                  //departure.setHours(Number(currTripTimeHr) + 1);
                  let sametripHrs = sametripTime.split(":")[0];
                  let sametripMin = sametripTime.split(":")[1];
                  if (Number(getHr) >= Number(sametripHrs)) {
                    if (
                      Number(getHr) == Number(sametripHrs) &&
                      Number(getMin) > Number(sametripMin)
                    ) {
                      sametripHrs = getHr;
                      sametripMin = getMin;
                    } else if (getHr > sametripHrs) {
                      sametripHrs = getHr;
                      sametripMin = getMin;
                    }
                  }
                  departure.setHours(Number(sametripHrs));
                  departure.setMinutes(Number(sametripMin));
                }
                //need to check
                startTimeInSec =
                  convertMinToSec(departure.getMinutes()) +
                  convertHrToSec(departure.getHours());
              } else {
                startTimeInSec =
                  convertMinToSec(departure.getMinutes()) +
                  convertHrToSec(departure.getHours());
              }

              startTimeInSec = formatTime(startTimeInSec);
              let startTimeHrs = startTimeInSec.split(":")[0];
              let startTimeMins = startTimeInSec.split(":")[1];
              departure.setHours(startTimeHrs);
              departure.setMinutes(startTimeMins);

              setHandleDateChange(departure);

              let startTimeHr = departure.getHours();
              let startTimeMin = departure.getMinutes();
              let startTimeLocal =
                formatHrMin(startTimeHr) + ":" + formatHrMin(startTimeMin);
              let prevDate = props.data.docdate;
              let prevDocTime = "00:00";
console.log(serviceTime,waitingTime,"before loop checking service time here 494")
// console.log(serviceTime[1],waitingTime[1],"before loop checking service time here 495")

              legs.forEach((data, index) => {
console.log(serviceTime[index],waitingTime[index],"inside loop checking service time here 498")

                console.log(data,index ,"these are legs checking here 500");
                let time = data.summary.travelTimeInSeconds;
                let length = data.summary.lengthInMeters;
                let sec = 0;
                let waitSec = 0;
                console.log(serviceTime[index],waitingTime[index],"this is service time index and waitin gtime index 501")
                if (Number(serviceTime[index])) {
                  sec = sec + convertHrToSec(Number(serviceTime[index]));
                } else {
                  sec = sec + 0;
                }
                if (Number(waitingTime[index])) {
                  waitSec =
                    waitSec + convertHrToSec(Number(waitingTime[index]));
                } else {
                  waitSec = waitSec + 0;
                }
                let serTime = formatTime(
                  convertHrToSec(Number(serviceTime[index]))
                );
                let waitTime = formatTime(
                  convertHrToSec(Number(waitingTime[index]))
                );
                console.log(serTime,waitTime ,"srevide time and waiting time in hr to seconds")
                serTime = serTime.split(":");
                let serTimeHr = serTime[0];
                let serTimeMin = serTime[1];
                serTime =
                  formatHrMin(serTimeHr) + ":" + formatHrMin(serTimeMin);

                waitTime = waitTime.split(":");
                let waitTimeHr = waitTime[0];
                let waitTimeMin = waitTime[1];
                waitTime =
                  formatHrMin(waitTimeHr) + ":" + formatHrMin(waitTimeMin);

                  console.log(serviceTime[index] ,"checking service time 525")
                let res = {
                  start: dateformatter(departure, index),
                  distance: length / 1000,
                  time: convertSecToHr(time).toFixed(3),
                  serviceTime: serviceTime[index],
                  serTime: splitTime(serTime),
                  tTime: time,
                  tDistance: length,
                };
                console.log(departure, "this is departure checking here")
                console.log(departure.getSeconds(), time , sec, waitSec ,"time sec waitSec checking 546")
                departure.setSeconds(
                  departure.getSeconds() + time + sec + waitSec
                );
                //added sersec+wait sec+time
                console.log(departure ,"this is departure time checking 539")
                let endTimeRoute = dateformatter(departure);
                endTimeRoute = new Date(endTimeRoute);
                let endTimeHr = endTimeRoute.getHours();
                let endTimeMin = endTimeRoute.getMinutes();
                endTimeRoute = endTimeHr + ":" + endTimeMin;
                console.log(endTimeRoute ,"this is end time route 545")
                var a = endTimeRoute.split(":");
                console.log(a ,"checking here endTimeRoute 559")
                var endTimeSec = +a[0] * 60 * 60 + +a[1] * 60;
                console.log(endTimeSec ,"end time seconds 548")
                console.log(serviceTime[index] ,waitTime[index] ,"this is service time and waiting time index checking 546")

                let servTimeCheck =  serviceTime[index] != "00:00" ? serviceTime[index] : 0


                var arrivalTime =
                  endTimeSec -
                  Number(servTimeCheck) * 60 * 60 -
                  Number(waitingTime[index]) * 60 * 60;

                  console.log(arrivalTime,formatTime(arrivalTime) ,"this is arrival time checking 573");
                  

                arrivalTime = formatTime(arrivalTime);


                function addHoursToHHMM(arrivalTimeStr, serviceTime, waitingTime) {
                  const [hours, minutes] = arrivalTimeStr.split(":").map(Number);
                
                  // Convert HH:MM to seconds
                  let arrivalSeconds = (hours * 3600) + (minutes * 60);
                
                  // Convert service and wait time from hours to seconds
                  let serviceSecs = Number(serviceTime) * 3600;
                  let waitingSecs = Number(waitingTime) * 3600;
                
                  let totalSeconds = arrivalSeconds + serviceSecs + waitingSecs;
                
                  // Convert back to HH:MM:SS
                  const resultDate = new Date(0);
                  resultDate.setSeconds(totalSeconds);
                
                  const hh = String(resultDate.getUTCHours()).padStart(2, "0");
                  const mm = String(resultDate.getUTCMinutes()).padStart(2, "0");
                  const ss = String(resultDate.getUTCSeconds()).padStart(2, "0");
                
                  return `${hh}:${mm}`;
                }
                
                // let serWaiting =  Number(serviceTime[index]) +  Number(waitingTime[index])
                
                let finalEndTime=addHoursToHHMM(splitTime(arrivalTime),Number(serviceTime[index]),Number(waitingTime[index]))
                
                res.end = finalEndTime;
                res.arrival = splitTime(arrivalTime);





                res.startDate = prevDate;
                res.endDate = prevDate;
                let latestEndDate = prevDate;
                let latestStartDate = prevDate;

                let prevdocsplittime = prevDocTime.split(":");
                //  console.log("T2222 11 arrive time ", curtime);
                console.log("T2222 11 prev time", prevdocsplittime);

                let currartsec = time;
                console.log("T2222 11 travel time ", currartsec);
                let prevdocsec =
                  +prevdocsplittime[0] * 60 * 60 + +prevdocsplittime[1] * 60;
                let temptotsec = currartsec + prevdocsec;
                let temptothrs = convertSecToHr(temptotsec);
                let daysfromtemphrs = temptothrs / 24;
                console.log("T2222 12 hrs ", temptothrs);
                console.log("T2222 12 days", daysfromtemphrs);

                if (daysfromtemphrs > 1) {
                  let tempdate = moment(prevDate).add(
                    Math.floor(daysfromtemphrs),
                    "days"
                  );
                  let newStartDate = moment(tempdate).format("YYYY-MM-DD");
                  latestStartDate = newStartDate;
                  latestEndDate = newStartDate;
                  prevDate = newStartDate;
                } else {
                  if (prevdocsplittime[0] > endTimeRoute.split(":")[0]) {
                    let tempdate1 = moment(prevDate).add(1, "days");
                    let newStartDate1 = moment(tempdate1).format("YYYY-MM-DD");
                    latestStartDate = newStartDate1;
                    latestEndDate = newStartDate1;
                    prevDate = newStartDate1;
                  }
                }

                res.endDate = latestEndDate;
                res.startDate = latestStartDate;
                prevDate = latestEndDate;
                prevDocTime = splitTime(endTimeRoute);
                resultsData.push(res);
              });
              let totTime = 0;
              let totDistance = 0;
              let endTime;
              resultsData.map((data, index) => {
                if (index === props.data.stops) {
                  endTime = data.end.split(":");
                  let endTimeHrs = endTime[0];
                  let endTimeMins = endTime[1];
                  let endLoadHrs = loadingSecs(
                    Number(endTimeHrs),
                    Number(endTimeMins)
                  );
                  endTime = endLoadHrs;
                  setEndTime(endTime);
                }
                totTime += data.tTime;
                totDistance += data.tDistance;
              });

              let reducer1 = (accumulator, currentValue) =>
                Number(accumulator) + Number(currentValue);
              let serTime = serviceTime.reduce(reducer1);
              let waitTime = waitingTime.reduce(reducer1);
              let tTime = totTime;
              totTime = formatTime(
                tTime + convertHrToSec(serTime) + convertHrToSec(waitTime)
              );
              setTotalTime(totTime);
              setTotalDistance(totDistance / 1000);
              let vehicleStartTime = "";
              if (sameTrips.length > 0) {
                sameTrips.map((sameTrip) => {
                  if (sameTrip.trips === 1) {
                    vehicleStartTime = sameTrip.startTime;
                  }
                });
                prevTripsDist = sameTrips.reduce(
                  (sum, { totalDistance }) => sum + Number(totalDistance),
                  0
                );
                prevTripsTime = sameTrips.reduce(
                  (sum, { totalTime }) =>
                    sum + convertHrToSec(Number(totalTime)),
                  0
                );
              }
              let tripsClosed = false;
              if (vehicleStartTime.length > 0) {
                let vehicleStartTimeDate = new Date();
                vehicleStartTimeDate.setHours(
                  Number(vehicleStartTime.split(":")[0])
                );
                vehicleStartTimeDate.setMinutes(
                  Number(vehicleStartTime.split(":")[1])
                );
                let currentStartTimeDate = new Date();
                currentStartTimeDate.setHours(
                  Number(startTimeLocal.split(":")[0])
                );
                currentStartTimeDate.setMinutes(
                  Number(startTimeLocal.split(":")[1])
                );
                if (vehicleStartTimeDate > currentStartTimeDate) {
                  tripsClosed = true;
                } else {
                  tripsClosed = false;
                }
              }
              prevTripsDist = prevTripsDist + totDistance / 1000;
              let totTimeSec =
                convertHrToSec(Number(totTime.split(":")[0])) +
                convertMinToSec(Number(totTime.split(":")[1]));
              let maxTotTimeSec = convertHrToSec(
                Number(props.data.vehicleObject.maxtotaltime)
              );


              console.log(totTimeSec,maxTotTimeSec ,"state total time checking")
              if (
                prevTripsDist >= props.data.vehicleObject.maxtotaldist ||
                prevTripsTime >= maxTotTimeSec ||
                optimizationStatus ||
                totTimeSec > maxTotTimeSec ||
                tripsClosed
              ) {
                if (prevTripsDist >= props.data.vehicleObject.maxtotaldist) {
                  setDistErrorMessage(
                    `The vehicle cannot perform trip more than ${props.data.vehicleObject.maxtotaldist} KM, please review trip documents.`
                  );
                  setDistError(true);
                } else if (prevTripsTime >= maxTotTimeSec   ) {
                  setTimeErrorMessage(
                    `The vehicle cannot perform trip more than ${props.data.vehicleObject.maxtotaltime} Hrs, please review trip documents.`
                  );
                  setTimeError(true);
                }else if(totTimeSec >= maxTotTimeSec){
                  setTimeErrorMessage(
                    `The vehicle's maximum allowed trip duration is ${data.vehicleObject.maxtotaltime} hours. However, the current trip duration is ${totTime} hours. Please review the trip documents and make necessary adjustments.`
                  );
                  setTimeError(true);
                } else if (tripsClosed) {
                  setTripsClosedErrorMessage(
                    `The Vehicle ${
                      props.data.vehicleObject.codeyve
                    } cant perform this Trip on ${moment(props.date).format(
                      "yyyy-MM-DD"
                    )} , Prev Trips covered whole Day. Use Another Vehicle or Schedule on Next Day`
                  );
                  setTripClosedError(true);
                } else if (optimizationStatus) {
                  setOptimizationMessage("Please optimize previous trip.");
                  setOptiStatusError(true);
                }
                setHandleDateChange(selectedDate);
              } else {
                let loadingHrs = convertHrToSec(loadHrs);
                let tripData = {
                  tripCode: props.data.itemCode,
                  tripVehicle: props.data.code,
                  tripTotalTime: convertSecToHr(
                    tTime +
                      convertHrToSec(serTime) +
                      convertHrToSec(waitTime) +
                      loadingHrs
                  ),
                  tripTravelTime: formatTime(tTime),
                  tripTotalServiceTime: splitTime(serTime),
                  totalDistance: totDistance / 1000,
                  autoOptimised: autooptimise,
                };
                let routesSchedule = {
                  startDate: props.data.docdate,
                  endDate: props.data.docdate,
                  startTime: splitTime(startTimeLocal),
                  endTime: splitTime(endTime),
                  routesData: resultsData,
                  tripData: tripData,
                  trips: props.data,
                  cost: costCalculation(
                    props.vehiclePanel,
                    totTime,
                    Math.round(totDistance / 1000),
                    props.data.code
                  ),
                };
                let latestEndDate = props.data.docdate;
                let totaltimeforcal =
                  Number(startTimeLocal.split(":")[0]) + tripData.tripTotalTime;
                console.log("T2222 at last Trip Total time", totaltimeforcal);

                let dayscal = totaltimeforcal / 24;
                console.log("T2222 at last cal days", dayscal);
                let dateNew = new Date(props.data.docdate);
                if (dayscal > 0) {
                  let date1 = new Date(
                    dateNew.setDate(dateNew.getDate() + Math.floor(dayscal))
                  );
                  latestEndDate = date1;
                } else {
                  latestEndDate = dateNew;
                }
                routesSchedule.endDate = latestEndDate;
                // console.log("T6565 final data routeScheduler",routesSchedule);
                props.getValues(routesSchedule, optiindex, autooptimise);
              }
            }
          }
        }
      });
  };

  useEffect(() => {
    // console.log("T223 inside loading useEffect",props);
    let hr;
    let min;
    let loadingHrs;
    let unloadHrs;
    let loadingTime;
    let tripEndTime = [];
    let date = new Date();
    // console.log("T223 inside loading - vehiclepanel",props.vehiclePanel);
    props.vehiclePanel &&
      props.vehiclePanel.vehicles.length > 0 &&
      props.vehiclePanel.vehicles.map((vehicle) => {
        if (vehicle.codeyve === props.data.code) {
          // console.log("T223 inside loading - vehiclepanel - matched",vehicle.codeyve);
          if (vehicle.starttime.includes(":")) {
            hr = vehicle.starttime.split(":")[0];
            min = vehicle.starttime.split(":")[1];
          } else if (vehicle.starttime.length === 4) {
            hr = vehicle.starttime.substring(0, 2);
            min = vehicle.starttime.substring(2, 4);
          }
          // console.log("T223 inside use effct",hr+' -'+min);
          loadingHrs = vehicle.startdepots;
          unloadHrs = vehicle.enddepotserv;
          setLoadHrs(vehicle.startdepots);
          setUnLoadHrs(vehicle.enddepotserv);
        }
      });
    hr = formatHrMin(parseInt(hr));
    min = formatHrMin(parseInt(min));
    if (
      props.data.optistatus === "Optimized" ||
      props.data.optistatus === "optimized"
    ) {
      hr = props.data.startTime.split(":")[0];
      min = props.data.startTime.split(":")[1];
      loadingTime = loadingSecs(hr, min);
      // console.log("T223 inside loading use effct not opti",loadingTime);
    } else {
      loadingTime = loadingSecs(hr, min, loadingHrs);
      // console.log("T223 inside loading use effct opti",loadingTime);
    }

    //unit setting
    props.sites &&
      props.sites.length > 0 &&
      props.sites.map((site) => {
        // console.log("2 set sites",site);
        if (props.data.depSite === site.id) {
          // console.log("T223 inside loading site match")

          m = site.massunit;
          v = site.volunit;
          d = site.distunit;
          c = site.cur;
        }
      });

    props.tripsPanel &&
      props.tripsPanel.length > 0 &&
      props.tripsPanel.map((tripPanel) => {
        if (
          tripPanel.code === props.data.code &&
          tripPanel.optistatus === "Optimized" &&
          tripPanel.docdate === props.data.docdate
        ) {
          console.log("inside useeffect - tripPanel 822", tripPanel);
          tripEndTime.push({
            hr: nullAndNanChecking(tripPanel.endTime?.split(":")[0], "time"),
            min: nullAndNanChecking(tripPanel.endTime?.split(":")[1], "time"),
          });
          if (tripEndTime.length > 0) {
            tripEndTime.sort(function (a, b) {
              return Number(b.hr) - Number(a.hr);
            });
            props.vehiclePanel.vehicles.map((vehicle) => {
              if (vehicle.codeyve === props.data.code) {
                loadingHrs = vehicle.startdepots;
                unloadHrs = vehicle.enddepotserv;
                setLoadHrs(vehicle.startdepots);
                setUnLoadHrs(vehicle.enddepotserv);
              }
            });
            if (
              !(
                props.data.optistatus === "Optimized" ||
                props.data.optistatus === "optimized"
              )
            ) {
              let sametripHrs = convertSecToHr(
                convertHrToSec(Number(tripEndTime[0].hr)) +
                  convertMinToSec(Number(tripEndTime[0].min)) +
                  convertHrToSec(loadingHrs) +
                  convertHrToSec(unloadHrs)
              );
              let time = formatTime(convertHrToSec(sametripHrs));
              hr = time.split(":")[0];
              min = time.split(":")[1];
              loadingTime = loadingSecs(hr, min);
              // console.log("T223 inside loading time if",loadingTime);
            } else {
              let startTime = new Date();
              startTime.setHours(
                props.data.startTime.split(":")[0],
                props.data.startTime.split(":")[1]
              );
              hr = startTime.getHours();
              min = startTime.getMinutes();
              loadingTime = loadingSecs(hr, min);
              // console.log("T223 inside loading time else",loadingTime);
            }
          }
        }
      });
    hr = loadingTime.split(":")[0];
    min = loadingTime.split(":")[1];
    // console.log("T223 inside loading time",loadingTime);
    // console.log("2 after assign",c+"-"+m+"-"+d+"-"+v);
    setCurrency(c);
    setMassunit(m);
    setVolunits(v);
    setDistunts(d);
    setHr(hr);
    setMin(min);
    date.setHours(hr);
    date.setMinutes(parseInt(min));
    // console.log("T223 inside loading - after loading",date);
    setHandleDateChange(date);
  }, [props]);

  const displayTomTomDetails = (data) => {
    var totdis,
      tottime,
      totweight = 0,
      totvolume = 0;
    if (props.data.optistatus === "Optimized") {
      totdis = props.data.totalDistance;
      tottime = nullAndTime(props.data.totalTime) + " Hours";
      totweight = props.data.totalWeight;
      totvolume = props.data.totalVolume;
    } else {
      totdis = totalDistance;
      tottime = totalTime;
    }
    let details = "";
    let tomtitle = "";
    if (lang === "en") {
      tomtitle = "Optimisation Details";
      details = {
        "<b>Distance</b></br> Trip Distance":
          Math.round(totdis) + " " + distunts,
        "Max Total Distance": data.vehicleObject.maxtotaldist + " " + distunts,

        "</br><b>Time</b></br>Trip Time": tottime,
        "Max Total Time": data.vehicleObject.maxtotaltime + " Hours",

        "</br><b>Capacity</b></br>Total Weight": totweight,
        "Max Vehicle Capacities":
          data.vehicleObject.capacities + " " + massunit,

        "</br><b>Volume</b></br>Total Volume": totvolume,
        "Max Volume": data.vehicleObject.vol + " " + volunits,

        "</br><b>Parameters</b></br>Max Speed":
          data.vehicleObject.maxspeed + " " + distunts + "/Hr",
        "Vehicle Length": Number(data.vehicleObject.length) / 100 + " Mts",
        "Vehicle Width": Number(data.vehicleObject.width) / 100 + " Mts",
        "Vehicle Height": Number(data.vehicleObject.heigth) / 100 + " Mts",
      };
    } else {
      tomtitle = "Paramètres doptimisation";
      details = {
        "<b>Distance</b></br> Distance Trounee":
          Math.round(totdis) + " " + distunts,
        "Distance Maxi": data.vehicleObject.maxtotaldist + " " + distunts,

        "</br><b>Time</b></br>Duree de la tournee": tottime,
        "Duree Totale": data.vehicleObject.maxtotaltime + " Hours",

        "</br><b>Capacity</b></br>Poids chargement": totweight,
        "poids Maxi": data.vehicleObject.capacities + " " + massunit,

        "</br><b>Volume</b></br>Total Volume": totvolume,
        "Max Volume": data.vehicleObject.vol + " " + volunits,

        "</br><b>Parameters</b></br>vitesse Maxi":
          data.vehicleObject.maxspeed + " " + distunts + "/Hr",
        Longeur: Number(data.vehicleObject.length) / 100 + " Mts",
        Largeur: Number(data.vehicleObject.width) / 100 + " Mts",
        Hauteur: Number(data.vehicleObject.heigth) / 100 + " Mts",
      };
    }

    setTomTomMessage(details);
    setTitle(tomtitle);
    setTomTomNotification(true);
  };

  // console.log("insdei timeline",props.date);
  return (
    <Card className="mb-3">
      <CardBody className="p-0">
        <LoadingOverlay active={loader} spinner text="Loading your content...">
          <div className="table-responsive">
            <Table className="mb-0">
              <tbody>
                <tr>
                  <th>Departure</th>
                  <td>
                    {moment.tz(props.data.docdate, "").format("YYYY-MM-DD")}
                  </td>
                  <td>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <TimePicker
                        InputProps={{
                          // disableUnderline: true,
                          style: {
                            fontWeight: "bold",
                            color: "blue",
                            fontSize: "13px",
                            width: "35px",
                          },
                        }}
                        clearable
                        ampm={false}
                        value={selectedDate}
                        onChange={handleDateChange}
                      />
                    </MuiPickersUtilsProvider>
                  </td>
                  <th scope="row">Arrival</th>
                  <td>{getEndDate()}</td>

                  <td>
                    {props.data.optistatus === "Open"
                      ? ""
                      : props.data.endTime
                      ? nullAndNanChecking(props.data.endTime, "time")
                      : ""}
                  </td>

                  <th scope="row">{props.t("Duration")}</th>
                  <td>
                    {props.data.optistatus === "Open"
                      ? ""
                      : props.data.totalTime
                      ? nullAndTime(props.data.totalTime) + " HH:MM"
                      : " "}
                  </td>

                  <th scope="row">{props.t("Distance")}</th>
                  <td>
                    {props.data.optistatus === "Open"
                      ? ""
                      : props.data.totalDistance
                      ? Math.round(
                          Number(
                            nullAndNanChecking(
                              props.data.totalDistance,
                              "distance"
                            )
                          )
                        ) +
                        " " +
                        distunts
                      : " "}
                  </td>

                  <th scope="row">{props.t("Cost")}</th>
                  <td>
                    {props.data.optistatus === "Open"
                      ? ""
                      : props.data.totalCost
                      ? Math.round(
                          Number(
                            nullAndNanChecking(props.data.totalCost, "distance")
                          )
                        ) +
                        " " +
                        currency
                      : " "}
                  </td>

                  <th scope="row">{props.t("Details")}</th>
                  <td>
                    <a
                      href="#"
                      onClick={() => displayTomTomDetails(props.data)}
                    >
                      <i class="fa fa-info-circle" aria-hidden="true"></i>
                    </a>
                  </td>
                  <th>
                    {" "}
                    <b>Auto-optimisation </b>:
                  </th>
                  <td>
                    {" "}
                    <Switch checked={autooptimise} onChange={onchangeSwitch} />
                  </td>
                  <td>
                    {(() => {
                      if (props.data.tmsValidated) {
                      } else {
                        return (
                          <button
                            type="button"
                            class="btn btn-primary btn-sm mt-2"
                            style={{
                              fontSize: "12px",
                              fontWeight: "bold",
                              marginRight: "0%",
                              width: "max-content",
                              alignSelf: "flex-end",
                            }}
                            onClick={() => CheckedOptimisationRoute(props.data)}
                          >
                            {props.t("OPTIMISATION")}
                          </button>
                        );
                      }
                    })()}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          <Alert
            show={addAlertShow}
            onHide={AlertClose}
            errorMessage={ErrorMessage}
          ></Alert>

          {tripClosedError && (
            <DisplayInformationIconDetails
              show={tripClosedError}
              onInfoIconHide={warningWindowClose}
              data={tripsClosedErrorMessage}
              warning={true}
            ></DisplayInformationIconDetails>
          )}
          {distError && (
            <DisplayInformationIconDetails
              show={distError}
              onInfoIconHide={warningWindowClose}
              data={distErrorMessage}
              warning={true}
            ></DisplayInformationIconDetails>
          )}
          {timeError && (
            <DisplayInformationIconDetails
              show={timeError}
              onInfoIconHide={warningWindowClose}
              data={timeErrorMessage}
              warning={true}
            ></DisplayInformationIconDetails>
          )}
          {optiStatusError && (
            <DisplayInformationIconDetails
              show={optiStatusError}
              onInfoIconHide={warningWindowClose}
              data={optimizationMessage}
              warning={true}
            ></DisplayInformationIconDetails>
          )}
          {tomTomNotification && (
            <DisplayTomTomInfo
              show={tomTomNotification}
              title={title}
              onInfoIconHide={warningWindowClose}
              data={tomTomMessage}
            ></DisplayTomTomInfo>
          )}
          {modelTime && (
            <DisplayInformationIconDetails
              show={modelTime}
              onInfoIconHide={warningWindowClose}
              data={modalTimeMessage}
              warning={true}
            ></DisplayInformationIconDetails>
          )}
          {optimizationFailedStatus && (
            <DisplayInformationIconDetails
              show={optimizationFailedStatus}
              onInfoIconHide={warningWindowClose}
              data={
                "Optimization is failing. Please check the Geo Coordinates for Site and Deliveries ,should be in same Region/Country"
              }
              warning={true}
            ></DisplayInformationIconDetails>
          )}
        </LoadingOverlay>
      </CardBody>
    </Card>
  );
}

export default withNamespaces()(Timeline);
