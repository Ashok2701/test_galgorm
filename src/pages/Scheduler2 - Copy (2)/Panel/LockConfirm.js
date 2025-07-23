import React from "react";
import { Modal, Button } from "react-bootstrap";

class LockConfirm extends React.Component {
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
           <span className="text-white">   {this.props.lock ? "Warning" : "Confirm"}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.confirmMessage}</Modal.Body>
          <Modal.Footer>
            {this.props.lock ? (
              ""
            ) : (
              <Button
                onClick={() =>
                  this.props.lockConfirm(this.props.index, this.props.itemCode)
                }
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

export default LockConfirm;
