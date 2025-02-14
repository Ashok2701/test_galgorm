import { render } from 'react-dom';
import { convertHrToSec, formatTime, formatHHMM,splitTime, convertHrToMin } from '../converterFunctions/converterFunctions';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';
import React, { Component } from 'react';
import moment from 'moment';
import '../dashboard.scss';
import DisplayInformationIconDetails from './DisplayInformationIconDetails';
import { ScheduleComponent, ResourcesDirective,CellClickEventArgs, ResourceDirective, ViewsDirective, ViewDirective, Inject, TimelineViews, Resize, DragAndDrop, TimelineMonth } from '@syncfusion/ej2-react-schedule';
import EditorTemp from './EditorTemp.js';
import { TreeViewComponent, DragAndDropEventArgs } from '@syncfusion/ej2-react-navigations';
import dataSource from './datasource.js';
import { extend, Draggable, Droppable, loadCldr, L10n } from "@syncfusion/ej2-base";
import Confirm from './Confirm';
import Alert from './Alert';
import * as numberingSystems from './Jsonfile/numberingSystems.json';
import * as gregorian from './Jsonfile/ca-gregorian.json';
import * as numbers from './Jsonfile/numbers.json';
import * as timeZoneNames from './Jsonfile/timeZoneNames.json';
import locale from './Jsonfile/locale.json';
/**
 * schedule resources group-editing sample
 */
 loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);
L10n.load(locale);
class ExternalDragDrop extends Component {
                        constructor(props) {
                                super(props);
                                this.dragOver = this.dragOver.bind(this);
                                this.scheduleObj = this.props.ref;
                                this.drop = this.drop.bind(this);
                                this.state = {
                                isTreeItemDropped : false,
                                draggedItemId : '',
                                showEditorTemplate: false,
                                EditorData : '',
                                 addInfoShow: false,
                                     speciality: '',
                                     clickedVeh : '',
                                 addConfirmShow: false,
								 droppedData : [],
                                 droppedIndex : 0,
								  addAlertShow: false,
                                             errorMessage: '',
                                             errorType: '',
                                             error: false,

                                 droppedCellData : {},
                                 droppedEvent : {},
                                  confirmMessage: '',
                                EventDraggedData : '',
                                data : dataSource.hospitalData,

                                driverData : [
                                  { Text: 'OLIVIER LE HO', Id: 1, GroupId: 1, Color: '#5664d2', Designation: '1104' },
                                  { Text: 'CHRISTIAN LEMEE', Id: 2, GroupId: 2, Color: '#5664d2', Designation: '1124' },
                                  { Text: 'SYLVAIN LE GUEVOUT', Id: 3, GroupId: 1, Color: '#5664d2', Designation: '1578' },
                                  { Text: 'OLLIVAUX HERVE', Id: 4, GroupId: 2, Color: '#5664d2', Designation: '1025' },
                                  { Text: 'LAURENT NEVO', Id: 5, GroupId: 1, Color: '#5664d2', Designation: '2452' },
                                  { Text: 'Henry', Id: 6, GroupId: 2, Color: '#5664d2', Designation: '1489' },
                                  { Text: 'LE MEE CHRISTIAN', Id: 7, GroupId: 2, Color: '#5664d2', Designation: '1921' }
                                ],



                                consultantData : [
                                    { Text: 'GFP885D0P', Id: 1, GroupId: 1, Color: '#5664d2', Designation: 'FP885DP' },
                                    { Text: 'FP885DPGY', Id: 2, GroupId: 2, Color: '#5664d2', Designation: 'FP-885-DPWE' },
                                    { Text: 'RTY675E43', Id: 3, GroupId: 1, Color: '#5664d2', Designation: 'RTY675E4312' },
                                    { Text: 'FP885DP02', Id: 4, GroupId: 2, Color: '#5664d2', Designation: 'FP-885-DPWE02' },
                                    { Text: 'KAKV06', Id: 5, GroupId: 1, Color: '#5664d2', Designation: 'KAKV06' },
                                    { Text: 'V00001', Id: 6, GroupId: 2, Color: '#5664d2', Designation: 'EL-719-WFRP1' },
                                    { Text: 'V00002', Id: 7, GroupId: 2, Color: '#5664d2', Designation: 'EL-719-WFRP1' }
                                ],
                              }
                            }




