import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';


class DeleteConfirm extends React.Component {
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
                    Confirmation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.props.confirmMessage}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => this.props.confirmDelete(this.props.index, this.props.docnum)}>{'Yes'}</Button>
                <Button onClick={this.props.onHide}>{'No'}</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default  withNamespaces()(DeleteConfirm);