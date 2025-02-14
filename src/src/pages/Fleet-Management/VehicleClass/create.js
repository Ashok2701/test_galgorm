import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  Container,
  CustomInput,
  InputGroup,
  CardTitle,
  Table,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Select from "react-select";

const optionGroup = [
  { label: "FR", value: "france" },
  { label: "IN", value: "india" },
];

class CreateVehicleClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Vehicle Class", link: "/fleet-management/vehicle-class" },
        { title: "Create", link: "#" },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              title="Create Vehicle Class"
              breadcrumbItems={this.state.breadcrumbItems}
            />
            <Row>
              <Col xs="12">
                <div className="text-right mb-3">
                  <Button
                    color="success"
                    type="button"
                    size="sm"
                    className="waves-effect waves-light mr-1"
                  >
                    <i className="ri-refresh-line font-size-16"></i>
                  </Button>
                  <Button
                    color="danger"
                    type="button"
                    size="sm"
                    className="waves-effect waves-light mr-1"
                  >
                    <i className="ri-delete-bin-line font-size-16"></i>
                  </Button>
                  <Button
                    color="info"
                    type="button"
                    size="sm"
                    className="waves-effect waves-light mr-1"
                  >
                    <i className="ri-attachment-2 font-size-16"></i>
                  </Button>
                  <Button
                    color="dark"
                    type="button"
                    size="sm"
                    className="waves-effect waves-light"
                  >
                    <i className="ri-printer-line font-size-16"></i>
                  </Button>
                </div>
                <Card>
                  <CardBody>
                    <Form>
                      <Row>
                        <FormGroup className="col-md-4 col-xl-3">
                          <Label htmlFor="classCode">
                            Class Code <span className="text-danger">*</span>
                          </Label>
                          <Input
                            className="form-control"
                            type="text"
                            id="classCode"
                          />
                        </FormGroup>
                        <FormGroup className="col-md-4 col-xl-4">
                          <Label htmlFor="description">Description</Label>
                          <Input
                            className="form-control"
                            type="text"
                            id="description"
                          />
                        </FormGroup>
                        <FormGroup className="select2-container col-md-4 col-xl-2">
                          <Label htmlFor="country">Country</Label>
                          <Select
                            options={optionGroup}
                            placeholder="Select Country"
                            classNamePrefix="select2-selection"
                          />
                        </FormGroup>
                        <FormGroup className="col-md-4 col-xl-2">
                          <Label htmlFor="type">Type</Label>
                          <select className="form-control" id="type">
                            <option value="">Select Type</option>
                            <option>Single Unit</option>
                            <option>Multi Unit</option>
                          </select>
                        </FormGroup>
                        <FormGroup className="col-md-4 col-xl-1">
                          <Label htmlFor="customSwitch1">Active</Label>
                          <div className="custom-control custom-switch mb-2">
                            <Input
                              type="checkbox"
                              className="custom-control-input"
                              id="customSwitch1"
                              defaultChecked
                            />
                            <Label
                              className="custom-control-label"
                              htmlFor="customSwitch1"
                              onClick={(e) => {
                                this.setState({
                                  toggleSwitch: !this.state.toggleSwitch,
                                });
                              }}
                            ></Label>
                          </div>
                        </FormGroup>
                        <FormGroup className="col-md-4 col-xl-3">
                          <Label htmlFor="maxWeight">Maximum Weight</Label>
                          <InputGroup>
                            <Input
                              className="form-control"
                              type="text"
                              id="maxWeight"
                            />
                            <Input
                              className="form-control"
                              type="text"
                              placeholder="Unit"
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="col-md-4 col-xl-3">
                          <Label htmlFor="maxVolume">Maximum Volume</Label>
                          <InputGroup>
                            <Input
                              className="form-control"
                              type="text"
                              id="maxVolume"
                            />
                            <Input
                              className="form-control"
                              type="text"
                              placeholder="Unit"
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="col-md-4 col-xl-3">
                          <Label htmlFor="noOfAxel">Number of axle</Label>
                          <Input
                            className="form-control"
                            type="text"
                            rows="4"
                            id="noOfAxel"
                          />
                        </FormGroup>
                        <FormGroup className="col-md-4 col-xl-3">
                          <Label htmlFor="customFile">Picture</Label>
                          <div className="custom-file">
                            <CustomInput
                              type="file"
                              className="custom-file-input"
                              id="customFile"
                            />
                            <Label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              Choose file
                            </Label>
                          </div>
                        </FormGroup>
                      </Row>
                      <CardTitle className="h4 text-primary mt-4">
                        Associations
                      </CardTitle>
                      <Row>
                        <Col xs="12">
                          <div className="table-responsive">
                            <Table className="mb-0" bordered>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Link Type</th>
                                  <th>Trailer/Equipment Code</th>
                                  <th>Weight</th>
                                  <th>Volume</th>
                                  <th>No. of axle</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="align-middle">1</td>
                                  <td className="align-middle">
                                    <Input
                                      className="form-control"
                                      type="text"
                                      rows="4"
                                      id="noOfAxel"
                                    />
                                  </td>
                                  <td className="align-middle">
                                    <Input
                                      className="form-control"
                                      type="text"
                                      rows="4"
                                      id="noOfAxel"
                                    />
                                  </td>
                                  <td className="align-middle">
                                    <InputGroup>
                                      <Input
                                        className="form-control"
                                        type="text"
                                        id="maxVolume"
                                      />
                                      <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="Unit"
                                      />
                                    </InputGroup>
                                  </td>
                                  <td className="align-middle">
                                    <InputGroup>
                                      <Input
                                        className="form-control"
                                        type="text"
                                        id="maxVolume"
                                      />
                                      <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="Unit"
                                      />
                                    </InputGroup>
                                  </td>
                                  <td className="align-middle">
                                    <Input
                                      className="form-control"
                                      type="text"
                                      id="maxVolume"
                                    />
                                  </td>
                                  <td className="align-middle">
                                    <Button
                                      color="primary"
                                      type="button"
                                      size="sm"
                                      className="waves-effect waves-light mr-1"
                                    >
                                      <i className="ri-add-line font-weight-bold font-size-16"></i>
                                    </Button>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                      </Row>
                      <hr className="mt-0" />
                      <Button
                        color="primary"
                        type="button"
                        className="waves-effect waves-light mr-1"
                      >
                        Create
                      </Button>
                      {/* <Button
                        color="primary"
                        type="button"
                        className="waves-effect waves-light mr-1"
                      >
                        Save
                      </Button> */}
                      <Button
                        color="warning"
                        type="button"
                        className="waves-effect waves-light mr-1"
                      >
                        Clear
                      </Button>
                      <Link
                        to="/fleet-management/vehicle-class"
                        className="btn btn-secondary waves-effect waves-light mr-1"
                      >
                        Close
                      </Link>
                    </Form>
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

export default CreateVehicleClass;