    getConsultantName(value) {
        return  <span style={{ cursor: 'pointer'  }} onClick={() => this.onInfoClick(value)}>{value.resourceData[value.resource.textField]}</span>;
    }
     getConsultantImage(value) {
            if(this.props.SelectedGroupBy === "Vehicles")
            return 'truck';
          else
            return 'driver';
             }

    showModal = (e) => {
         console.log("e =",e)
          this.setState({
          showEditorTemplate: true,
          EditorData : e
          });
        };

      hideModal = (e) => {
        this.setState({ showEditorTemplate: false });
      };



    onConfirmNo = () => {
        this.setState({
            addConfirmShow: false
        })
    }

    onConfirmYes = () => {
     //this.props.onTripCreationwithDoc(this.state.EventDraggedData);
	 this.draggingProcessedFurther(this.state.droppedData, this.state.droppedEvent, this.state.droppedIndex, this.state.droppedCellData);
        this.setState({
            addConfirmShow: false
        })
    }



    getConsultantDesignation(value) {
        console.log("T444 value at designation =",value);
        return value.resourceData.drivername;
    }

  onInfoClick = (value) => {
     console.log("Tvvv site values are",this.props.selectedSite);
     let currunit = "",distunits = "",weiunits = "", volunits = "";
     var selsite = this.props.selectedSite;
     currunit = selsite.cur;
     distunits = selsite.distunit;
      weiunits = selsite.massunit;
       volunits = selsite.volunit;



      let data = value.resourceData;
      var lng = localStorage.getItem("lng");
      let costunits ;
      if(currunit == "USD"){
        costunits = '$';
       // distunits = 'Miles'
      }
      else{
         costunits = '€';
       //  distunits = 'Kms'

      }
      let length = data.length && (data.length+"cm, ");
      let width = data.width && data.width+"cm, ";
      let heigth = data.heigth && data.heigth + "cm";
      const vehicleDetails = {};
   vehicleDetails.VehicleNumber = data.name && data.name;
   vehicleDetails.Class = data.className && data.className;
   vehicleDetails.Carrier = data.bptnum && data.bptnum;
   vehicleDetails.ArrivalSite = data.startdepotn && data.startdepotn;
   vehicleDetails.DepartureSite = data.enddepotname && data.enddepotname;
vehicleDetails.Capacity = data.capacities && data.capacities+ ' '+data.xweu;
   vehicleDetails.Volume = data.vol && data.vol + ' '+ data.xvol;
vehicleDetails.MaxDistance = data.maxtotaldist && data.maxtotaldist + ' '+data.xmaxtotaldis;
 vehicleDetails.MaxTotalTime = data.maxtotaltime && formatTime(convertHrToSec(data.maxtotaltime)) + ' Hrs';
  vehicleDetails.MaxTotalTravelTime = data.maxtotaltrvtime && formatTime(convertHrToSec(data.maxtotaltrvtime)) + ' Hrs';
  vehicleDetails.MaxOrderCount = data.maxordercnt && data.maxordercnt;
 vehicleDetails.MaxSpeed = data.maxspeed && data.maxspeed + ' '+distunits+'/Hr';

 vehicleDetails.OverTimeStart = data.overtimestar && formatTime(convertHrToSec(data.overtimestar)) + ' Hrs';
      vehicleDetails.LoadingTime= data.startdepots && convertHrToMin(data.startdepots) + ' Mins';
      vehicleDetails.OffLoadingTime = data.enddepotserv && convertHrToMin(data.enddepotserv) + ' Mins';

      vehicleDetails.FixedCost = data.fixedcost && data.fixedcost + ' '+costunits;
      vehicleDetails.CostPerUnitTime = data.costperunitt && data.costperunitt + ' '+costunits;
      vehicleDetails.CostPerUnitDistance = data.costperunitd && data.costperunitd + ' '+costunits;
      vehicleDetails.CostPerUnitOverTime =  data.costperunito && data.costperunito+' '+costunits;

       vehicleDetails.Tailgate = data.tailGate && data.tailGate;
            vehicleDetails.Loadbay = data.loadBay && data.loadBay;
            vehicleDetails.Dimensions  = length + width+ heigth;

      this.setState({
        addInfoShow: true,
        speciality: vehicleDetails,
        clickedVeh : value.resourceData.codeyve,
      });
    }



