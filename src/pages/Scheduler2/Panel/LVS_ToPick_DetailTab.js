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

class LVSToPickDetailTab extends React.Component {

constructor(props)
{
  super(props);
}



    render() {
                console.log("To Pick data  =", this.props.toPickDataList)
           return (
          <TabPane className="tripstab" tabId="Detailed">
          <Card>
                      <CardBody className="pt-1">

                                <Row>
                                   <div className="table-wrapper" style={{ width : "-webkit-fill-available"}}>
                                                              <table className="table table-striped">
                                                                  <thead style={{backgroundColor : "currentColor"}}>
                                                                      <tr className="">
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>PickTicket Number</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Customer</th>
                                                                           <th className="mb-0 h6 " style={{color : "white"}}>Customer Name</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Product</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Description</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>PickTicket Quantity</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Available Quantity</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Allocated Quantity</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Shortage Quantity</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Allocated Status</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Current Location </th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Blocked Count </th>
                                                                      </tr>
                                                                  </thead>
                                                                    <tbody>
                                                                      {(this.props.toPickDataList && this.props.toPickDataList.length > 0  &&this.props.toPickDataList || []).map((doc, i) => (
                                                                      <tr>
                                                                        <td>{doc.children[0].value}</td>
                                                                         <td>{doc.children[1].value}</td>
                                                                         <td>{doc.children[9].value}</td>
                                                                        <td>{doc.children[2].value}</td>
                                                                        <td>{doc.children[3].value}</td>
                                                                        <td>{doc.children[4].value}  {doc.children[10].value}</td>
                                                                        <td>{doc.children[5].value} {doc.children[10].value}</td>
                                                                        <td>{doc.children[6].value} {doc.children[10].value}</td>
                                                                     <td>{doc.children[7].value} {doc.children[10].value}</td>
                                                                     <td>{doc.children[8].value} </td>
                                                                     <td>{doc.children[12].value}</td>
                                                                     <td>{doc.children[11].value === 2 ? 'Yes' : 'No'}</td>
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
export default LVSToPickDetailTab;