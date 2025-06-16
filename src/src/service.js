import React from 'react';
import XMLParser from 'react-xml-parser';

//RP
export async function fetchAPI(param, date) {
    const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/transport/vehicle/panel?site=' + param + '&date='+date), fetch('http://tmsx3.tema-systems.com:8050/api/v1/transport/drops/panel?site=' + param + '&date='+date), fetch('http://tmsx3.tema-systems.com:8050/api/v1/transport/trips?site=' + param + '&date='+date)])
        .then(([res1, res2, res3]) => {
           return Promise.all([res1.json(), res2.json(), res3.json(), res1.status, res2.status, res3.status ])
        });
    return completeResult;
}

//Scheduler
export async function fetchSchedulerAPI(param, sdate , edate) {
    const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/fms/transport/vehicle/panel?site=' + param + '&date='+sdate), fetch('http://tmsx3.tema-systems.com:8050/api/fms/transport/docs/panelwithRange?site=' + param + '&sdate='+sdate+'&edate='+edate), fetch('http://tmsx3.tema-systems.com:8050/api/fms/transport/tripsrange?site=' + param + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1, res2, res3]) => {
           return Promise.all([res1.json(), res2.json(), res3.json()])
        });
    return completeResult;
}

//Scheduler- fsm
export async function fetchSchedulerDocsAPI(param, sdate , edate) {
    const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/fms/transport/docs/panelwithRange?site=' + param + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1]) => {
           return Promise.all([res1.json()])
        });
    return completeResult;
}


//Scheduler
export async function fetchDocumentPanelwithRange(param, sdate , edate) {
    const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/scheduler/docs/panelwithRange?site=' + param + '&sdate='+sdate+'&edate='+edate), fetch('http://tmsx3.tema-systems.com:8050/api/v1/scheduler/tripsrange?site=' + param + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1, res2]) => {
           return Promise.all([res1.json(), res2.json()])
        });
    return completeResult;
}

//Scheduler
export async function fetchDocumentPanelAPI(param, date) {
    const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/fms/transport/docs/panelwithSelDate?site=' + param + '&seldate='+date)])
        .then(([res1]) => {
           return Promise.all([res1.json()])
        });
    return completeResult;
}


//RP
export async function fetchPanel(site, date) {
    const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/transport/drops/panel?site=' + site + '&date='+date), fetch('http://tmsx3.tema-systems.com:8050/api/v1/transport/trips?site=' + site + '&date='+date)])
        .then(([res1, res2]) => {
           return Promise.all([res1.json(), res2.json() ])
        });
    return completeResult;
}

//RP
export async function fetchDropsPanel(site, date) {
    const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/transport/drops/panel?site=' + site + '&date='+date)])
        .then(([res1]) => {
           return Promise.all([res1.json() ])
        });
    return completeResult;
}

//RP
export async function fetchTripsPanel(site, date) {
    const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/transport/trips?site=' + site + '&date='+date)])
        .then(([res1]) => {
           return Promise.all([res1.json() ])
        });
    return completeResult;
}

//RP
export async function fetchTripsPanelwithRange(site,  sdate, edate) {
    const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/transport/tripswithRange?site=' + site + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1]) => {
           return Promise.all([res1.json() ])
        });
    return completeResult;
}


//railcar
export async function fetchRailDropsPanel(site, date) {
    const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/rail/drops/panel?site=' + site + '&date='+date)])
        .then(([res1]) => {
           return Promise.all([res1.json() ])
        });
    return completeResult;
}

//RP
export async function fetchDropsPanelwithRange(site, sdate, edate) {
    const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/transport/drops/panelwithRange?site=' + site + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1]) => {
           return Promise.all([res1.json() ])
        });
    return completeResult;
}

//railcar
export async function fetchRailTripsPanelwithRange(site, sdate, edate) {
    const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/rail/railtripswithRange?site=' + site + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1]) => {
           return Promise.all([res1.json() ])
        });
    return completeResult;
}


//railcar
export async function fetchRailTripsPanel(site, date) {
    const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/rail/railtrips?site=' + site + '&date='+date)])
        .then(([res1]) => {
           return Promise.all([res1.json() ])
        });
    return completeResult;
}


