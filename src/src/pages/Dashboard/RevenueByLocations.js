import React, { Component } from 'react';
import { Row, Card, CardBody, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";

//Import Vector Map Component
import Vector from "./Vectormap";

class RevenueByLocations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false,
            count: [],
            city : [],
        }
    }


         componentDidUpdate(prevProps) {
            if (prevProps.dash !== this.props.dash) {
              console.log("Some props changed. Rendering...");
            //  ApexCharts.exec('routestatus-pie')

                this.setState({
                    count : this.props.dash.count,
                     city : this.props.dash.states
                })
            }
          }

    render() {
         console.log("asdfasdfs" ,this.state.count)
        return (
            <React.Fragment>
                <Col lg={4}>
                    <Card>
                        <CardBody>


                            <h4 className="card-title mb-4">Customers by Locations</h4>

                            <div id="usa-vectormap" style={{ height: "215px" }}>
                                <Vector
                                    value="us_aea"
                                    width="200"
                                    color="#e8ecf4"
                                />
                            </div>
 <Row className="justify-content-center">
                                <Col xl={5} md={4}>
                                    <div className="mt-2">
                                        <div className="clearfix py-2">
                                            <h5 className="float-end font-size-16 m-0">22</h5>
                                            <p className="text-muted mb-0 text-truncate">Eldora :</p>

                                        </div>
                                        <div className="clearfix py-2">
                                            <h5 className="float-end font-size-16 m-0">45</h5>
                                            <p className="text-muted mb-0 text-truncate">Iowa Falls :</p>

                                        </div>
                                        <div className="clearfix py-2">
                                                                                    <h5 className="float-end font-size-16 m-0">6</h5>
                                                                                    <p className="text-muted mb-0 text-truncate">Zearing :</p>

                                                                                </div>
                                    </div>
                                </Col>
                                <Col xl={{ size: 5, offset: 1 }} md={4}>
                                    <div className="mt-2">
                                        <div className="clearfix py-2">
                                            <h5 className="float-end font-size-16 m-0">15</h5>
                                            <p className="text-muted mb-0 text-truncate">Kamrar :</p>

                                        </div>
                                        <div className="clearfix py-2">
                                            <h5 className="float-end font-size-16 m-0"> 15</h5>
                                            <p className="text-muted mb-0 text-truncate">Union :</p>

                                        </div>
                                    </div>
                                </Col>
                            </Row>




                        </CardBody>
                    </Card>
                </Col>
            </React.Fragment>
        );
    }
}

export default RevenueByLocations;