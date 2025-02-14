import React from 'react';
import {withNamespaces} from 'react-i18next';
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

class Trailers3 extends React.Component {


    dragStyle = (type) => {
        if (type === 'open') {
            return ("custom-enable");
        }
        return ("custom-disable");
    }

       getBgcolor(type,style) {
        if (this.props.vehicleDropped) {
            if (this.props.allowedTrailers && !this.props.allowedTrailers.includes(type)) {

                  return '';
            }
            else {

               return '#feff99';
            }
}
else {
        var myStr = style;
                          var subStr = myStr.match("background-color:(.*)");
                          var s = subStr[1];
                          return s;
}
        }


         SearchTrailer = e => {
              console.log("search content= ",e.target.value);
              this.props.updateTrailSearchTerm(e);
          }



    render() {
  console.log("T22 inside Trailer",this.props);
        return (
        <TabPane tabId="Trailers">
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
                             <th onClick={() => this.props.sortTrailer('trailer', 0)}>
                                                           {this.props.t("Trailer")}  {this.props.trailOrder[0] === 1 ? "▼" : "▲"}
                                                       </th>
                                                       <th onClick={() => this.props.sortTrailer('des', 1)}>
                                                           Desc  {this.props.trailOrder[1] === 1 ? "▼" : "▲"}
                                                       </th>
                                                       <th onClick={() => this.props.sortTrailer('fcy', 2)}>
                                                           Site {this.props.trailOrder[2] === 1 ? "▼" : "▲"}
                                                       </th>
                                                       <th  onClick={() => this.props.sortTrailer('typ', 3)}>
                                                          Type {this.props.trailOrder[3] === 1 ? "▼" : "▲"}
                                                       </th>
                                                       <th onClick={() => this.props.sortTrailer('model', 4)}>
                                                           {this.props.t("Model")}  {this.props.trailOrder[4] === 1 ? "▼" : "▲"}
                                                       </th>
                                                       <th onClick={() => this.props.sortTrailer('maxloams', 5)}>
                                                            {this.props.t("Capacity")}   {this.props.trailOrder[5] === 1 ? "▼" : "▲"}
                                                       </th>
                                                       <th onClick={() => this.props.sortTrailer('maxlovol', 6)}>
                                                            {this.props.t("Volume")}  {this.props.trailOrder[6] === 1 ? "▼" : "▲"}
                                                       </th>
                        </tr>
                    </thead>
                    <tbody>

                        {(this.props.curTrails || []).map((trail, i) => (
                            <tr id={'trailer' + i}
                                className= { this.dragStyle(trail.type) }
                                draggable={trail.type === 'open' ? "true" : "true"}
                                 style={{ backgroundColor: this.props.allAllowedTrailers === 'YES' ? '#feff99' : this.getBgcolor(trail.typ,trail.color) }}
                                onDragStart={(event) =>
                                    this.props.handleDragStart(event, trail, 'trailer', i)
                                }
                                key={'trailer' + i}

                            >

                                <td>{trail.trailer}</td>
                                <td>{trail.des}</td>
                                <td>{trail.fcy}</td>
                                <td>{trail.typ}</td>
                                <td>{trail.model}</td>
                                <td>{trail.maxloams} {trail.xmaxloams}</td>
                                <td>{trail.maxlovol} {trail.xmaxlovol}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </TabPane>
        );
    }
}

export default withNamespaces()(Trailers3);