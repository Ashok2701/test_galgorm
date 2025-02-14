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
                <Modal.Header style={{backgroundColor : "#0275d8"}}>
                    <Modal.Title id="contained-modal-title-vcenter" style={{color : "white"}}>
                       {this.props.enableOk ? 'Information' : 'Confirmation'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor : "#fff"}}>
                    {this.props.message}
                </Modal.Body>
                <Modal.Footer style={{backgroundColor : "#fff"}}>
                    {this.props.    enableOk ?
                        <Button onClick={() => this.props.onHide()}>Ok</Button>
                        :
                        <>

                            <Button onClick={() => this.props.onUpdate('evnt', "updateVehicle")}>{'Replace'} </Button>
                            <Button onClick={() => this.props.onHide()}>Close</Button>

                        </>
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

export default DisplayCheckedTrip;