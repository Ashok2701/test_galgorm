import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Alert extends React.Component {

    render() {
        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                   Alert
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.props.errorMessage}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default Alert;