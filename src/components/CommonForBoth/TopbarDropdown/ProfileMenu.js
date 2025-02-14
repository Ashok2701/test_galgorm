import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

//i18n
import { withNamespaces } from "react-i18next";

// users
import avatar2 from '../../../assets/images/users/avatar-2.jpg';

class ProfileMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false,
        };
        this.toggle = this.toggle.bind(this);
    }


    toggle() {
        this.setState(prevState => ({
            menu: !prevState.menu
        }));
    }

    render() {
 var userinfo = JSON.parse(localStorage.getItem("authUser"));
 //let username =   localStorage.getItem("authUser").usrname;

        return (
            <React.Fragment>
                        <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="d-inline-block user-dropdown">
                            <DropdownToggle tag="button" className="btn header-item waves-effect" id="page-header-user-dropdown">
                                <img className="rounded-circle header-profile-user mr-1" src={avatar2} alt="Header Avatar"/>
                                <span className="d-none d-xl-inline-block ml-1 text-transform">{userinfo.usrname}</span>
                                <i className="mdi mdi-chevron-down d-none ml-1 d-xl-inline-block"></i>
                            </DropdownToggle>
                            <DropdownMenu right>

                                <DropdownItem className="text-danger" href="/logout"><i className="ri-shut-down-line align-middle mr-1 text-danger"></i> {this.props.t('Logout')}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
            </React.Fragment>
        );
    }
}

export default withNamespaces()(ProfileMenu);
