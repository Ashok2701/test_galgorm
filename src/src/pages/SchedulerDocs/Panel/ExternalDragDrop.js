import { render } from 'react-dom';
import React, { Component } from 'react';
import '../dashboard.scss';
import { ScheduleComponent, ResourcesDirective,CellClickEventArgs, ResourceDirective, ViewsDirective, ViewDirective, Inject, TimelineViews, Resize, DragAndDrop, TimelineMonth } from '@syncfusion/ej2-react-schedule';
import EditorTemp from './EditorTemp.js';
import { TreeViewComponent, DragAndDropEventArgs } from '@syncfusion/ej2-react-navigations';
import dataSource from './datasource.js';
import { extend, Draggable, Droppable } from "@syncfusion/ej2-base";
import Confirm from './Confirm';
/**
 * schedule resources group-editing sample
 */
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
                                allowDragAndDrops : true,
                                 addConfirmShow: false,
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
        return value.resourceData[value.resource.textField];
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
     this.props.onTripCreationwithDoc(this.state.EventDraggedData);
        this.setState({
            addConfirmShow: false
        })
    }




    getConsultantDesignation(value) {
        return value.resourceData.Designation;
    }
    resourceHeaderTemplate(props) {
        return (<div className="template-wrap"><div className="specialist-category"><div className={"specialist-image " + this.getConsultantImage(props)}></div><div className="specialist-name">
      {this.getConsultantName(props)}</div><div className="specialist-designation">{this.getConsultantDesignation(props)}</div></div></div>);
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



    drop(event, eventType, args : DragAndDropEventArgs) {
            console.log("T111 inside drop event, add ExternalDragDrop");

               var data;
                       var doctype;
                      data = JSON.parse(event.dataTransfer.getData("currentCard"));
                      console.log("T111 inside args",args);
                      console.log("T111 inside data",data);
                      if(data.doctype === 'DLV' || data.doctype === 'PICK')
                      {
                         doctype = 'Drop';
                      }
                      else {
                          doctype = 'Pickup';
                      }


                      let cellData : CellClickEventArgs = this.scheduleObj.getCellDetails(event.target);
                       console.log("T111 inside cellData = ",cellData);
                                          let resourceDetails = this.scheduleObj.getResourcesByIndex(cellData.groupIndex);

                                           console.log("T111 inside resourceDetails = ",resourceDetails);
                                          let eventData : {[key: string]: Object} = {
                                              docnum : data.docnum,
                                              subject: data.docnum,
                                              optistatus : 'dragged',
                                              obbject : data,
                                              docdate: cellData.startTime,
                                              Location : data.docnum,
                                              docType : doctype,
                                              IsAllDay: false,
                                              Description: data.bpcode+'-'+data.bpname,
                                              code: resourceDetails.resourceData.codeyve,
                                              VehicleObject : resourceDetails.resourceData
                                          };



          this.setState({
            EventDraggedData : eventData,
            addConfirmShow: true,
            confirmMessage: 'Are you sure you want  to create the trip',
        })

                                //this.scheduleObj.addEvent(eventData);

                             //   this.isTreeItemDropped = true;
                                //this.draggedItemId = event.draggedNodeData.id;
                            }



   dragOver(event) {
             event.preventDefault();
         }

      GetDeliveryStatus = (x) => {


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

           if(type === 'DLV') {
             return '#41b668';

           }
           else {
              return '#e76eb1';
           }
        }





      eventTemplate (props: {[key: string] : Object}) :  JSX.Element {
         return (
             <div className="template-wrap" style={{fontSize : "14px" /*, background : this.bgcolor(props.doctype)*/}} >
                <div className="subject" ><span >{props.docnum}</span><span style={{marginLeft : "80px"}}>#{props.seq}</span> </div>

               <div className="time" >{props.arvtime} - {props.deptime}</div>
               <div>{props.city} - {props.poscode} </div>
 <div style={{fontSize : "12px"}}> {props.bpcode} - {props.bpname} </div>

             </div>
         );

        }





    render() {
       console.log("vehicle - panel",this.props.vehicles);
            console.log("selected drops =", this.props.dropsPanel);
            const vehicles = this.props.vehicles;
            const drivers = this.props.drivers;
             const TripsDocData  = this.props.dropsPanel;

        return (<div className='schedule-control-section' onDragOver={(evnt) => this.dragOver(evnt)}
                                                                                                                     onDrop={(evnt) => this.drop(evnt)}  >
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper drag-sample-wrapper'>
            <div className="schedule-container">
              <ScheduleComponent actionBegin={this.onSchActionBegin.bind(this)} actionComplete={this.onSchActionComplete.bind(this)}  rowAutoHeight={true} ref={schedule => this.scheduleObj = schedule} popupOpen={this.onPopupOpen.bind(this)}  cssClass='schedule-drag-drop' width='100%' height='650px' selectedDate={this.props.selectedDate} currentView='TimelineWeek' resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)}
              eventSettings={{ dataSource: TripsDocData,template : this.eventTemplate.bind(this),
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
                                                    <ResourceDirective field='vehiclecode' title='vehiclecode' name='Consultants' allowMultiple={false} dataSource={vehicles} textField='codeyve' idField='codeyve' groupIDField="GroupId" colorField='Color'>
                                                    </ResourceDirective>
                                                      :

                                                  <ResourceDirective field='driverId' title='driverName' name='Consultants' allowMultiple={false} dataSource={drivers} textField='driver' idField='driverid' groupIDField="fcy" >
                                                  </ResourceDirective>
                                    }
                               </ResourcesDirective>
                <ViewsDirective>
                  <ViewDirective option='TimelineDay'/>
                  <ViewDirective option='TimelineWeek' allowVirtualScrolling={true}/>
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
                      allowDragAndDrops = {true}
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
        </div>
      </div>);
    }
}
const  ScheduleTrips = React.forwardRef((props, ref)=><ExternalDragDrop {...props} ref={ref}/> ) ;
export default ScheduleTrips;
