import React from 'react';
import moment from 'moment';
import { withNamespaces } from 'react-i18next';
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
        case 1: return 'Scheduled';
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

    render() {
        var lang = localStorage.getItem("lng");
        var trip = this.props.tripdetails;
        console.log("trip", trip)
        console.log("this.props.vedetail", this.props.vedetail)
        let distunts;
        /*
        if (lang == "en") {
            distunts = 'Kms';
        }
        else {
            distunts = 'Kms';
        }
        */
        if(this.props.sites && this.props.sites.length > 0) {
         this.props.sites.map((site) => {
                     if (trip.depSite === site.id) {
                         console.log("2 site matched");
                          distunts = site.distunit;
                         }
                })
                }


        return (
         <Card>
          <CardTitle className="float-left h4 mb-0 pt-2" style={{'color':'#5664d2', 'paddingLeft': '20px'}}>
                                          Transactions
                                        </CardTitle>
                             <CardBody className="p-2">


                        <div className="tablheight">
                            <table className="table table-striped m-0 tablewidth1200" id="dtHorizontalVerticalExample">
                                <thead>
                                    <tr className="">
                                        <th></th>
                                        <th> {this.props.t('Seq')}</th>
                                        <th>{this.props.t('DocNum')}</th>
                                        <th>{this.props.t('Site')}</th>
                                        <th>{this.props.t('Status')}</th>
                                        <th style={{'width':'120px'}} >{this.props.t('Arrival_Date')}<br /> {this.props.t('Time')}</th>
                                        <th style={{'width':'120px'}}>{this.props.t('DepartureDate')}<br /> {this.props.t('Time')}</th>
                                        <th>{this.props.t('ServiceTime')}</th>
                                        <th>Adresse</th>
                                        <th>{this.props.t('Client Code')}</th>
                                        <th>{this.props.t('Client')}</th>
                                        <th>{this.props.t('City')}</th>
                                        <th>{this.props.t('FromPrevDistance')}</th>
                                        <th>{this.props.t('FromPrevTravelTime')}</th>
                                        <th>{this.props.t('WaitingTime')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {trip.lock ?
                                        (this.props.vedetail || []).map((doc, i) => (
                                            <tr class="bg-blue" key={i}>
                                                <td ></td>
                                                <td><span className="LS-default">{doc.sequence}</span></td>
                                                <td>{doc.sdhnum}</td>
                                                <td>{doc.xdocSite}</td>
                                                <td>{this.GetDeliveryStatus(doc.xdlv_status)}</td>
                                                <td>{moment(doc.arrivedate).format('YYYY-MM-DD')}<br /> <small>{doc.arvtime}</small> </td>
                                                <td>{moment(doc.departdate).format('YYYY-MM-DD')} <br /> <small>{doc.departtime}</small></td>
                                                <td>{doc.servicetim}</td>
                                                <td>{doc.adresname}</td>
                                                <td>{doc.bpcord}</td>
                                                <td>{doc.bprnam}</td>
                                                <td>{doc.cty}</td>
                                                <td>{Math.round(doc.fromprevDist) + ' ' + distunts}</td>
                                                <td>{formatTime(convertHrToSec(doc.fromprevTra))}</td>
                                                <td>{formatTime(convertHrToSec(doc.ywaitTime))}</td>
                                            </tr>
                                        )) :
                                        trip && trip.totalObject && trip.totalObject.selectedTripData &&
                                        trip.totalObject.selectedTripData.map((doc, i) => {
                                            console.log("doccccc", doc)
                                            return (
                                                <tr class="bg-blue" key={i}>
                                                    <td ></td>
                                                    <td><span className="LS-default">{i + 2}</span></td>
                                                    <td>{doc.docnum}</td>
                                                    <td>{doc.site}</td>
                                                    <td></td>
                                                    <td>{moment(doc.docdate).format('YYYY-MM-DD')}<br /> <small>{doc.arrival}</small> </td>
                                                    <td>{moment(doc.docdate).format('YYYY-MM-DD')} <br /> <small>{doc.end}</small></td>
                                                    <td>{doc.serTime}</td>
                                                    <td>{doc.adresname}</td>
                                                    <td>{doc.bpcode}</td>
                                                    <td>{doc.bpname}</td>
                                                    <td>{doc.cty}</td>
                                                    <td>{Math.round(doc.distance) + ' ' + distunts}</td>
                                                    <td>{formatTime(convertHrToSec(doc.time))}</td>
                                                    <td>{formatTime(convertHrToSec(doc.waitingTime))}</td>
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>

        );
    }
}

export default withNamespaces()(VrStops3);