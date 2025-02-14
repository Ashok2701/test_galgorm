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

class LVSAllocationLotDetail extends React.Component {

constructor(props)
{
  super(props);
}



    render() {
               console.log("To Pick data  =", this.props.toLogDataList)
           return (
              <Modal className="LvsModalscreen"
                     {...this.props}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                   <Modal.Header style={{backgroundColor : "currentColor"}}>
                                                   <Modal.Title className="h4 mb-0" style={{ color : "#fff"}} >
                                                        Lot Information
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
                                            <Label >Product</Label>
                                           <Input
                                                                                        name='concode'
                                                                                        id='concode'
                                                                                        value={this.props.prodData && this.props.prodData.prod}
                                                                                        disabled={true}
                                                                                      />
                                          </FormGroup>
                                        </Col>
                                        <Col md='4' sm='12'>
                                          <FormGroup>
                                            <Label>Description</Label>
                                             <Input
                                                                    name='concode'
                                                                    id='concode'
                                                                    value={this.props.prodData && this.props.prodData.prodDesc}
                                                                    disabled={true}
                                                                  />
                                          </FormGroup>
                                        </Col>
                                        <Col md='4' sm='12'>
                                                            <FormGroup>
                                                              <Label>Quantity to Allocate</Label>
                                                               <Input
                                                                                      name='concode'
                                                                                      id='concode'
                                                                                       value={this.props.prodData && this.props.prodData.toallqty +" " +this.props.prodData.unit}
                                                                                      disabled={true}

                                                                                    />
                                                            </FormGroup>
                                                          </Col>
                                      </Row>
                                              <Row>
                                                           <Col md="6" className="d-flex align-items-center">
                                                             <CardTitle className="h4 mb-0 text-primary">

                                                             </CardTitle>
                                                           </Col>
                                </Row>
                                <br />
                                <Row>
                                   <div className="table-wrapper" style={{ width : "-webkit-fill-available"}}>
                                                              <table className="table table-striped">
                                                                  <thead style={{backgroundColor : "currentColor"}}>
                                                                      <tr className="">
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Lot Number</th>
                                                                           <th className="mb-0 h6 " style={{color : "white"}}>Location</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Quantity</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Pick Ticket</th>
                                                                                  </tr>
                                                                  </thead>
                                                                    <tbody>
                                                                      {(this.props.toLogDataList && this.props.toLogDataList.length > 0  && this.props.toLogDataList || []).map((doc, i) => (
                                                                      <tr>
                                                                        <td>{doc.children[0].value}</td>
                                                                        <td>{doc.children[1].value}</td>
                                                                         <td>{doc.children[2].value}</td>
                                                                          <td>{doc.children[5].value}</td>
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
export default LVSAllocationLotDetail;