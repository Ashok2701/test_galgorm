import React from 'react';
import {withNamespaces} from 'react-i18next';
import mockData from './RailRouteMockData.json';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  ButtonGroup,
  Button,
  Input,
  Label,
  FormGroup,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";

class RailRoutes extends React.Component {



  getColor(style) {
    var myStr = style;
    var subStr = myStr.match("background-color:(.*)");
    var s = subStr[1];
    return s;
  }




         SearchTrailer = e => {
              
              this.props.updateTrailSearchTerm(e);
          }



    render() {
  
        return (
        <TabPane tabId="RailRoutes">
                                             <Row className="my-2">
                                               <Col md="4">
                                                 <FormGroup className="mb-0">
                                                   <Input
                                                     bsSize="sm"
                                                     type="search"
                                                     placeholder={this.props.t("SearchCaption")}
                                                     className="form-control"
                                                     onChange = {this.SearchTrailer}
                                                   />
                                                 </FormGroup>
                                               </Col>
                                             </Row>
            <div class="reportlist-view tableCustomFixHead1" style={{ height: 220 }}>
                <table class={this.props.allowedTrailers != '' ? 'table table-hover' : "table table-striped"}>
                    <thead class="custom-sort">
                        <tr>
                             <th onClick={() => this.props.sortTrailer('railroutecode', 0)}>
                                                           {this.props.t("Rail RouteCode")}  {this.props.trailOrder[0] === 1 ? "▼" : "▲"}
                                                       </th>
                                                        <th onClick={() => this.props.sortTrailer('des', 8)}>
                                                           Description  {this.props.trailOrder[1] === 8 ? "▼" : "▲"}
                                                         </th>
                                                       <th onClick={() => this.props.sortTrailer('type', 1)}>
                                                           Type  {this.props.trailOrder[1] === 1 ? "▼" : "▲"}
                                                       </th>
                                                       <th onClick={() => this.props.sortTrailer('carrier', 2)}>
                                                           Carrier {this.props.trailOrder[2] === 1 ? "▼" : "▲"}
                                                       </th>
                                                       <th onClick={() => this.props.sortTrailer('ddate', 6)}>
                                                               {this.props.t("Effective Date")}  {this.props.trailOrder[6] === 1 ? "▼" : "▲"}
                                                        </th>
                                                        <th onClick={() => this.props.sortTrailer('adate', 7)}>
                                                           {this.props.t("Expiried Date")}  {this.props.trailOrder[6] === 1 ? "▼" : "▲"}
                                                         </th>
                                                       <th  onClick={() => this.props.sortTrailer('FromAdd', 3)}>
                                                          From Address {this.props.trailOrder[3] === 1 ? "▼" : "▲"}
                                                       </th>
                                                       <th onClick={() => this.props.sortTrailer('ToAdd', 4)}>
                                                           {this.props.t("To Address")}  {this.props.trailOrder[4] === 1 ? "▼" : "▲"}
                                                       </th>
                                                       <th onClick={() => this.props.sortTrailer('status', 5)}>
                                                            {this.props.t("Status")}   {this.props.trailOrder[5] === 1 ? "▼" : "▲"}
                                                       </th>

                        </tr>
                    </thead>
                    <tbody>

                        {mockData.map((trail, i) => (
                            <tr id={'trailer' + i}

                                draggable={trail.type === 'open' ? "true" : "true"}
                                onDragStart={(event) =>
                                    this.props.handleDragStart(event, trail, 'trailer', i)
                                }
                                key={'trailer' + i}
                                 style={{ backgroundColor: this.getColor(trail.color) }}

                            >

                                <td>{trail.railroutecode}</td>
                                <td>{trail.des}</td>
                                <td>{trail.type}</td>
                                <td>{trail.carrier}</td>
                                <td>{trail.effdate}</td>
                                <td>{trail.expdate}</td>
                                 <td>{trail.FromAdd}</td>
                                  <td>{trail.ToAdd}</td>
                                <td>{trail.status}</td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </TabPane>
        );
    }
}

export default withNamespaces()(RailRoutes);