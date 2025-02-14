'use strict';

import history from './History';
import common_en from './translations/en/common/translation.json';
import common_fr from './translations/fr/common/transalation.json';
import i18next from "i18next";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from '@material-ui/core/Tooltip';
import { withNamespaces } from 'react-i18next';
import './Login.css';

// backend url from .env
const apiUrl = process.env.REACT_APP_API_URL;


// tag::vars[]
const React = require('react'); // <1>
const ReactDOM = require('react-dom'); // <2>
// <3>

// end::vars[]

// tag::app[]
class Login extends React.Component { // <1>

    constructor(props) {
        super(props);
        localStorage.setItem('lng', 'fr');

        this.state = {
            username: '',
            password: '',
            submitted: false,
            login: false,
            errorFlag: false,
            lngEn: false,
            lngFr: true,

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.login(username, password);
        }
    }

    login(username, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };

        return fetch(`${apiUrl}/api/v1/user/login`, requestOptions)
            .then(this.handleResponse)
            .then(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes

                localStorage.setItem('user', JSON.stringify(user));

            }).then(user => {
                history.push('/home');
                return user;
            }).catch(error => {
                this.setState({ errorFlag: true });

            });
    }

    handleResponse(response) {
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
            return data;
        });
    }
    hadleLngClick = (lng) => {
        console.log("lng===>", lng)
        localStorage.setItem('lng', lng);
        i18next.init({
            interpolation: { escapeValue: false },  // React already does escaping
            lng: lng,
            resources: {
                en: {
                    common: common_en
                },
                fr: {
                    common: common_fr
                }
            }
        });
        if (lng === 'en') {
            this.setState({ lngEn: true })
            this.setState({ lngFr: false })
        } else {
            this.setState({ lngFr: true })
            this.setState({ lngEn: false })
        }
    }

    render() { // <3>

        console.log("lng- issue 1:", this.state.lngFr + ", " + this.state.lngEn);
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div id="wrapper">
                <div className="container-fluid login-bg">
                    {/* <div class="container"> */}
                    <div class="row no-gutters  my-auto">
                        <div class="col-md-7">
                        </div>
                        <div class="col-md-5 login">
                            <form class="form half-size" name="form" style={{ padding: '100px 25px' }} onSubmit={this.handleSubmit}>
                                <div class="flag-lang"  >
                                    <Tooltip title="Eng">
                                        <Avatar className="flags flag-en" style={{ marginTop: '-2px', paddingBottom: '0px' }}
                                            onClick={() => this.hadleLngClick("en")} variant="square" alt="Example Alt" src="/assets/img/en.png" />
                                    </Tooltip>
                                    &nbsp;&nbsp;&nbsp;

                                    <Tooltip title="Fr">
                                        <Avatar className="flags flag-fr" style={{ marginTop: '-2px', paddingBottom: '0px' }}
                                            onClick={() => this.hadleLngClick("fr")} variant="square" alt="Example Alt" src="/assets/img/fr.png" />
                                    </Tooltip>
                                </div>
                                <h2>{this.props.t('SignIn')}</h2>
                                {this.state.errorFlag &&
                                    <p>{this.props.t('userlogin')}</p>
                                }
                                <div class="control">
                                    <label class="label" for="name">{this.props.t('userid')}</label>
                                    <input type="text" class="input" name="username" value={username} onChange={this.handleChange} />
                                    {submitted && !username &&
                                        <div class="help-block">{this.props.t('USERID is required')}</div>
                                    }
                                </div>
                                <div class="control">
                                    <label class="label" for="pass">{this.props.t('password')}</label>
                                    <input type="password" class="input" name="password" value={password} onChange={this.handleChange} />
                                    {submitted && !password &&
                                        <div class="help-block">{this.props.t('Password is required')}</div>
                                    }
                                </div>
                                {/* <div class="control">
                                       <button onClick={()=>this.hadleLngClick("en")}>English</button>
                                       <button onClick={()=>this.hadleLngClick("fr")}> French</button>
                                    </div> */}
                                <div class="submit">
                                    <input class="btn btn-info btn-block" type="submit" value={this.props.t('SignIn')} />
                                </div>
                            </form>
                        </div>

                        <div class="col-md-7">
                            <div class="content">

                            </div>
                        </div>

                    </div>
                    {/* </div> */}
                </div>

            </div>


        );
    }
}
// end::app[]

export default withNamespaces()(Login);
