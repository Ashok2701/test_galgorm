import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';


class ConfirmCOL extends React.Component {
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
                        {this.props.warning ? 'Warning' : 'CONFIRMATION'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.confirmMessage}
                </Modal.Body>
                <Modal.Footer>
                    {this.props.warning ? '' : <Button onClick={() => this.props.confirmCOLTrip(this.props.trip)}>{this.props.t('Yes')}</Button>}
                    <Button onClick={this.props.onHide}>{this.props.warning ? 'OK' : this.props.t('No')}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default withNamespaces()(ConfirmCOL);