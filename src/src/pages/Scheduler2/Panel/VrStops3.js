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
            case 1: return (<span class='badge badge-primary text-uppercase' >To Plan</span>);
            case 2: return (<span class='badge badge-warning text-uppercase' >Scheduled</span>);
            case 3: return (<span class='badge badge-warning text-uppercase' >On the Way</span>);
            case 8: return (<span class='badge badge-success text-uppercase' >Completed</span>);
            case 5: return (<span class='badge badge-info text-uppercase' >Skipped</span>);
            case 6: return (<span class='badge badge-primary text-uppercase' >Re-Scheduled</span>);
            case 7: return (<span class='badge badge-dark text-uppercase' >Cancelled</span>);
            case 4: return (<span class='badge badge-info text-uppercase' >In-Progress</span>);
            default: return (<span class='badge badge-primary text-uppercase' >default</span>);
        }

    }

        GetPickTicketStatus = (x, doctype) => {

          if(doctype == "4") {
            switch (x) {
                case '1': return ("In Process");
                case '2': return ("Delivarable");
                case '3': return ("Delivered");
                case '4': return ("Cancelled");
            }
            }
            else {
               return  'NA';
            }
        }

          displayBadge = (type, iSeq) => {
                const docmvt = type
                const Seq = iSeq ;
                if (docmvt == '4') {
                    return (
                        <h5>
                            <td width="3%" class='priority'><span class='badge badge-primary text-uppercase'>{Seq}</span></td>
                        </h5>
                    );
                }
                if (docmvt == '1') {
                    return (
                        <h5>
                            <td width="3%" class='priority'><span class='badge badge-success '>{Seq}</span></td>
                        </h5>
                    );
                }
                if (docmvt == '2') {
                    return (
                        <h5>
                            <td width="3%" class='priority'><span class='badge badge-warning text-uppercase'>{Seq}</span></td>
                        </h5>
                    );
                }
                else{
                                    return (
                                        <h5>
                                            <td width="3%" class='priority'><span class='badge badge-success '>{Seq}</span></td>
                                        </h5>
                                    );
                                }
            }

                 documentBadgeLink = (docno, dtype) => {
                              const docmvt = dtype;
                              let url, content;

                              if (docmvt == '4') {
                                   url = "http://tmsx3.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSDEVN/$sessions?f=GESSRE/2//M/"+docno;
                                                       // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
                                                   return (
                                                            <a href={url} target='_blank' >{docno}  </a>
                                   );
                              }
                              if (docmvt == '1') {

                                       url = "http://tmsx3.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSDEVN/$sessions?f=GESSRE/2//M/"+docno;
                                      // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
                                  return (
                                           <a href={url} target='_blank' >{docno} </a>
                                  );
                              }
                              if (docmvt == '2') {
                                   url = "http://tmsx3.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSDEVN/$sessions?f=GESSRE/2/M//"+docno;
                                                       // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
                                                   return (
                                                            <a href={url} target='_blank' >{docno} </a>
                                                   );
                              }
                             else {
                                                     url = "http://tmsx3.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSDEVN/$sessions?f=GESSRE/2/M//"+docno;
                                                                         // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
                                                                     return (
                                                                              <a href={url} target='_blank' >{docno} </a>
                                                                     );
                                                }
                          }




    render() {
        var lang = localStorage.getItem("lng");
        var trip = this.props.tripdetails;
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
                                        <th className="mb-0 h6 text-primary"> {this.props.t('Seq')}</th>
                                        <th className="mb-0 h6 text-primary">{this.props.t('Servie Request')}</th>
                                        <th className="mb-0 h6 text-primary">{this.props.t('Status')}</th>
                                        <th className="mb-0 h6 text-primary" style={{'width':'120px'}} >{this.props.t('Arrival_Date')}<br /> {this.props.t('Time')}</th>
                                        <th className="mb-0 h6 text-primary" style={{'width':'120px'}}>{this.props.t('DepartureDate')}<br /> {this.props.t('Time')}</th>
                                        <th className="mb-0 h6 text-primary">{this.props.t('Client Code')}</th>
                                        <th className="mb-0 h6 text-primary">{this.props.t('Client')}</th>
                                        <th className="mb-0 h6 text-primary">{this.props.t('City')}</th>
                                        </tr>
                                </thead>
                                <tbody>
                                    {trip.lock ?
                                        (this.props.vedetail || []).map((doc, i) => (
                                            <tr class="bg-blue" key={i}>
                                                <td ></td>
                                                <td><span className="LS-default">{this.displayBadge(doc.xdoctyp , i+1)}</span></td>
                                                <td>{this.documentBadgeLink(doc.sdhnum, doc.xdoctyp)}</td>

                                                <td >{this.GetDeliveryStatus(doc.status)}</td>
                                                <td>{moment(doc.shipDate).format('YYYY-MM-DD')}<br /> <small>{doc.xeta}</small> </td>
                                                <td>{moment(doc.dlvDate).format('YYYY-MM-DD')} <br /> <small>{doc.xetd}</small></td>
                                                 <td>{doc.bpcord}</td>
                                                <td>{doc.bprnam}</td>
                                                <td>{doc.cty}</td>

                                            </tr>
                                        )) :
                                        trip && trip.totalObject && trip.totalObject.selectedTripData &&
                                        trip.totalObject.selectedTripData.map((doc, i) => {

                                            return (
                                                <tr class="bg-blue" key={i}>
                                                    <td ></td>
                                                    <td><span className="LS-default">{i + 2}</span></td>
                                                    <td>{doc.docnum}</td>
                                                    <td>-</td>
                                                    <td>{moment(doc.docdate).format('YYYY-MM-DD')}<br /> <small>{doc.arrival}</small> </td>
                                                    <td>{moment(doc.docdate).format('YYYY-MM-DD')} <br /> <small>{doc.end}</small></td>
                                                    <td>{doc.serTime}</td>
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