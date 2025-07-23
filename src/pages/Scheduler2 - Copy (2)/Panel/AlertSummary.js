import React from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class AlertSummary extends React.Component {
  render() {
    const errorMessagesArray = this.props.errorArrayMessage;
    const errorSummartMessage = this.props.errorSummartMessage;
    
  

    return (
      <Modal
        {...this.props}
        size="lg"
        fullscreen="lg-down"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="modal-header-bg">
          <Modal.Title id="contained-modal-title-vcenter">
            <span className="text-white">Summary</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white">
          {errorSummartMessage.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {errorSummartMessage.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  fontSize: "20px",
                  flexWrap: "wrap",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {msg.trim()}
              </div>
            ))}
          </div>
          ) : (
            <div></div> // In case errorMessage is not an array
          )}

          <div
        
            style={{
              color: "black",
              fontSize: "18px",
              fontWeight: "bolder",
              marginTop: "30px",
            }}
          >
            Exception List
          </div>
          <hr />

          {/* {errorMessagesArray.length > 0 ? (
                           errorMessagesArray.map((msg, index) => (
                             <div key={index} style={{fontSize : "16px", marginBottom: '10px', whiteSpace: 'pre-line',flexWrap:"wrap" }}>{msg}</div>
                           ))
                         ) : (
                           <div>No exceptions found</div> // In case errorMessage is not an array
                         )} */}

          {errorMessagesArray.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
             { errorMessagesArray.map((msg, index) => (
              <div
                key={index}
                style={{
                  fontSize: "16px",
                  overflow: "hidden", // Prevent horizontal overflow
                }}
              >
             {msg.trim()}
              </div>
            ))}
          </div>
          ) : (
            <div>No exceptions found</div> // In case errorMessage is not an array
          )}
        </Modal.Body>
        <Modal.Footer className="bg-white">
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AlertSummary;
