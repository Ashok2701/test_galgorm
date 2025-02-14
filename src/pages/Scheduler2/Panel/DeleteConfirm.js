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
        <div className='bg-white'>
        <Modal.Header className='modal-header-bg'>
                <Modal.Title id="contained-modal-title-vcenter">
                   <span className='text-white'> Confirmation</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.props.confirmMessage}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => this.props.confirmDelete(this.props.index, this.props.docnum)}>Yes</Button>
                <Button onClick={this.props.onHide}>{'No'}</Button>
            </Modal.Footer>
        </div>
            </Modal>
        );
    }
}

export default  withNamespaces()(DeleteConfirm);