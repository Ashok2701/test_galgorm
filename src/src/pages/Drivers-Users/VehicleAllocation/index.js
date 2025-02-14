import React, { Component } from "react";
import { Card, CardBody, Container, Row, Col, Button } from "reactstrap";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";

class VehicleClassAssociation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const routeData = {
      columns: [
        {
          label: "Class Code",
          field: "class_code",
          width: 130,
        },
        {
          label: "Country",
          field: "country",
          width: 130,
        },
        {
          label: "Type",
          field: "type",
          width: 130,
        },
        {
          label: "Number of Axle",
          field: "no_of_axle",
          width: 150,
        },
        {
          label: "Maximum Weight",
          field: "maximum_weight",
          width: 150,
        },
        {
          label: "Maximum Volume",
          field: "maximum_volume",
          width: 150,
        },
        {
          label: "Status",
          field: "status",
          width: 130,
        },
        {
          label: "Action",
          field: "action",
          width: 130,
          sort: "disabled",
        },
      ],
      rows: [
        {
          class_code: (
            <Link to="/fleet-management/vehicle-class/create">TEST001</Link>
          ),
          country: "FR",
          type: "Single Unit",
          no_of_axle: "10",
          maximum_weight: "5000",
          maximum_volume: "1000",
          status: (
            <span className="font-size-14 badge badge-success">Active</span>
          ),
          action: (
            <div>
              <Button
                color="warning"
                type="button"
                size="sm"
                className="waves-effect waves-light mr-1"
              >
                <i className="ri-pencil-line"></i>
              </Button>
              <Button
                color="danger"
                type="button"
                size="sm"
                className="waves-effect waves-light mr-1"
              >
                <i className="ri-delete-bin-line"></i>
              </Button>
              <Button
                color="info"
                type="button"
                size="sm"
                className="waves-effect waves-light mr-1"
              >
                <i className="ri-attachment-2"></i>
              </Button>
            </div>
          ),
        },
        {
          class_code: (
            <Link to="/fleet-management/vehicle-class/create">TEST002</Link>
          ),
          country: "IN",
          type: "Single Unit",
          no_of_axle: "10",
          maximum_weight: "5000",
          maximum_volume: "1000",
          status: (
            <span className="font-size-14 badge badge-secondary">
              In Active
            </span>
          ),
          action: (
            <div>
              <Button
                color="warning"
                type="button"
                size="sm"
                className="waves-effect waves-light mr-1"
              >
                <i className="ri-pencil-line"></i>
              </Button>
              <Button
                color="danger"
                type="button"
                size="sm"
                className="waves-effect waves-light mr-1"
              >
                <i className="ri-delete-bin-line"></i>
              </Button>
            </div>
          ),
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
                    <div className="page-title-box pb-0 d-flex align-items-center justify-content-between">
                      <h4 className="mb-0">Vehicle Class</h4>
                      <div>
                        <Link
                          to="/fleet-management/vehicle-class/create"
                          className="btn btn-primary btn-sm waves-effect waves-light mr-1"
                        >
                          <i className="ri-add-line align-middle font-weight-bold mr-1"></i>
                          Add New
                        </Link>
                        <Button color="success" size="sm">
                          <i className="ri-share-box-line align-middle font-weight-bold mr-1"></i>
                          Export
                        </Button>
                      </div>
                    </div>
                    <hr className="my-2" />
                    <MDBDataTable
                      className="dataTable"
                      scrollX
                      data={routeData}
                      entriesLabel=""
                      info={false}
                    />
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

export default VehicleClassAssociation;
