import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';

class DisplayCarrierNotes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.windowOffset  = 0
    }

    handleChange = (event)  => {
        this.setState({
            notes: event.target.value

         });
    }

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
                    Message
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                    <textarea name="notes" rows="10" className="form-control"
                        onChange={(event) => this.handleChange(event) }
                    >
                        {this.props.notes}
                    </textarea>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => this.props.onSaveCarrierNotes(this.state.notes , this.props.type )}>{this.props.t('Save')}</Button>
                <Button onClick={this.props.onHide}>{this.props.t('Close')}</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default withNamespaces()(DisplayCarrierNotes);