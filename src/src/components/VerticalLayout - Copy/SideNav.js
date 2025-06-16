import React, { Component } from "react";
import Select from "react-select";
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
            this.state = {
                 sites: null,
                 selectedMultipleSites : '',
                    selectedSite: {
                               id: 'All'
                             },

                       selectedSiteValue: '',
                       selectedSitesArr : [],
                       SeletedDate : localStorage.getItem("Date")
              };
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


    onDateselection = (date) => {
     
     const Seldate = moment(date[0]).format('YYYY-MM-DD');
     
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
              <div className="siteDate_Header">
                                         <FormGroup className=" ml-18 float-left" style={{marginLeft : "270px"}}>
                                                                  <MultiSelect
                                                                     setSelectedSites={this.setSelectedSites}
                                                                     selectedSitesArr={this.selectedSitesArr}
                                                                     options={optionItems} />

                                                                  </FormGroup>

                                                                  <FormGroup className="col-md-3 col-lg-3 col-xl-2 float-left">
                                                                    <span>Date </span>

                                                                    <Flatpickr
                                                                      className="form-control"
                                                                      dateformat= "Y-m-d"
                                                                      value={this.props.SeletedDate}
                                                                      onChange={this.onDateselection}
                                                                    />
                                                                  </FormGroup>
                                  </div>
                                  );
    }
}

export default  withNamespaces()(SideNav);