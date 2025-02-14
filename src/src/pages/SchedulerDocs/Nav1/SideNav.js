import React, { Component } from "react";
import Select from './Select';
import "flatpickr/dist/themes/material_green.css";
import MultiSelect from './MultiSelect';
import { withNamespaces } from "react-i18next";
import Flatpickr from "react-flatpickr";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import SyncRoundedIcon from '@material-ui/icons/SyncRounded';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

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


   groupByHandleChange = (val) => {
      console.log("value =",val);
       this.props.OnGroupByChange(val);
    }


 depalnify = ()=>{

     this.props.submit();
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
                <Form className="row" style={{height:"80px"}} >
                              <FormGroup className="select2-container mb-0 col-md-3 col-lg-3 col-xl-2">
                              <MultiSelect
                                 setSelectedSites={this.setSelectedSites}
                                 selectedSitesArr={this.selectedSitesArr}
                                 options={optionItems} />

                              </FormGroup>

                              <FormGroup className="p-3 ml-5 col-md-3 col-lg-3 col-xl-2">

                                <Select
                                 Groupby = {this.groupByHandleChange}
                                />

                              </FormGroup>
                              &emsp;
                              <div className="refreshbtn" style={{ display: this.props.vehicleShow}}>

                              <Tooltip title="Refresh">
                               <SyncRoundedIcon color="primary" style={{fontSize:"28"}} onClick = {() => this.props.refreshAllPanels() }/>
                              </Tooltip>
                              </div>

                               <div
                                            style={{

                                              display: "inline-block",
                                              paddingLeft: "100px",
                                              float: "right",
                                              paddingRight : "100px",
                                            }}
                                          >
                                           <button size="sm" type="button" class="btn btn-warning  ml-3">CHANGEMENT SITE</button>
                                           <button type="button" class="btn btn-secondary  ml-3">CHANGE MOD LIV</button>

                                           <button type="button" class="btn btn-info  ml-3" onClick={this.depalnify}>DEPLANIFIER</button>
                                           <button type="button" class="btn btn-light ml-3 ">REGROUPER</button>

                                           <button type="button" class="btn btn-success  ml-3">OPTIMISER</button>
                                           <button type="button" class="btn btn-primary ml-3 ">VALIDER</button>

                                          </div>


                            </Form>

            </>
        );
    }
}

export default  withNamespaces()(SideNav);