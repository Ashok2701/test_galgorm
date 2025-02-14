
import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';


class ValidateConfirm extends React.Component {
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
                {this.props.lock ? 'Warning' : 'Confirmation '}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.props.confirmMessage}
            </Modal.Body>
            <Modal.Footer>
                {this.props.lock ?'' : <Button onClick={() => this.props.validateConfirm(this.props.index)} >{this.props.t('Yes')}</Button>}
                <Button onClick={this.props.onHide}>{this.props.lock ? 'Close' : this.props.t('No')}</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default withNamespaces()(ValidateConfirm);