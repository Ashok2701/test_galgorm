import React from 'react'
import {Modal, Button} from 'react-bootstrap';
import {withTranslation} from 'react-i18next';
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardHeader,
  Form, FormGroup,
  Col,
  Container,
  Input,
  Label,
  Row
} from "reactstrap";


import moment from 'moment';

class LVSToPickDetail extends React.Component {

constructor(props)
{
  super(props);
}



    render() {
                console.log("To Pick data  =", this.props.toPickDataList)
           return (
              <Modal className="LvsModalscreen"
                     {...this.props}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                   <Modal.Header style={{backgroundColor : "currentColor"}}>
                                                   <Modal.Title className="h4 mb-0" style={{ color : "#fff"}} >
                                                        Picking By Route
                                                   </Modal.Title>
                                               </Modal.Header>
                    <Modal.Body style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto', backgroundColor : "whitesmoke"}}>
<Row>
        <Col sm='12'>
          <Form >
          <Card>
                      <CardBody className="pt-1">
                                      <Row>
                                        <Col md='4' sm='12'>
                                          <FormGroup>
                                            <Label >Vehicle Routing</Label>
                                           <Input
                                                                                        name='concode'
                                                                                        id='concode'
                                                                                        value={this.props.vrdata && this.props.vrdata.xnumpc}
                                                                                        disabled={true}
                                                                                      />
                                          </FormGroup>
                                        </Col>
                                        <Col md='4' sm='12'>
                                          <FormGroup>
                                            <Label>Delivery Date</Label>
                                             <Input
                                                                    name='concode'
                                                                    id='concode'
                                                                    value={this.props.vrdata && moment(this.props.vrdata.datliv).format('MM/DD/YYYY')}
                                                                    disabled={true}
                                                                  />
                                          </FormGroup>
                                        </Col>
                                        <Col md='4' sm='12'>
                                                            <FormGroup>
                                                              <Label>Site</Label>
                                                               <Input
                                                                                      name='concode'
                                                                                      id='concode'
                                                                                      value={this.props.vrdata && this.props.vrdata.fcy}
                                                                                      disabled={true}
                                                                                    />
                                                            </FormGroup>
                                                          </Col>
                                        <Col md='4' sm='12'>
                                          <FormGroup>
                                            <Label >Vehicle</Label>
                                            <Input
                                              name='concode'
                                              id='concode'
                                              value={this.props.vrdata && this.props.vrdata.codeyve}
                                              disabled={true}
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>
                                              <Row>
                                                           <Col md="6" className="d-flex align-items-center">
                                                             <CardTitle className="h4 mb-0 text-primary">
                                                               Route Details
                                                             </CardTitle>
                                                           </Col>
                                </Row>
                                <br />
                                <Row>
                                   <div className="tablheight" style={{ width : "-webkit-fill-available"}}>
                                                              <table className="table table-striped m-0 tablewidth1200">
                                                                  <thead style={{backgroundColor : "currentColor"}}>
                                                                      <tr className="">
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>PickTicket Number</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Customer</th>
                                                                           <th className="mb-0 h6 " style={{color : "white"}}>Customer Name</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Product</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Description</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Quantity to Allocate</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Available Quantity</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Allocated Quantity</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Allocated Status</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Shortage Quantity</th>
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
                                                                        <td>{doc.children[4].value}</td>
                                                                        <td>{doc.children[5].value}</td>
                                                                        <td>{doc.children[6].value}</td>
                                                                        <td>{doc.children[8].value}</td>
                                                                     <td>{doc.children[7].value}</td>
                                                                      </tr>
                                                                      ))
                                                                      }

                                                                    </tbody>
                                                              </table>
                                   </div>
                                </Row>

                                          </CardBody>
                      </Card>
                      </Form>
                                          </Col>
                      </Row>
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor : "whitesmoke"}}>
                      <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                );
        }

}
export default LVSToPickDetail;