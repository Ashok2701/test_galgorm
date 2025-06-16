import React, { Component } from 'react';
import { Col, Card, CardBody } from "reactstrap";

class MiniWidgets extends Component {



   getIcon = (i) => {
       switch(i) {
        case 0: return "ri-user-follow-line"
        case 1: return "ri-route-line";
        case 2: return "ri-checkbox-circle-line";
        case 3: return "ri-close-circle-line";
        }
   }

    getTitle = (i) => {
       switch(i) {
        case 0: return "Active Technicians";
        case 1: return "Total Routes";
        case 2: return "Planned Orders";
        case 3: return "Open Orders";
        }
   }

      getValue = (i) => {
          switch(i) {
           case 0: return (this.props.reports && this.props.reports.techcount)
           case 1: return (this.props.reports && this.props.reports.routecount)
           case 2: return (this.props.reports && this.props.reports.opencount)
           case 3: return (this.props.reports && this.props.reports.nonOpencount)
           }
      }


    render() {
      
        return (
            <React.Fragment>
                {
                    this.props.itemcount.map((report, key) =>
                        <Col key={key} md={3}>
                            <Card>
                                <CardBody>
                                    <div className="d-flex" style={{justifyContent: "space-between"}}>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-truncate font-size-14 mb-2">{this.getTitle(key)}</p>
                                            <h4 className="mb-0">{this.getValue(key)}</h4>
                                        </div>
                                        <div className="text-primary">
                                            <i className={this.getIcon(key) + " font-size-24"}></i>
                                        </div>
                                    </div>
                                </CardBody>

                            </Card>
                        </Col>
                    )
                }
            </React.Fragment>
        );
    }
}

export default MiniWidgets;