    resourceHeaderTemplate(props) {
        return (<div className="template-wrap">
        <div className="specialist-category">
            <div className={"specialist-image " + this.getConsultantImage(props)}></div>
            <div className="specialist-name">{this.getConsultantName(props)}</div>
            <div className="specialist-designation">{this.getConsultantDesignation(props)}</div>

           </div>
            </div>);
    }
    treeTemplate(props) {
        return (<div id="waiting"><div id="waitdetails"><div id="waitlist">{props.Name}</div>
      <div id="waitcategory">{props.DepartmentName} - {props.Description}</div></div></div>);
    }
    onItemDrag(event) {
        if (this.scheduleObj.isAdaptive) {
            let classElement = this.scheduleObj.element.querySelector('.e-device-hover');
            if (classElement) {
                classElement.classList.remove('e-device-hover');
            }
            if (event.event.target.classList.contains('e-work-cells')) {
               // addClass([event.event.target], 'e-device-hover');
            }
        }
        if (document.body.style.cursor === 'not-allowed') {
            document.body.style.cursor = '';
        }
        if (event.name === 'nodeDragging') {
            let dragElementIcon = document.querySelectorAll('.e-drag-item.treeview-external-drag .e-icon-expandable');
            for (let i = 0; i < dragElementIcon.length; i++) {
                dragElementIcon[i].style.display = 'none';
            }
        }
    }
    onActionBegin(event) {
        if (event.requestType === 'eventCreate' && this.isTreeItemDropped) {
            let treeViewData = this.treeObj.fields.dataSource;
            const filteredPeople = treeViewData.filter((item) => item.Id !== parseInt(this.draggedItemId, 10));
            this.treeObj.fields.dataSource = filteredPeople;
            let elements = document.querySelectorAll('.e-drag-item.treeview-external-drag');
            for (let i = 0; i < elements.length; i++) {
               // remove(elements[i]);
            }
        }
    }
    onTreeDragStop(event) {
        let treeElement = ''//closest(event.target, '.e-treeview');
        let classElement = this.scheduleObj.element.querySelector('.e-device-hover');
        if (classElement) {
            classElement.classList.remove('e-device-hover');
        }
        if (!treeElement) {
            event.cancel = true;
            let scheduleElement = '' //closest(event.target, '.e-content-wrap');
            if (scheduleElement) {
                let treeviewData = this.treeObj.fields.dataSource;
                if (event.target.classList.contains('e-work-cells')) {
                    const filteredData = treeviewData.filter((item) => item.Id === parseInt(event.draggedNodeData.id, 10));
                    let cellData : CellClickEventArgs = this.scheduleObj.getCellDetails(event.target);
                    let resourceDetails = this.scheduleObj.getResourcesByIndex(cellData.groupIndex);
                    let eventData = {
                        Name: filteredData[0].Name,
                        StartTime: cellData.startTime,
                        EndTime: cellData.endTime,
                        IsAllDay: cellData.isAllDay,
                        Description: filteredData[0].Description,
                        DepartmentID: resourceDetails.resourceData.GroupId,
                        ConsultantID: resourceDetails.resourceData.Id
                    };
                    this.scheduleObj.openEditor(eventData, 'Add', true);
                    this.isTreeItemDropped = true;
                    this.draggedItemId = event.draggedNodeData.id;
                }
            }
        }
    }

