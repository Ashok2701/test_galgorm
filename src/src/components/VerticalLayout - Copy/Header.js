import React, { Component } from "react";
import moment from 'moment';
import "flatpickr/dist/themes/material_green.css";
import MultiSelect from './MultiSelect';
import Flatpickr from "react-flatpickr";
import { connect } from "react-redux";
import {
  Button,  FormGroup,
           Form
} from "reactstrap";

import { Link } from "react-router-dom";

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import SideNav from "./SideNav";
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

//Import i18n
import { withNamespaces } from "react-i18next";

// Redux Store
import { toggleRightSidebar } from "../../store/actions";

//Import logo Images
import logosmdark from "../../assets/images/logo.png";
import logodark from "../../assets/images/logo.png";
import logosmlight from "../../assets/images/logo.png";
import logolight from "../../assets/images/logo.png";


class Header extends Component {
  constructor(props) {
    super(props);
     localStorage.setItem('sites', '');
     localStorage.setItem('Date', moment(new Date()).format('YYYY-MM-DD'));
    this.state = {
      isSearch: false,
      isSocialPf: false,

    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleRightbar = this.toggleRightbar.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.setCurrentSite = this.setCurrentSite.bind(this);
  }
  /**
   * Toggle sidebar
   */
  toggleMenu() {
    this.props.toggleMenuCallback();
  }

  /**
   * Toggles the sidebar
   */
  toggleRightbar() {
    this.props.toggleRightSidebar();
  }

  toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }



     setCurrentSite(selectedOption) {
        console.log("selected sites are ",selectedOption);
        var currSelected = {};
        this.state.sites && this.state.sites.map((site) => {
          if (selectedOption[0] === site.id) {
            currSelected = site;
            currSelected.city = site.value;
          }
        });
        console.log("selected option =",selectedOption);
        console.log("currentSelection option =",currSelected);
        this.setState({
         // selectedSite: currSelected,
          selectedMultipleSites: selectedOption
        });
      }


     setSelectedSites = (val) => {
           // this.props.handleSiteChange(val);
         console.log("selected site value =",val);
       //  this.setCurrentSite(val);
     //   var selSitesArr = [];
      //  var existingsite = JSON.parse(localStorage.getItem("sites"));
        console.log("val =",val);
      //  console.log("existing site are",existingsite);

        }

      selectedSitesArr = (val) => {
           //    this.props.sitesArr(val);
  console.log("selected site array =",val);
//this.setCurrentSite(val);
    //  localStorage.setItem('sites', val);
 //   this.setState({ selectedSitesArr: val })
           }





  render() {
 var userinfo = JSON.parse(localStorage.getItem("authUser"));
    return (
      <React.Fragment>
        <header id="page-topbar">
         <div className="actualHeader">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="navbar-brand-box">
                <Link to="#" className="logo logo-dark">
                  <span className="logo-sm">
                    <img src={logosmdark} alt="" height="30" />
                  </span>
                  <span className="logo-lg">
                    <img src={logodark} alt="" height="56" />
                  </span>
                </Link>

                <Link to="#" className="logo logo-light">
                  <span className="logo-sm">
                    <img src={logosmlight} alt="" height="30" />
                  </span>
                  <span className="logo-lg">
                    <img src={logodark} alt="" height="56"  />
                  </span>
                </Link>
              </div>

              <Button
                size="sm"
                color="none"
                type="button"
                onClick={this.toggleMenu}
                className="px-3 font-size-24 header-item waves-effect"
                id="vertical-menu-btn"
              >
                <i className="ri-menu-2-line"></i>
              </Button>

              {/* <Form className="app-search d-none d-lg-block">
                            <div className="position-relative">
                                <Input type="text" className="form-control" placeholder={this.props.t('Search')}/>
                                <span className="ri-search-line"></span>
                            </div>
                        </Form> */}
            </div>


            <div className="d-flex">

              <div className="folderHead" style={{padding : "38px", fontWeight : "800"}}>TMSDEVN</div>

              <LanguageDropdown />

              <div className="dropdown d-none d-lg-inline-block ml-1">
                <Button
                  color="none"
                  type="button"
                  className="header-item noti-icon waves-effect"
                  onClick={this.toggleFullscreen}
                >
                  <i className="ri-fullscreen-line align-middle"></i>
                </Button>
              </div>

              <NotificationDropdown />
              <ProfileMenu />
            </div>
            </div>
          </div>

        </header>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { layoutType } = state.Layout;
  return { layoutType };
};

export default connect(mapStatetoProps, { toggleRightSidebar })(
  withNamespaces()(Header)
);
