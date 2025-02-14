import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class DisplayAuthentication extends React.Component {
    state = {
        password: ''
    }
    onPasswordChange = (event)=>{
        this.setState({password: event.target.value})
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Authentication
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please enter the password :
                    <input type='password'
                    onChange={(event) =>this.onPasswordChange(event)}></input><br/><br/>
                    {this.props.isValidPassword && this.props.isValidPassword === 'no' &&
                        <p style={{color: 'red'}}>*Please enter valid password*</p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.props.updatePassword(this.state.password)}>Yes</Button>
                    <Button onClick={this.props.onHide}>No</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default DisplayAuthentication;