import React from 'react'
import {Modal, Button} from 'react-bootstrap';
import {withTranslation} from 'react-i18next';
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardHeader,
  TabPane,
  Form, FormGroup,
  Col,
  Container,
  Input,
  Label,
  Row
} from "reactstrap";

import LVSAllocationLotDetail from './LVS_Allocation_LotDetail';


import moment from 'moment';

class LVSToAllocationGlobalTab extends React.Component {

constructor(props)
{
  super(props);
    this.state = {
         lotInfoShow: false,
         lotheader : {},
         lotdetails : [],
         ProductInfo : '',


      }
}


  onLotDetailsClick = (data) => {
      //  const logisticDetails = logisticData;
      console.log("lot inside onlot detail button clicked")
      this.props.getLotDetailsbyProdSite(data.prod);
        this.setState({
            lotInfoShow: true,
            ProductInfo : data,


        });
    }
	
	
	getBgColor = (data) => {

   if( parseFloat(data) > 0){
      return 'lightcoral'
   }
   else {
      return ''
   }
}


addLotInfoIconClose = () =>  {
this.setState({ lotInfoShow : false });
}

    render() {
      console.log("at global tab", this.props.toPickDataList);
       //  let
           return (
          <TabPane className="tripstab" tabId="Global">
          <Card>
                      <CardBody className="pt-1">

                                <Row>
                                   <div className="table-wrapper" style={{ width : "-webkit-fill-available"}}>
                                                              <table className="table table-striped">
                                                                  <thead style={{backgroundColor : "currentColor"}}>
                                                                      <tr className="">
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Product</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Description</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>PickTicket Quantity</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Available Quantity</th>
                                                                           <th className="mb-0 h6 " style={{color : "white"}}>Shortage Quantity</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Allocated Quantity</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Allocated Status</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Current Location </th>

                                                                            <th className="mb-0 h6 " style={{color : "white"}}>Blocked Count</th>
                                                                             <th className="mb-0 h6 " style={{color : "white"}}>Lot Details</th>
                                                                      </tr>
                                                                  </thead>
                                                                    <tbody>
                                                                      {(this.props.toPickDataList && this.props.toPickDataList.length > 0  &&this.props.toPickDataList || []).map((doc, i) => (
                                                                      <tr>
                                                                        <td>{doc.prod}</td>
                                                                        <td>{doc.prodDesc}</td>
                                                                        <td>{doc.toallqty}  {doc.unit}</td>
                                                                        <td>{doc.availqty}  {doc.unit}</td>
                                                                        <td style={{ backgroundColor : this.getBgColor(doc.shortqty)}}>{doc.shortqty}  {doc.unit}</td>
                                                                        <td>{doc.allqty}  {doc.unit}</td>
                                                                     <td>{doc.allstatus}</td>
                                                                     <td>{doc.currloc}</td>
                                                                     <td>{doc.bcount === 2 ? 'Yes' : 'No'}</td>
                                                                     { doc.lotflg === "2" ?
                                                                     <td><Button  color="primary" onClick= {() => this.onLotDetailsClick(doc)} >Details</Button></td>
                                                                      : <td></td>
                                                                      }
                                                                      </tr>
                                                                      ))
                                                                      }

                                                                    </tbody>
                                                              </table>
                                        <LVSAllocationLotDetail
                                                                           show={this.state.lotInfoShow}
                                                                           onHide={this.addLotInfoIconClose}
                                                                           data={this.state.lotheader}
                                                                           prodData = {this.state.ProductInfo}
                                                                           detailsData={this.state.lotdetails}
                                                                           toLogDataList = {this.props.toLogDataList}

                                                                       ></LVSAllocationLotDetail>
                                   </div>
                                </Row>

                                          </CardBody>
                      </Card>
                      </TabPane>


                );
        }

}
export default LVSToAllocationGlobalTab;