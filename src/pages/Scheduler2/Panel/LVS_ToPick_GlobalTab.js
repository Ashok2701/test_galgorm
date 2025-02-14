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


import moment from 'moment';

class LVSToPickGlobalTab extends React.Component {

constructor(props)
{
  super(props);
}



    render() {
       console.log("at global tab", this.props.toPickDataList);
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

                                                                      </tr>
                                                                  </thead>
                                                                    <tbody>
                                                                      {(this.props.toPickDataList && this.props.toPickDataList.length > 0  &&this.props.toPickDataList || []).map((doc, i) => (
                                                                      <tr>
                                                                        <td>{doc.prod}</td>
                                                                        <td>{doc.prodDesc}</td>
                                                                        <td>{doc.toallqty} {doc.unit}</td>
                                                                        <td>{doc.availqty}   {doc.unit}</td>
                                                                        <td>{doc.shortqty}  {doc.unit}</td>
                                                                        <td>{doc.allqty}   {doc.unit}</td>
                                                                     <td>{doc.allstatus}</td>
                                                                     <td>{doc.currloc}</td>
                                                                      <td>{doc.bcount === 2 ? 'Yes' : 'No'}</td>
                                                                      </tr>
                                                                      ))
                                                                      }

                                                                    </tbody>
                                                              </table>
                                   </div>
                                </Row>

                                          </CardBody>
                      </Card>
                      </TabPane>


                );
        }

}
export default LVSToPickGlobalTab;