import React, { useEffect } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import { withTranslation } from 'react-i18next';
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Switch from '@mui/material/Switch';
import './RouteSchedulerStyles.css';
import {
    convertSecToHr,
    splitTime,
    formatHrMin,
    nullAndNanChecking,
    formatTime,
    convertHrToSec,
    convertMinToSec,
    convertMinToHr,
} from '../converterFunctions/converterFunctions';
import DisplayInformationIconDetails from '../Panel/DisplayInformationIconDetails';
import DisplayTomTomInfo from '../Panel/DisplayTomTomInfo';

function RouteScheduler(props) {
    const [totalTime, setTotalTime] = React.useState(0);
    const [totalDistance, setTotalDistance] = React.useState(0);
    const [endTime, setEndTime] = React.useState();
    const [tomTomMessage, setTomTomMessage] = React.useState({});
    const [title, setTitle] = React.useState({});

    const [tomTomNotification, setTomTomNotification] = React.useState(false);
    const [getHr, setHr] = React.useState(0);
    const [getMin, setMin] = React.useState(0);
    const [selectedDate, setHandleDateChange] = React.useState(date);
    const [loadHrs, setLoadHrs] = React.useState();
    const [unLoadHrs, setUnLoadHrs] = React.useState();
    const [currency, setCurrency] = React.useState();
    const [distunts, setDistunts] = React.useState();
    const [volunits, setVolunits] = React.useState();
    const [massunit, setMassunit] = React.useState();
    const [distErrorMessage, setDistErrorMessage] = React.useState('');
    const [timeErrorMessage, setTimeErrorMessage] = React.useState('');
    const [tripsClosedErrorMessage, setTripsClosedErrorMessage] = React.useState('');
    const [tripClosedError, setTripClosedError] = React.useState(false);
    const [distError, setDistError] = React.useState(false);
    const [timeError, setTimeError] = React.useState(false);
    const [optimizationMessage, setOptimizationMessage] = React.useState('');
    const [optiStatusError, setOptiStatusError] = React.useState(false)
    const [modelTime, setModelTime] = React.useState(false);
    const [optimizationFailedStatus, setOptimizationFailedStatus] = React.useState(false)
    // const [currentStartTime, setCurrentStartTime] = React.useState(date);
    const [modalTimeMessage, setModalTimeMessage] = React.useState('');
    const [autooptimise, setAutooptimise] = React.useState(false);

    console.log("2 Routeshc",props.data);



    var date = new Date();
    let distanceCost = 0;
    let timeCost = 0;
    let totalCost = 0;
    let Regularcost = 0;
    let overtimecost = 0;
    let c, d, m, v;


    var lang = localStorage.getItem("lng");
  /*  if (lang == "en") {
        currency = "USD";
        distunts = 'Miles';
        massunit = 'LB';
        volunits = 'GAL'
    }
    else {
        currency = "EUR";
        distunts = 'Kms';
        massunit = 'KG';
        volunits = 'L'
    }
*/



    const onchangeSwitch =() => {
       let autoop = autooptimise;
       console.log("auto op",autooptimise);
       setAutooptimise(!autooptimise);
    }

    const costCalculation = (vehiclePanel, totalTime, totalDistance, code) => {
        let hr = Number(totalTime.split(':')[0]);
        let min = Number(totalTime.split(':')[1]);
        totalTime = hr + convertMinToHr(min);
        if (vehiclePanel && code) {
            vehiclePanel.vehicles.map((vehicle) => {
                if (vehicle.codeyve === code) {
                    distanceCost = (vehicle.costperunitd * Number(totalDistance));
                    if (totalTime > vehicle.overtimestar) {
                        overtimecost = (totalTime - vehicle.overtimestar) * vehicle.costperunito;
                        Regularcost = vehicle.overtimestar * vehicle.costperunitt;
                        timeCost = Math.round(overtimecost + Regularcost);
                    }
                    else {
                        Regularcost = (vehicle.costperunitt * totalTime);
                        timeCost = Regularcost;
                    }
                    totalCost = vehicle.fixedcost + distanceCost + timeCost
                }
            })
        }
        return { distanceCost, timeCost, totalCost, overtimecost, Regularcost };
    }

    const warningWindowClose = () => {
        setModelTime(false);
        setTripClosedError(false);
        setDistError(false);
        setTimeError(false);
        setOptiStatusError(false);
        setTomTomNotification(false)
        setOptimizationFailedStatus(false)
    }

    const getEndDate = () => {
        if (!(props.data.optistatus === "Open") && props.data.endDate) {
            return moment(props.data.endDate).format('yyyy-MM-DD');
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
    }

    const handleDateChange = (date) => {
        let hr = Number(formatHrMin(date.getHours()));
        let min = Number(formatHrMin(date.getMinutes()));
        let loadingTime = loadingSecs(hr, min, loadHrs)
        hr = loadingTime.split(':')[0];
        min = loadingTime.split(':')[1];
        if (props.data && props.data.trips > 1) {
            let endHr;
            let endMin;
            props.tripsPanel.map((tripPanel) => {
                if (tripPanel.code === props.data.code) {
                    if (tripPanel.trips === props.data.trips - 1) {
                        endHr = tripPanel.endTime.split(":")[0];
                        endMin = tripPanel.endTime.split(":")[1]
                    }
                }
            });
            if (Number(hr) >= Number(endHr)) {
                if (Number(endHr) == Number(hr)
                    && Number(min) > Number(endMin)) {
                    hr = hr;
                    min = min;
                } else if (Number(hr) > Number(endHr)) {
                    hr = hr;
                    min = min;
                } else {
                    hr = Number(endHr);
                    min = Number(endMin);
                    setModelTime(true);
                    setModalTimeMessage(`Veuillez choisir une durée supérieure à "${endHr}:${endMin}".`)
                }
            } else {
                hr = Number(endHr);
                min = Number(endMin);
                setModelTime(true)
                setModalTimeMessage(`Veuillez choisir une durée supérieure à "${endHr}:${endMin}".`)
            }
        }

        setHr(hr);
        setMin(min);
        date.setHours(hr);
        date.setMinutes(parseInt(min));
        setHandleDateChange(date);
    }

    const nullAndTime = (data) => {
        let time = nullAndNanChecking(data, 'hr') * 60 * 60;
        if (time > 0) {
            return formatTime(time);
        } else {
            return ''
        }
    }

    const loadingSecs = (hr, min, loadingHrs) => {
        if (loadingHrs) {
            return formatTime(convertHrToSec(hr) + convertMinToSec(min) + convertHrToSec(loadingHrs));
        } else {
            return formatTime(convertHrToSec(hr) + convertMinToSec(min));
        }
    }

    const optimizeRoute = (data) => {
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
        })

        let apiurl;
        let jsonUrl;

       if(autooptimise){
         apiurl = 'https://api.tomtom.com/routing/1/calculateRoute/';
         jsonUrl = `/json?computeBestOrder=true&routeRepresentation=summaryOnly&computeTravelTimeFor=all&routeType=shortest&avoid=unpavedRoads&travelMode=truck&vehicleMaxSpeed=${data.vehicleObject.maxspeed}&vehicleWeight=${data.vehicleObject.capacities}&vehicleLength=${((data.vehicleObject.length) / 100)}&vehicleWidth=${((data.vehicleObject.width) / 100)}&vehicleHeight=${((data.vehicleObject.heigth) / 100)}&vehicleCommercial=true&vehicleLoadType=otherHazmatGeneral&vehicleEngineType=combustion&key=ctZzLlfGUpaNdfHiIobOeub8NBzzGkNG`;

       }else{
         apiurl = 'https://api.tomtom.com/routing/1/calculateRoute/';
         jsonUrl = `/json?computeBestOrder=false&routeRepresentation=summaryOnly&computeTravelTimeFor=all&routeType=shortest&avoid=unpavedRoads&travelMode=truck&vehicleMaxSpeed=${data.vehicleObject.maxspeed}&vehicleWeight=${data.vehicleObject.capacities}&vehicleLength=${((data.vehicleObject.length) / 100)}&vehicleWidth=${((data.vehicleObject.width) / 100)}&vehicleHeight=${((data.vehicleObject.heigth) / 100)}&vehicleCommercial=true&vehicleLoadType=otherHazmatGeneral&vehicleEngineType=combustion&key=ctZzLlfGUpaNdfHiIobOeub8NBzzGkNG`;
       }


        let prevTripsDist = 0;
        let prevTripsTime = 0;
        var summaryData = [];
        var optiindex = [];
        let serviceTime = [];
        let waitingTime = [];
        let lanLat = siteLat + ',' + siteLang;
        data.totalObject.selectedTripData.map((tripData) => {
            if (Object.keys(tripData).length > 0) {
                serviceTime.push(tripData.serviceTime);
                waitingTime.push(tripData.waitingTime);
                lanLat = lanLat + ':' + tripData.lat + ',' + tripData.lng;
            }
        });
        //change end depo lan n lat below siteLat + ',' + siteLang
        lanLat = lanLat + ':' + arrSiteLat + ',' + arrSiteLang
        let url = apiurl + encodeURIComponent(lanLat) + jsonUrl;
        return fetch(url)
            .then(function (response) {
                if (response.status === 200) {
                    return response.json()
                } else {
                    setOptimizationFailedStatus(true)
                }
            }).then((res) => {
                console.log("auto - opti result",res);
                    if(res && res.optimizedWaypoints){
                       optiindex.push(res.optimizedWaypoints);
                    }

                    if(res && res.routes) {
                    summaryData.push(res.routes);
                }
                let summaryResult = { "summarydata": [...summaryData], "serviceTime": serviceTime, "waitingTime": waitingTime }
                if (summaryResult && summaryResult.summarydata && summaryResult.serviceTime && summaryResult.waitingTime) {
                    let summaryData = summaryResult.summarydata;
                    let serviceTime = summaryResult.serviceTime;
                    let waitingTime = summaryResult.waitingTime;
                    let results = summaryData[0];
                    if (results) {
                        let legs = results[0].legs;
                        if (props.data && legs && props.data.stops < results[0].legs.length) {
                            let dateformatter = (date, index) => {
                                let d = date.toDateString()
                                let t = date.toTimeString()
                                t = t.split(" ")[0]
                                return d + " " + t;
                            }
                            let resultsData = [];
                            var departure = new Date();
                            let optimisedTrips = [];
                            props.tripsPanel.map((tripData) => {
                                if ((tripData.optistatus === 'Optimized' || tripData.optistatus === 'optimized') && tripData.itemCode !== props.data.itemCode) {
                                    optimisedTrips.push(tripData);
                                }
                            });
                            let currTripTimeHr = getHr;
                            let currTripTimeMin = getMin;
                            departure.setHours(Number(currTripTimeHr));
                            departure.setMinutes(Number(currTripTimeMin));
                            let sameTrips = [];
                            let startTimeInSec;
                            if (optimisedTrips.length > 0) {
                                optimisedTrips.map((optiTrip) => {
                                    if (optiTrip.code === props.data.code) {
                                        sameTrips.push(optiTrip);
                                    }
                                })
                            };
                            let previousCheck = [];
                            props.tripsPanel.map((tripPanel) => {
                                if (tripPanel.code === props.data.code) {
                                    if (tripPanel.trips === props.data.trips - 1) {
                                        previousCheck.push(tripPanel)
                                    }
                                }
                            })
                            let optimizationStatus = false;
                            if (previousCheck.length > 0) {
                                if (previousCheck[0].optistatus === 'Optimized') {
                                    optimizationStatus = false;
                                } else {
                                    optimizationStatus = true;
                                }
                            }

                            if (sameTrips.length > 0) {
                                let sameTripTime = []
                                sameTrips.map((times, index) => {
                                    sameTripTime.push({ hr: times.endTime.split(":")[0], min: times.endTime.split(":")[1] })
                                });
                                sameTripTime.sort((a, b) => {
                                    return Number(b.hr) - Number(a.hr)
                                })
                                if (sameTripTime.length > 0) {
                                    currTripTimeHr = sameTripTime[0].hr;
                                    currTripTimeMin = sameTripTime[0].min;
                                    setHr(currTripTimeHr);
                                    setMin(currTripTimeMin);

                                    let sametripTime = formatTime(convertHrToSec(currTripTimeHr) + convertMinToSec(currTripTimeMin) + convertHrToSec(unLoadHrs) + convertHrToSec(loadHrs))
                                    //departure.setHours(Number(currTripTimeHr) + 1);
                                    let sametripHrs = sametripTime.split(':')[0];
                                    let sametripMin = sametripTime.split(':')[1];
                                    if (Number(getHr) >= Number(sametripHrs)) {
                                        if (Number(getHr) == Number(sametripHrs) && Number(getMin) > Number(sametripMin)) {
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
                                startTimeInSec = convertMinToSec(departure.getMinutes()) + convertHrToSec(departure.getHours());
                            } else {
                                startTimeInSec = convertMinToSec(departure.getMinutes()) + convertHrToSec(departure.getHours());
                            }
                            startTimeInSec = formatTime(startTimeInSec);
                            let startTimeHrs = startTimeInSec.split(':')[0];
                            let startTimeMins = startTimeInSec.split(':')[1];
                            departure.setHours(startTimeHrs);
                            departure.setMinutes(startTimeMins);

                            setHandleDateChange(departure)

                            let startTimeHr = departure.getHours();
                            let startTimeMin = departure.getMinutes();
                            let startTimeLocal = formatHrMin(startTimeHr) + ":" + formatHrMin(startTimeMin);
                            legs.forEach((data, index) => {
                                let time = data.summary.travelTimeInSeconds
                                let length = data.summary.lengthInMeters;
                                let sec = 0;
                                let waitSec = 0;
                                if (Number(serviceTime[index])) {
                                    sec = sec + convertHrToSec(Number(serviceTime[index]))
                                } else {
                                    sec = sec + 0;
                                }
                                if (Number(waitingTime[index])) {
                                    waitSec = waitSec + convertHrToSec(Number(waitingTime[index]))
                                } else {
                                    waitSec = waitSec + 0;
                                }
                                let serTime = formatTime(convertHrToSec(Number(serviceTime[index])));
                                let waitTime = formatTime(convertHrToSec(Number(waitingTime[index])));
                                serTime = serTime.split(':');
                                let serTimeHr = serTime[0];
                                let serTimeMin = serTime[1];
                                serTime = formatHrMin(serTimeHr) + ":" + formatHrMin(serTimeMin);

                                waitTime = waitTime.split(':');
                                let waitTimeHr = waitTime[0];
                                let waitTimeMin = waitTime[1];
                                waitTime = formatHrMin(waitTimeHr) + ":" + formatHrMin(waitTimeMin);

                                let res = {
                                    start: dateformatter(departure, index),
                                    distance: length / 1000,
                                    time: convertSecToHr(time).toFixed(3),
                                    serviceTime: serviceTime[index],
                                    serTime: splitTime(serTime),
                                    tTime: time,
                                    tDistance: length
                                };
                                departure.setSeconds(departure.getSeconds() + time + sec + waitSec);
                                //added sersec+wait sec+time
                                let endTimeRoute = dateformatter(departure);
                                endTimeRoute = new Date(endTimeRoute);
                                let endTimeHr = endTimeRoute.getHours();
                                let endTimeMin = endTimeRoute.getMinutes();
                                endTimeRoute = (endTimeHr) + ':' + endTimeMin;
                                var a = endTimeRoute.split(':');
                                var endTimeSec = (+a[0]) * 60 * 60 + (+a[1]) * 60;
                                var arrivalTime = endTimeSec -
                                    (Number(serviceTime[index]) * 60 * 60) - (Number(waitingTime[index]) * 60 * 60);
                                arrivalTime = formatTime(arrivalTime);
                                res.end = splitTime(endTimeRoute);
                                res.arrival = splitTime(arrivalTime);


                                res.startDate = props.date;
                                res.endDate = props.date
                                let latestEndDate = props.date
                                let latestStartDate = props.date
                                if (Number(arrivalTime.split(':')[0]) <=
                                    Number(startTimeLocal.split(':')[0])) {
                                    let dateNew = new Date(props.date);
                                    let date1 = new Date(dateNew.setDate(dateNew.getDate() + 1));
                                    latestStartDate = date1;
                                }
                                if (Number(endTimeRoute.split(':')[0]) <=
                                    Number(startTimeLocal.split(':')[0])) {
                                    let dateNew = new Date(props.date);
                                    let date1 = new Date(dateNew.setDate(dateNew.getDate() + 1));
                                    latestEndDate = date1;
                                }
                                res.endDate = latestEndDate;
                                res.startDate = latestStartDate;
                                resultsData.push(res);
                            });
                            let totTime = 0;
                            let totDistance = 0;
                            let endTime;
                            resultsData.map((data, index) => {
                                if (index === props.data.stops) {
                                    endTime = data.end.split(':');
                                    let endTimeHrs = endTime[0];
                                    let endTimeMins = endTime[1];
                                    let endLoadHrs = loadingSecs(Number(endTimeHrs), Number(endTimeMins))
                                    endTime = endLoadHrs;
                                    setEndTime(endTime);
                                }
                                totTime += data.tTime;
                                totDistance += data.tDistance;
                            });

                            let reducer1 = (accumulator, currentValue) => Number(accumulator) + Number(currentValue);
                            let serTime = serviceTime.reduce(reducer1);
                            let waitTime = waitingTime.reduce(reducer1)
                            let tTime = totTime;
                            totTime = formatTime(tTime + convertHrToSec(serTime) + convertHrToSec(waitTime));
                            setTotalTime(totTime);
                            setTotalDistance(totDistance / 1000);
                            let vehicleStartTime = '';
                            if (sameTrips.length > 0) {
                                sameTrips.map((sameTrip) => {
                                    if (sameTrip.trips === 1) {
                                        vehicleStartTime = sameTrip.startTime
                                    }
                                })
                                prevTripsDist = sameTrips.reduce((sum, { totalDistance }) => sum + Number(totalDistance), 0);
                                prevTripsTime = sameTrips.reduce((sum, { totalTime }) => sum + convertHrToSec(Number(totalTime)), 0)
                            }
                            let tripsClosed = false;
                            if (vehicleStartTime.length > 0) {
                                let vehicleStartTimeDate = new Date();
                                vehicleStartTimeDate.setHours(Number(vehicleStartTime.split(':')[0]));
                                vehicleStartTimeDate.setMinutes(Number(vehicleStartTime.split(':')[1]));
                                let currentStartTimeDate = new Date();
                                currentStartTimeDate.setHours(Number(startTimeLocal.split(':')[0]))
                                currentStartTimeDate.setMinutes(Number(startTimeLocal.split(':')[1]))
                                if (vehicleStartTimeDate > currentStartTimeDate) {
                                    tripsClosed = true;
                                } else {
                                    tripsClosed = false;
                                }
                            }
                            prevTripsDist = prevTripsDist + (totDistance / 1000)
                            let totTimeSec = convertHrToSec(Number(totTime.split(':')[0])) + convertMinToSec(Number(totTime.split(':')[1]));
                            let maxTotTimeSec = convertHrToSec(Number(props.data.vehicleObject.maxtotaltime));
                            if (prevTripsDist >= props.data.vehicleObject.maxtotaldist
                                || prevTripsTime >= maxTotTimeSec
                                || optimizationStatus
                                || tripsClosed) {
                                if (prevTripsDist >= props.data.vehicleObject.maxtotaldist) {
                                    setDistErrorMessage(`Le véhicule ne peut pas parcourir plus de ${props.data.vehicleObject.maxtotaldist} KM, veuillez consulter les documents de voyage.`)
                                    setDistError(true);
                                } else if (prevTripsTime >= maxTotTimeSec) {
                                    setTimeErrorMessage(`Le véhicule ne peut pas parcourir plus de ${props.data.vehicleObject.maxtotaltime} Hrs,veuillez consulter les documents de voyage.`)
                                    setTimeError(true);
                                } else if (tripsClosed) {
                                    setTripsClosedErrorMessage("Aujourd'hui, les voyages étaient fermés.");
                                    setTripClosedError(true);
                                } else if (optimizationStatus) {
                                    setOptimizationMessage("Veuillez optimiser le voyage précédent.");
                                    setOptiStatusError(true);
                                }
                                setHandleDateChange(selectedDate)
                            } else {
                                let loadingHrs = convertHrToSec(loadHrs);
                                let tripData = {
                                    tripCode: props.data.itemCode,
                                    tripVehicle: props.data.code,
                                    tripTotalTime: convertSecToHr(tTime + convertHrToSec(serTime) + convertHrToSec(waitTime) + loadingHrs),
                                    tripTravelTime: formatTime(tTime),
                                    tripTotalServiceTime: splitTime(serTime),
                                    totalDistance: totDistance / 1000,
                                    autoOptimised : autooptimise,

                                };
                                let routesSchedule = {
                                    startDate: props.date,
                                    endDate: props.date,
                                    startTime: splitTime(startTimeLocal),
                                    endTime: splitTime(endTime),
                                    routesData: resultsData,
                                    tripData: tripData,
                                    trips: props.data,
                                    cost: costCalculation(props.vehiclePanel, totTime, Math.round(totDistance / 1000), props.data.code)
                                }
                                let latestEndDate = props.date
                                if (Number(endTime.split(':')[0]) <=
                                    Number(startTimeLocal.split(':')[0])) {
                                    let dateNew = new Date(props.date);
                                    let date1 = new Date(dateNew.setDate(dateNew.getDate() + 1));
                                    latestEndDate = date1;
                                }
                                routesSchedule.endDate = latestEndDate;
                                props.getValues(routesSchedule, optiindex, autooptimise);
                            }
                        }
                    }
                }
            });
    };

    useEffect(() => {
      console.log("2 inside useEffect");
        let hr;
        let min;
        let loadingHrs;
        let unloadHrs;
        let loadingTime;
        let tripEndTime = [];
        let date = new Date();
        props.vehiclePanel.vehicles.map((vehicle) => {
            if (vehicle.codeyve === props.data.code) {
                if (vehicle.starttime.includes(':')) {
                    hr = vehicle.starttime.split(':')[0];
                    min = vehicle.starttime.split(':')[1];
                } else if (vehicle.starttime.length === 4) {
                    hr = vehicle.starttime.substring(0, 2);
                    min = vehicle.starttime.substring(2, 4);
                }

                loadingHrs = vehicle.startdepots;
                unloadHrs = vehicle.enddepotserv;
                setLoadHrs(vehicle.startdepots);
                setUnLoadHrs(vehicle.enddepotserv);
            }
        })
        hr = formatHrMin(parseInt(hr));
        min = formatHrMin(parseInt(min));
        if (props.data.optistatus === "Optimized" || props.data.optistatus === "optimized") {
            hr = props.data.startTime.split(':')[0];
            min = props.data.startTime.split(':')[1];
            loadingTime = loadingSecs(hr, min)
        } else {
            loadingTime = loadingSecs(hr, min, loadingHrs)
        }

        //unit setting
        props.sites.map((site) => {
                  console.log("2 set sites",site);
              if (props.data.depSite === site.id) {
                 console.log("2 inside site match")
                  m = site.massunit;
                  v = site.volunit;
                  d = site.distunit;
                  c = site.cur;

              }
})


        props.tripsPanel.map((tripPanel) => {

            if (tripPanel.code === props.data.code && tripPanel.optistatus === "Optimized") {
                tripEndTime.push({ hr: tripPanel.endTime.split(':')[0], min: tripPanel.endTime.split(':')[1] });
                if (tripEndTime.length > 0) {
                    tripEndTime.sort(function (a, b) {
                        return Number(b.hr) - Number(a.hr)
                    });
                    props.vehiclePanel.vehicles.map((vehicle) => {
                        if (vehicle.codeyve === props.data.code) {
                            loadingHrs = vehicle.startdepots;
                            unloadHrs = vehicle.enddepotserv;
                            setLoadHrs(vehicle.startdepots);
                            setUnLoadHrs(vehicle.enddepotserv);
                        }
                    })
                    if (!(props.data.optistatus === "Optimized" || props.data.optistatus === "optimized")) {
                        let sametripHrs = convertSecToHr(convertHrToSec(Number(tripEndTime[0].hr))
                            + convertMinToSec(Number(tripEndTime[0].min))
                            + convertHrToSec(loadingHrs) + convertHrToSec(unloadHrs))
                        let time = formatTime(convertHrToSec(sametripHrs));
                        hr = time.split(':')[0];
                        min = time.split(':')[1];
                        loadingTime = loadingSecs(hr, min)
                    } else {
                        let startTime = new Date();
                        startTime.setHours((props.data.startTime.split(":")[0]), (props.data.startTime.split(":")[1]));
                        hr = startTime.getHours();
                        min = startTime.getMinutes();
                        loadingTime = loadingSecs(hr, min)
                    }
                }
            }
        })
        hr = loadingTime.split(':')[0];
        min = loadingTime.split(':')[1];
        console.log("2 after assign",c+"-"+m+"-"+d+"-"+v);
        setCurrency(c);
        setMassunit(m);
        setVolunits(v);
        setDistunts(d);


        setHr(hr);
        setMin(min);
        date.setHours(hr);
        date.setMinutes(parseInt(min));
        setHandleDateChange(date);
    }, [props])

    const displayTomTomDetails = (data) => {
        var totdis, tottime, totweight = 0, totvolume = 0;
        if (props.data.optistatus === "Optimized") {
            totdis = props.data.totalDistance;
            tottime = nullAndTime(props.data.totalTime) + ' Hours';
            totweight = props.data.totalWeight;
            totvolume = props.data.totalVolume;
        }
        else {
            totdis = totalDistance;
            tottime = totalTime;
        }
        let details = ''
        let tomtitle = ''
        if (lang === "en") {
         tomtitle = "Optimisation Details";
        details = {
            "<b>Distance</b></br> Trip Distance": Math.round(totdis) + ' ' + distunts,
            "Max Total Distance": data.vehicleObject.maxtotaldist + ' ' + distunts,


            "</br><b>Time</b></br>Trip Time": tottime,
            "Max Total Time": data.vehicleObject.maxtotaltime + ' Hours',


            "</br><b>Capacity</b></br>Total Weight": totweight,
            "Max Vehicle Capacities": data.vehicleObject.capacities + ' ' + massunit,

            "</br><b>Volume</b></br>Total Volume": totvolume,
            "Max Volume": data.vehicleObject.vol + ' ' + volunits,

            "</br><b>Parameters</b></br>Max Speed": data.vehicleObject.maxspeed + ' ' + distunts + '/Hr',
            "Vehicle Length": (Number(data.vehicleObject.length)) / 100 + ' Mts',
            "Vehicle Width": (Number(data.vehicleObject.width)) / 100 + ' Mts',
            "Vehicle Height": (Number(data.vehicleObject.heigth)) / 100 + ' Mts'
        }}
        else {
           tomtitle = "Paramètres doptimisation";
            details = {
          "<b>Distance</b></br> Distance Trounee": Math.round(totdis) + ' ' + distunts,
                    "Distance Maxi": data.vehicleObject.maxtotaldist + ' ' + distunts,


                    "</br><b>Time</b></br>Duree de la tournee": tottime,
                    "Duree Totale": data.vehicleObject.maxtotaltime + ' Hours',


                    "</br><b>Capacity</b></br>Poids chargement": totweight,
                    "poids Maxi": data.vehicleObject.capacities + ' ' + massunit,

                    "</br><b>Volume</b></br>Total Volume": totvolume,
                    "Max Volume": data.vehicleObject.vol + ' ' + volunits,

                    "</br><b>Parameters</b></br>vitesse Maxi": data.vehicleObject.maxspeed + ' ' + distunts + '/Hr',
                    "Longeur": (Number(data.vehicleObject.length)) / 100 + ' Mts',
                    "Largeur": (Number(data.vehicleObject.width)) / 100 + ' Mts',
                    "Hauteur": (Number(data.vehicleObject.heigth)) / 100 + ' Mts'

}
        }

        setTomTomMessage(details)
        setTitle(tomtitle);
        setTomTomNotification(true)
    }

    return (
        <div>
            <div style={{ textAlign: 'right' }}>
                <div>
                    <span> <b>Auto-optimisation </b>:</span>
                    <Switch
                    checked={autooptimise}
                     onChange={onchangeSwitch}
                     />
                </div>
                <div>
                    {(() => {
                        if (props.data.tmsValidated) {
                        }
                        else {
                            return (
                                <button type="button" class="btn btn-primary" style={{ fontSize: '12px', fontWeight: 'bold', marginRight: '8%', marginLeft: '20%' }}
                                    onClick={() => optimizeRoute(props.data)}>
                                    OPTIMISATION
                                </button>
                            );
                        }
                    })()}
                </div>
            </div>

            {tripClosedError &&
                <DisplayInformationIconDetails
                    show={tripClosedError}
                    onInfoIconHide={warningWindowClose}
                    data={tripsClosedErrorMessage}
                    warning={true} >
                </DisplayInformationIconDetails>
            }
            {distError &&
                <DisplayInformationIconDetails
                    show={distError}
                    onInfoIconHide={warningWindowClose}
                    data={distErrorMessage}
                    warning={true} >
                </DisplayInformationIconDetails>
            }
            {timeError &&
                <DisplayInformationIconDetails
                    show={timeError}
                    onInfoIconHide={warningWindowClose}
                    data={timeErrorMessage}
                    warning={true} >
                </DisplayInformationIconDetails>
            }
            {optiStatusError &&
                <DisplayInformationIconDetails
                    show={optiStatusError}
                    onInfoIconHide={warningWindowClose}
                    data={optimizationMessage}
                    warning={true} >
                </DisplayInformationIconDetails>
            }
            {tomTomNotification &&
                <DisplayTomTomInfo
                    show={tomTomNotification}
                     title= {title}

                    onInfoIconHide={warningWindowClose}
                    data={tomTomMessage} >
                </DisplayTomTomInfo>
            }
            {modelTime &&
                <DisplayInformationIconDetails
                    show={modelTime}
                    onInfoIconHide={warningWindowClose}
                    data={modalTimeMessage}
                    warning={true} >
                </DisplayInformationIconDetails>
            }
            {optimizationFailedStatus &&
                <DisplayInformationIconDetails
                    show={optimizationFailedStatus}
                    onInfoIconHide={warningWindowClose}
                    data={"L'optimisation a échoué"}
                    warning={true}>
                </DisplayInformationIconDetails>
            }
        </div>
    )
}
export default RouteScheduler;