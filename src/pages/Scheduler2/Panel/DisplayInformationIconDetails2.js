import React, { useState, useEffect } from "react";
import Vehicles from "./Vehicles";
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
import {
  Row,
  Col,
  CardTitle,
  Card,
  CardHeader,
  CardBody,
  Table,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const DisplayInformationIconDetails1 = (props) => {
  const [isOpen, setIsOpen] = useState(props.show);

  useEffect(() => {
    setIsOpen(props.show);
  }, [props]);

  const onAvailable = (availdays) => {
    let finaldata = "";
    console.log("Available days= ", availdays);
    if (availdays.length > 1) {
      let days = availdays.split(",");

      for (let i = 0; i < days.length; i++) {
        console.log("day i= ", days[i]);
        if (days[i] == 2) {
          console.log("day i inside= ", days[i]);
          switch (i) {
            case 0:
              finaldata = finaldata + " Sunday ";
              break;
            case 1:
              finaldata = finaldata + " MONDAY ";
              break;
            case 2:
              finaldata = finaldata + " TUESDAY ";
              break;
            case 3:
              finaldata = finaldata + " WEDNESDAY ";
              break;
            case 4:
              finaldata = finaldata + " THURSDAY ";
              break;
            case 5:
              finaldata = finaldata + " FRIDAY ";
              break;
            case 6:
              finaldata = finaldata + " SATURDAY ";
              break;
            default:
              break;
          }
          console.log("day i inside= ", finaldata);
        }

        console.log("insdie =", days[i]);
      }
    }

    return finaldata;
  };

  return (
    <Dialog
      onClose={() => setIsOpen(false)}
      open={isOpen}
      disableEscapeKeyDown={true}
      // PaperComponent={StyledPaper}
      maxWidth="xl"
    >
      <DialogTitle>
        {" "}
        <Typography
      variant="h5"
        className="modal-header-bg text-white"

        >
          DOCUMENT - {props.docNum}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <>
          <Card>
            <CardHeader className="flex-md-row flex-column align-md-items-center border-bottom">
              <CardTitle
                tag="h4"
                className="mb-0"
                style={{ fontWeight: "bold" }}
              >
                BASIC INFO
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Row className="mt-2">
                <Col>
                  <FormGroup row>
                    <Label sm="6">LOADBAY</Label>
                    <Col sm="6">
                      <Input
                        value={props.data.loadBay}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm="6">TAILGATE</Label>
                    <Col sm="6">
                      <Input
                        value={props.data.tailGate}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm="6">PACKING</Label>
                    <Col sm="6">
                      <Input
                        value={props.data.packing}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup row>
                    <Label md="4">HEIGHT</Label>
                    <Col md="8">
                      <Input
                        value={props.data.height}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label md="4">LOADING ORDER</Label>
                    <Col md="8">
                      <Input
                        value={props.data.loadingOrder}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm="6">STACK HEIGHT</Label>
                    <Col sm="6">
                      <Input
                        value={props.data.stackHeight}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="flex-md-row flex-column align-md-items-center border-bottom">
              <CardTitle
                tag="h4"
                className="mb-0"
                style={{ fontWeight: "bold" }}
              >
                AVAILABILITY AND TIMINGS
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Row className="mt-2">
                <Col>
                  <FormGroup row>
                    <Label sm="6">WAITING TIME</Label>
                    <Col sm="6">
                      <Input
                        value={props.data.waitingTime}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup row>
                    <Label md="4"> SERVICE TIME</Label>
                    <Col md="8">
                      <Input
                        value={props.data.timings}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup row>
                    <Label md="4"> AVAILABLE DAYS </Label>
                    <Col md="8">
                      <Input
                        value={
                          props.data.availDays &&
                          onAvailable(props.data.availDays)
                        }
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>

              {props.data.fromTime && props.data.fromTime.length > 1 ? (
                <div className="px-2">
                  <h6 className="bg-light my-2 p-1">AVAILABLE TIMIINGS</h6>
                  {props.data.fromTime.length > 0 ? (
                    <Table bordered responsive>
                      <thead>
                        <tr>
                          <th style={{ fontWeight: "bold" }}>
                            <u>FROM </u>
                          </th>
                          <th style={{ fontWeight: "bold" }}>
                            <u>TO </u>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.data.fromTime.map((item, index) => {
                          return (
                            <tr key={index}>
                              {/* <td>{item.SOPLIN_0}</td> */}
                              <td>{props.data.fromTime[index]}</td>
                              <td>{props.data.toTime[index]}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  ) : (
                    <p className="text-center mb-0">No data found</p>
                  )}
                </div>
              ) : (
                <Row>
                  <Col>
                    <FormGroup row>
                      <Label md="4"> ANY TIME AVAILABLE </Label>
                      <Col md="8">
                        <Input
                          value="YES"
                          style={{ fontWeight: "bold" }}
                          disabled
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
              )}
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="flex-md-row flex-column align-md-items-center border-bottom">
              <CardTitle
                tag="h4"
                className="mb-0"
                style={{ fontWeight: "bold" }}
              >
                ASSOCIATIONS
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Row className="mt-2">
                <Col>
                  <FormGroup row>
                    <Label sm="6">ALL DRIVERS</Label>
                    <Col sm="6">
                      <Input
                        value={props.data.allDrivers === "2" ? "YES" : "NO"}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup row>
                    <Label md="4">DRIVER LIST</Label>
                    <Col md="8">
                      <Input
                        value={props.data.driverList}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup row>
                    <Label sm="6">ALL VEHICLE CLASS</Label>
                    <Col sm="6">
                      <Input
                        value={props.data.allVehClass === "2" ? "YES" : "NO"}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup row>
                    <Label md="4">VEHCLASS LIST</Label>
                    <Col md="8">
                      <Input
                        value={props.data.vehClassList}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </>
      </DialogContent>
      <DialogActions>
        <Button
          className="badge badge-primary"
          onClick={props.onInfoIconHide}
          variant="contained"
        >
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DisplayInformationIconDetails1;