//railcar
export async function fetchRailDropsPanelwithRange(site, sdate, edate) {
    const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/rail/drops/panelwithRange?site=' + site + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1]) => {
           return Promise.all([res1.json() ])
        });
    return completeResult;
}

//Scheduler
export async function fetchSchedulerDropsPanelwithRange(site, sdate, edate) {
    const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/scheduler/docs/panelwithRange?site=' + site + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1]) => {
           return Promise.all([res1.json() ])
        });
    return completeResult;
}


//Appointments-Scheduler
export async function fetchAppSchedulerDropsPanelwithRange(site, sdate, edate) {
    const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/appoint/docs/panelwithRange?site=' + site + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1]) => {
           return Promise.all([res1.json() ])
        });
    return completeResult;
}



//RP
export async function fetchTrips(site, date) {
    const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/fms/transport/trips?site=' + site + '&date='+date)])
        .then(([res1]) => {
           return Promise.all([res1.json()])
        });
    return completeResult;
}


// ADDED for VR screen --- by Ashok
export async function fetchVR(vrcode) {

        const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/fms/transport/vr?vrcode=' + vrcode), fetch('http://tmsx3.tema-systems.com:8050/api/fms/transport/vrdetails?vrcode=' + vrcode)])
           .then(([res1, res2]) => {
                      return Promise.all([res1.json() , res2.json()])
                   });
               return completeResult;
    }



    //end of VR screen

export async function fetchLVS(vrcode) {

        const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/transport/loadvehstk?vrcode=' + vrcode)])
           .then(([res1]) => {
                      return Promise.all([res1.json()])
                   });
               return completeResult;
    }

  //RAILCAR APIS

 export async function fetchRailAPI(param, date) {
     const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/rail/railcar?site=' + param)])
         .then(([res1]) => {
            return Promise.all([res1.json(), res1.status ])
         });
     return completeResult;
 }



///RAILCAR CHECKIN SCREEN API'S --- by Ashok
export async function fetchRailCarAPI(param) {

        const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/rail/railchkIn?site=' + param), fetch('http://tmsx3.tema-systems.com:8050/api/v1/rail/railchkOut?site=' + param),fetch('http://tmsx3.tema-systems.com:8050/api/v1/rail/railchkAvail?site=' + param)])
           .then(([res1, res2, res3]) => {
                      return Promise.all([res1.json() , res2.json(), res3.json()])
                   });
               return completeResult;
    }


// list of LVS
export async function fetchLvsList() {

        const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/transport/lvslist')])
           .then(([res1]) => {
                      return Promise.all([res1.json(), res1.status])
                   });
               return completeResult;
    }


export async function fetchInventoryList(param) {

        const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/transport/stocklocbysite?site=' + param), fetch('http://tmsx3.tema-systems.com:8050/api/v1/transport/loctypbysite?site=' + param)])
           .then(([res1, res2]) => {
                      return Promise.all([res1.json() , res2.json()])
                   });
               return completeResult;
    }


//rail car outbound screen
export async function fetchRailCarOutBoundAPI(site, date) {

        const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/rail/railchkIn?site=' + site), fetch('http://tmsx3.tema-systems.com:8050/api/v1/rail/drops/panel?site=' + site + '&date='+date),fetch('http://tmsx3.tema-systems.com:8050/api/v1/rail/railtrips?site=' + site + '&date='+date)])
           .then(([res1, res2, res3]) => {
                      return Promise.all([res1.json() , res2.json(), res3.json(), res1.status, res2.status, res3.status])
                   });
               return completeResult;
    }

//Railcar PDF
export async function fetchRailVR(vrcode) {
       let docnum = 'ASMI12203SDH00000272';
       //ASMI12203SDH00000293 , ASMI12203SDH00000355 , GDKS12205SDH00000049, ASMI12203SDH00000272,STCA12205SDH00000106

        const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/rail/vr?vrcode=' + vrcode), fetch('http://tmsx3.tema-systems.com:8050/api/v1/rail/vrdetails?vrcode=' + vrcode) ,fetch('http://tmsx3.tema-systems.com:8050/api/v1/rail/prdcombo?docnum=' + docnum),fetch('http://tmsx3.tema-systems.com:8050/api/v1/rail/bol?docnum=' + docnum) ])
           .then(([res1, res2, res3, res4]) => {
                      return Promise.all([res1.json() , res2.json(), res3.json(), res4.json()])
                   });

  return completeResult;
}


