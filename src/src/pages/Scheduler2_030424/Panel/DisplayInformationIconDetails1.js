import React, { useState, useEffect } from "react";
import Vehicles from './Vehicles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Row, Col, CardTitle, Card, CardHeader, CardBody, Table, FormGroup, Label, Input } from 'reactstrap'

const DisplayInformationIconDetails1 = (props) => {
  const [isOpen, setIsOpen] = useState(props.show);




  useEffect(() => {
     setIsOpen(props.show);
  }, [props])


const  convertData = (uri) => {

var decodedString = document.createElement('div');
decodedString.innerHTML = uri;
var result = decodedString.innerText;


 let encoded = encodeURI(uri);
 let decoded = decodeURI(encoded);

 return result;

 }



  return (
    <Dialog
      onClose={() => setIsOpen(false)}
      open={isOpen}
      disableEscapeKeyDown={true}
     // PaperComponent={StyledPaper}
      maxWidth="xl"
    >
      <DialogTitle >
        {" "}
        <Typography variant="h6" style={{backgroundColor : "#0275d8", color : "white", paddingLeft : "10px"}} >TECHNICIAN DETAILS </Typography>
      </DialogTitle>
      <DialogContent>
        <>

                    <Card>
                    <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
                                            <CardTitle tag='h4' className="mb-0" style={{fontWeight :"bold"}}>BASIC INFO</CardTitle>
                                          </CardHeader>
                                          <CardBody>
                                            <Row className='mt-2'>
                                              <Col >
                                                <FormGroup row>
                                                  <Label sm='6'>TECHNICIAN ID</Label>
                                                  <Col sm='6'>
                                                    <Input value={props.vehicle} style={{fontWeight : "bold"}} disabled/>
                                                  </Col>
                                                </FormGroup>
                                                </Col >
                                                 <Col >
                                                <FormGroup row>
                                                                                                  <Label sm='6'>TECHNICIAN NAME</Label>
                                                                                                  <Col sm='6'>
                                                                                                    <Input value={props.data.Technician} style={{fontWeight : "bold"}} disabled/>
                                                                                                  </Col>
                                                                                                </FormGroup>
                                               </Col>
                                           </Row>
                                           <Row>
                                               <Col>

                                                <FormGroup row>
                                                                 <Label md='4'>SKILLS</Label>
                                                                 <Col md='12'>
                                                                   <Input type="textarea" value={convertData('AANE Installation &amp; Service, Dosatron Installation &amp; Setup, EDIE Installation &amp; Service, Etatron Pump Installation &amp; Setup, General Product Delivery, Keyence Flow Meter Installation &amp; Setup, Product Training')}    style={{fontWeight : "bold"}} disabled/>
                                                                 </Col>
                                                               </FormGroup>


                                                             </Col>
                             </Row>
                             </CardBody>
                             </Card>

                                        </>
      </DialogContent>
      <DialogActions>
        <Button className="badge badge-primary" onClick={props.onInfoIconHide} variant="contained">CLOSE</Button>

      </DialogActions>
    </Dialog>
  );
};
 
export default DisplayInformationIconDetails1;