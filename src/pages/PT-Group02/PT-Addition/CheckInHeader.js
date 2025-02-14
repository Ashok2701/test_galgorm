import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody, Form, FormGroup, InputGroup, Label, Input, Button, InputGroupAddon } from "reactstrap";

import Alert from "./Alert";
import Confirm from "./Confirm";
import Select from "react-select";
import moment from 'moment';

const optionGroup = [
	{
		label: "Picnic",
		options: [
			{ label: "Mustard", value: "Mustard" },
			{ label: "Ketchup", value: "Ketchup" },
			{ label: "Relish", value: "Relish" }
		]
	},
	{
		label: "Camping",
		options: [
			{ label: "Tent", value: "Tent" },
			{ label: "Flashlight", value: "Flashlight" },
			{ label: "Toilet Paper", value: "Toilet Paper" }
		]
	}
];

class PTDeletionHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addAlertShow: false,
            errorMessage: '',
             addConfirmShow: false,
            confirmMessage: '',
            breadcrumbItems : [
                { title : "TMS", link : "/" },
                { title : "Planner", link : "#" },
            ],
            	selectedMulti: null,

        }
    }

    FilterCustomer = customer => {
    //  this.props.customerChange(customer);
        console.log("on change customer data =", customer)
        this.props.setCustomer(customer);
    }


      FilterPickTkts = doc => {
        //  this.props.customerChange(customer);
            console.log("on change customer data =", doc)
            this.props.setPickTkcket(doc);
        }

     FilterRoutes = routeno => {
        //  this.props.customerChange(customer);

            this.props.setRouteNumber(routeno);
        }

         FilterProducts = prod => {
            //  this.props.customerChange(customer);

                this.props.setProducts(prod);
            }


    handleSiteChange = selectedMulti => {
           this.props.siteChange(selectedMulti);
    		//this.setState({ selectedMulti });
    	};


   DeleteConfirmedDocs = () => {
      this.props.DocumentforDeletion();
   }


   DeleteSelectedDocs = () => {

      if(this.props.selectedOpenDocs.length > 0) {

       console.log("some  Documents for deletion")
     //  this.props.DocumentforDeletion();

      this.setState({
                                                                                                           confirmMessage : 'Are you sure, you want to Delete the selected Pick Tickets ?',
                                                                                                           addConfirmShow: true,

                                                                                                            })



      }
      else {
           this.setState({
                                                                                                      errorMessage: 'No Documents are selected for Deletion, Please select atleast one document',
                                                                                                      addAlertShow: true,

                                                                                                       })
         console.log("No Documents for deletion")

      }

   }


    handleRadioChange = (event) => {
     //  setSelectedOption(event.target.value);
     console.log("handle radio change =", event)
    // console.log("handle radio change value =", event.taget.value)
     console.log("handle radio change direct value =", event.target.value)

     this.props.handleRadioChange(event.target.value);
     };



    render() {
       const { selectedMulti } = this.state;
        let addAlertClose = () => this.setState({ addAlertShow: false });
         let onHide = () => this.setState({ addConfirmShow: false });
       console.log("from date =", this.props.fromDate)
         console.log("customer data = ", this.props.productsList)
       let fdata = moment(this.props.fromDate).format('YYYY-MM-DD');
        let ldata = moment(this.props.toDate).format('YYYY-MM-DD');
         console.log("from date 1 =", fdata)
       let getDate = new Date();
 let optionSiteItems = [];
  var selectedSite = {};
    var optionSelected = {};
    var placeHolder = "All";
           this.props.sites && this.props.sites.length > 0 && this.props.sites.map((site) => {
                   if (site.id == this.props.selectedSite) {
                       selectedSite = site;
                       placeHolder = site.value;
                       optionSelected.value = site.id;
                       optionSelected.label = (site.value + "(" + site.id + ")");
                   }
                   optionSiteItems.push({ value: site.id, label: (site.value + "(" + site.id + ")") })
               });
  let optionCustomerItems = [];
   // let selectedCustomer = null;
      let optionSelected1 = [];
      let placeHolder1 = "All";
      console.log("customer list = ", this.props.CustomerList)
      console.log("customer data = ", this.props.selectedCustomer)
             this.props.CustomerList && this.props.CustomerList.length > 0 && this.props.CustomerList.map((customer) => {
                     if (this.props.selectedCustomer.includes(customer)) {
                       //  selectedCustomer = customer;
                         placeHolder1 = customer;
                         let tempdata = {}
                         tempdata.value = customer;
                         tempdata.label = (customer);
                         console.log("customer inside data = ",optionSelected1)
                         optionSelected1.push(tempdata);
                     }
                     optionCustomerItems.push({ value: customer, label: customer })
                 });
    let optionDocsItems = [];
      // var selectedDoc = {};
         let optionSelected2 = [];
         let placeHolder2 = "All";
                this.props.PickTicketsList && this.props.PickTicketsList.length > 0 && this.props.PickTicketsList.map((doc) => {
                        if (this.props.selectedPckTicket.includes(doc)) {
                          //  selectedDoc = doc;
                            placeHolder2 = doc;
                             let tempdata = {}
                            tempdata.value = doc;
                            tempdata.label = (doc);
                            optionSelected2.push(tempdata)
                        }
                        optionDocsItems.push({ value: doc, label: doc })
                    });

     let optionRouteItems = [];
        //   var selectedRoute = {};
             let optionSelected3 = [];
             var placeHolder3 = "All";
                    this.props.RouteList && this.props.RouteList.length > 0 && this.props.RouteList.map((route) => {
                            if (this.props.selectedRouteNum.includes(route)) {
                              //  selectedDoc = route;
                                placeHolder2 = route;
                                 let tempdata = {}
                                tempdata.value = route;
                                tempdata.label = (route);
                                optionSelected3.push(tempdata)
                            }
                            optionRouteItems.push({ value: route, label: route })
                        });

        let optionProdItems = [];
           //     var selectedProd = {};
                  let optionSelected4 = [];
                  var placeHolder4 = "All";
                         this.props.productsList && this.props.productsList.length > 0 && this.props.productsList.map((prod) => {
                                 if (this.props.selectedProd.includes(prod)) {
                               //      selectedProd = prod;
                                     placeHolder4 = prod;
                                       let tempdata = {}
                                     tempdata.value = prod;
                                     tempdata.label = (prod);
                                     optionSelected4.push(tempdata)

                                 }
                                 optionProdItems.push({ value: prod, label: prod })
                             });



        return (
            <React.Fragment>
      <Row>
							<Col lg="12">
								<Card>
									<CardBody>
<form>
											<Row>
												<Col lg="3">
													<div className="mb-3">
														<Label className="form-label">Site</Label>
														<Select
														value={optionSelected}
															isMulti={false}
															onChange={this.handleSiteChange}
															options={optionSiteItems}
															classNamePrefix="select2-selection"
														/>
													</div>
												</Col>
												<Col lg="2">
												<div className="mb-3">
												<Label htmlFor="example-date-input" className="form-label">From Date</Label>

                                                                                                <Input type="date" value={fdata} id="example-date-input" onChange={(e) => this.props.ChangeFdate(e.target.value)} />
                                                                                            </div>
                                                                                            </Col>
                                                <Col lg="2">
                                                												<div className="mb-3">
                                                												<Label htmlFor="example-date-input" className="form-label">To Date</Label>

                                                                                                                                                <Input type="date" value={ldata} id="example-date-input" min={fdata} onChange={(e) => this.props.ChangeLdate(e.target.value)} />
                                                                                                                                            </div>
                                                                                                                                            </Col>
												<Col lg="2">
                                                													<div className="mb-3">
                                                														<Label className="form-label">Customers</Label>
                                                														<Select
                                                														value={optionSelected1}
                                                															isMulti={true}
                                                															onChange={this.FilterCustomer}
                                                															options={optionCustomerItems}
                                                															classNamePrefix="select.. Customer"
                                                														/>
                                                													</div>
                                                												</Col>
                                             <Col lg="3">
                                             													<div className="mb-3">
                                             														<Label className="form-label"> PickTickets</Label>
                                             														<Select
                                             														value={optionSelected2}
                                             															isMulti={true}
                                             															onChange={this.FilterPickTkts}
                                             															options={optionDocsItems}
                                             															classNamePrefix="select.."
                                             														/>
                                             													</div>
                                             												</Col>
                                               <Col lg="3">
                                                                                         													<div className="mb-3">
                                                                                         														<Label className="form-label"> Products</Label>
                                                                                         														<Select
                                                                                         														value={optionSelected4}
                                                                                         															isMulti={true}
                                                                                         															onChange={this.FilterProducts}
                                                                                         															options={optionProdItems}
                                                                                         															classNamePrefix="select2-selection"
                                                                                         														/>
                                                                                         													</div>
                                                                                         												</Col>



                                             <Col lg="9">
                                              <div className="mt-4" style={{display : "flex", justifyContent : "flex-end"}}>
                                              <Button style={{marginRight : "5px"}}
                                                                     color="success"
                                                                  //   className="waves-effect waves-light me-1"
                                                                   >
                                                                     Add PTs to Route
                                                                 </Button>
                                              <Button style={{marginLeft : "5px"}} onClick={this.props.clearAllFilters}
                                                                                                                   color="primary"
                                                                                                                //   className="waves-effect waves-light me-1"
                                                                                                                 >
                                                                                                                   clear filter
                                                                                                               </Button>
                                                                 </div>
                                             </Col>
                                            </Row>
                                          </form>
                                           <Alert
                                                                  show={this.state.addAlertShow}
                                                                  onHide={addAlertClose}
                                                                  errorMessage={this.state.errorMessage}
                                                              ></Alert>
                                          <Confirm
                                                                                                           show={this.state.addConfirmShow}
                                                                                                           onHide={onHide}
                                                                                                           confirmMessage ={this.state.confirmMessage}
                                                                                                           DeleteConfirmedDocs = {this.DeleteConfirmedDocs}
                                                                                                       ></Confirm>
									</CardBody>
								</Card>
							</Col>
	</Row>

            </React.Fragment>
        );
    }
}

export default PTDeletionHeader;
