import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';


class Confirm extends React.Component {
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
                        <span className='text-white'>{this.props.warning ? 'Alert' : 'CONFIRMATION'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.confirmMessage}
                </Modal.Body>
                <Modal.Footer>
                    {this.props.warning ? '' : <Button onClick={() => this.props.confirmTrip(this.props.trip)}>Yes</Button>}
                    <Button onClick={this.props.onHide}>{this.props.warning ? 'OK' : 'No'}</Button>
                </Modal.Footer>
            </div>
            </Modal>
        );
    }
}

export default Confirm;