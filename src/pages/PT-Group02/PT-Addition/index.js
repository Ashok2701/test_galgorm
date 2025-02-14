import React, { Component } from "react";
import { Card, CardBody,CardTitle, Container, Row, Col, Button } from "reactstrap";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import  PTDeletionHeader from './CheckInHeader';
//import OpenDocsTable from './OpenDocsTable';
import moment from 'moment';
import DataDetails from './DataDetails';
import { fetchOpenToAddDocumentPanelwithRange } from '../../../service';
import { DeleteDocument } from '../../../service';

const apiUrl = process.env.REACT_APP_API_URL;

class PTDeletion extends Component {
  constructor(props) {
    super(props);
    this.state = {
        sites : [],
        selectedSite : '',
        selectedCustomer : [],
        selectedPckTicket : [],
        selectedRouteNum : [],
        selectedProd : [],
        selectedOpenDocs : [],
        selectedOpenDocsList : [],
        selectedFDate : new Date(),
        selectedTDate : new Date(),
        customerList : [],
        routeList : [],
        pickTicketsList : [],
         productsList : [],
        docsList : [],


    };
  }


   componentDidMount() {

      var user = JSON.parse(localStorage.getItem("authUser"));
       Promise.all([fetch(`${apiUrl}/api/v1/transport/usrsites?user=`+ user.username)])
      .then(([res1]) => {
        return Promise.all([res1.json()])
      }).then(([res1]) => {
                this.setState({
                   sites: res1
                });
              });
}



ChangeFdate = (data) => {

 console.log("data f change =",data)
    this.setState({
       selectedFDate : data
    })

     this.callDocumentService(this.state.selectedSite, data , this.state.selectedTDate);

}


ChangeLdate = (data) => {
 this.setState({
       selectedTDate : data
    })
console.log("data l change =",data)
 this.callDocumentService(this.state.selectedSite, this.state.selectedFDate, data);
}


   setCurrentSite = selectedOption => {

      this.setState({
        selectedSite: selectedOption
      });
    }


    setCustomer = data => {
       console.log("data at customer =", data)

  if(data === null) {
              this.setState({
                              selectedCustomer: []
                            });

            }
  else {


       if(data.length > 0) {



           let tempcust = [];
           for(let ic=0 ; ic < data.length; ic++) {
               tempcust.push(data[ic].value);
           }
        this.setState({
                         selectedCustomer: tempcust
                       });
                       }


       else {
           this.setState({
                  selectedCustomer: []
                });
       }
       }
    }

      setPickTkcket = data => {
           console.log("data at pk =", data)

  if(data === null) {
              this.setState({
                              selectedPckTicket: []
                            });

            }
  else {


       if(data.length > 0) {



           let tempcust = [];
           for(let ic=0 ; ic < data.length; ic++) {
               tempcust.push(data[ic].value);
           }
        this.setState({
                         selectedPckTicket: tempcust
                       });
                       }


       else {
           this.setState({
                  selectedPckTicket: []
                });
       }
       }




        }

        setProducts = data => {
                 console.log("data at product  =", data)
      if(data === null) {
                    this.setState({
                                    selectedProd: []
                                  });

                  }
        else {
             if(data.length > 0) {
                 let tempcust = [];
                 for(let ic=0 ; ic < data.length; ic++) {
                     tempcust.push(data[ic].value);
                 }
              this.setState({
                               selectedProd: tempcust
                             });
                             }


             else {
                 this.setState({
                        selectedProd: []
                      });
             }
             }





              }

        setRouteNumber = data => {
                       console.log("data at route  =", data)

        if(data === null) {
                      this.setState({
                                      selectedRouteNum: []
                                    });

                    }
          else {


               if(data.length > 0) {



                   let tempcust = [];
                   for(let ic=0 ; ic < data.length; ic++) {
                       tempcust.push(data[ic].value);
                   }
                this.setState({
                                 selectedRouteNum: tempcust
                               });
                               }


               else {
                   this.setState({
                          selectedRouteNum: []
                        });
               }
               }




                    }




