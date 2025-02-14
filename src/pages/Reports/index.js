import React, { Component } from "react";
import { Container } from "reactstrap";

import "./reports.scss";

class Reports extends Component {
  constructor(props) {
    super(props);
    const urls = {
      "tms-calendar": process.env.REACT_APP_TMS_CALENDAR,
      "tms-planning": process.env.REACT_APP_TMS_PLANNING,
      "delivery-preparation": process.env.REACT_APP_DELIVERY_PREPARATION,
      "route-list": process.env.REACT_APP_ROUTE_LIST,
      "pod-tracking": process.env.REACT_APP_POD_TRACKING,
      "kpi-global": process.env.REACT_APP_KPI_GLOBAL,
      "kpi-site-vehicle": process.env.REACT_APP_KPI_SITE_VEHICLE,
      "kpi-vehicle": process.env.REACT_APP_KPI_VEHICLE,
      "kpi-site": process.env.REACT_APP_KPI_SITE,
    };
    const pathname = window.location.pathname.split("/")[2];

    this.state = {
      title: pathname,
      url: urls[pathname],
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <iframe
              title={this.state.title}
              className="iframe-content"
              src={this.state.url}
              frameBorder="0"
            ></iframe>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Reports;
