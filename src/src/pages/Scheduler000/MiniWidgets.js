import React, { Component } from "react";
import { Col, Card, CardBody, Media } from "reactstrap";

import { withNamespaces } from "react-i18next";

class MiniWidgets extends Component {
  render() {
    return (
      <React.Fragment>
      <Col key={0} md={2}>
                  <Card className="bg-secondary">
                    <CardBody className="text-white p-2">
                      <Media>
                        <Media body className="overflow-hidden">
                          <p className="text-truncate font-size-14 font-weight-bold mb-2">
                            {this.props.t('Vehicles')}
                          </p>
                          <h4 className="mb-0 text-white">{this.props.topDetails.vehicleCount}</h4>
                        </Media>
                        <div className="text-white">
                          <i className="ri-truck-line font-size-24"></i>
                        </div>
                      </Media>
                    </CardBody>
                  </Card>
                </Col>
      <Col key={1} md={2}>
                  <Card className="bg-primary">
                    <CardBody className="text-white p-2">
                      <Media>
                        <Media body className="overflow-hidden">
                          <p className="text-truncate font-size-14 font-weight-bold mb-2">
                            {this.props.t('Routes')}
                          </p>
                          <h4 className="mb-0 text-white">{this.props.topDetails.routesCount}</h4>
                        </Media>
                        <div className="text-white">
                          <i className="ri-route-line font-size-24"></i>
                        </div>
                      </Media>
                    </CardBody>
                  </Card>
                </Col>
      <Col key={2} md={2}>
                  <Card className="bg-success">
                    <CardBody className="text-white p-2">
                      <Media>
                        <Media body className="overflow-hidden">
                          <p className="text-truncate font-size-14 font-weight-bold mb-2">
                            {this.props.t('AssignedOrders')}
                          </p>
                          <h4 className="mb-0 text-white">{this.props.topDetails.assignedOrders}</h4>
                        </Media>
                        <div className="text-white">
                          <i className="ri-checkbox-circle-line font-size-24"></i>
                        </div>
                      </Media>
                    </CardBody>
                  </Card>
                </Col>
      <Col key={3} md={2}>
                  <Card className="bg-warning">
                    <CardBody className="text-white p-2">
                      <Media>
                        <Media body className="overflow-hidden">
                          <p className="text-truncate font-size-14 font-weight-bold mb-2">
                            {this.props.t('NonAssignedOrders')}
                          </p>
                          <h4 className="mb-0 text-white">{this.props.topDetails.unassignedOrders}</h4>
                        </Media>
                        <div className="text-white">
                          <i className="ri-close-circle-line font-size-24"></i>
                        </div>
                      </Media>
                    </CardBody>
                  </Card>
                </Col>
      <Col key={4} md={2}>
                  <Card className="bg-danger">
                    <CardBody className="text-white p-2">
                      <Media>
                        <Media body className="overflow-hidden">
                          <p className="text-truncate font-size-14 font-weight-bold mb-2">
                            {this.props.t('TotalShipQty')}
                          </p>
                          <h4 className="mb-0 text-white">{this.props.topDetails.DropProdCount}</h4>
                        </Media>
                        <div className="text-white">
                          <i className="ri-logout-box-r-line font-size-24"></i>
                        </div>
                      </Media>
                    </CardBody>
                  </Card>
                </Col>
      <Col key={5} md={2}>
                  <Card className="bg-info">
                    <CardBody className="text-white p-2">
                      <Media>
                        <Media body className="overflow-hidden">
                          <p className="text-truncate font-size-14 font-weight-bold mb-2">
                            {this.props.t('TotalPickupQty')}
                          </p>
                          <h4 className="mb-0 text-white">{this.props.topDetails.PickupProdCount}</h4>
                        </Media>
                        <div className="text-white">
                          <i className="ri-logout-box-line font-size-24"></i>
                        </div>
                      </Media>
                    </CardBody>
                  </Card>
                </Col>
            </React.Fragment>
    );
  }
}

export default withNamespaces()(MiniWidgets);
