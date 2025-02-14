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


class Equipments3 extends React.Component {

    dragStyle = (type) => {
        if (type === 'open') {
            return ("custom-enable");
        }
        return ("custom-disable");
    }


       SearchEquipment = e => {
                  console.log("search content= ",e.target.value);
                  this.props.updateEquSearchTerm(e);
              }



    render() {
        const equipmentList = this.props.curEquipments;

        return (
<TabPane tabId="Equipments">
                                    <Row className="my-2">
                                      <Col md="4">
                                        <FormGroup className="mb-0">
                                          <Input
                                            bsSize="sm"
                                            type="search"
                                            placeholder={this.props.t("SearchCaption")}
                                            className="form-control"
                                            onChange = {this.SearchEquipment}
                                          />
                                        </FormGroup>
                                      </Col>
                                    </Row>

            <div class="reportlist-view tableCustomFixHead1">
                <table class="table table-striped m-0">
                    <thead class="custom-sort">
                        <tr>
                             <th onClick={() => this.props.sortEquipement('xequipid', 0)}>
                                                           {this.props.t("Equipment")}   {this.props.equpOrder[0] === 1 ? "▼" : "▲"}
                                                        </th>
                                                        <th onClick={() => this.props.sortEquipement('xdescript', 1)}>
                                                           {this.props.t("Description")}  {this.props.equpOrder[1] === 1 ? "▼" : "▲"}
                                                        </th>
                                                        <th onClick={() => this.props.sortEquipement('xfcy', 4)}>
                                                            {this.props.t("Site")} {this.props.equpOrder[4] === 1 ? "▼" : "▲"}
                                                         </th>
                                                        <th onClick={() => this.props.sortEquipement('xequiptyp', 2)}>
                                                           {this.props.t("Type")}  {this.props.equpOrder[2] === 1 ? "▼" : "▲"}
                                                        </th>
                                                        <th onClick={() => this.props.sortEquipement('xcodeyve', 3)}>
                                                           {this.props.t("Connexion")}   {this.props.equpOrder[3] === 1 ? "▼" : "▲"}
                                                        </th>

                            {/* <th onClick = { () => this.props.sortEquipement('xequipid', 4)}>
                                                Coût des équipements {this.props.equpOrder[4] === 1 ? "▼" : "▲"}
                                            </th>
                                            <th onClick = { () => this.props.sortEquipement('xequipid', 5)}>
                                                Max poids chargement {this.props.equpOrder[5] === 1 ? "▼" : "▲"}
                                            </th>
                                            <th onClick = { () => this.props.sortEquipement('xequipid', 6)}>
                                                Max vol chargement {this.props.equpOrder[6] === 1 ? "▼" : "▲"}
                                            </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {(this.props.curEquipments || []).map((equipment, i) => (

                            <tr id={'equipment' + i}
                                // className= { this.dragStyle(equipment.type) }
                                // draggable= { equipment.type === 'open' ? "true" : "false"}
                                draggable={equipment.type === 'open' ? "true" : "true"}

                                onDragStart={(event) =>
                                    this.props.handleDragStart(event, equipment, 'equipment', i)
                                }
                                key={'equipment' + i}
                            >
                                <td >{equipment.xequipid}</td>
                                <td>{equipment.xdescript}</td>
                                <td>{equipment.xfcy}</td>
                                <td>{equipment.xequiptyp}</td>
                                <td>{equipment.xcodeyve}
                                </td>
                                {/* <td>300 USD
                                            </td>
                                            <td>18000
                                            </td>
                                            <td>15000
                                            </td>
                                         */}

                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
</TabPane>


        );
    }
}

export default withNamespaces()(Equipments3);