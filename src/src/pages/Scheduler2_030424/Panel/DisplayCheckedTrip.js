import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';

class DisplayCheckedTrip extends React.Component {
    // state = {
    //     password: ''
    // }
    // onPasswordChange = (event) => {
    //     this.setState({ password: event.target.value })
    // }

    render() {
        return (
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                       {this.props.enableOk ? 'Information' : 'Confirmation'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.message}
                </Modal.Body>
                <Modal.Footer>
                    {this.props.enableOk ?
                        <Button onClick={() => this.props.onHide()}>Ok</Button>
                        :
                        <>
                            <Button onClick={() => this.props.onUpdate('evnt', "createVehicle")}>{'Create'}</Button>
                            <Button onClick={() => this.props.onUpdate('evnt', "updateVehicle")}>{'Replace'} </Button>
                        </>
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

export default DisplayCheckedTrip;