import React, { Component } from "react";
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

import { MDBDataTable } from "mdbreact";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class RouteDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPlace: {},
    };
  }

  render() {
    const routeData = {
      columns: [
        {
          label: "Sequence",
          field: "sequence",
          width: 110,
        },
        {
          label: "Document Number",
          field: "document_no",
          width: 210,
        },
        {
          label: "Site",
          field: "site",
          width: 130,
        },
        {
          label: "Status",
          field: "status",
          width: 150,
        },
        {
          label: "Arrival Date Time",
          field: "arrival_datetime",
          width: 170,
        },
        {
          label: "Depart Date Time",
          field: "departure_datetime",
          width: 160,
        },
        {
          label: "Service Time",
          field: "service_time",
          width: 130,
        },
        {
          label: "Client Code",
          field: "client_code",
          width: 120,
        },
        {
          label: "Client",
          field: "client",
          width: 150,
        },
        {
          label: "City",
          field: "city",
          width: 130,
        },
        {
          label: "FromPrevDistance",
          field: "from_prev_distance",
          width: 170,
        },
        {
          label: "FromPrevTravelTime",
          field: "from_prev_travel_time",
          width: 180,
        },
        {
          label: "Waiting Time",
          field: "waiting_time",
          width: 160,
        },
      ],
      rows: [
        {
          sequence: "1",
          document_no: "BDP2109BGLC1000001",
          site: "BGLC1",
          status: "Completed",
          arrival_datetime: "2021-09-01 09:01",
          departure_datetime: "2021-09-01 09:07",
          service_time: "00:06",
          client_code: "ZA0003",
          client: "Aby Bailey",
          city: "Pretoria",
          from_prev_distance: "81 Kms",
          from_prev_travel_time: "01:31",
          waiting_time: "00:00",
        },
        {
          sequence: "2",
          document_no: "BDP2109BGLC1000001",
          site: "BGLC1",
          status: "Completed",
          arrival_datetime: "2021-09-01 09:01",
          departure_datetime: "2021-09-01 09:07",
          service_time: "00:06",
          client_code: "ZA0003",
          client: "Aby Bailey",
          city: "Pretoria",
          from_prev_distance: "81 Kms",
          from_prev_travel_time: "01:31",
          waiting_time: "00:00",
        },
        {
          sequence: "3",
          document_no: "BDP2109BGLC1000001",
          site: "BGLC1",
          status: "Completed",
          arrival_datetime: "2021-09-01 09:01",
          departure_datetime: "2021-09-01 09:07",
          service_time: "00:06",
          client_code: "ZA0003",
          client: "Aby Bailey",
          city: "Pretoria",
          from_prev_distance: "81 Kms",
          from_prev_travel_time: "01:31",
          waiting_time: "00:00",
        },
        {
          sequence: "4",
          document_no: "BDP2109BGLC1000001",
          site: "BGLC1",
          status: "Completed",
          arrival_datetime: "2021-09-01 09:01",
          departure_datetime: "2021-09-01 09:07",
          service_time: "00:06",
          client_code: "ZA0003",
          client: "Aby Bailey",
          city: "Pretoria",
          from_prev_distance: "81 Kms",
          from_prev_travel_time: "01:31",
          waiting_time: "00:00",
        },
      ],
    };

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>
                    <Row>
                      <Col md="6" className="d-flex align-items-center">
                        <CardTitle className="h4 mb-0 text-primary">
                          Route Management
                        </CardTitle>
                      </Col>
                      <Col md="6" className="text-right">
                        <Button
                          color="success"
                          size="sm"
                          className="waves-effect"
                        >
                          VALIDATE
                        </Button>
                      </Col>
                    </Row>
                    <hr className="my-2" />
                    <Row className="my-3">
                      <Col lg="3" xl="2">
                        <p className="mb-1">Route No</p>
                        <p className="h6 mb-0 text-primary">
                          WVR-210901-BGLC1-001
                        </p>
                        <hr className="mt-1" />
                      </Col>
                      <Col lg="3" xl="2">
                        <p className="mb-1">Departure Site</p>
                        <p className="mb-0 h6">BGLC1</p>
                        <hr className="mt-1" />
                      </Col>
                      <Col lg="3" xl="2">
                        <p className="mb-1">Arrival Site</p>
                        <p className="mb-0 h6">BGLC1</p>
                        <hr className="mt-1" />
                      </Col>
                      <Col lg="3" xl="2">
                        <p className="mb-1">Carrier</p>
                        <p className="mb-0 h6">INTERNALFLEET</p>
                        <hr className="mt-1" />
                      </Col>
                      <Col lg="3" xl="2">
                        <p className="mb-1">Trailer</p>
                        <p className="mb-0 h6">SATRA01</p>
                        <hr className="mt-1" />
                      </Col>
                      <Col lg="3" xl="2">
                        <p className="mb-1">Vehicle Class</p>
                        <p className="mb-0 h6">AMPLI</p>
                        <hr className="mt-1" />
                      </Col>
                      <Col lg="3" xl="2">
                        <p className="mb-1">Vehicle</p>
                        <p className="mb-0 h6">110180</p>
                        <hr className="mt-1" />
                      </Col>
                      <Col lg="3" xl="2">
                        <p className="mb-1">Route Type</p>
                        <p className="mb-0 h6">Scheduled</p>
                        <hr className="mt-1" />
                      </Col>
                      <Col lg="3" xl="2">
                        <p className="mb-1">Driver ID</p>
                        <p className="mb-0 h6">DRV001</p>
                        <hr className="mt-1" />
                      </Col>
                      <Col lg="3" xl="2">
                        <p className="mb-1">Driver</p>
                        <p className="mb-0 h6">William Smith</p>
                        <hr className="mt-1" />
                      </Col>
                      <Col lg="3" xl="2">
                        <p className="mb-1">Creation Date</p>
                        <p className="mb-0 h6">2021-09-06</p>
                        <hr className="mt-1" />
                      </Col>
                      <Col lg="3" xl="2">
                        <p className="mb-1">Creation Time</p>
                        <p className="mb-0 h6">14:52</p>
                        <hr className="mt-1" />
                      </Col>
                      <Col lg="3" xl="2">
                        <p className="mb-1">Trip</p>
                        <p className="mb-0 h6">1</p>
                        <hr className="mt-1" />
                      </Col>
                      <Col lg="3" xl="2">
                        <p className="mb-1">Status</p>
                        <p className="mb-0 h6">Loading Completed</p>
                        <hr className="mt-1" />
                      </Col>
                      <Col lg="3" xl="2">
                        <p className="mb-1">Vehicle Load Stock Number</p>
                        <p className="h6 mb-0 text-primary">
                          BGLC12109XCHG0000001
                        </p>
                        <hr className="mt-1" />
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <CardTitle className="h4 text-primary">
                          Planning
                        </CardTitle>
                        <hr className="my-2" />
                        <Row className="mt-3">
                          <Col md="6" lg="3">
                            <p className="mb-1">Depart Date</p>
                            <p className="mb-0 h6">2021-09-01</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col md="6" lg="3">
                            <p className="mb-1">Depart Time</p>
                            <p className="mb-0 h6">07:30</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col md="6" lg="3">
                            <p className="mb-1">Return Date</p>
                            <p className="mb-0 h6">2021-09-01</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col md="6" lg="3">
                            <p className="mb-1">Return Time</p>
                            <p className="mb-0 h6">14:05</p>
                            <hr className="mt-1" />
                          </Col>
                        </Row>
                        <CardTitle className="h4 text-primary">
                          Actual
                        </CardTitle>
                        <hr className="my-2" />
                        <Row className="mt-3">
                          <Col md="6" lg="3">
                            <p className="mb-1">Depart Date</p>
                            <p className="mb-0 h6">2021-09-01</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col md="6" lg="3">
                            <p className="mb-1">Depart Time</p>
                            <p className="mb-0 h6">07:30</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col md="6" lg="3">
                            <p className="mb-1">Return Date</p>
                            <p className="mb-0 h6">2021-09-01</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col md="6" lg="3">
                            <p className="mb-1">Return Time</p>
                            <p className="mb-0 h6">14:05</p>
                            <hr className="mt-1" />
                          </Col>
                        </Row>
                      </Col>
                      <Col lg="6">
                        <CardTitle className="h4 text-primary">
                          Status
                        </CardTitle>
                        <hr className="my-2" />
                        <CardSubtitle className="text-primary my-2">
                          Status Optimization
                        </CardSubtitle>
                        <div className="custom-control custom-radio custom-control-inline mb-3">
                          <Input
                            type="radio"
                            id="auto"
                            name="customRadio"
                            className="custom-control-input"
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="auto"
                          >
                            Auto
                          </Label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline mb-3">
                          <Input
                            type="radio"
                            id="manual"
                            name="customRadio"
                            className="custom-control-input"
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="manual"
                          >
                            Manual
                          </Label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline mb-3">
                          <Input
                            type="radio"
                            id="force"
                            name="customRadio"
                            className="custom-control-input"
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="force"
                          >
                            Force
                          </Label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline mb-3">
                          <Input
                            type="radio"
                            id="fault"
                            name="customRadio"
                            className="custom-control-input"
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="fault"
                          >
                            Fault
                          </Label>
                        </div>
                        <CardSubtitle className="text-primary my-2">
                          Status Dispatch
                        </CardSubtitle>
                        <div className="custom-control custom-radio custom-control-inline mb-3">
                          <Input
                            type="radio"
                            id="auto"
                            name="customRadio"
                            className="custom-control-input"
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="auto"
                          >
                            A Charger
                          </Label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline mb-3">
                          <Input
                            type="radio"
                            id="manual"
                            name="customRadio"
                            className="custom-control-input"
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="manual"
                          >
                            Picking
                          </Label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline mb-3">
                          <Input
                            type="radio"
                            id="force"
                            name="customRadio"
                            className="custom-control-input"
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="force"
                          >
                            Checkin
                          </Label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline mb-3">
                          <Input
                            type="radio"
                            id="fault"
                            name="customRadio"
                            className="custom-control-input"
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="fault"
                          >
                            Debut Changement
                          </Label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline mb-3">
                          <Input
                            type="radio"
                            id="fault"
                            name="customRadio"
                            className="custom-control-input"
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="fault"
                          >
                            End of loading
                          </Label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline mb-3">
                          <Input
                            type="radio"
                            id="fault"
                            name="customRadio"
                            className="custom-control-input"
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="fault"
                          >
                            Check Out
                          </Label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline mb-3">
                          <Input
                            type="radio"
                            id="fault"
                            name="customRadio"
                            className="custom-control-input"
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="fault"
                          >
                            Return
                          </Label>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col lg="6">
                <Card>
                  <CardBody className="p-2">
                    <CardTitle className="float-left h4 mb-0 pt-2">
                      Transactions
                    </CardTitle>
                    <MDBDataTable
                      scrollY
                      hover
                      striped
                      maxHeight="200px"
                      paging={false}
                      sortable={false}
                      data={routeData}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6">
                <Card>
                  <CardBody className="p-2">
                    <div
                      id="gmaps-markers"
                      className="gmaps"
                      style={{ position: "relative" }}
                    >
                      <Map
                        google={this.props.google}
                        style={{ width: "100%", height: "100%" }}
                        zoom={14}
                      >
                        <Marker onClick={this.onMarkerClick} />
                        <InfoWindow>
                          <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                          </div>
                        </InfoWindow>
                      </Map>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12">
                <Card>
                  <CardBody>
                    <Row>
                      <Col lg="6">
                        <CardTitle className="h4 text-primary">
                          Total Delivery
                        </CardTitle>
                        <hr className="my-2" />
                        <Row>
                          <Col lg="4">
                            <p className="mb-1">Weight</p>
                            <p className="h6 mb-0">24990.00 KG</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col lg="4">
                            <p className="mb-1">Vehicle Weight Cap</p>
                            <p className="h6 mb-0">47500.00 KG</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col lg="4">
                            <p className="mb-1">_Load_Mass</p>
                            <p className="h6 mb-0">52.61</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col lg="4">
                            <p className="mb-1">Delivery Volume</p>
                            <p className="h6 mb-0">25000 L</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col lg="4">
                            <p className="mb-1">Vehicle Cap Volume</p>
                            <p className="h6 mb-0">45000 L</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col lg="4">
                            <p className="mb-1">_Load_Flight</p>
                            <p className="h6 mb-0">55.56</p>
                            <hr className="mt-1" />
                          </Col>
                        </Row>
                        <CardTitle className="h4 text-primary mt-3">
                          Total Removal
                        </CardTitle>
                        <hr className="my-2" />
                        <Row>
                          <Col lg="6">
                            <p className="mb-1">Weight Removed</p>
                            <p className="h6 mb-0">10 KG</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col lg="6">
                            <p className="mb-1">
                              Vehicle Availability (Weight)
                            </p>
                            <p className="h6 mb-0">22510 KG</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col lg="6">
                            <p className="mb-1">Volume Removal</p>
                            <p className="h6 mb-0">1000 L</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col lg="6">
                            <p className="mb-1">Vehicle Available Volume</p>
                            <p className="h6 mb-0">20000 L</p>
                            <hr className="mt-1" />
                          </Col>
                        </Row>
                      </Col>
                      <Col lg="6">
                        <CardTitle className="h4 text-primary">
                          Totals
                        </CardTitle>
                        <hr className="my-2" />
                        <Row>
                          <Col lg="4">
                            <p className="mb-1">Total Distance</p>
                            <p className="h6 mb-0">293.78 kms</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col lg="4">
                            <p className="mb-1">Real Distance</p>
                            <p className="h6 mb-0">-</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col lg="4">
                            <p className="mb-1">Cost Distance</p>
                            <p className="h6 mb-0">1470.00 USD</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col lg="4">
                            <p className="mb-1">Total Time</p>
                            <p className="h6 mb-0">7.08</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col lg="4">
                            <p className="mb-1">Travel Time</p>
                            <p className="h6 mb-0">6.00</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col lg="4">
                            <p className="mb-1">Pause Time</p>
                            <p className="h6 mb-0">-</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col lg="4">
                            <p className="mb-1">Travel Time Coast</p>
                            <p className="h6 mb-0">32.92 USD</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col lg="4">
                            <p className="mb-1">Coast Extra Hours</p>
                            <p className="h6 mb-0">0.00 USD</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col lg="4">
                            <p className="mb-1">Total Cost</p>
                            <p className="h6 mb-0">1552.92 USD</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col lg="4">
                            <p className="mb-1">NB Stops</p>
                            <p className="h6 mb-0">4</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col lg="4">
                            <p className="mb-1">Renewal Count</p>
                            <p className="h6 mb-0">-</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col lg="4">
                            <p className="mb-1">Total Renuwal Service Time</p>
                            <p className="h6 mb-0">-</p>
                            <hr className="mt-1" />
                          </Col>
                          <Col lg="4">
                            <p className="mb-1">CO2 Emission</p>
                            <p className="h6 mb-0">-</p>
                            <hr className="mt-1" />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAQb-7NDLDsJh-l3siJQ_1gEw2lBgWKYlU",
  v: "3",
})(RouteDetail);
