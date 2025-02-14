import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {Button} from 'react-bootstrap';
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

function LvsToPickDetail(props) {
  const [key, setKey] = useState('Detail');


  return (
  <div>
  <Row>
          <Col sm='12'>
            <Form >
            <Card>
                        <CardBody className="pt-1">
                         <Row style={{backgroundColor : "currentcolor", height : "50px"}}>
                                                   <Col md="6" className="d-flex align-items-center">
                                                     <CardTitle className="h1 mb-0 ">
                                                       Picking By Route
                                                     </CardTitle>
                                                   </Col>
                         </Row>
                                        <Row style={{marginTop : "15px"}}>
                                          <Col md='3' sm='12'>
                                            <FormGroup>
                                              <Label >Vehicle Routing</Label>
                                             <Input
                                                                                          name='concode'
                                                                                          id='concode'
                                                                                          value=''
                                                                                          disabled={true}
                                                                                        />
                                            </FormGroup>
                                          </Col>
                                          <Col md='3' sm='12'>
                                            <FormGroup>
                                              <Label>Delivery Date</Label>
                                               <Input
                                                                      name='concode'
                                                                      id='concode'
                                                                      value=''
                                                                      disabled={true}
                                                                    />
                                            </FormGroup>
                                          </Col>
                                          <Col md='3' sm='12'>
                                                              <FormGroup>
                                                                <Label>Site</Label>
                                                                 <Input
                                                                                        name='concode'
                                                                                        id='concode'
                                                                                        value=''
                                                                                        disabled={true}
                                                                                      />
                                                              </FormGroup>
                                                            </Col>
                                          <Col md='3' sm='12'>
                                            <FormGroup>
                                              <Label >Vehicle</Label>
                                              <Input
                                                name='concode'
                                                id='concode'
                                                value=''
                                                disabled={true}
                                              />
                                            </FormGroup>
                                          </Col>
                                        </Row>

                                  <br />
     <Row>
              <Col sm='12'>
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="Detail" title="Detail">
        Tab content for Home
      </Tab>
      <Tab eventKey="Global" title="Global">
        Tab content for Profile
      </Tab>

    </Tabs>
            </Col>
      </Row>
      <Row>
       <Col>
       <Button onClick={props.onHideToPickLVSShow}>Close</Button>
       </Col>
       </Row>
       </CardBody>
                          </Card>
                          </Form>
                                              </Col>
                          </Row>
    </div>
  );
}

export default LvsToPickDetail;