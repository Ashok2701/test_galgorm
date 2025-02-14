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
      "trackInventory" : process.env.REACT_APP_TRACK_INVENTORY_SITE,
    };
    const pathname = window.location.pathname.split("/")[2];

    this.state = {
      title: pathname,
      url: urls[pathname],
      userid : '',
    };
  }

  componentDidMount() {


        var user = JSON.parse(localStorage.getItem("authUser"));
        this.setState({
           userid : user.username
        })
        }



  render() {

 const  trackInventory = "http://tbsi.tema-systems.com:8089/scriptcase/app/TMS_DEMOTMSFR/TRACK_01/?USERID=" + this.state.userid;
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {this.state.title === 'trackInventory' ?
            <iframe
                          title={this.state.title}
                          className="iframe-content"
                          src={trackInventory}
                          frameBorder="0"
                          width="100%" height="100%"
                        ></iframe>
            :
            <iframe
              title={this.state.title}
              className="iframe-content"
              src={this.state.url}
              frameBorder="0"
              width="100%" height="100%"
            ></iframe>
            }
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Reports;
