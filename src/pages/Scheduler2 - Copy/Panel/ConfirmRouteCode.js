import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';


class ConfirmRouteCode extends React.Component {
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.warning ? 'WARNING' : 'CONFIRMATION'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.confirmMessage}
                </Modal.Body>
                <Modal.Footer>
                    {this.props.warning ? '' : <Button onClick={this.props.onConfirm}>{'Yes'}</Button>}
                    <Button onClick={this.props.onCancel}>{this.props.warning ? 'OK' : 'No'}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}



export default ConfirmRouteCode;