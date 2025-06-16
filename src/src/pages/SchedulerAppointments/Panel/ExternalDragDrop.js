import { render } from 'react-dom';
import React, { Component } from 'react';
import moment from 'moment';
import '../dashboard.scss';
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


  GetDeliveryStatus = (x) => {


            switch (x) {
                case '1':
                    return ("To Plan");
                case '2':
                    return ("Planned");
                case '3':
                    return ("Loading In-progress");
                case '4':
                    return ("Loading Completed");
                case '5':
                    return ("Route in progress");
                case '6':
                    return ("Completed");
                case '7':
                    return ("Cancelled");
                case '8':
                    return ("Skipped");
                case '9':
                    return ("Rescheduled");
                 case '10':
                        return ("Validated");
                 case '11':
                                    return ("POD-Completed");

            }

        }



    getConsultantName(value) {
     
        return value.resourceData[value.resource.textField];
    }

      getConsultantName1(value) {
         
            return value.resourceData["repName"];
        }
     getConsultantImage(value) {
            if(this.props.SelectedGroupBy === "Vehicles")
            return 'truck';
          else
            return 'driver';
             }

    showModal = (e) => {
         
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
        
        return value.resourceData.drivername;
    }



    resourceHeaderTemplate(props) {
        return (<div className="template-wrap"><div className="specialist-category"><div className={"specialist-image " + this.getConsultantImage(props)}></div><div className="specialist-name">
      {this.getConsultantName(props)}</div><div className="specialist-designation">{this.getConsultantName1(props)}</div></div></div>);
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
                                 

                            }

        onSchActionComplete(event) {
                                     
                 if (event.requestType === 'dateNavigate') {

                         
                         this.props.handleDateRangeChange();


                         }
                     }


     addcontenttoScheduler = (passeddata , event , index, cellData) => {
                      
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
                       
                                          let resourceDetails = this.scheduleObj.getResourcesByIndex(cellData.groupIndex);
										  	                    // add validation for the dropped document
                      let dropCompatability = true;
                            let error = "";
 // To check vehicle and product category
 if(dropCompatability) {
  if (resourceDetails.resourceData.tclcod === '') {
              
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
                  
                        dropCompatability = true;
            }
            else {
             
                        // need to check the venicle and products category compatability;
                if (resourceDetails.resourceData.customerlist && !resourceDetails.resourceData.customerlist.includes(data.bpcode)) {
                       dropCompatability = false;
                        
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
                                              vehicleCode: resourceDetails.resourceData.repId,
                                              VehicleObject : resourceDetails.resourceData
                                          };

/*

          this.setState({
            EventDraggedData : eventData,
            addConfirmShow: true,
            confirmMessage: 'Are you sure you want  to create the trip',
        })
*/
                              
                                this.scheduleObj.addEvent(eventData);
                                 this.props.disableDivs(index, "doc", data.docnum);

         }

		}



    drop(event, eventType, args : DragAndDropEventArgs) {
            

               var data;
                       var doctype;
                      data = JSON.parse(event.dataTransfer.getData("currentCard"));
                      var transferedData = event.dataTransfer;
                      var index = event.dataTransfer.getData("index");

                      
                      

                      
                     let cellData : CellClickEventArgs = this.scheduleObj.getCellDetails(event.target);
                     

                     if(moment(data.docdate).format('YYYY-MM-DD')  === moment(cellData.startTime).format('YYYY-MM-DD')){
                        
                        this.draggingProcessedFurther(data, event, index, cellData);

                     }
                      else {
                                              
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
                                      
                                     if (data.pairedDoc != undefined && data.pairedDoc != '') {
                                       
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
                                        
                                        this.addcontenttoScheduler(data , event, index,cellData);
                                         if (data.pairedDoc != undefined && data.pairedDoc != '') {
                                         
                                                                                                                                                    for (var i = 0; i < this.props.dropsPanel.length; i++) {
                                                                                                                                                        
                                                                                                                                                        if (data.pairedDoc === this.props.dropsPanel[i].docnum) {
                                                                                                                                                            //currentTrip = this.props.trips;
                                                                                                                                                            
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

      GetDeliveryStatus = (x) => {


                switch (x) {
                    case '1':
                        return ("To plan");
                    case '2':
                        return ("Planned");
                    case '3':
                        return ("Loading In-progress");
                    case '4':
                        return ("Loading Completed");
                    case '5':
                        return ("Route in progress");
                    case '6':
                        return ("Completed");
                    case '7':
                        return ("Cancelled");
                    case '8':
                         return ("Skipped");
                    case '9':
                        return ("Re-Scheduled");
                    case '10':
                        return ("Validated");
                    case '11':
                        return ("POD- Completed");
                }


            }


        bgcolor = (type) => {
           
           if(type === 'DLV') {
             return '#008000		';

           }
           else if(type === 'PICK') {
              return '#000080';
           }
           else {
               return '#000080';
           }
        }





      eventTemplate (props: {[key: string] : Object}) :  JSX.Element {
            
         return (
             <div className="template-wrap" style={{fontSize: "14px",width:"450px",height:"105px", background : this.bgcolor(props.doctype)}} >
               {props.doctype === 'PRECEIPT' ?
                 <div className="subject" ><span style={{paddingRight : "22px"}}>{props.docnum}</span ><span style={{paddingRight : "7px"}}>{props.arvtime} - {props.deptime}</span></div> :
                <div className="subject" ><span style={{width:"145px"}} >{props.docnum}</span ><span style={{ paddingLeft : "7px"}}>{props.arvtime} - {props.deptime}</span> <span style={{ paddingLeft : "7px"}}>{this.GetDeliveryStatus(props.dlvystatus)}</span></div>  }
               <div style={{fontSize: "12px"}}>{props.bpcode} - {props.bpname} - {props.city} - {props.poscode} </div>

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
       let loc  = ""
       if(lang === 'eng')
       {
          loc = "en";
       }
       else {
           loc = "fr";
       }
       
            
			 let addAlertClose = () => this.setState({ addAlertShow: false });
            const vehicles = this.props.vehicles;
            const drivers = this.props.drivers;
             const TripsDocData  = this.props.dropsPanel.appointments;

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
                                                    <ResourceDirective field='vehicleCode' title='vehicleCode' name='Consultants' allowMultiple={false} dataSource={vehicles} textField='repId' idField='repId' groupIDField="GroupId" colorField={this.bgcolor('doctype')}>
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
