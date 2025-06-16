import { render } from 'react-dom';
import React, { Component } from 'react';
import '../dashboard1.scss';
import moment from 'moment';
import 'moment-timezone';
import { ScheduleComponent, ResourcesDirective,CellClickEventArgs, ResourceDirective, ViewsDirective, ViewDirective, Inject, TimelineViews, Resize, DragAndDrop, TimelineMonth } from '@syncfusion/ej2-react-schedule';
import EditorTemp from './EditorTemp.js';
import { TreeViewComponent, DragAndDropEventArgs } from '@syncfusion/ej2-react-navigations';
import dataSource from './datatrips.js';
import { extend, Draggable, Droppable } from "@syncfusion/ej2-base";
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
                                allowDragAndDrops : true,
                                EditorData : '',


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
       
        this.setState({
        showEditorTemplate: true,
        EditorData : e
        });
      };

      hideModal = (e) => {
        this.setState({ showEditorTemplate: false });
      };



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

    onSchActionBegin(event) {
                             

                        }

    onSchActionComplete(event) {
                                 
             if (event.requestType === 'dateNavigate') {

                     
                     this.props.handleDateRangeChange();


                     }
                 }


    eventTemplate (props: {[key: string] : Object}) :  JSX.Element {
     return (
         <div className="template-wrap" style={{fontSize : "12px"}} >
            <div className="subject" >{props.itemCode} </div>
           <div className="time" >{props.startTime} - {props.endTime === 'null' ? '' : props.endTime}</div>


         </div>
     );

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


    drop(event, eventType, args : DragAndDropEventArgs) {
            

            
             var data;
             var doctype;
            data = JSON.parse(event.dataTransfer.getData("currentCard"));
            
            
            if(data.doctype === 'DLV' || data.doctype === 'PICK')
            {
               doctype = 'Drop';
            }
            else {
                doctype = 'Pickup';
            }


            let cellData : CellClickEventArgs = this.scheduleObj.getCellDetails(event.target);
             
                                let resourceDetails = this.scheduleObj.getResourcesByIndex(cellData.groupIndex);

                                 
                                let eventData : {[key: string]: Object} = {
                                    itemCode : data.docnum,
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

                                 
                                // this.scheduleObj.openEditor(eventData,"Add",true);
                                this.scheduleObj.addEvent(eventData);

                             //   this.isTreeItemDropped = true;
                                //this.draggedItemId = event.draggedNodeData.id;
                            }



   dragOver(event) {
             event.preventDefault();
         }





    render() {
        
        
        const vehicles = this.props.vehicles;
        const drivers = this.props.drivers;
        const TripsData  = this.props.tripsList;

        return (<div className='schedule-control-section' onDragOver={(evnt) => this.dragOver(evnt)}
                                                                                                                     onDrop={(evnt) => this.drop(evnt)}  >
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper drag-sample-wrapper'>
            <div className="schedule-container">
              <ScheduleComponent popupOpen={this.onPopupOpen.bind(this)}  actionBegin={this.onSchActionBegin.bind(this)} actionComplete={this.onSchActionComplete.bind(this)}  rowAutoHeight={true} ref={schedule => this.scheduleObj = schedule}  cssClass='schedule-drag-drop' width='100%' height='550px' selectedDate={this.props.selectedDate} currentView='TimelineWeek' resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)}
              eventSettings={{ dataSource: TripsData, template : this.eventTemplate.bind(this),
                          fields: {
                              id: 'itemCode',
                              subject: { name: 'itemCode' },
                              isAllDay: false,
                              startTime: { name: 'docdate' },
                              endTime: { name: 'docdate' },

                          }


            }} group={{ enableCompactView: false, resources: ['Consultants'] }} actionBegin={this.onActionBegin.bind(this)} drag={this.onItemDrag.bind(this)} timeScale={{enable:false}}>
                <ResourcesDirective>
                  {this.props.SelectedGroupBy && this.props.SelectedGroupBy === "Vehicles" ?
                                     <ResourceDirective field='code' title='code' name='Consultants' allowMultiple={false} dataSource={vehicles} textField='codeyve' idField='codeyve' groupIDField="fcy" colorField='Color'>
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
            SelectedTripData = {this.state.EditorData}

          />
        )}
          </div>
        </div>
      </div>);
    }
}
const  ScheduleTrips = React.forwardRef((props, ref)=><ExternalDragDrop {...props} ref={ref}/> ) ;
export default ScheduleTrips;
