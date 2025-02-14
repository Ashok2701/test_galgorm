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
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        CONFIRMATION
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.confirmMessage}
                </Modal.Body>
                <Modal.Footer>
                    {this.props.warning ? '' : <Button onClick={() => this.props.DeleteConfirmedDocs()}>{'Yes'}</Button>}
                    <Button onClick={this.props.onHide}>{this.props.warning ? 'OK' : 'No'}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Confirm;