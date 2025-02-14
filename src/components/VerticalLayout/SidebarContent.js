import React, { Component } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withNamespaces } from "react-i18next";

import { connect } from "react-redux";
import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changePreloader,
} from "../../store/actions";

class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.initMenu();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.type !== prevProps.type) {
        this.initMenu();
      }
    }
  }

  initMenu() {
    new MetisMenu("#side-menu");

    var matchingMenuItem = null;
    var ul = document.getElementById("side-menu");
    var items = ul.getElementsByTagName("a");
    for (var i = 0; i < items.length; ++i) {
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  activateParentDropdown = (item) => {
    item.classList.add("active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  };

  render() {
    return (
      <React.Fragment>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu" style={{ width: "100%" }}>
            <li>
              <Link to="/dashboard" className="waves-effect">
                <i className="ri-guide-line"></i>
                <span className="badge badge-pill badge-success float-right">

                </span>
                <span className="ml-1">{this.props.t("Scheduler")}</span>
              </Link>
            </li>
            <li>

              <Link to="/calendar" className=" waves-effect">
                <i className="ri-calendar-2-line"></i>
                <span className="ml-1">{this.props.t("Calendar")}</span>
              </Link>
            </li>
            <li>
              <Link to="/maps" className=" waves-effect">
                {/* <i className="ri-calendar-2-line"></i> */}
                <i className="ri-map-pin-line"></i>

                <span className="ml-1">{this.props.t("Maps")}</span>

              </Link>
            </li>

            {/* <li>
              <Link to="map" className=" waves-effect">
                <i className="ri-road-map-line"></i>
                <span className="ml-1">{this.props.t("Map View")}</span>
              </Link>
            </li> */}

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-article-line"></i>
                <span className="ml-1">{this.props.t("Reports")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <a
                    href={process.env.REACT_APP_TMS_CALENDAR}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="waves-effect"
                  >
                    <i className="ri-guide-line"></i>
                    <span className="ml-1">{this.props.t("TMS Calendar")}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={process.env.REACT_APP_TMS_PLANNING}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="waves-effect"
                  >
                    <i className="ri-guide-line"></i>
                    <span className="ml-1">{this.props.t("TMS Planning")}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={process.env.REACT_APP_DELIVERY_PREPARATION}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="waves-effect"
                  >
                    <i className="ri-guide-line"></i>
                    <span className="ml-1">{this.props.t("Delivery Preparation")}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={process.env.REACT_APP_ROUTE_LIST}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="waves-effect"
                  >
                    <i className="ri-guide-line"></i>
                    <span className="ml-1">{this.props.t("Route List")}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={process.env.REACT_APP_POD_TRACKING}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="waves-effect"
                  >
                    <i className="ri-guide-line"></i>
                    <span className="ml-1">{this.props.t("POD Tracking")}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={process.env.REACT_APP_KPI_GLOBAL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="waves-effect"
                  >
                    <i className="ri-guide-line"></i>
                    <span className="ml-1">{this.props.t("KPI - Global")}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={process.env.REACT_APP_KPI_SITE_VEHICLE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="waves-effect"
                  >
                    <i className="ri-guide-line"></i>
                    <span className="ml-1">{this.props.t("KPI - Site & Vehicle")}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={process.env.REACT_APP_KPI_VEHICLE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="waves-effect"
                  >
                    <i className="ri-guide-line"></i>
                    <span className="ml-1">{this.props.t("KPI - Vehicle")}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={process.env.REACT_APP_KPI_SITE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="waves-effect"
                  >
                    <i className="ri-guide-line"></i>
                    <span className="ml-1">{this.props.t("KPI - Site")}</span>
                  </a>
                </li>
              </ul>
            </li>

            {/* <li>
                                <Link to="/#" className="has-arrow waves-effect">
                                    <i className="ri-mail-send-line"></i>
                                    <span className="ml-1">{this.props.t('Email')}</span>
                                </Link>
                                <ul className="sub-menu" aria-expanded="false">
                                    <li><Link to="email-inbox">{this.props.t('Inbox')}</Link></li>
                                    <li><Link to="email-read">{this.props.t('Read Email')}</Link></li>
                                </ul>
                            </li> */}

            {/* <li>
                                <Link to="apps-kanban-board" className=" waves-effect">
                                    <i className="ri-artboard-2-line"></i>
                                    <span className="ml-1">{this.props.t('Kanban Board')}</span>
                                </Link>
                            </li>

            <li className="menu-title">{this.props.t("Fleet Management")}</li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-truck-line"></i>
                <span className="ml-1">{this.props.t("Fleet")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/fleet-management/vehicle-class">{this.props.t("Vehicle Class")}</Link>
                </li>
                <li>
                  <Link to="/fleet-management/vehicle-class-association">
                    {this.props.t("Vehicle Class Association")}
                  </Link>
                </li>
                <li>
                  <Link to="/fleet-management/vehicle-management">
                    {this.props.t("Vehicle Management")}
                    </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-caravan-line"></i>
                <span className="ml-1">{this.props.t("Trailer")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/#">{this.props.t("Trailer Types")}</Link>
                </li>
                <li>
                  <Link to="/#">{this.props.t("Trailer Management")}</Link>
                </li>
                <li>
                  <Link to="/#">
                    {this.props.t("Vehicle/Trailer Management")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-artboard-line"></i>
                <span className="ml-1">{this.props.t("Equipment")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/#">{this.props.t("Equipment Types")}</Link>
                </li>
                <li>
                  <Link to="/#">{this.props.t("Equipment Management")}</Link>
                </li>
                <li>
                  <Link to="/#">
                    {this.props.t("Vehicle/Equipment Management")}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-account-circle-line"></i>
                <span className="ml-1">{this.props.t("Driver/Users")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/#">
                    {this.props.t("Route Planner User Management")}
                  </Link>
                </li>
                <li>
                  <Link to="/#">{this.props.t("Driver Management")}</Link>
                </li>
                <li>
                  <Link to="/#">{this.props.t("Vehicle Allocation")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-gas-station-line"></i>
                <span className="ml-1">{this.props.t("Fuel Management")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/#">{this.props.t("Fuel Station")}</Link>
                </li>
                <li>
                  <Link to="/#">{this.props.t("Fuel Log Entry")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-settings-3-line"></i>
                <span className="ml-1">{this.props.t("Utilization")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/#">{this.props.t("Odometer Reading")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-tools-line"></i>
                <span className="ml-1">{this.props.t("Maintenance")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/#">{this.props.t("Service List")}</Link>
                </li>
                <li>
                  <Link to="/#">{this.props.t("Schedule a Service")}</Link>
                </li>
              </ul>
            </li>
            {/* <li>
                                <Link to="/#" className="has-arrow waves-effect">
                                    <i className="ri-profile-line"></i>
                                    <span className="ml-1">{this.props.t('Utility')}</span>
                                </Link>
                                <ul className="sub-menu" aria-expanded="false">
                                    <li><Link to="pages-starter">{this.props.t('Starter Page')}</Link></li>
                                    <li><Link to="pages-maintenance">{this.props.t('Maintenance')}</Link></li>
                                    <li><Link to="pages-comingsoon">{this.props.t('Coming Soon')}</Link></li>
                                    <li><Link to="pages-timeline">{this.props.t('Timeline')}</Link></li>
                                    <li><Link to="pages-faqs">{this.props.t('FAQs')}</Link></li>
                                    <li><Link to="pages-pricing">{this.props.t('Pricing')}</Link></li>
                                    <li><Link to="pages-404">{this.props.t('Error 404')}</Link></li>
                                    <li><Link to="pages-500">{this.props.t('Error 500')}</Link></li>
                                </ul>
                            </li>

            <li className="menu-title">{this.props.t("CONFIGURATION")}</li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-admin-line"></i>
                <span className="ml-1">{this.props.t("Access Control")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="auth-login">{this.props.t("Sites")}</Link>
                </li>
                <li>
                  <Link to="auth-register">{this.props.t("Roles")}</Link>
                </li>
                <li>
                  <Link to="auth-register">{this.props.t("Users")}</Link>
                </li>
                <li>
                  <Link to="auth-register">
                    {this.props.t("Users Assignment")}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-lock-line"></i>
                <span className="ml-1">{this.props.t("Setup")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="auth-login">{this.props.t("TMS License")}</Link>
                </li>
                <li>
                  <Link to="auth-register">{this.props.t("POD License")}</Link>
                </li>
              </ul>
            </li>
            <li className="menu-title">{this.props.t("Components")}</li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-pencil-ruler-2-line"></i>
                <span className="ml-1">{this.props.t("UI Elements")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="ui-alerts">{this.props.t("Alerts")}</Link>
                </li>
                <li>
                  <Link to="ui-buttons">{this.props.t("Buttons")}</Link>
                </li>
                <li>
                  <Link to="ui-cards">{this.props.t("Cards")}</Link>
                </li>
                <li>
                  <Link to="ui-carousel">{this.props.t("Carousel")}</Link>
                </li>
                <li>
                  <Link to="ui-dropdowns">{this.props.t("Dropdowns")}</Link>
                </li>
                <li>
                  <Link to="ui-grid">{this.props.t("Grid")}</Link>
                </li>
                <li>
                  <Link to="ui-images">{this.props.t("Images")}</Link>
                </li>
                <li>
                  <Link to="ui-lightbox">{this.props.t("Lightbox")}</Link>
                </li>
                <li>
                  <Link to="ui-modals">{this.props.t("Modals")}</Link>
                </li>
                <li>
                  <Link to="ui-rangeslider">
                    {this.props.t("Range Slider")}
                  </Link>
                </li>
                <li>
                  <Link to="ui-roundslider">
                    {this.props.t("Round Slider")}
                  </Link>
                </li>
                <li>
                  <Link to="ui-session-timeout">
                    {this.props.t("Session Timeout")}
                  </Link>
                </li>
                <li>
                  <Link to="ui-progressbars">
                    {this.props.t("Progress Bars")}
                  </Link>
                </li>
                <li>
                  <Link to="ui-sweet-alert">
                    {this.props.t("Sweet Alerts")}
                  </Link>
                </li>
                <li>
                  <Link to="ui-tabs-accordions">
                    {this.props.t("Tabs & Accordions")}
                  </Link>
                </li>
                <li>
                  <Link to="ui-typography">{this.props.t("Typography")}</Link>
                </li>
                <li>
                  <Link to="ui-video">{this.props.t("Video")}</Link>
                </li>
                <li>
                  <Link to="ui-general">{this.props.t("General")}</Link>
                </li>
                <li>
                  <Link to="ui-rating">{this.props.t("Rating")}</Link>
                </li>
                <li>
                  <Link to="ui-notifications">
                    {this.props.t("Notifications")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="waves-effect">
                <i className="ri-eraser-fill"></i>
                <span className="badge badge-pill badge-danger float-right">
                  6
                </span>
                <span className="ml-1">{this.props.t("Forms")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="form-elements">{this.props.t("Elements")}</Link>
                </li>
                <li>
                  <Link to="form-validation">{this.props.t("Validation")}</Link>
                </li>
                <li>
                  <Link to="form-advanced">
                    {this.props.t("Advanced Plugins")}
                  </Link>
                </li>
                <li>
                  <Link to="form-editors">{this.props.t("Editors")}</Link>
                </li>
                <li>
                  <Link to="form-uploads">{this.props.t("File Upload")}</Link>
                </li>
                <li>
                  <Link to="form-xeditable">{this.props.t("X-editable")}</Link>
                </li>
                <li>
                  <Link to="form-wizard">{this.props.t("Wizard")}</Link>
                </li>
                <li>
                  <Link to="form-mask">{this.props.t("Mask")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-table-2"></i>
                <span className="ml-1">{this.props.t("Tables")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="tables-basic">{this.props.t("Basic Tables")}</Link>
                </li>
                <li>
                  <Link to="tables-datatable">
                    {this.props.t("Data Tables")}
                  </Link>
                </li>
                <li>
                  <Link to="tables-responsive">
                    {this.props.t("Responsive Table")}
                  </Link>
                </li>
                <li>
                  <Link to="tables-editable">
                    {this.props.t("Editable Table")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-bar-chart-line"></i>
                <span className="ml-1">{this.props.t("Charts")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="charts-apex">{this.props.t("Apexcharts")}</Link>
                </li>
                <li>
                  <Link to="charts-chartjs">{this.props.t("Chartjs")}</Link>
                </li>
                <li>
                  <Link to="charts-knob">{this.props.t("Jquery Knob")}</Link>
                </li>
                <li>
                  <Link to="charts-sparkline">{this.props.t("Sparkline")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-brush-line"></i>
                <span className="ml-1">{this.props.t("Icons")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="icons-remix">{this.props.t("Remix Icons")}</Link>
                </li>
                <li>
                  <Link to="icons-materialdesign">
                    {this.props.t("Material Design")}
                  </Link>
                </li>
                <li>
                  <Link to="icons-dripicons">{this.props.t("Dripicons")}</Link>
                </li>
                <li>
                  <Link to="icons-fontawesome">
                    {this.props.t("Font awesome 5")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-map-pin-line"></i>
                <span className="ml-1">{this.props.t("Maps")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="maps-google">{this.props.t("Google Maps")}</Link>
                </li>
                <li>
                  <Link to="maps-vector">{this.props.t("Vector Maps")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-share-line"></i>
                <span className="ml-1">{this.props.t("Multi Level")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="true">
                <li>
                  <Link to="/#">{this.props.t("Level 1.1")}</Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    {this.props.t("Level 1.2")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="true">
                    <li>
                      <Link to="/#">{this.props.t("Level 2.1")}</Link>
                    </li>
                    <li>
                      <Link to="/#">{this.props.t("Level 2.2")}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
           */}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return { ...state.Layout };
};

export default withRouter(
  connect(mapStatetoProps, {
    changeLayout,
    changeSidebarTheme,
    changeSidebarType,
    changeLayoutWidth,
    changePreloader,
  })(withNamespaces()(SidebarContent))
);
