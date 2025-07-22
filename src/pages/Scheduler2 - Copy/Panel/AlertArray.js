import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class AlertArray extends React.Component {

    render() {




    const errorMessagesArray = this.props.errorArrayMessage;

        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header className='modal-header-bg'>
                <Modal.Title id="contained-modal-title-vcenter">
                    <span className='text-white'>Exception List</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-white' >
                 {errorMessagesArray.length > 0 ? (
                           errorMessagesArray.map((msg, index) => (
                             <div
                             style={{
                                fontSize: "16px",
                                marginBottom: '10px',
                                whiteSpace: 'pre-line',
                                flexWrap: "wrap",
                                wordWrap: "break-word",   // Ensure text breaks when it exceeds the container width
                                wordBreak: "break-word",  // Break long words if necessary
                                overflow: "hidden",       // Prevent horizontal overflow
                              }}
                             key={index}>{msg}</div>
                           ))
                         ) : (
                           <div>No errors found</div> // In case errorMessage is not an array
                         )}
            </Modal.Body>
            <Modal.Footer className='bg-white'>
                <Button className='button-custom' onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default AlertArray;