import React from 'react'
import {Modal, Button} from 'react-bootstrap';
import {withTranslation} from 'react-i18next';
import { Row, Col, Label, Card, Input, CardHeader, CardTitle, CardBody, Form, FormGroup } from 'reactstrap'

import moment from 'moment';

class LVSPrintDetail extends React.Component {

constructor(props)
{
  super(props);
}



    render() {

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
                                              value={this.props.vrdata && moment(this.props.vrdata.datliv).format('YYYY-MM-DD')}
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
              </CardBody>
            </Card>
             </Form>
                    </Col>
</Row>
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor : "whitesmoke"}}>
                     <Button onClick={this.props.onHide}>Navigate & Print</Button>
                      <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                );
        }

}
export default LVSPrintDetail;