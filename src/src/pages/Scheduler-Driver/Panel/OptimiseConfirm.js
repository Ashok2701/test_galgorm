import React from 'react';
import {Modal, Button} from 'react-bootstrap';


class OptimiseConfirm extends React.Component {
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
                CONFIRMATION
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.props.confirmMessage}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => this.props.optimiseConfirm(this.props.index)} >Yes</Button>
                <Button onClick={this.props.onHideOptimiseWin}>No</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default OptimiseConfirm;