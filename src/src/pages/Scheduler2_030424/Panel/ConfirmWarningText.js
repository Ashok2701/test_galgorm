import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';


class ConfirmWarningText extends React.Component {


addLineBreaks = string =>
  string.split(',').map((text, index) => (
    <React.Fragment key={`${text}-${index}`}>
      {text}
      <br />
    </React.Fragment>
  ));


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
                        {this.props.confirmMessage}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>


                     <textarea name="notes" rows="10" className="form-control"
                                                                                   >
                                             {(this.props.warningText).split(',').join('\n') }
                                        </textarea>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.props.confirmWarningAlertClose(this.props.index,this.props.tripcode)}>Yes</Button>
                    <Button onClick={this.props.onWarningAlertNo}>No</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ConfirmWarningText;