//Appointment API
export async function fetchAppointmentAPI(param, date) {
    const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/appoint/left/panel?site=' + param + '&date='+date), fetch('http://tmsx3.tema-systems.com:8050/api/v1/appoint/right/panel?site=' + param + '&date='+date), fetch('http://tmsx3.tema-systems.com:8050/api/v1/appoint/trips?site=' + param + '&date='+date)])
        .then(([res1, res2, res3]) => {
           return Promise.all([res1.json(), res2.json(), res3.json(), res1.status, res2.status, res3.status ])
        });
    return completeResult;
}


//Appintment - Scheduler
export async function fetchAppointmentSchedulerAPI(param, sdate , edate) {
    const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/appoint/vehicle/panel?site=' + param + '&date='+sdate), fetch('http://tmsx3.tema-systems.com:8050/api/v1/appoint/docs/panelwithRange?site=' + param + '&sdate='+sdate+'&edate='+edate), fetch('http://tmsx3.tema-systems.com:8050/api/v1/appoint/tripsrange?site=' + param + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1, res2, res3]) => {
           return Promise.all([res1.json(), res2.json(), res3.json()])
        });
    return completeResult;
}

//Apointment-Scheduler
export async function fetchAppointmentSchedulerDocsAPI(param, sdate , edate) {
    const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/appoint/docs/panelwithRange?site=' + param + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1]) => {
           return Promise.all([res1.json()])
        });
    return completeResult;
}


//Appointment -Scheduler
export async function fetchAppointmentDocumentPanelwithRange(param, sdate , edate) {
    const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/appoint/docs/panelwithRange?site=' + param + '&sdate='+sdate+'&edate='+edate), fetch('http://tmsx3.tema-systems.com:8050/api/v1/appoint/tripsrange?site=' + param + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1, res2]) => {
           return Promise.all([res1.json(), res2.json()])
        });
    return completeResult;
}

//Appointment - Scheduler
export async function fetchAppointmentDocumentPanelAPI(param, date) {
    const completeResult = Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/v1/appoint/docs/panelwithSelDate?site=' + param + '&seldate='+date),fetch('http://tmsx3.tema-systems.com:8050/api/v1/appoint/trips?site=' + param + '&date='+date)])
        .then(([res1, res2]) => {
           return Promise.all([res1.json(), res2.json()])
        });
    return completeResult;
}





//soap for X3

export async function getsampleexample () {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST','https://tms.tema-systems.com/soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC',true);

var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
'<soapenv:Header/>' +
'<soapenv:Body>' +
   '<wss:read soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
        ' <codeLang xsi:type="xsd:string">ENG</codeLang>'+
        '<poolAlias xsi:type="xsd:string">DEMOTMSFR</poolAlias>'+
         '<poolId xsi:type="xsd:string"></poolId>'+
        ' <requestConfig xsi:type="xsd:string"></requestConfig>'+
     ' </callContext>'+
      '<publicName xsi:type="xsd:string">XX10CSDH</publicName>'+

    '   <objectKeys xsi:type="wss:ArrayOfCAdxParamKeyValue" soapenc:arrayType="wss:CAdxParamKeyValue[]">'+
               ' <key>SDHNUM</key><value>BDL2208CFGHQ000020</value>'+
               ' </objectKeys>'+
   '</wss:read>'+
'</soapenv:Body>'+
'</soapenv:Envelope>';

xmlhttp.onreadystatechange=function(){
    if(xmlhttp.readyState == 4){
        if(xmlhttp.status== 200){

            

        }

    }
}


xmlhttp.setRequestHeader('Content-Type','text/html');

xmlhttp.setRequestHeader('SOAPAction','CAdxWebServiceXmlCC');

xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa("TESTUSER" + ':' + "TU@123*"));

try
{
xmlhttp.send(src);
}catch(error){
    
}

}


