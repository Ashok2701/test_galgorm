import React, { Component } from "react";
import { Container } from "reactstrap";

import "./map.scss";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <iframe
              title="Map"
              className="iframe-content"
              src={process.env.REACT_APP_MAP_VIEW}
              frameBorder="0"
            ></iframe>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Map;
