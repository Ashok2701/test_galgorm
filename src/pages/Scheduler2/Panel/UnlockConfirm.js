import React from "react";
import { Modal, Button } from "react-bootstrap";

class UnlockConfirm extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className='bg-white'>
          <Modal.Header className="modal-header-bg">
            <Modal.Title id="contained-modal-title-vcenter ">
            <span className="text-white">  {this.props.lock ? "Warning" : "Confirm"}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.confirmMessage}</Modal.Body>
          <Modal.Footer>
            {this.props.lock ? (
              ""
            ) : (
              <Button
                onClick={() => this.props.unlockConfirm(this.props.index)}
              >
                Yes
              </Button>
            )}
            <Button onClick={this.props.onHide}>
              {this.props.lock ? "Close" : "No"}
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  }
}

export default UnlockConfirm;
