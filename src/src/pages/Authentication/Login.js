import React, { Component } from 'react';
import history from '../../History';
import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

import { Row, Col, Input, Button, Alert, Container, Label, FormGroup } from "reactstrap";

// Redux
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {withNamespaces} from 'react-i18next';
// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';

// actions
import { checkLogin, apiError ,loginUserSuccessful, logoutUserSuccess} from '../../store/actions';

// import images
import logodark from "../../assets/images/logo.png";
import fsmImage from "../../assets/images/FMS_Login_Page.jpg";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {  username : "", password : "" }
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log("inside Auth/Login.js");
    }

    handleSubmit(event, values) {
        console.log("T1 inside handlesubmit after login clicked",values);
        this.props.checkLogin(values, this.props.history);
       // this.login(values.username,values.password);
    }


     login(username, password) {
         console.log("T1 inside login - login() ")
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            };

            return fetch('/api/v1/user/login', requestOptions)
                .then(this.handleResponse)
                .then(user => {
                    console.log("T1 inside login-after fetch",user)
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem("authUser", JSON.stringify(user));
                   // localStorage.setItem("user", JSON.stringify(user));
                     this.props.loginUserSuccessful(user);
                   // this.setState({ login: true });
                  // this.props.loginUserSuccessful(user);
                }).then(user => {
                    history.push('/scheduler2');
                    //return user;
                }).catch(error => {
                  //  yield put(apiError(error));

                });
        }



        handleResponse(response) {
            console.log("T1 inside handleResponse",response)
            return response.text().then(text => {
                const data = text && JSON.parse(text);
                if (!response.ok) {
                    if (response.status === 401) {
                        // auto logout if 401 response returned from api
                        //logout();
                        //location.reload(true);
                    }
                    const error = (data && data.message) || response.statusText;

                    return Promise.reject(error);
                }
                 console.log("T1 inside handleRespobse-after",data);
                return data;
            });
        }





    componentDidMount(){
        this.props.apiError("");
        document.body.classList.add("auth-body-bg");
        console.log("inside Aut/login componentDidMount");
    }

    componentWillUnmount(){
        document.body.classList.remove("auth-body-bg");
    }

    render() {

        return (
            <React.Fragment>
                <div className="home-btn d-none d-sm-block">
                    <Link to="/"><i className="mdi mdi-home-variant h2 text-white"></i></Link>
                </div>
                
                <div>
            <Container fluid className="p-0">
                <Row className="no-gutters">

                    <Col lg={8}>
                        <div className="authentication-bg">
                            <div className="bg-overlay"></div>
                        </div>
                    </Col>
                    <Col lg={4}>
                                            <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                                                <div className="w-100">
                                                    <Row className="justify-content-center">
                                                        <Col lg={9}>
                                                            <div>
                                                                <div className="text-center">
                                                                    <div>
                                                                        <Link to="/" className="logo"><img src={logodark} height="60" alt="logo"/></Link>
                                                                    </div>

                                                                    <h4 className="font-size-18 mt-4">Welcome to Field Service Management!</h4>
                                                                    <p>Please sign-in to your account and start the adventure</p>
                                                                </div>


                                                                {this.props.loginError && this.props.loginError ? <Alert color="danger">{this.props.loginError}</Alert> : null }

                                                                <div className="p-2 mt-5">
                                                                    <AvForm className="form-horizontal" onValidSubmit={this.handleSubmit} >

                                                                        <FormGroup className="auth-form-group-custom mb-4">
                                                                            <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                                            <Label htmlFor="username">{this.props.t('Username')}</Label>
                                                                            <AvField name="username" value={this.state.username} type="text" className="form-control" id="username" validate={{required: true}} placeholder={this.props.t('EnterUsername')}/>
                                                                        </FormGroup>

                                                                        <FormGroup className="auth-form-group-custom mb-4">
                                                                            <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                                                            <Label htmlFor="userpassword">{this.props.t('Password')}</Label>
                                                                            <AvField name="password" value={this.state.password} type="password" className="form-control" id="userpassword" validate={{required: true}} placeholder={this.props.t('EnterPassword')}/>
                                                                        </FormGroup>

                                                                        <div className="custom-control custom-checkbox">
                                                                            <Input type="checkbox" className="custom-control-input" id="customControlInline"/>
                                                                            <Label className="custom-control-label" htmlFor="customControlInline">{this.props.t('RememberMe')}</Label>
                                                                        </div>

                                                                        <div className="mt-4 text-center">
                                                                            <Button color="primary" className="w-md waves-effect waves-light" type="submit">{this.props.t('LogIn')}</Button>
                                                                        </div>

                                                                        <div className="mt-4 text-center">
                                                                            <Link to="/forgot-password" className="text-muted"><i className="mdi mdi-lock mr-1"></i>{this.props.t('forgetpassword')}</Link>
                                                                        </div>
                                                                    </AvForm>
                                                                </div>

                                                                <div className="mt-5 text-center">
                                                                    <p>© 2020 TBS. Powered by Tema Business Systems Pvt Ltd</p>
                                                                </div>
                                                            </div>

                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </Col>
                </Row>
            </Container>
        </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const { loginError } = state.Login;
    return { loginError };
}

export default withNamespaces()(withRouter(connect(mapStatetoProps, { checkLogin, apiError })(Login)));