    onPopupOpen = (args) => {
         console.log("popuo args =",args);
          if (args.type === 'Editor') {
            args.cancel = true;
            this.data = args.data;
            this.showModal(args.data);
          }
        };


  saveModal = (args) => {
    var app = {};
    var dialog = document.querySelector('.custom-event-editor');
    var subject = dialog.querySelector('#routeid');
    app.Subject = subject.value;
    var Vehicle = dialog.querySelector('#vehicle');
    app.Vehicle = Vehicle.value;
    var Driver = dialog.querySelector('#driver');
    app.Driver = Driver.value;
    var Status = dialog.querySelector('#sts');
    app.Status = Status.value;
    var DepSite = dialog.querySelector('#depsite');
        app.DepSite = DepSite.value;
    var ArrSite = dialog.querySelector('#arrsite');
        app.ArrSite = ArrSite.value;
    var startTime = dialog.querySelector('#StartTime').ej2_instances[0];
    app.StartTime = startTime.value;
    var endTime = dialog.querySelector('#EndTime').ej2_instances[0];
    app.EndTime = endTime.value;

    var scheduleObj = document.querySelector('.e-schedule').ej2_instances[0];
    if (this.data.Id) {
      scheduleObj.saveEvent(app);
    } else {
      scheduleObj.addEvent(app);
    }
    this.hideModal(this);
  };

  onDragStart(args) {
      args.navigation.enable = true;
    }


        onSchActionBegin(event) {
                                 console.log("action begin sch event",event);

                            }

        onSchActionComplete(event) {
                                     console.log("action compltes sch event",event);
                 if (event.requestType === 'dateNavigate') {

                         console.log("schduler object =",this.scheduleObj);
                         this.props.handleDateRangeChange();


                         }
                     }


     addcontenttoScheduler = (passeddata , event , index, cellData) => {
                      console.log("T333 at drop event - schduler_data =",passeddata);
                      var data = passeddata;
                         var doctype;

                      if(data.doctype === 'DLV' || data.doctype === 'PICK')
                      {
                         doctype = 'Drop';
                      }
                      else {
                          doctype = 'Pickup';
                      }



                  //    let cellData : CellClickEventArgs = this.scheduleObj.getCellDetails(event.target);
                       console.log("T111 inside cellData = ",cellData);
                                          let resourceDetails = this.scheduleObj.getResourcesByIndex(cellData.groupIndex);
										  	                    // add validation for the dropped document
                      let dropCompatability = true;
                            let error = "";
 // To check vehicle and product category
 if(dropCompatability) {
  if (resourceDetails.resourceData.tclcod === '') {
              console.log("T1111 inside tclcod is empty = ");
            dropCompatability = true;
          }
           else {
            // need to check the vehicle and products category compatability;
            for (var i = 0; i < data.products.length; i++) {
                if (resourceDetails.resourceData && resourceDetails.resourceData.tclcod &&
                    resourceDetails.resourceData.tclcod.includes(data.products[i].productCateg)) {
                    dropCompatability = true;
                }
                else {
                  console.log("T1111 inside prod doesn't cat = ");
                    dropCompatability = false;
                    error = "product";
                    this.setState({
                      errorType : 'product'
                    });
                    break;
                }
            }
          }
          }
//to  check customer compatability
        if (dropCompatability == true) {
            if (resourceDetails.resourceData.allcustomers === 2) {
                  console.log("T1111 inside all customers ");
                        dropCompatability = true;
            }
            else {
             console.log("T1111 inside few customers ");
                        // need to check the venicle and products category compatability;
                if (resourceDetails.resourceData.customerlist && !resourceDetails.resourceData.customerlist.includes(data.bpcode)) {
                       dropCompatability = false;
                        console.log("T1111 inside customer doesn't match");
                        error = 'customer';
                       this.setState({
                                                  errorType : 'customer',
                                                   errorMessage: 'Customer is not associated with current Vehicle',
                                                   addAlertShow: true,
                                                   error: true
                                               });
                                           }
                          else {
                               dropCompatability = true;
                          }
                    }
        }
        if(dropCompatability) {

                                           console.log("T111 inside resourceDetails = ",resourceDetails);
                                          let eventData : {[key: string]: Object} = {
                                              docnum : data.docnum,
                                              subject: data.docnum,
                                              optistatus : 'dragged',
                                              obbject : data,
                                              docdate: moment(cellData.startTime).format('YYYY-MM-DD'),
                                              Location : data.docnum,
                                              docType : doctype,
                                              IsAllDay: false,
                                              doctype : data.doctype,
                                              Description: data.bpcode+'-'+data.bpname,
                                              vehicleCode: resourceDetails.resourceData.codeyve,
                                              VehicleObject : resourceDetails.resourceData
                                          };

/*

          this.setState({
            EventDraggedData : eventData,
            addConfirmShow: true,
            confirmMessage: 'Are you sure you want  to create the trip',
        })
*/
                              console.log("T333 after eventdata prep", eventData)
                                this.scheduleObj.addEvent(eventData);
                                 this.props.disableDivs(index, "doc", data.docnum);

         }

		}



