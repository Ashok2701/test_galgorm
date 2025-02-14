import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class DisplayTomTomInfo extends React.Component {

    objFunc = () => {
        let x = '';
        for (let [key, value] of Object.entries(this.props.data)) {
            x = x + `${key}: ${value}</br>`;
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
                        {this.props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div dangerouslySetInnerHTML={{ __html: this.objFunc() }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onInfoIconHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default DisplayTomTomInfo;