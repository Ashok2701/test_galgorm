import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

//i18n
import i18n from '../../../i18n';
import { withNamespaces } from 'react-i18next';

// falgs
import usFlag from "../../../assets/images/flags/us.jpg";
import spain from "../../../assets/images/flags/spain.jpg";
import germany from "../../../assets/images/flags/germany.jpg";
import italy from "../../../assets/images/flags/italy.jpg";
import russia from "../../../assets/images/flags/russia.jpg";
import france from "../../../assets/images/flags/french.jpg";

class LanguageDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      lng : "English",
      flag : usFlag
    };
    this.toggle = this.toggle.bind(this);
    this.changeLanguageAction.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      menu: !prevState.menu
    }));
  }

  changeLanguageAction = (lng) => {
    
  //set the selected language to i18n
  i18n.changeLanguage(lng);

  if(lng === "sp")
      this.setState({lng : "Spanish", flag : spain });
  else if(lng === "gr")
      this.setState({lng : "German", flag : germany });
  else if(lng === "rs")
       this.setState({lng : "Russian", flag : russia });
  else if(lng === "it")
       this.setState({lng : "Italian", flag : italy });
  else if(lng === "eng")
       this.setState({lng : "English", flag : usFlag });
  else if(lng === "fr")
         this.setState({lng : "French", flag : france });
 }

  render() {

    return (
      <React.Fragment>
                        <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="d-sm-inline-block">
                            <DropdownToggle tag="button" className="btn header-item waves-effect">
                                <img className="" src={this.state.flag} alt="Header Language" height="16"/>{'  '}
                                <span className="align-middle">{this.state.lng}</span>
                            </DropdownToggle>

                            <DropdownMenu right>

                                <DropdownItem active={this.state.lng === "English" ? true : false } href="" onClick={() => this.changeLanguageAction('eng')} className="notify-item">
                                    <img src={usFlag} alt="user" className="mr-1" height="12"/> <span className="align-middle">English</span>
                                </DropdownItem>
                                 <DropdownItem href="" active={this.state.lng === "French" ? true : false } onClick={() => this.changeLanguageAction('fr')} className=" notify-item">
                                                                    <img src={france} alt="user" className="mr-1" height="12"/> <span className="align-middle">French</span>
                                                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
      </React.Fragment>
    );
  }
}

export default withNamespaces()(LanguageDropdown);
