import React from 'react';
import moment from 'moment';
import mockData from './VRDetailMockData.json';
import { withNamespaces } from 'react-i18next';
import ProductsComboList from './ProductsComboList';
import ReactToPrint from "react-to-print";
import ComponentToPrint from './ComponentToPrint';
import { convertHrToSec, formatTime, nullAndNanChecking } from '../converterFunctions/converterFunctions';
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
function GetDeliveryStatus22(x) {
    switch (x) {
        case 1: return 'RailCar Loaded';
        case 2: return 'On the Way';
        case 3: return 'In-progress';
        case 4: return 'Completed';
        case 5: return 'Skipped';
        case 6: return 'Re-Scheduled';
        case 7: return 'Cancelled';
        case 8: return 'To-Plan';
        default: return '';
    }
}

class VrStops3 extends React.Component {

   constructor(props) {
            super(props);
            this.state = {
              ShowDetailList : false,
              prodDatalist : [],
              ShowCompoentToPrint : false

            }
            }

    GetDeliveryStatus = (x) => {

        switch (x) {
            case '1': return ("RailCar Loaded");
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

     documentBadgeLink = (docno) => {
                  let url, content;

                       url = "https://tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/DEMOTMSFR/$sessions?f=GESSDH/2//M/"+docno;
                                           // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
                                       return (
                                                <a target="_blank" href={url}>{docno}</a>
                       );
                  }






        onDetailList = () => {
            this.setState({
                ShowDetailList: true,
               // prodDatalist: this.props.geoData
            });
        }



    render() {
        var lang = localStorage.getItem("i18nextLng");
        var trip = this.props.tripdetails;
        
        let distunts = "Miles";
        let Productlist_win_Close = () => this.setState({ ShowDetailList: false });
         let print_win_Close = () => this.setState({ ShowCompoentToPrint: false });

        /*
        if (lang == "en") {
            distunts = 'Kms';
        }
        else {
            distunts = 'Kms';
        }
        */

        return (
         <Card>
          <CardTitle className="float-left h4 mb-0 pt-2" style={{'color':'#5664d2', 'paddingLeft': '20px'}}>
                                          Transactions
                                        </CardTitle>
                             <CardBody className="p-2">


                        <div className="tablheight1">
                            <table className="table table-striped m-0 tablewidth1200" id="dtHorizontalVerticalExample">
                                <thead>
                                    <tr className="">

                                        <th>{this.props.t('DocNum')}</th>
                                        <th>{this.props.t('Status')}</th>
                                        <th>{this.props.t('Client Code')}</th>
                                        <th>{this.props.t('Client')}</th>
                                        <th>{this.props.t('City')}</th>
                                        <th width="150px"></th>
                                        <th width="150px"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {trip.lock ?
                                       (this.props.vedetail && this.props.vedetail || []).map((doc, i) => (
                                            <tr class="bg-blue" key={i}>

                                                <td>{this.documentBadgeLink(doc.sdhnum)}</td>
                                                <td>{this.GetDeliveryStatus(doc.xdlv_status)}</td>
                                                <td>{doc.bpcord}</td>
                                                <td>{doc.bprnam}</td>
                                                <td>{doc.cty}</td>
                                                <td >
                                                <ReactToPrint
                                                          trigger={() => {
                                                            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                                                            // to the root node of the returned component as it will be overwritten.
                                                            return <Button
                                                                                                                                                                              color="success"
                                                                                                                                                                              type="button"
                                                                                                                                                                              size="lg"
                                                                                                                                                                              className="waves-effect waves-light mr-1"
                                                                                                                                                                            >
                                                                                                                                                                              Print BOL
                                                                                                                                                                            </Button>;
                                                          }}
                                                          content={() => this.componentRef}
                                                        />
                                                        <div style={{ display: "none" }}>
                                                             <ComponentToPrint ref={(el) => (this.componentRef = el)}
                                                              comboData={this.props.comboData}
                                                              boldata = {this.props.boldata}

                                                             />
                                                          </div>

                                                </td>
                                                <td >
                                                     <Button
                                                                                                           color="info"
                                                                                                           type="button"
                                                                                                           size="lg"
                                                                                                           className="waves-effect waves-light mr-1"
                                                                                                           onClick={this.onDetailList}
                                                                                                         >
                                                                                                           Details
                                                                                                         </Button>
                                                </td>

                                            </tr>
                                        )) :

                                         trip && trip.totalObject && trip.totalObject.selectedTripData &&
                                                                                 trip.totalObject.selectedTripData.map((doc, i) => {
                                                                                     
                                                                                     return (
                                                        <tr class="bg-blue" key={i}>

                                                                                                       <td>{doc.docnum}</td>
                                                                                                       <td></td>
                                                                                                       <td>{doc.bpcode}</td>
                                                                                                       <td>{doc.bpname}</td>
                                                                                                       <td>{doc.city}</td>
                                                                                                       <td ><Button
                                                                                                                                                                  color="success"
                                                                                                                                                                  type="button"
                                                                                                                                                                  size="lg"
                                                                                                                                                                  className="waves-effect waves-light mr-1"
                                                                                                                                                                >
                                                                                                                                                                  Print BOL
                                                                                                                                                                </Button>
                                                                                                       </td>
                                                                                                       <td >
                                                                                                            <Button
                                                                                                                                                                  color="info"
                                                                                                                                                                  type="button"
                                                                                                                                                                  size="lg"
                                                                                                                                                                  className="waves-effect waves-light mr-1"
                                                                                                                                                                  onClick={this.onDetailList}
                                                                                                                                                                >
                                                                                                                                                                  Details
                                                                                                                                                                </Button>
                                                                                                       </td>

                                                                                                   </tr>
                                                  )

                                         })}
                                       </tbody>
                            </table>
                             <ProductsComboList
                                                                        show={this.state.ShowDetailList}
                                                                        onHide={Productlist_win_Close}
                                                                        comboData={this.props.comboData}
                                                                        vehiclePanel={this.props.vehiclePanel}

                                                                    ></ProductsComboList>
                             <ComponentToPrint
                                                                                           comboData={this.props.comboData}
                                                                                           boldata = {this.props.boldata}

                                                                                          />


                        </div>

                    </CardBody>
                </Card>

        );
    }
}

export default withNamespaces()(VrStops3);