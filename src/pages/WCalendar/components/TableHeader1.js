import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Calendar from "./Calendar";
import Typography from "@material-ui/core/Typography";
import Tablesearch from "./Tablesearch";
import Download from "../Images/Download.svg";
import Grid from "@material-ui/core/Grid";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SelectSite from "./SelectSite";
import MultiSelect from "./MultiSelect";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "white",
    paddingRight: 9,
    fontSize: 14,
  },
  title1: {
    color: "white",
    fontSize: 14,
  },
  btnLabel: {
    fontSize: 9,
  },
}));

    const leftIcon = {

        top: 22,
        backgroundColor: '#ffffff',
        borderRadius: '100%',
        fontSize: 24,
        color: 'black',
        padding : '1px'
    }






const TableHeader = (props) => {
  const classes = useStyles();
  console.log("inside TableHEader -",props.totalDistance);
  let optionItems = [];

const setSelectedSites = (val) => {
        props.handleSiteChange(val);
    }

 const   selectedSitesArr = (val) => {
        props.sitesArr(val);
    }



    useEffect(() => {

            var optionSelected = {};
            var selectedSite = {};
            var placeHolder = "All";
            console.log("inside useEffect",props.sitelist);
            props.sitelist && props.sitelist.length > 0 && props.sitelist.map((site) => {
                if (site.id == props.selectedSite) {
                    selectedSite = site;
                    placeHolder = site.value;
                    optionSelected.value = site.id;
                    optionSelected.label = (site.value + "(" + site.id + ")");
                }
                optionItems.push({ value: site.id, label: (site.value + "(" + site.id + ")") })
            });
      console.log("inside useEffect - optionItems",optionItems);
    }, [props])

  return (
    <Grid
      container

      // justify="space-around"
      // alignItems="center"
      style={{ backgroundColor: "#AAAAAA", height: "70px", width: "auto" }}
    >
      <Grid
        item
        container

        alignItems="baseline"
        style={{ display: "flex", alignItems: "baseline", paddingLeft: 10, color:"white" }}
      >
        <Typography variant="subtitle1" className={classes.title} >
          Drivers Route Visualizer
        </Typography>
  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                      <MultiSelect
                                          setSelectedSites={setSelectedSites}
                                          selectedSitesArr={selectedSitesArr}
                                          options={optionItems}
                                      />


  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
  <div style={{ 'padding':'7px' }}>
 <ChevronLeftIcon style={leftIcon}  onClick={() => { props.onDaysChanged(-1) }} />
 </div>
 &nbsp;&nbsp;&nbsp;

        <Calendar type={'maps'}
          onMapDateChange={props.onMapDateChange}
          calenderMapDate = {props.calenderMapDate}

        />
 &nbsp;&nbsp;&nbsp;
 <div style={{ 'padding':'7px' }}>
  <ChevronRightIcon style={leftIcon}  onClick={() => { props.onDaysChanged(1) }}  />
  </div>


        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
        <Typography variant="subtitle1" className={classes.title1}>
                  TotalWeight : <b>{props.totalWeight} </b> KG
        </Typography>

        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
        <Typography variant="subtitle1" className={classes.title1}>
                          TotalVolume : <b> {props.totalVolume} </b> L
                </Typography>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Typography variant="subtitle1" className={classes.title1}>
                           TotalDistance : <b> {props.totalDistance} </b> Kms
        </Typography>

      </Grid>
      {/* <Grid item xs={4} style={{ display: "flex", alignItems: "baseline" }}>
        <Typography variant="subtitle1" className={classes.title}>
          <span className={classes.title1}>14/18 </span>
          <span className={classes.title}>Scheduled</span>
        </Typography>
        <Typography variant="body1">
          <span className={classes.title1}>638 </span>
          <span className={classes.title}>Working Mins</span>
        </Typography>
        <Typography variant="subtitle1" className={classes.title}>
          <span className={classes.title1}>160.72 </span>
          <span className={classes.title}>Total Kms</span>
        </Typography>
      </Grid>
      <Grid item xs={3} style={{ display: "flex", alignItems: "center" }}>
        <Button
          variant="text"
          classes={{
            label: classes.btnLabel,
          }}
          style={{
            backgroundColor: "#FDD12C",
            textTransform: "none",
            borderRadius: "100px",
            width: 160,
            height: 29,
          }}
        >
          Reoptimize Routes
        </Button>
        <Button
          classes={{ label: classes.btnLabel }}
          style={{
            backgroundColor: "#2c3a3d",
            color: "white",
            textTransform: "none",
            margin: "0 9px",
            height: 29,
            width: 115,
          }}
        >
          Download
          <img style={{ paddingLeft: "4px" }} src={Download} />
        </Button>
        <Button
          classes={{ label: classes.btnLabel }}
          style={{
            backgroundColor: "#2c3a3d",
            color: "white",
            textTransform: "none",
            width: 115,
            height: 29,
          }}
        >
          Close Table
        </Button>
      </Grid> */}
    </Grid>
  );
};

export default TableHeader;
