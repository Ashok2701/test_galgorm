import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';

class DisplayTrailers extends React.Component {

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
                        {'Trailer_Details'}
                     </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table class="table table-striped m-0">
                        <thead>
                            <tr class="">
                                <th width="6%">Remorque</th>
                                <th width="6%">Description</th>
                                <th width="6%">Model</th>
                                <th width="6%">Poids</th>
                                <th width="6%">Volume</th>
                                <th width="6%"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {(this.props.trailers || []).map((trail, i) => {
                                return (
                                    <tr key={i}>
                                        <td width="6%">{trail.trailer}</td>
                                        <td width="6%">{trail.des}</td>
                                        <td width="6%">{trail.model}</td>
                                        <td width="6%">{trail.maxlovol} {trail.xmaxlovol}</td>
                                        <td width="6%">{trail.maxloams} {trail.xmaxloams}</td>
                                        <td>
                                            {this.props.displayEdit ?
                                                <button class="btn btn-danger btn-sm rounded-0"
                                                    type="button" data-toggle="tooltip"
                                                    data-placement="top" title="Delete"
                                                    onClick={() => this.props.deleteTrail(i)}>
                                                    <i class="fa fa-trash"></i>
                                                </button> : ''
                                            }
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <hr class="m-0 p-0" />
                    {(() => {
                        if (this.props.trailers && this.props.trailers.length <= 0) {
                            return (
                                <div class="col-md-12">
                                   {'TrailerNotification'}
                                </div>
                            );
                        }
                    })()}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default DisplayTrailers;