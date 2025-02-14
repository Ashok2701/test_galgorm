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
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Select from "react-select";

const optionGroup = [
  { label: "FR", value: "france" },
  { label: "IN", value: "india" },
];

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [

        { title: "Users", link: "/Users/" },
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
              title="Create User"
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
                          <Label htmlFor="userid">
                            User ID <span className="text-danger">*</span>
                          </Label>
                          <Input
                            className="form-control"
                            type="text"
                            id="userid"
                          />
                        </FormGroup>
                        <FormGroup className="col-md-4 col-xl-4">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            className="form-control"
                            type="text"
                            id="name"
                          />
                        </FormGroup>
                        <FormGroup className="select2-container col-md-4 col-xl-2">
                          <Label htmlFor="plang">Primary Language</Label>
                          <Select
                            options={optionGroup}
                            placeholder="Select Language"
                            classNamePrefix="select2-selection"
                          />
                        </FormGroup>
                        <FormGroup className="select2-container col-md-4 col-xl-2">
                                                  <Label htmlFor="slang">Secondary Language</Label>
                                                  <Select
                                                    options={optionGroup}
                                                    placeholder="Select Language"
                                                    classNamePrefix="select2-selection"
                                                  />
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
                        <div className="h4 text-primary mt-4" style={{width : "-webkit-fill-available"}}>
                                                Address Details
                                              </div>
                                              <hr />
                        <FormGroup className="col-md-4 col-xl-3">
                          <Label htmlFor="maxWeight">Address Line</Label>
                          <InputGroup>
                            <Input
                              className="form-control"
                              type="text"
                              id="maxWeight"
                            />

                          </InputGroup>

                            </FormGroup>
                             <FormGroup className="col-md-4 col-xl-3 " style={{ marginTop : "30px"}}>
                             <InputGroup>
                          <Input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder=""
                                                      />
                                   </InputGroup>
                        </FormGroup>
                        <FormGroup className="col-md-4 col-xl-3">
                          <Label htmlFor="maxVolume">City</Label>
                          <InputGroup>
                            <Input
                              className="form-control"
                              type="text"
                              id="city"
                            />

                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="col-md-4 col-xl-3">
                          <Label htmlFor="state">State</Label>
                          <Input
                            className="form-control"
                            type="text"
                            rows="4"
                            id="state"
                          />
                        </FormGroup>
                        <FormGroup className="col-md-4 col-xl-3">
                                                  <Label htmlFor="country">Country</Label>
                                                  <InputGroup>
                                                    <Input
                                                      className="form-control"
                                                      type="text"
                                                      id="country"
                                                    />

                                                  </InputGroup>
                                                </FormGroup>
                        <FormGroup className="col-md-4 col-xl-3">
                                                  <Label htmlFor="pincode">Pincode</Label>
                                                  <InputGroup>
                                                    <Input
                                                      className="form-control"
                                                      type="text"
                                                      id="pincode"
                                                    />

                                                  </InputGroup>
                                                </FormGroup>
                        <FormGroup className="col-md-4 col-xl-3">
                                                  <Label htmlFor="Telephone">Telephone</Label>
                                                  <InputGroup>
                                                    <Input
                                                      className="form-control"
                                                      type="text"
                                                      id="Telephone"
                                                    />

                                                  </InputGroup>
                                                </FormGroup>
                        <FormGroup className="col-md-4 col-xl-3">
                                                  <Label htmlFor="mphone">Mobile Phone</Label>
                                                  <InputGroup>
                                                    <Input
                                                      className="form-control"
                                                      type="text"
                                                      id="mphone"
                                                    />

                                                  </InputGroup>
                                                </FormGroup>
                        <FormGroup className="col-md-4 col-xl-3">
                          <Label htmlFor="customFile">Upload Image</Label>
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
                        <FormGroup className="col-md-4 col-xl-3">
                                                                          <Label htmlFor="email">Email</Label>
                                                                          <InputGroup>
                                                                            <Input
                                                                              className="form-control"
                                                                              type="email"
                                                                              id="email"
                                                                            />

                                                                          </InputGroup>
                                                                        </FormGroup>
                      </Row>
                      <CardTitle className="h4 text-primary mt-4">
                        Site Selection
                      </CardTitle>
                      <Row>
                        <Col xs="12">
                          <div className="table-responsive">
                            <Table className="mb-0" bordered>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Site</th>
                                  <th>Site Description</th>

                                  <th>Default</th>
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
                                                                                                        <Input
                                                                                                          className="form-control"
                                                                                                          type="text"
                                                                                                          rows="4"
                                                                                                          id="noOfAxel"
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
                        to="/Users"
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

export default CreateUser;
