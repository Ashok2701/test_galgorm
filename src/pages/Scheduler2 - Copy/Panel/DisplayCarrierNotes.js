import React from "react";
import { Modal, Button } from "react-bootstrap";

class DisplayCarrierNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.windowOffset = 0;
  }

  handleChange = (event) => {
    this.setState({
      notes: event.target.value,
    });
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="bg-white">
        <Modal.Header className="modal-header-bg">
          <Modal.Title id="contained-modal-title-vcenter">
            <span className="text-white">Message</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            name="notes"
            rows="10"
            className="form-control"
            onChange={(event) => this.handleChange(event)}
          >
            {this.props.notes}
          </textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() =>
              this.props.onSaveCarrierNotes(this.state.notes, this.props.type)
            }
          >
            Save
          </Button>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
        </div>
      </Modal>
    );
  }
}

export default DisplayCarrierNotes;
