import { th } from 'date-fns/locale';
import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { withTranslation } from 'react-i18next';



class DisplayEquipments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  quantity: null}
    }
    render() {
        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {'Equipment_Details'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {(() => {
                        if (this.props.quantityMessage) {
                           return (
                            <div class="alert alert-success" role="alert">
                                {this.props.quantityMessage}
                            </div>
                           );
                        }
                })()}
                <table class="table table-striped m-0">
                    <thead>
                        <tr class="">
                            <th width="6%">Equipement</th>
                            <th width="6%">Description</th>
                            <th width="6%">Type</th>
                            <th width="6%">Poids</th>
                            <th width="6%">Volume</th>
                            <th width="6%">Qte</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(() => {
                            if (this.props.displayEdit) {
                                return (
                                    (this.props.equipments || []).map((equipment, i) => {
                                        return (
                                            <tr key={i}>
                                                <td width="6%">{ equipment.xequipid}</td>
                                                <td width="6%">{ equipment.xdescript}</td>
                                                <td width="6%">{ equipment.xequiptyp}</td>
                                                <td width="6%">18000</td>
                                                <td width="6%">15000</td>
                                                <td width="6%">
                                                    <input min={1}
                                                        type="number"
                                                        name="quantity"
                                                        value= {this.state.quantity ? this.state.quantity : equipment.quantity}
                                                        onChange={(event) =>
                                                            this.props.handleChange(event.target.value, i)
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"
                                                        onClick={()=> this.props.deleteEquip(i)}>
                                                            <i class="fa fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                );
                            }else {
                                return (
                                    (this.props.equipments || []).map((equipment, i) => {
                                        return (
                                            <tr>
                                                <td width="6%">{ equipment.xequipid}</td>
                                                <td width="6%">{ equipment.xdescript}</td>
                                                <td width="6%">{ equipment.xequiptyp}</td>
                                                <td width="6%">18000</td>
                                                <td width="6%">15000</td>
                                                <td width="6%">
                                                    {equipment.quantity}
                                                </td>
                                            </tr>
                                        );
                                    })
                                );
                            }
                        })()}
                    </tbody>
                </table>
                <hr class="m-0 p-0" />
                    {(() => {
                        if (this.props.equipments && this.props.equipments.length <= 0) {
                           return (
                                <div class="col-md-12">
                                   {'Equipment_configure'}
                                </div>
                           );
                        }
                    })()}
            </Modal.Body>
            <Modal.Footer>
                {(() => {
                        if (this.props.displayEdit && (this.props.equipments && this.props.equipments.length > 0)) {
                           return (
                            <Button onClick={() => this.props.onSaveEquipment(this.props.actualTrip)}>Save</Button>
                           );
                        }
                })()}

                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default DisplayEquipments;