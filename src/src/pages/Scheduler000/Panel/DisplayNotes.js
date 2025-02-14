import React from 'react';
import {Modal, Button} from 'react-bootstrap';


class DisplayNotes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: ""
        };
        this.handleChange = this.handleChange.bind(this);
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
            <Modal.Header closeButton>
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
                <Button onClick={() => this.props.onSaveNotes(this.state.notes)}>Save</Button>
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default DisplayNotes;