    OnCheckInClicked = selectedRailCar => {

      console.log("onCheckInClikced",selectedRailCar);
      fetch(`${apiUrl}/api/v1/rail/Checkin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedRailCar)
      }).then((response) => {
        console.log("inside after Railcarcheckin - response",response);
       this.handleErrors(response);
      }).then(function (response) {

      }).then(() => {
         console.log("after success ",this.state.selectedSite);
        this.ReloadData(this.state.selectedSite);
      }).then(() => {
        this.notifySucess("RailCar Checked-In Sucessfully");
      }).catch(error => {

        this.notifyError("Failed to CheckIn");
      });

    }

      handleErrors = (response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        }






handleSiteChange = (data) => {
this.setState({loader : true});
     console.log(data);

     this.setState({
      selectedSite : data.value,
      loader : false
     })


     this.callDocumentService(data.value , this.state.selectedFDate , this.state.selectedTDate);
}

callDocumentService = (passedsite, from , to) => {
this.setState({loader : true});

let currDate = new Date();
let currDate1 = new Date('2023-10-01');
var newDate = moment(from).format('YYYY-MM-DD');
  var newStartDate = moment(to).format('YYYY-MM-DD');
  fetchOpenToAddDocumentPanelwithRange(passedsite, newDate, newStartDate)
                    .then(([res1]) => {
                     console.log("resultant data =",res1)
                      var dropsP = res1;
                      // console.log("drops panel after result",dropsP);
                     // this.filterDropsDiv(newDate, dropsP);
                      // console.log("drops panel after filter",dropsP);

                      const custList = [...new Set(res1.map(item => item.bpname))]
                      console.log("customer list",custList )

                      const RouteList = [...new Set(res1.map(item => item.vrcode))]
                      const PKList = [...new Set(res1.map(item => item.docnum))]
                 //  const prodsList = [...new Set(res1.products.map(item => item.productCode))]




const allProductCodes = res1.reduce((acc, entry) => {
    return acc.concat(entry.products.map(product => product.productName));
}, []);

  const uniqueProductCodes = [...new Set(allProductCodes)];




                      console.log("customer list",custList )
                       console.log("route list",RouteList )
                        console.log("product list",uniqueProductCodes )
                     //  const uniqueArrayCust = Array.from(custList);

                      this.setState({
                        docsList : res1,
                         customerList : custList,
                                RouteList : RouteList,
                                PickTicketsList : PKList,
                                productsList : uniqueProductCodes,


                        loader : false,
                      });
                    }).catch(error => {
                    });





}


handleSelectAll = () => {

let tempdata = this.state.docsList;
 if(this.state.selectedCustomer.length > 0) {
   console.log("data ===", this.state.selectedCustomer)
tempdata = this.state.docsList.filter(item =>
      item.bpname.toLowerCase().includes(this.state.selectedCustomer.toLowerCase())
    );
    }

  const allSelected = tempdata.every((item) => this.state.selectedOpenDocs.includes(item));
    if (allSelected) {
          // If all are selected, unselect all
          this.setState({
                 selectedOpenDocs : [],
                 selectedOpenDocsList : [],
                 })
            console.log(" un select All - " )
        } else {
          // If not all are selected, select all
          const allIds = this.state.docsList.map((item) => item.docnum);
           this.setState({
                           selectedOpenDocs : allIds,
                           selectedOpenDocsList : tempdata,
                           })
          console.log("All Ids are selected  - ",allIds )
        }


}


clearAllFilters = () => {

this.setState({
        selectedCustomer : [],
        selectedRouteNum : [],
        selectedPckTicket : [],
        selectedProd : [],
        selectedOpenDocs : [],
        selectedOpenDocsList : [],
        })

}


DocumentforDeletion = () => {

  console.log("in side document deletion");
      fetch(`${apiUrl}/api/v1/transport/OpenDocs/deleteDocs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state.selectedOpenDocsList)
      }).then((response) => {
        console.log("inside after Railcarcheckin - response",response);
        console.log("inside after Railcarcheckin - openddocs",this.state.selectedOpenDocs);
        console.log("inside after Railcarcheckin - open docs length",this.state.selectedOpenDocs.length);

         if(response.status === 200) {
               DeleteDocument(this.state.selectedOpenDocs, this.state.selectedOpenDocs.length)
                  .then(res => {
                                          console.log("after soap completes The result is", res);
                                            var statuscode =  res.children[0].children[0].children[1].value;
                                                   var statusmessage = res.children[0].children[0].children[2].value;
                                                   console.log("status code =", statuscode)
                                                   console.log("status code type =", typeof(statuscode));

                                            this.notifySucess(statusmessage);

                                            }).then(() =>{

                                               this.callDocumentService(this.state.selectedSite , this.state.selectedFDate , this.state.selectedTDate);
                                            })
                                            }



       this.handleErrors(response);
      }).then(() => {
       // this.handleSiteChange(this.state.selectedSite);
      }).catch(error => {

        this.notifyError("Deletion Failed");
      });




}


