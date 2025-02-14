import React from "react";
import { Modal, Button } from "react-bootstrap";

class DisplayNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      notes: event.target.value,
    });
  };

  render() {
    console.log(this.props.notes, "these are notes");
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // style={}
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
            {/* {this.props.notes} */}

            {this.extractTextFromHTML(this.props.notes)}
          </textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.onSaveNotes(this.state.notes)}>
            Save
          </Button>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
       </div>
      </Modal>
    );
  }

  //  extractTextFromHTML(html) {
  //     // Remove HTML tags using regular expression
  //     const textContent = html?.replace(/<[^>]*>/g, '');
  //     // Replace &amp; with &
  //     const decodedContent = textContent?.replace(/&amp;/g, '&');
  //     return decodedContent;
  // }

  extractTextFromHTML(html) {
    // Remove HTML tags using regular expression
    let textContent = html?.replace(/<[^>]*>/g, "");
    // Replace &amp; with &
    textContent = textContent?.replace(/&amp;/g, "&");
    // Replace &lt; with <
    textContent = textContent?.replace(/&lt;/g, "<");
    // Replace &gt; with >
    textContent = textContent?.replace(/&gt;/g, ">");
    return textContent;
  }
}

export default DisplayNotes;
