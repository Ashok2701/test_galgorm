import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import Calendar from "./Calendar";
import Typography from "@material-ui/core/Typography";
import Tablesearch from "./Tablesearch";
import Download from "../Images/Download.svg";
import Grid from "@material-ui/core/Grid";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SelectSite from "./SelectSite";
import MultiSelect from "./MultiSelect";

const useStyles = (theme) => ({
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
  leftIcon : {

        top: 22,
        backgroundColor: '#ffffff',
        borderRadius: '100%',
        fontSize: 24,
        color: 'black',
        padding : '1px'
    }


});



class TableHeader extends Component  {
   constructor(props) {
      super(props);
	  }



 setSelectedSites = (val) => {
       console.log("selected sites are",val);
        this.props.handleSiteChange(val);
    }

  selectedSitesArr = (val) => {
     console.log("selectedSitesArr sites are",val);
        this.props.sitesArr(val);
    }



 render() {
 console.log("table header",this.props.selectedSite);
  const { classes } = this.props;
   let optionItems = [];
        var optionSelected = {};
        var selectedSite = {};
        var placeHolder = "All";


            var optionSelected = {};
            var selectedSite = {};
            var placeHolder = "All";
            console.log("inside useEffect",this.props.sitelist);
            this.props.sitelist && this.props.sitelist.length > 0 && this.props.sitelist.map((site) => {
                if (site.id == this.props.selectedSite) {
                    selectedSite = site;
                    placeHolder = site.value;
                    optionSelected.value = site.id;
                    optionSelected.label = (site.value + "(" + site.id + ")");
                }
                optionItems.push({ value: site.id, label: (site.value + "(" + site.id + ")") })
            });
      console.log("inside useEffect - optionItems",optionItems);


  return (
    <Grid
      container

      // justify="space-around"
      // alignItems="center"
      style={{ backgroundColor: "#424B4D", height: "70px", width: "auto" }}
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
                                          setSelectedSites={this.setSelectedSites}
                                          selectedSitesArr={this.selectedSitesArr}
                                          options={optionItems}
                                          defaultSelected = {this.props.selectedSite}
                                      />


  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
  <div style={{ 'padding':'7px' }}>
 <ChevronLeftIcon className={classes.leftIcon}  onClick={() => { this.props.onDaysChanged(-1) }} />
 </div>
 &nbsp;&nbsp;&nbsp;

        <Calendar type={'maps'}
          onMapDateChange={this.props.onMapDateChange}
          calenderMapDate = {this.props.calenderMapDate}

        />
 &nbsp;&nbsp;&nbsp;
 <div style={{ 'padding':'7px' }}>
  <ChevronRightIcon className={classes.leftIcon}  onClick={() => { this.props.onDaysChanged(1) }}  />
  </div>


        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
        <Typography variant="subtitle1" className={classes.title1}>
                  Total Weight : <b>{this.props.totalWeight} </b> KG
        </Typography>

        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
        <Typography variant="subtitle1" className={classes.title1}>
                          Total Volume : <b> {this.props.totalVolume} </b> L
                </Typography>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Typography variant="subtitle1" className={classes.title1}>
                           Total Distance : <b> {this.props.totalDistance} </b> Kms
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
}
}

export default withStyles(useStyles)(TableHeader);