    drop(event, eventType, args : DragAndDropEventArgs) {
            console.log("T111 inside drop event, add ExternalDragDrop");

               var data;
                       var doctype;
                      data = JSON.parse(event.dataTransfer.getData("currentCard"));
                      var transferedData = event.dataTransfer;
                      var index = event.dataTransfer.getData("index");

                      console.log("T111 inside transferdata",transferedData);
                      console.log("T111 inside - index",index);

                      console.log("T333 at drop event - data",data);
                     let cellData : CellClickEventArgs = this.scheduleObj.getCellDetails(event.target);
                     console.log("before checking = cellData date =",cellData.startTime);

                     if(moment(data.docdate).format('YYYY-MM-DD')  === moment(cellData.startTime).format('YYYY-MM-DD')){
                        console.log("same date");
                        this.draggingProcessedFurther(data, event, index, cellData);

                     }
                      else {
                                              console.log("Different Date");
                                              this.setState({
                                                          droppedData : data,
                                                          droppedIndex : index,
                                                          droppedCellData : cellData,
                                                          droppedEvent : event,
                                                          addConfirmShow: true,
                                                          confirmMessage: "La date du document et la date du calendrier sont différentes. Confirmez-vous l'ajout au voyage",

                                                      })
                      }
                     }


            draggingProcessedFurther = (data, event, index, cellData) => {

            if(data.miscpickflg == 2){
                                      console.log("T333 at drop event - misc data",data);
                                     if (data.pairedDoc != undefined && data.pairedDoc != '') {
                                       console.log("T333 at drop event -   misc data with pair",data);
                                                                                                                        for (var i = 0; i < this.props.dropsPanel.length; i++) {
                                                                                                                            if (data.pairedDoc === this.props.dropsPanel[i].docnum) {
                                                                                                                                //currentTrip = this.props.trips;
                                                                                                                                this.addcontenttoScheduler(this.props.dropsPanel[i], event , i, cellData);
                                                                                                                                break;
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                         this.addcontenttoScheduler(data, event , index, cellData);

                                  }else {
                                        console.log("T333 at drop event - not  misc data",data);
                                        this.addcontenttoScheduler(data , event, index,cellData);
                                         if (data.pairedDoc != undefined && data.pairedDoc != '') {
                                         console.log("T333 at drop event - not  misc data WITH PAIR",data);
                                                                                                                                                    for (var i = 0; i < this.props.dropsPanel.length; i++) {
                                                                                                                                                        console.log("T333 index of i =",i);
                                                                                                                                                        if (data.pairedDoc === this.props.dropsPanel[i].docnum) {
                                                                                                                                                            //currentTrip = this.props.trips;
                                                                                                                                                            console.log("T333 index of i data =",this.props.dropsPanel[i].docnum);
                                                                                                                                                            this.addcontenttoScheduler(this.props.dropsPanel[i] , event , i, cellData);
                                                                                                                                                            break;
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                }
                                  }


            }


   dragOver(event) {
             event.preventDefault();
         }

      GetDeliveryStatus1 = (x) => {


                switch (x) {
                    case '1':
                        return ("Scheduled");
                    case '2':
                        return ("On the Way");
                    case '3':
                        return ("In-progress");
                    case '4':
                        return ("Completed");
                    case '5':
                        return ("Skipped");
                    case '6':
                        return ("Re-Scheduled");
                    case '7':
                        return ("Cancelled");
                    case '8':
                        return ("To-Plan");
                    default:
                        return ("To-Plan");
                }


            }


        bgcolor = (type) => {
           console.log("at becolor",type);
           if(type === 'DLV') {
             return '#008000		';

           }
           else if(type === 'PICK') {
              return '#000080';
           }
           else {
               return '#ff3d60';
           }
        }


       GetDeliveryStatus = (x) => {


                  switch (x) {
                      case '1':
                          return (<img class="manImg" style={{height : "30px"}}  src="/assets/img/status/planned.png"></img>);
                      case '2':
                          return (<img class="manImg" style={{height : "30px"}} src="/assets/img/status/onway2.png"></img>);
                      case '3':
                           return (<img class="manImg" style={{height : "30px"}} src="/assets/img/status/inprogress.png"></img>);
                      case '4':
                          return (<img class="manImg" style={{height : "30px"}} src="/assets/img/status/completed.png"></img>);
                      case '5':
                           return (<img class="manImg" style={{height : "30px"}} src="/assets/img/status/skipped.png"></img>);
                      case '6':
                          return (<img class="manImg" style={{height : "30px"}} src="/assets/img/status/rescheduled.png"></img>);
                      case '7':
                          return (<img class="manImg" style={{height : "30px"}} src="/assets/img/status/cancelled.png"></img>);
                      case '8':
                          return (<img class="manImg" style={{height : "30px"}} src="/assets/img/status/toPlan.png"></img>);
                      default:
                          return (<img class="manImg" style={{height : "30px"}} src="/assets/img/status/toPlan.png"></img>);
                  }


              }





      eventTemplate (props: {[key: string] : Object}) :  JSX.Element {
            console.log("inside props -",props);
         return (
             <div className="template-wrap" style={{fontSize: "14px",width:"450px",height:"105px",display : "flex", background : this.bgcolor(props.doctype)}} >
                 <div className="tooltip1" style={{width : "5%"}}>
                                   {this.GetDeliveryStatus(props.dlvystatus)}<span className="tooltiptext1">{this.GetDeliveryStatus1(props.dlvystatus)}</span>
                                </div>
                 <div className="subject" style={{width : "90%" , wrap:"true"}} >
                    <div style={{display : "flex" , justifyContent: "space-around"}}>
                      <span>{props.docnum}</span >
                     <span>T{props.tripno} - #{props.seq}</span>
                     <span>{props.arvtime} - {props.deptime}</span>
                    </div>

                    <div style={{fontSize: "12px", paddingLeft : "10px"}}>{props.bpcode} - {props.bpname} - {props.city} - {props.poscode} </div>
                </div>
               <div className="tooltip1" style={{width : "10%"}}>
                  {this.GetDeliveryStatus(props.dlvystatus)}<span className="tooltiptext1">{this.GetDeliveryStatus1(props.dlvystatus)}</span>
               </div>
             </div>
         );

        }

 getVehicleName(value) {
                return ((value.resourceData) ?
                    value.resourceData[value.resource.textField] :
                    value.resourceName);
            }
            getDrivername(value) {
                let resourceName = this.getDoctorName(value);
                return (resourceName === 'Will Smith') ? 'Cardiologist' : (resourceName === 'Alice') ? 'Neurologist' : 'Orthopedic Surgeon';
            }



    render() {
		 var lang = localStorage.getItem("i18nextLng");
		 console.log("Tvvv site values are",this.props.selectedSite);
       let loc  = ""
       if(lang === 'eng')
       {
          loc = "en";
       }
       else {
           loc = "fr";
       }
       console.log("vehicle - panel",this.props.vehicles);
            console.log("selected drops =", this.props.dropsPanel);
			 let addAlertClose = () => this.setState({ addAlertShow: false });
			   let addInfoIconClose = () => this.setState({ addInfoShow: false });

            const vehicles = this.props.vehicles;
            const drivers = this.props.drivers;
             const TripsDocData  = this.props.dropsPanel;

        return (<div className='schedule-control-section' onDragOver={(evnt) => this.dragOver(evnt)}
                                                                                                                     onDrop={(evnt) => this.drop(evnt)}  >
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper drag-sample-wrapper'>
            <div className="schedule-container">
              <ScheduleComponent allowResizing = {false}    allowDragAndDrop={false} locale={loc} actionBegin={this.onSchActionBegin.bind(this)} actionComplete={this.onSchActionComplete.bind(this)}  rowAutoHeight={true} ref={schedule => this.scheduleObj = schedule} popupOpen={this.onPopupOpen.bind(this)}  cssClass='schedule-drag-drop' width='100%' height='650px' selectedDate={this.props.selectedDate} currentView='TimelineWorkWeek' resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)}
              eventSettings={{ dataSource: TripsDocData,template : this.eventTemplate.bind(this), enableMaxHeight : true,
                 fields: {
                                              id: 'docnum',
                                              subject: { name: 'bpcode' },
                                              isAllDay: false,
                                              startTime: { name: 'docdate' },
                                              endTime: { name: 'docdate' },

                                          }
            }} group={{ enableCompactView: false, resources: ['Consultants'] }} actionBegin={this.onActionBegin.bind(this)} drag={this.onItemDrag.bind(this)} timeScale={{enable:false}}>
                 <ResourcesDirective>
                                 {this.props.SelectedGroupBy && this.props.SelectedGroupBy === "Vehicles" ?
                                                    <ResourceDirective field='vehicleCode' title='vehicleCode' name='Consultants' allowMultiple={false} dataSource={vehicles} textField='codeyve' idField='codeyve' groupIDField="GroupId" colorField={this.bgcolor('doctype')}>
                                                    </ResourceDirective>
                                                      :

                                                  <ResourceDirective field='driverId' title='driverName' name='Consultants' allowMultiple={false} dataSource={drivers} textField='driver' idField='driverid' groupIDField="fcy" >
                                                  </ResourceDirective>
                                    }
                               </ResourcesDirective>
                <ViewsDirective>
                  <ViewDirective option='TimelineDay'/>
                  <ViewDirective option='TimelineWorkWeek' displayName='Week' allowVirtualScrolling={true}/>
                  <ViewDirective option='TimelineMonth' allowVirtualScrolling={true}/>
                </ViewsDirective>
                <Inject services={[TimelineViews, TimelineMonth, Resize, DragAndDrop]}/>
              </ScheduleComponent>
            </div>
{this.state.showEditorTemplate && (
          <EditorTemp
            onClose={this.hideModal}
                      onSave={this.saveModal}
                      onCreated={this.onCreated}

                      SelectedDocData = {this.state.EditorData}
          />
        )}
          </div>
                   <Confirm
                              show={this.state.addConfirmShow}
                              onHide={this.onConfirmNo}
                              confirmTrip={this.onConfirmYes}

                              confirmMessage={this.state.confirmMessage}

                          ></Confirm>
                     <DisplayInformationIconDetails
                              show={this.state.addInfoShow}
                              onInfoIconHide={addInfoIconClose}
                              data={this.state.speciality}
                              vehicle = {this.state.clickedVeh}
                              dataName="vinfo"
                              dataType="object"
                            >
                            </DisplayInformationIconDetails>
						     <Alert
                                         show={this.state.addAlertShow}
                                         onHide={addAlertClose}
                                         errorMessage={this.state.errorMessage}
                                     ></Alert>
        </div>
      </div>);
    }
}
const  ScheduleTrips = React.forwardRef((props, ref)=><ExternalDragDrop {...props} ref={ref}/> ) ;
export default ScheduleTrips;
