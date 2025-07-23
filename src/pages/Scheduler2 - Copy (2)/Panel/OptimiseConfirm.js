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
         <div className='bg-white'>
         <Modal.Header className='modal-header-bg'>
                <Modal.Title id="contained-modal-title-vcenter">
                <span className='text-white'>CONFIRMATION</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.props.confirmMessage}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => this.props.optimiseConfirm(this.props.index)} >Yes</Button>
                <Button onClick={this.props.onHideOptimiseWin}>No</Button>
            </Modal.Footer>
         </div>
            </Modal>
        );
    }
}

export default OptimiseConfirm;