export async function callWebservice(){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST','https://tms.tema-systems.com/soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC',true);

var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
'<soapenv:Header/>' +
'<soapenv:Body>' +
   '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
        ' <codeLang xsi:type="xsd:string">ENG</codeLang>'+
        '<poolAlias xsi:type="xsd:string">DEMOTMSFR</poolAlias>'+
         '<poolId xsi:type="xsd:string"></poolId>'+
        ' <requestConfig xsi:type="xsd:string"></requestConfig>'+
     ' </callContext>'+
      '<publicName xsi:type="xsd:string">XX10CCONF</publicName>'+

    '  <inputXml xsi:type="xsd:string">'+
  '<![CDATA[<PARAM>'+
'<FLD NAME="I_XCPY" TYPE="Char">CCBTL</FLD>'+
'<FLD NAME="I_XIP" TYPE="Char">tms.tema-systems.com</FLD>'+
'<FLD NAME="I_XPORT" TYPE="Char">8124</FLD>'+
'<FLD NAME="I_XFOLDER" TYPE="Char">DEMOTMSFR</FLD>'+
'<FLD NAME="I_XUSR" TYPE="Char">TESTUSER</FLD>'+
'<FLD NAME="I_PWD" TYPE="Char">TU@123*</FLD>'+
'</PARAM>]]>'+
'</inputXml>'+
   '</wss:run>'+
'</soapenv:Body>'+
'</soapenv:Envelope>';

xmlhttp.onreadystatechange=function(){
    if(xmlhttp.readyState == 4){
        if(xmlhttp.status== 200){

            

        }

    }
}

xmlhttp.setRequestHeader('Content-Type','text/html');

xmlhttp.setRequestHeader('SOAPAction','CAdxWebServiceXmlCC');

xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa("TESTUSER" + ':' + "TU@123*"));

try
{
xmlhttp.send(src);
}catch(error){
    
}

}


//PO , PreReceipt generation from Freqeuncy

export async function CreatePOfromFrequency(num, site, date, supplier, reference, qty) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST','https://tms.tema-systems.com/soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC',true);

var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
'<soapenv:Header/>' +
'<soapenv:Body>' +
   '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
        ' <codeLang xsi:type="xsd:string">ENG</codeLang>'+
        '<poolAlias xsi:type="xsd:string">DEMOTMSFR</poolAlias>'+
         '<poolId xsi:type="xsd:string"></poolId>'+
        ' <requestConfig xsi:type="xsd:string"></requestConfig>'+
     ' </callContext>'+
      '<publicName xsi:type="xsd:string">X1CPOHPTHW</publicName>'+

      '  <inputXml xsi:type="xsd:string">'+
     '<![CDATA[<PARAM>'+
   '<FLD NAME="I_XNUM" TYPE="Char">'+num+'</FLD>'+
   '<FLD NAME="I_XPOHFCY" TYPE="Char">'+site+'</FLD>'+
   '<FLD NAME="I_XORDDAT" TYPE="Date">'+date+'</FLD>'+
   '<FLD NAME="I_XBPSNUM" TYPE="Char">'+supplier+'</FLD>'+
   '<FLD NAME="I_XORDREF" TYPE="Char">'+reference+'</FLD>'+
   '<FLD NAME="I_XQTY" TYPE="Decimal">'+qty+'</FLD>'+
   '</PARAM>]]>'+
   '</inputXml>'+
   '</wss:run>'+
'</soapenv:Body>'+
'</soapenv:Envelope>';

xmlhttp.onreadystatechange=function(){
    if(xmlhttp.readyState == 4){
        if(xmlhttp.status== 200){
          // let object =  JSON.parse(xmlhttp.response);
          // 
          // return object;

            let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
            
            let extractxmldata = responeData.slice(9, responeData.length-3)
            
          var xml = new XMLParser().parseFromString(extractxmldata);
       //  const completeResult = return xml;

          
          var PO =  xml.children[1].children[1].value;
          var PreReceipt = xml.children[1].children[2].value;
          
          
          return extractxmldata;
        }

    }
}


xmlhttp.setRequestHeader('Content-Type','text/html');

xmlhttp.setRequestHeader('SOAPAction','CAdxWebServiceXmlCC');

xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa("TESTUSER" + ':' + "TU@123*"));

try
{
xmlhttp.send(src);
}catch(error){
    
}

}