DocumentSelectionProcess = (doc) => {


      const isSelected = this.state.selectedOpenDocs.includes(doc.docnum);
            console.log(" selected item  - ", doc )
             console.log("selected item doc  - ", this.state.selectedOpenDocsList)
             let updatedDoclist ;
             let updatedDocTotalList ;
          if (isSelected) {
          updatedDoclist =   this.state.selectedOpenDocs.filter((rowId) => rowId !== doc.docnum);
          updatedDocTotalList = this.state.selectedOpenDocsList.filter((rowId) => rowId !== doc);
          } else {
           updatedDoclist =  [...this.state.selectedOpenDocs, doc.docnum];
           updatedDocTotalList = [...this.state.selectedOpenDocsList, doc];
          }

    console.log(" selected updatedDocList  - ", updatedDocTotalList )
                console.log("selected updateddocs   - ", updatedDoclist)

        this.setState({
        selectedOpenDocs : updatedDoclist,
        selectedOpenDocsList : updatedDocTotalList,
        })

}



 notifySucess = (message) => toast.success(message, { autoClose: 3000 });

 notifyError = (message) => toast.error(message, { autoClose: 3000 });

  render() {


    let DatabeforeFilter = this.state.docsList;
     console.log("data ===", this.state.docsList)
    let filterData ;
    let customerdata = this.state.selectedCustomer;
  if(this.state.selectedCustomer.length > 0) {
   console.log("data ===", this.state.selectedCustomer)

   filterData = DatabeforeFilter.filter(item => this.state.selectedCustomer.includes(item.bpname));


   /*
filterData = DatabeforeFilter.filter(item =>
      item.bpname.toLowerCase().includes(this.state.selectedCustomer.toLowerCase())
    );
    */
    }
    else {
     filterData = DatabeforeFilter;
    }




      if(this.state.selectedRouteNum.length > 0) {
       console.log("data ===", this.state.selectedRouteNum)
      filterData = filterData.filter(item => this.state.selectedRouteNum.includes(item.vrcode));

        }

        if(this.state.selectedPckTicket.length > 0) {
           console.log("data ===", this.state.selectedPckTicket)
           filterData = filterData.filter(item => this.state.selectedPckTicket.includes(item.docnum));

            }

       // prod filter
       if(this.state.selectedProd.length > 0) {
                console.log("data ===", this.state.selectedProd)
           filterData = filterData.filter(item => this.state.selectedProd.includes(item.products.some(product => product.productName)));

           }





    return (
      <React.Fragment>
        <div className="page-content">
         <ToastContainer />
          <Container fluid>
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>
                      <Row style={{backgroundColor : "currentcolor", height : "50px"}}>
                                                                                  <Col md="6" className="d-flex align-items-center">
                                                                                    <CardTitle className="h1 mb-0 " style={{color : "white"}}>
                                                                                      ADDING   PICK-TICKET TO ROUTE
                                                                                    </CardTitle>
                                                                                  </Col>
                                                        </Row>
                    <PTDeletionHeader
                        sites = {this.state.sites}
                        selectedSite = {this.state.selectedSite}
                        siteChange = {this.handleSiteChange}
                        CustomerList = {this.state.customerList}
                        fromDate = {this.state.selectedFDate}
                        toDate = {this.state.selectedTDate}
                        ChangeFdate = {this.ChangeFdate}
                        ChangeLdate = {this.ChangeLdate}
                        PickTicketsList = {this.state.PickTicketsList}
                        RouteList = {this.state.RouteList}
                        productsList = {this.state.productsList}
                        DocumentforDeletion = {this.DocumentforDeletion}
                        setProducts = {this.setProducts}
                        setCustomer = {this.setCustomer}
                        setPickTkcket = {this.setPickTkcket}
                        setRouteNumber = {this.setRouteNumber}
                        clearAllFilters = {this.clearAllFilters}
                       selectedOpenDocs = {this.state.selectedOpenDocs}
                        selectedCustomer = {this.state.selectedCustomer}
                        selectedPckTicket = {this.state.selectedPckTicket}
                        selectedProd = {this.state.selectedProd}
                        selectedRouteNum = {this.state.selectedRouteNum}
                    />
                     <Row>
                        <DataDetails
                          OpendocsList = {filterData}
                          CustomerList = {this.state.customerList}
                          PickTicketsList = {this.state.PickTicketsList}
                          RouteList = {this.state.RouteList}
                          selectedCustomer = {this.state.selectedCustomer}
                          selectedPckTicket = {this.state.selectedPckTicket}
                          selectedProd = {this.state.selectedProd}
                          selectedRouteNum = {this.state.selectedRouteNum}
                          selectedOpenDocs = {this.state.selectedOpenDocs}
                          DocumentSelectionProcess = {this.DocumentSelectionProcess}
                          handleSelectAll = {this.handleSelectAll}

                        />
                     </Row>

                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default PTDeletion;
