import React, { Component } from "react";
import Select from "react-select";
import "flatpickr/dist/themes/material_green.css";
import MultiSelect from './MultiSelect';
import Flatpickr from "react-flatpickr";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import SyncRoundedIcon from '@material-ui/icons/SyncRounded';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import RouteScheduler from './RouteScheduler';

import moment from 'moment';
import {
  Container,
  Row,
  FormGroup,
  Form
} from "reactstrap";
//import Info from './Info';


class SideNav extends React.Component {

    constructor(props) {
        super(props);
        this.onTagsChange = this.onTagsChange.bind(this);
    }

   setSelectedSites = (val) => {
          this.props.handleSiteChange(val);
      }

      selectedSitesArr = (val) => {
          this.props.sitesArr(val);
      }

    onTagsChange = (event, value) => {
        //this.props.handleSiteChange(value);
    }
    getRouteScheduler = (routesSchedule) => {
        this.props.getValuestoApp(routesSchedule)
    }


    onDateselection = (date) => {
     console.log("T11 inside dateselection",date);
     const Seldate = moment(date[0]).format('YYYY-MM-DD');
     console.log("T11 inside dateselection",Seldate);
         this.props.handleDateChange(Seldate);
    }



    render() {
        let optionItems = [];
        var optionSelected = {};
        var selectedSite = {};
        var placeHolder = "All";

        this.props.sites && this.props.sites.length > 0 && this.props.sites.map((site) => {
            if (site.id == this.props.selectedSite) {
                selectedSite = site;
                placeHolder = site.value;
                optionSelected.value = site.id;
                optionSelected.label = (site.value + "(" + site.id + ")");
            }
            optionItems.push({ value: site.id, label: (site.value + "(" + site.id + ")") })



        });
        return (
             <>
                <Form className="row" >
                              <FormGroup className="select2-container mb-0 col-md-3 col-lg-3 col-xl-2">
                              <MultiSelect
                                 setSelectedSites={this.setSelectedSites}
                                 selectedSitesArr={this.selectedSitesArr}
                                 options={optionItems} />

                              </FormGroup>

                              <FormGroup className="p-3 ml-5 col-md-3 col-lg-3 col-xl-2">
                                <span>Date </span>

                                <Flatpickr
                                  className="form-control"
                                  dateformat= "Y-m-d"
                                  value={this.props.selectedDate}
                                  onChange={this.onDateselection}
                                />
                              </FormGroup>
                              &emsp;
                              <div className="refreshbtn">

                              <Tooltip title="Refresh">
                               <SyncRoundedIcon color="primary" style={{fontSize:"28"}} onClick = {() => this.props.refreshAllPanels() }/>
                              </Tooltip>
                              </div>
                              <div style={{ display: this.props.vrShow}}>
                              <ul className="list-unstyled CTAs">
                                                      <li>
                                                          <button type="button"
                                                             class="btn btn-warning"
                                                              style={{ display: this.props.vrShow }}
                                                              onClick={() => this.props.onVRhide()}>
                                                              <span>Back</span>
                                                          </button>
                                                      </li>
                                                  </ul>
                              </div>
                              <div>
                               {(() => {
                                                  if (Object.keys(this.props.guageTrip).length > 0) {
                                                      return (
                                                          <div style={{
                                                              width: "60%",
                                                              height: "60px",


                                                          }}>

                              <RouteScheduler
                                                               getValues={(routesSchedule,optiindex, auto) => this.getRouteScheduler(routesSchedule, optiindex, auto)}
                                                               selectedSite={selectedSite}
                                                               data={this.props.guageTrip}
                                                               tripsPanel={this.props.tripsPanel}
                                                               vehiclePanel={this.props.vehiclePanel}
                                                               sites={this.props.sites}
                                                               date={this.props.selectedDate}
                                                            />
                                                             </div>
                                                                 );
                                                                                }
                                                                            })()}
                            </div>
                            </Form>

            </>
        );
    }
}

export default  SideNav;