export async function CreatePOfromFrequency2(num, site, date, supplier, reference, qty) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST','https://tms.tema-systems.com/soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC',true);

var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
'<soapenv:Header/>' +
'<soapenv:Body>' +
   '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
        ' <codeLang xsi:type="xsd:string">ENG</codeLang>'+
        '<poolAlias xsi:type="xsd:string">DEMOTMSFR</poolAlias>'+
         '<poolId xsi:type="xsd:string"></poolId>'+
        ' <requestConfig xsi:type="xsd:string"></requestConfig>'+
     ' </callContext>'+
      '<publicName xsi:type="xsd:string">X1CPOHPTHW</publicName>'+

      '  <inputXml xsi:type="xsd:string">'+
     '<![CDATA[<PARAM>'+
   '<FLD NAME="I_XNUM" TYPE="Char">'+num+'</FLD>'+
   '<FLD NAME="I_XPOHFCY" TYPE="Char">'+site+'</FLD>'+
   '<FLD NAME="I_XORDDAT" TYPE="Date">'+date+'</FLD>'+
   '<FLD NAME="I_XBPSNUM" TYPE="Char">'+supplier+'</FLD>'+
   '<FLD NAME="I_XORDREF" TYPE="Char">'+reference+'</FLD>'+
   '<FLD NAME="I_XQTY" TYPE="Decimal">'+qty+'</FLD>'+
   '</PARAM>]]>'+
   '</inputXml>'+
   '</wss:run>'+
'</soapenv:Body>'+
'</soapenv:Envelope>';



return new Promise((resolve, reject) => {

xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return;
      }
    if(xmlhttp.readyState == 4){
        if(xmlhttp.status== 200){
          // let object =  JSON.parse(xmlhttp.response);
          // 
          // return object;

            let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
            
            let extractxmldata = responeData.slice(9, responeData.length-3)
            
          var xml = new XMLParser().parseFromString(extractxmldata);
       //  const completeResult = return xml;

          
          var PO =  xml.children[1].children[1].value;
          var PreReceipt = xml.children[1].children[2].value;
          
          
          resolve (xml);

        }

    }
}


xmlhttp.setRequestHeader('Content-Type','text/html');

xmlhttp.setRequestHeader('SOAPAction','CAdxWebServiceXmlCC');

xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa("TESTUSER" + ':' + "TU@123*"));

try
{
xmlhttp.send(src);
}catch(error){
    
}
  });
}


export async function CreateDelvieriesfromOrdersinRoute(routecode) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST','http://tmsx3.tema-systems.com/soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC',true);

var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS">' +
'<soapenv:Header/>' +
'<soapenv:Body>' +
   '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
        ' <codeLang xsi:type="xsd:string">ENG</codeLang>'+
        '<poolAlias xsi:type="xsd:string">TMSDEVN</poolAlias>'+
         '<poolId xsi:type="xsd:string"></poolId>'+
        ' <requestConfig xsi:type="xsd:string"></requestConfig>'+
     ' </callContext>'+
      '<publicName xsi:type="xsd:string">X1CSERSDH</publicName>'+

      '  <inputXml xsi:type="xsd:string">'+
     '<![CDATA[<PARAM>'+
   '<FLD NAME="I_XROUTENUM" TYPE="Char">'+routecode+'</FLD>'+

   '</PARAM>]]>'+
   '</inputXml>'+
   '</wss:run>'+
'</soapenv:Body>'+
'</soapenv:Envelope>';



return new Promise((resolve, reject) => {

xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return;
      }
    if(xmlhttp.readyState == 4){
        if(xmlhttp.status== 200){
          // let object =  JSON.parse(xmlhttp.response);
          // 
          // return object;

            let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
            
            let extractxmldata = responeData.slice(9, responeData.length-3)
            
          var xml = new XMLParser().parseFromString(extractxmldata);
       //  const completeResult = return xml;

          
          resolve (xml);

        }

    }
}


xmlhttp.setRequestHeader('Content-Type','text/html');

xmlhttp.setRequestHeader('SOAPAction','CAdxWebServiceXmlCC');

xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa("PAVANKN" + ':' + "<%TE04e&Tb$>"));

try
{
xmlhttp.send(src);
}catch(error){
    
}
  });
}


