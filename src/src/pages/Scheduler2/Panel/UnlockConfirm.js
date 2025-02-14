import React from 'react';
import {Modal, Button} from 'react-bootstrap';


class UnlockConfirm extends React.Component {
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
                {this.props.lock ? 'Warning' : 'Confirm'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.props.confirmMessage}
            </Modal.Body>
            <Modal.Footer>
                {this.props.lock ?'' : <Button onClick={() => this.props.unlockConfirm(this.props.index)} >Yes</Button>}
                <Button onClick={this.props.onHide}>{this.props.lock ? 'Close' : 'No'}</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default UnlockConfirm;