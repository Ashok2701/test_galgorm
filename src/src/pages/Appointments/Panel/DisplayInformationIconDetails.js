import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import Vehicles from './Vehicles';


class DisplayInformationIconDetails extends React.Component {

    objFunc = () => {
        let x = '';
        for (let [key, value] of Object.entries(this.props.data)) {
            x = x + `<p>${key}: ${value}<p>`;
        }
        return x;
    }
    render() {
        return (
            <Modal
                {...this.props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {(this.props.dataType === 'object' && this.props.docNum) && this.props.docNum}
                        {this.props.warning && 'Warning'}
                        {this.props.dataName === 'vinfo' && 'Vehicle Information'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.dataType === 'object' ?
                        <div dangerouslySetInnerHTML={{ __html: this.objFunc() }} />
                        : this.props.data}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onInfoIconHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default DisplayInformationIconDetails;
