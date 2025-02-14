import React, { Component } from "react";
import moment from 'moment';
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
} from "reactstrap";
import { MDBDataTable } from "mdbreact";
import { withNamespaces } from 'react-i18next';
import classnames from "classnames";


class VrStops extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addInfoShow: false,
      speciality: '',

     columnDefs: [
             {
               label: "Seq",
               field: "sequence",
               width: 50,
             },
             {
               label: "Document Number",
               field: "sdhnum",
               width: 210,
             },
             {
               label: "Site",
               field: "xdocSite",
               width: 80,
             },
             {
               label: "Status",
               field: "xdlv_status",
               width: 150,
             },
             {
               label: "Arrival Date Time",
               field:"arrivedate",
               width: 170,

             },
             {
               label: "Depart Date Time",
               field: "departdate",
               width: 160,
              },
             {
               label: "Service Time",
               field: "servicetim",
               width: 130,
             },
             {
               label: "Client Code",
               field: "bpcord",
               width: 120,
             },
             {
               label: "Client",
               field: "bprnam",
               width: 150,
             },
             {
               label: "City",
               field: "cty",
               width: 130,
             },
             {
               label: "FromPrevDistance",
               field: "fromprevDist",
               width: 170,
             },
             {
               label: "FromPrevTravelTime",
               field: "fromprevTra",
               width: 180,
             },
             {
               label: "Waiting Time",
               field: "ywaitTime",
               width: 160,
             },
           ],
    };
  }

    GetDeliveryStatus = (x) => {

          switch (x) {
              case '1': return ("Scheduled");
              case '2': return ("On the Way");
              case '3': return ("In-progress");
              case '4': return ("Completed");
              case '5': return ("Skipped");
              case '6': return ("Re-Scheduled");
              case '7': return ("Cancelled");
              case '8': return ("To-Plan");
              default: return ("default");
          }
      }


  render(){
    var lang = localStorage.getItem("lng");
        var trip = this.props.tripdetails;
        console.log("trip", trip)
        console.log("this.props.vedetail", this.props.vedetail)
        let distunts;
        if (lang == "en") {
            distunts = 'Kms';
        }
        else {
            distunts = 'Kms';
        }
     const  defaultColDef = {sortable:true}
      const vehiclesList = this.props.vedetail;
const data = {
     columns :  this.state.columnDefs,
     rows : vehiclesList

 }

     return(

                   <Card>
                     <CardBody className="p-2">
                       <CardTitle className="float-left h4 mb-0 pt-2">
                         Transactions
                       </CardTitle>
                       <MDBDataTable
                         scrollY
                         hover
                         striped
                         maxHeight="200px"
                         paging={false}
                         sortable={false}
                         data = {data}
                       />
                     </CardBody>
                   </Card>
     );
  }

}

export default withNamespaces()(VrStops);