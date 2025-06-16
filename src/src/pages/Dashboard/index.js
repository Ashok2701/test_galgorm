import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//Import Components
import MiniWidgets from "./MiniWidgets";
import RoutesAnalytics from "./RoutesAnalytics";
import TechAnalytics from "./TechAnalytics";
import RouteStatusPC from "./RouteStatusPC";
import TechSkillPC from "./TechSkillPC";
import OrderStatusPC from "./OrderStatusPC";
import OrderBarAnalytics from "./OrderBarAnalytics";
import OrdersMonthlyAnalytics from "./OrdersMonthlyAnalytics";
import SalesAnalytics from "./SalesAnalytics";
import EarningReports from "./EarningReports";
import Sources from "./Sources";
import RecentlyActivity from "./RecentlyActivity";
import RevenueByLocations from "./RevenueByLocations";
import ChatBox from "./ChatBox";
import LatestTransactions from "./LatestTransactions";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems : [
                { title : "Nazox", link : "/" },
                { title : "Dashboard", link : "#" },
            ],
            reports : [
                { icon : " ri-user-follow-line", title : "Active Technicians", value : "1452", rate : "2.4%", desc : "From previous period" },
                  { icon : " ri-route-line", title : "Total Routes", value : "15", rate : "2.4%", desc : "From previous period" },
                { icon : " ri-checkbox-circle-line", title : "Assigned Orders", value : "38452", rate : "2.4%", desc : "From previous period" },
                { icon : "ri-close-circle-line", title : "Non Assigned Orders", value : "154", rate : "2.4%", desc : "From previous period" },
            ],
            dashboardData : {}
        }
    }

       componentWillMount() {

             Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/fms/transport/dashboard')])
             .then(([res1]) => {
                     return Promise.all([res1.json()])
                   }).then(([res1]) => {
                             this.setState({
                                 dashboardData: res1
                             })
                             })

    }


    render() {
       
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                         <Row>
                            <Col xl={12}>
                                <Row>
                                    <MiniWidgets reports={this.state.dashboardData} itemcount = {this.state.reports} />
                                </Row>
                                
                                {/* revenue Analytics */}

                            </Col>

                            <Col xl={4}>

                                {/* sales Analytics */}
                                <RouteStatusPC data={this.state.dashboardData}/>

                                {/* earning reports */}


                            </Col>
                             <Col xl={8}>
                               <RoutesAnalytics dash ={this.state.dashboardData}/>
                              </Col>
                            </Row>
                              <Row>
                                                         <Col xl={4}>

                                                                                                                      {/* sales Analytics */}
                                                                                                                      <OrderStatusPC data={this.state.dashboardData}/>

                                                                                                                      {/* earning reports */}


                                                                                                                  </Col>
                                                                                                                   <Col xl={4}>
                                                                                                                    <OrdersMonthlyAnalytics dash ={this.state.dashboardData} />
                                                                                                                   </Col>
                                                                                                                   <Col xl={4}>
                                                                                                                     <OrderBarAnalytics dash ={this.state.dashboardData}/>
                                                                                                                    </Col>
                                                    </Row>
                            <Row>
                              <Col xl={4}>

                                                             {/* sales Analytics */}
                                                             <TechSkillPC data={this.state.dashboardData}/>

                                                             {/* earning reports */}


                                                         </Col>
                                                          <Col xl={8}>
                                                            <TechAnalytics dash ={this.state.dashboardData}/>
                                                           </Col>
                              </Row>

                        

                        <Row>

                           <LatestTransactions dash = {this.state.dashboardData}/>
                            {/* revenue by locations */}
                            <RevenueByLocations dash = {this.state.dashboardData}/>

                        </Row>


                    </Container> 
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
