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

import ConfirmPreparationList from './ConfirmPreparationList';
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
/*
 L10n.load({
   "es": {
     "schedule": {
       "day": "Día",
       "week": "Semana",
       "workWeek": "Semana de trabajo",
       "month": "Mes",
       "year": "Año",
       "agenda": "Agenda",
       "weekAgenda": "Agenda de la semana",
       "workWeekAgenda": "Agenda de la semana laboral",
       "monthAgenda": "Agenda del mes",
       "today": "Hoy",
       "noEvents": "No hay eventos",
       "emptyContainer": "No hay eventos programados para este día.",
       "allDay": "Todo el dia",
       "start": "comienzo",
       "end": "Final",
       "more": "más",
       "close": "Cerca",
       "cancel": "Cancelar",
       "noTitle": "(Sin título)",
       "delete": "Eliminar",
       "deleteEvent": "Este evento",
       "deleteMultipleEvent": "Eliminar múltiples eventos",
       "selectedItems": "Artículos seleccionados",
       "deleteSeries": "Serie completa",
       "edit": "Editar",
       "editSeries": "Serie completa",
       "editEvent": "Este evento",
       "createEvent": "Crear",
       "subject": "Tema",
       "addTitle": "Añadir título",
       "moreDetails": "Más detalles",
       "save": "Salvar",
       "editContent": "¿Cómo le gustaría cambiar la cita en la serie?",
       "deleteContent": "¿Seguro que quieres eliminar este evento?",
       "deleteMultipleContent": "¿Estás seguro de que deseas eliminar los eventos seleccionados?",
       "newEvent": "Nuevo evento",
       "title": "Título",
       "location": "Ubicación",
       "description": "Descripción",
       "timezone": "Zona horaria",
       "startTimezone": "Zona horaria de inicio",
       "endTimezone": "Zona horaria final",
       "repeat": "Repetir",
       "saveButton": "Salvar",
       "cancelButton": "Cancelar",
       "deleteButton": "Eliminar",
       "recurrence": "Reaparición",
       "wrongPattern": "El patrón de recurrencia no es válido.",
       "seriesChangeAlert": "¿Desea cancelar los cambios realizados en instancias específicas de esta serie y volver a vincularlos con toda la serie?",
       "createError": "La duración del evento debe ser más corta que la frecuencia con la que ocurre. Acorte la duración o cambie el patrón de recurrencia en el editor de eventos de recurrencia.",
       "sameDayAlert": "Dos ocurrencias del mismo evento no pueden ocurrir en el mismo día.",
       "editRecurrence": "Editar recurrencia",
       "repeats": "Repite",
       "alert": "Alerta",
       "startEndError": "La fecha de finalización seleccionada ocurre antes de la fecha de inicio.",
       "invalidDateError": "El valor de la fecha ingresada no es válido.",
       "blockAlert": "Los eventos no se pueden programar dentro del rango de tiempo bloqueado.",
       "ok": "Okay",
       "yes": "si",
       "no": "No",
       "occurrence": "Ocurrencia",
       "series": "Serie",
       "previous": "Anterior",
       "next": "próximo",
       "timelineDay": "Día de la línea de tiempo",
       "timelineWeek": "Semana de la línea de tiempo",
       "timelineWorkWeek": "Semana laboral cronológica",
       "timelineMonth": "Mes de la línea de tiempo",
       "timelineYear": "Cronología Año",
       "editFollowingEvent": "Eventos siguientes",
       "deleteTitle": "Eliminar evento",
       "editTitle": "Editar evento",
       "beginFrom": "Comience desde",
       "endAt": "Termina en",
       "expandAllDaySection": "Expandir-sección-todo-el-día",
       "collapseAllDaySection": "Colapsar la sección de todo el día"
     },
     "recurrenceeditor": {
       "none": "Ninguna",
       "daily": "Diario",
       "weekly": "Semanal",
       "monthly": "Mensual",
       "month": "Mes",
       "yearly": "Anual",
       "never": "Nunca",
       "until": "Hasta",
       "count": "Contar",
       "first": "primero",
       "second": "Segundo",
       "third": "Tercero",
       "fourth": "Cuarto",
       "last": "Último",
       "repeat": "Repetir",
       "repeatEvery": "Repite cada",
       "on": "Repetir en",
       "end": "Final",
       "onDay": "Día",
       "days": "Dias)",
       "weeks": "Semanas)",
       "months": "Meses)",
       "years": "Años)",
       "every": "cada",
       "summaryTimes": "veces)",
       "summaryOn": "en",
       "summaryUntil": "hasta",
       "summaryRepeat": "Repite",
       "summaryDay": "dias)",
       "summaryWeek": "semanas)",
       "summaryMonth": "meses)",
       "summaryYear": "años)",
       "monthWeek": "Mes Semana",
       "monthPosition": "Posición del mes",
       "monthExpander": "Expansor de mes",
       "yearExpander": "Expansor de año",
       "repeatInterval": "Intervalo de repetición"
     },
     "calendar": {
       "today": "Hoy"
     }
   },
    "fr": {
             'schedule': {
                "day": "journée",
               "week": "La semaine",
               "workWeek": "Semaine de travail",
               "month": "Mois",
               "agenda": "Ordre du jour",
               "weekAgenda": "Agenda de la semaine",
               "workWeekAgenda": "Agenda de la semaine de travail",
               "monthAgenda": "Agenda du mois",
               "today": "Aujourd'hui",
               "noEvents": "Pas d'événements",
               "emptyContainer": "Aucun événement n'est prévu ce jour-là.",
               "allDay": "Toute la journée",
               "start": "Début",
               "end": "Fin",
               "more": "plus",
               "close": "Fermer",
               "cancel": "Annuler",
               "noTitle": "(Pas de titre)",
               "delete": "Effacer",
               "deleteEvent": "Supprimer un événement",
               "deleteMultipleEvent": "Supprimer plusieurs événements",
               "selectedItems": "Articles sélectionnés",
               "deleteSeries": "Supprimer la série",
               "edit": "modifier",
               "editSeries": "Modifier la série",
               "editEvent": "Modifier l'événement",
               "createEvent": "Créer",
               "subject": "Assujettir",
               "addTitle": "Ajouter un titre",
               "moreDetails": "Plus de détails",
               "save": "sauvegarder",
               "editContent": "Voulez-vous modifier uniquement cet événement ou une série entière?",
               "deleteRecurrenceContent": "Voulez-vous supprimer uniquement cet événement ou une série entière?",
               "deleteContent": "Êtes-vous sûr de vouloir supprimer cet événement?",
               "deleteMultipleContent": "Êtes-vous sûr de vouloir supprimer les événements sélectionnés?",
               "newEvent": "Nouvel évènement",
               "title": "Titre",
               "location": "Emplacement",
               "description": "La description",
               "timezone": "Fuseau horaire",
               "startTimezone": "Début du fuseau horaire",
               "endTimezone": "Fin du fuseau horaire",
               "repeat": "Répéter",
               "saveButton": "sauvegarder",
               "cancelButton": "Annuler",
               "deleteButton": "Effacer",
               "recurrence": "Récurrence",
               "wrongPattern": "Le modèle de récurrence n'est pas valide.",
               "seriesChangeAlert": "Les modifications apportées à des instances spécifiques de cette série seront annulées et ces événements correspondront à nouveau à la série.",
               "createError": "La durée de l'événement doit être plus courte que sa fréquence. Raccourcissez la durée ou modifiez le modèle de récurrence dans l'éditeur d'événement de récurrence.",
               "recurrenceDateValidation": "Certains mois ont moins que la date sélectionnée. Pour ces mois, l'événement se produira à la dernière date du mois.",
               "sameDayAlert": "Deux occurrences du même événement ne peuvent pas se produire le même jour.",
               "editRecurrence": "Modifier la récurrence",
               "repeats": "Répète",
               "alert": "Alerte",
               "startEndError": "La date de fin sélectionnée se produit avant la date de début.",
               "invalidDateError": "La valeur de date saisie est invalide.",
               "ok": "D'accord",
               "occurrence": "Occurrence",
               "series": "Séries",
               "previous": "précédent",
               "next": "Prochain",
               "timelineDay": "Journée chronologique",
               "timelineWeek": "Semaine chronologique",
               "timelineWorkWeek": "Semaine de travail chronologique",
               "timelineMonth": "Mois de la chronologie"
           },
           "recurrenceeditor": {
               "none": "Aucun",
               "daily": "du quotidien",
               "weekly": "Hebdomadaire",
               "monthly": "Mensuel",
               "month": "Mois",
               "yearly": "Annuel",
               "never": "Jamais",
               "until": "Jusqu'à",
               "count": "Compter",
               "first": "Premier",
               "second": "Seconde",
               "third": "Troisième",
               "fourth": "Quatrième",
               "last": "Dernier",
               "repeat": "Répéter",
               "repeatEvery": "Répéter tous les",
               "on": "Répéter sur",
               "end": "Fin",
               "onDay": "journée",
               "days": "Journées)",
               "weeks": "Semaines)",
               "months": "Mois)",
               "years": "Années)",
               "every": "chaque",
               "summaryTimes": "fois)",
               "summaryOn": "sur",
               "summaryUntil": "jusqu'à",
               "summaryRepeat": "Répète",
               "summaryDay": "journées)",
               "summaryWeek": "semaines)",
               "summaryMonth": "mois)",
               "summaryYear": "années)",
               "monthWeek": "Mois Semaine",
               "monthPosition": "Position du mois",
               "monthExpander": "Mois Expander",
               "yearExpander": "Année Expander",
               "repeatInterval": "Intervalle de répétition"

           }
         }
 });
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
                                 addConfirmShow: false,
                                 addConfirmPreListShow : false,
                                 droppedData : [],
                                   SelectedDocList : [],
                                 PredroppedData : [],
                                 droppedIndex : 0,
                                 PreIndex : 0,
                                   addAlertShow: false,
                                             errorMessage: '',
                                             errorType: '',
                                             error: false,

                                 droppedCellData : {},
                                 PreCellData : {},
                                 preEvent : {},
                                 droppedEvent : {},
                                  confirmMessage: '',
                                  confirmPreparationList : '',
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
        console.log("inside T444 value =",value);
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
   //  this.props.onTripCreationwithDoc(this.state.EventDraggedData);
        this.draggingProcessedFurther(this.state.droppedData, this.state.droppedEvent, this.state.droppedIndex, this.state.droppedCellData);
        this.setState({
            addConfirmShow: false
        })
    }


  onConfirmPreparationListNo = () => {
          console.log("T000 inside confirm No");
           this.addcontenttoScheduler(this.state.PredroppedData , this.state.preEvent, this.state.PreIndex,this.state.PreCellData);
         console.log("T111 after addallCall No");
         this.setState({
             addConfirmPreListShow: false,
             PredroppedData : [],
             preEvent : {},
             PreIndex : 0,
             PreCellData: {}
         })
     }

onConfirmPreparationListYes = (droppedData) => {
console.log("T000 inside confirm yes")

   this.addAllthePreparationListDocuments();
   console.log("T111 after addallCall Yes");
this.setState({
            addConfirmPreListShow: false,
             PredroppedData : [],
                         preEvent : {},
                         PreIndex : 0,
                         PreCellData: {}
            })
}


addAllthePreparationListDocuments =() => {
     console.log("222 inside addAllthepreparationList doc")
     console.log("222 predroppedData =",this.state.PredroppedData);
     console.log("222 dropsPanel =",this.props.dropsPanel);


     if (this.state.PredroppedData != undefined && this.state.PredroppedData  != '') {
                                                              for (var i = 0; i < this.props.dropsPanel.length; i++) {

                                                                                         if (this.state.PredroppedData.prelistCode === this.props.dropsPanel[i].prelistCode && this.props.dropsPanel[i].type === 'open' && (this.props.dropsPanel[i].dlvystatus === '8' || this.props.dropsPanel[i].dlvystatus === '0')) {
                                                                                            console.log("T000 inside docnum =",this.props.dropsPanel[i].docnum+'--'+this.props.dropsPanel[i].type)
                                                                                            // currentTrip = this.props.trips;
                                                                                              this.addcontenttoScheduler(this.props.dropsPanel[i] , this.state.preEvent ,this.state.PreIndex, this.state.PreCellData);

                                                                                         }
                                                                                     }
                                                          }

  }






    getConsultantDesignation(value) {
        console.log("T444 value at designation =",value);
        return value.resourceData.drivername;
    }

     getConsultantclass(value) {
            console.log("T444 value at designation =",value);
           // return 'class2'
            return value.resourceData.className;
        }
      getConsultantskill(value) {
                 console.log("T444 value at designation =",value);
               //  return 'John'
                 return value.resourceData.skills;
             }
    resourceHeaderTemplate(props) {
        return (<div className="template-wrap"><div className="specialist-category"><div className={"specialist-image " + this.getConsultantImage(props)}></div><div className="specialist-name">
      {this.getConsultantName(props)}</div><div className="specialist-designation">{this.getConsultantDesignation(props)}</div></div></div>

       );
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
          var buttonElement = args.type === "QuickInfo" ? ".e-event-popup .e-delete" : ".e-schedule-dialog .e-event-delete";
             var deleteButton = document.querySelector(buttonElement);
             deleteButton.ej2_instances[0].disabled = true;

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
                      console.log("T333 at drop event - schduler_data- index =",index);
                      var data = passeddata;
                         var doctype;

                      if(data.doctype === 'DLV' || data.doctype === 'PICK' || data.doctype === 'APP')
                      {
                         doctype = 'Drop';
                      }
                      else {
                          doctype = 'Pickup';
                      }



                    //  let cellData : CellClickEventArgs = this.scheduleObj.getCellDetails(event.target);
                       console.log("T1111 inside cellData = ",cellData);
                       let resourceDetails = this.scheduleObj.getResourcesByIndex(cellData.groupIndex);
                       let droppedDay = cellData.startTime.getDay();
                       console.log("T1111 inside celldata- droppedday =",droppedDay);


                    // add validation for the dropped document
                      let dropCompatability = true;
                            let error = "";

/*
//To check customer is availability on that day

if(dropCompatability) {
      let MyArray = (data.availDays).split(",");
      let [sunday,monday,Tuesday,Wednesday,Thursday, Friday, Satday] =  MyArray;
      console.log("at day check- monday",monday);
      console.log("at day check= Friday",Friday);
      let ValidDay  = true;
      switch(droppedDay) {
      case 1 :
          if(monday == 2) {
             ValidDay = true;
            }
          else {
           ValidDay = false;
          }
       break;
       case 2 :
                 if(Tuesday == 2) {
                    ValidDay = true;
                   }
                 else {
                  ValidDay = false;
                 }
              break;
       case 3 :
                 if(Wednesday == 2) {
                    ValidDay = true;
                   }
                 else {
                  ValidDay = false;
                 }
              break;
       case 4 :
                 if(Thursday == 2) {
                    ValidDay = true;
                   }
                 else {
                  ValidDay = false;
                 }
              break;
       case 5 :
                 if(Friday == 2) {
                    ValidDay = true;
                   }
                 else {
                  ValidDay = false;
                 }
              break;
    }


    if(ValidDay) {
      dropCompatability = true;
    }
    else {

      dropCompatability = false;
                                error = "UnAvailDay";
                                this.setState({
                                                                                 errorType : 'UnAvailDay',
                                                                                  errorMessage: "Customer is not available on this Day, please choose another",
                                                                                  addAlertShow: true,
                                                                                  error: true
                                                                              });
    }


    console.log("at day check resouce data =",resourceDetails);
}


 //To check VehicleClass  at Vehicle & Veh class association from customer Address level

 if(dropCompatability) {
    console.log("T666 resource details =",resourceDetails);
    console.log("T666 dragged data = ",data);

    if(data.allVehClass === "2") {
           console.log("T666  data anything is fine = ",data.vehClassAssoc);
           dropCompatability = true;
    }
    else {
      if(data.vehClassList.length > 0) {

               if (data.vehClassList.includes(resourceDetails.resourceData.className)) {
                  console.log("T666  data match vehclass Assoc = ",data.vehClassAssoc);
                  dropCompatability = true;
               }
               else {
                   console.log("T666 inside vehclass  doesn't match = ");
                            dropCompatability = false;
                            error = "VehClass";
                            this.setState({
                                                                             errorType : 'VehClass',
                                                                              errorMessage: "Vehicle Class doesn't match with Document Vehicle class association",
                                                                              addAlertShow: true,
                                                                              error: true
                                                                          });

                        }
      }
      else {
          dropCompatability = true;
      }
      }
  }

















*/

 // To check vehicle and product category
 if(dropCompatability) {
   console.log("T666 resource details =",resourceDetails);
   console.log("T666 dragged data = ",data);
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
                                              IsReadonly : true,
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
                              console.log("T333 after eventdata prep", eventData);
                               console.log("T333 after ScheduleObj", this.scheduleObj);
                                this.scheduleObj.addEvent(eventData);
                              //  this.props.SelectedDocumentEvent(data.docnum);
                                this.props.disableDivs(index, "doc", data.docnum);

   }
         }


    drop(event, eventType, args : DragAndDropEventArgs) {
            console.log("T111 inside drop event, add ExternalDragDrop");


             console.log("T111 type pf type =", event.dataTransfer.getData("type"));



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
                                                          confirmMessage: 'Document Date & Calendar Date is different. Are you confirm to add to trip',
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
                                          if(data.prelistCode !== " ") {
                                            const message = "Would you like to Select all the Preparation list Documents ?"
                                               this.setState({
                                                      addConfirmPreListShow : true,
                                                      confirmMessage : message,
                                                      PredroppedData : data,
                                                      preEvent : event,
                                                      PreIndex : index,
                                                      PreCellData : cellData,

                                               })

                                          }
                                          else {



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

  displayDropStatus = (vStatus, x) => {
        const dropStatus = vStatus
        const dlvyStatus = x
        if (dropStatus == 'open'&& (dlvyStatus == '0' || dlvyStatus == '8') ) {
            return (
               'ToPlan'
            );
        }
        if (dropStatus == 'open' && dlvyStatus == '1') {
                    return (
                        'Planned'
                    );
                }
        if (dropStatus == 'Allocated' && (dlvyStatus == '0' || dlvyStatus == '8')) {
            return (
                'Planned'
            );
        }
        if (dropStatus == 'selected' && (dlvyStatus == '0' || dlvyStatus == '8')) {
                    return (
                       'Planned'
                    );
                }
        if(dlvyStatus == '1') {
          return (
                         'Planned'
                      );
        }
         if(dlvyStatus == '2') {
                  return (
                               'OntheWay'
                              );
                }
        if(dlvyStatus == '3') {
                  return (
                                 'InProgress'
                              );
                }
        if(dlvyStatus == '4') {
                          return (
                                       'Completed'
                                      );
                        }
        if(dlvyStatus == '5') {
                          return (
                                        'Skipped'
                                      );
                        }
        if(dlvyStatus == '6') {
                                  return (
                                                'Rescheduled'

                                              );
                                }
        if(dlvyStatus == '7') {
                                  return (
                                                  'Canceled'

                                              );
                                }
    }




      eventTemplate (props: {[key: string] : Object}) :  JSX.Element {
            console.log("inside props -",props);
         return (
             <div className="template-wrap" style={{fontSize: "14px",width:"450px",height:"105px", background : this.bgcolor(props.doctype)}} >
               {props.doctype === 'PRECEIPT' ?
                <div className="subject" ><span style={{paddingRight : "22px"}}>{props.docnum}</span ><span style={{paddingLeft : "20px", paddingRight : "20px"}}>T{props.tripno} - #{props.seq}</span><span style={{paddingRight : "7px"}}>{props.arvtime} - {props.deptime}</span><span style={{paddingLeft : "20px",paddingRight : "10px"}}>{this.displayDropStatus(props.type,props.dlvystatus)}</span></div> :
                <div className="subject" ><span style={{width:"145px"}} >{props.docnum}</span ><span style={{paddingLeft : "20px", paddingRight : "20px"}}>T{props.tripno} - #{props.seq}</span><span style={{ paddingRight : "7px"}}>{props.arvtime} - {props.deptime}</span><span style={{paddingLeft : "20px",paddingRight : "10px"}}>{this.displayDropStatus(props.type,props.dlvystatus)}</span> </div>
                 }
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
            /*
            resourceHeaderTemplate(props) {
                return (<div className="template-wrap">
                <div className="resource-detail"><div className="resource-name">{this.getVehicleName(props)}</div>
                <div className="resource-designation">{this.getDrivername(props)}</div></div></div>);
            }
            */



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
       console.log("T000 inside at ExternalDragnDrop- SelDoc",this.props.selectedDocumentList);
       console.log("vehicle - panel",this.props.vehicles);
            console.log("selected drops =", this.props.dropsPanel);
               let addAlertClose = () => this.setState({ addAlertShow: false });
            const vehicles = this.props.vehicles;
            const drivers = this.props.drivers;
            const TripsDocData  = [];
             this.props.dropsPanel && this.props.dropsPanel.map((drop) => {
                 //    drop.IsReadonly = true;

                     TripsDocData.push(drop);
             })

           //  const TripsDocData = this.props.dropsPanel

        return (<div className='schedule-control-section' onDragOver={(evnt) => this.dragOver(evnt)}
                                                                                                                     onDrop={(evnt) => this.drop(evnt)}  >
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper drag-sample-wrapper'>
            <div className="schedule-container">
              <ScheduleComponent  allowResizing = {false} locale={loc} actionBegin={this.onSchActionBegin.bind(this)} actionComplete={this.onSchActionComplete.bind(this)}  rowAutoHeight={true} ref={schedule => this.scheduleObj = schedule} popupOpen={this.onPopupOpen.bind(this)}  cssClass='schedule-drag-drop' width='100%' height='650px' selectedDate={this.props.selectedDate} currentView='TimelineWorkWeek' resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)}
              eventSettings={{ dataSource: TripsDocData,template : this.eventTemplate.bind(this), enableMaxHeight : true,
                 fields: {
                                              id: 'docnum',
                                              subject: { name: 'bpcode' },
                                              isAllDay: false,



                                              startTime: { name: 'docdate' },
                                              endTime: { name: 'docdate' },

                                          }
            }}

             group={{ enableCompactView: false, resources: ['Consultants'] }} actionBegin={this.onActionBegin.bind(this)} drag={this.onItemDrag.bind(this)} timeScale={{enable:false}}>
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
                      allowDragAndDrops = {false}
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
                     <ConfirmPreparationList
                                           show={this.state.addConfirmPreListShow}
                                           onHide={this.onConfirmPreparationListNo}
                                           confirmPreparationList={this.onConfirmPreparationListYes}
                                           dropsData={this.state.PredroppedData}
                                           confirmMessage={this.state.confirmMessage}

                                       ></ConfirmPreparationList>
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
