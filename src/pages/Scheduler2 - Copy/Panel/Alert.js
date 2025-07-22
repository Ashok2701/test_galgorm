import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class 
Alert extends React.Component {

    render() {
        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <div className="bg-white">
                <Modal.Header className='modal-header-bg ' >
                <Modal.Title id="contained-modal-title-vcenter">
                <span className='text-white'>   Alert</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.props.errorMessage}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
                </div>
          
            </Modal>
        );
    }
}

export default Alert;