import React from 'react';
import XMLParser from 'react-xml-parser';

const apiUrl = process.env.REACT_APP_API_URL;

// SOAP details from .env
const soapUrl = process.env.REACT_APP_SOAP_URL;
const soapLanguage = process.env.REACT_APP_SOAP_LANGUAGE;
const soapPoolName = process.env.REACT_APP_SOAP_POOL_NAME;
const soapUsername = process.env.REACT_APP_SOAP_USERNAME;
const soapPassword = process.env.REACT_APP_SOAP_PASSWORD;

//RP
export async function fetchAPI(param, date) {
  const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/vehicle/panel?site=` + param + '&date=' + date), fetch(`${apiUrl}/api/v1/transport/drops/panel?site=` + param + '&date=' + date), fetch(`${apiUrl}/api/v1/transport/trips?site=` + param + '&date=' + date), fetch(`${apiUrl}/api/v1/transport/routecodes`)])
    .then(([res1, res2, res3, res4]) => {
      return Promise.all([res1.json(), res2.json(), res3.json(), res4.json(), res1.status, res2.status, res3.status, res4.status])
    });
  return completeResult;
}

//RP
export async function fetchPanel(site, date) {
  const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/drops/panel?site=` + site + '&date=' + date), fetch(`${apiUrl}/api/v1/transport/trips?site=` + site + '&date=' + date)])
    .then(([res1, res2]) => {
      return Promise.all([res1.json(), res2.json()])
    });
  return completeResult;
}

//opendocsBySiteAndDateRange
export async function fetchOpenDocumentPanelwithRange(param, sdate, edate) {
  const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/opendocsBySiteAndDateRange?site=` + param + '&sdate=' + sdate + '&edate=' + edate)])
    .then(([res1]) => {
      return Promise.all([res1.json()])
    });
  return completeResult;
}



//open to Add docsBySiteAndDateRange
export async function fetchOpenToAddDocumentPanelwithRange(param, sdate, edate) {
  const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/opentoadddocsBySiteAndDateRange?site=` + param + '&sdate=' + sdate + '&edate=' + edate)])
    .then(([res1]) => {
      return Promise.all([res1.json()])
    });
  return completeResult;
}




//RP
export async function fetchDropsPanel(site, date) {
  const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/drops/panel?site=` + site + '&date=' + date)])
    .then(([res1]) => {
      return Promise.all([res1.json()])
    });
  return completeResult;
}

//RP
export async function fetchTripsPanel(site, date) {
  const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/trips?site=` + site + '&date=' + date)])
    .then(([res1]) => {
      return Promise.all([res1.json()])
    });
  return completeResult;
}


//RP
export async function fetchTripsPanelwithRange(site, sdate, edate) {
  const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/tripswithRange?site=` + site + '&sdate=' + sdate + '&edate=' + edate)])
    .then(([res1]) => {
      return Promise.all([res1.json()])
    });
  return completeResult;
}



//RP
export async function fetchTrips(site, date) {
  const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/trips?site=` + site + '&date=' + date)])
    .then(([res1]) => {
      return Promise.all([res1.json()])
    });
  return completeResult;
}


// ADDED for VR screen --- by Ashok
export async function fetchVR(vrcode) {

  const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/vr?vrcode=` + vrcode), fetch(`${apiUrl}/api/v1/transport/vrdetails?vrcode=` + vrcode), fetch(`${apiUrl}/api/v1/transport/loadvehstk?vrcode=` + vrcode)])
    .then(([res1, res2, res3]) => {
      return Promise.all([res1.json(), res2.json(), res3.json()])
    });
  return completeResult;
}



//end of VR screen
//RP
export async function fetchLVS(vrcode) {

  const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/loadvehstk?vrcode=` + vrcode)])
    .then(([res1]) => {
      return Promise.all([res1.json()])
    });
  return completeResult;
}




export async function fetchDropsPanelwithRange(site, sdate, edate) {
  const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/drops/panelwithRange?site=` + site + '&sdate=' + sdate + '&edate=' + edate)])
    .then(([res1]) => {
      return Promise.all([res1.json()])
    });
  return completeResult;
}



//Scheduler
export async function fetchSchedulerAPI(param, sdate, edate) {
  const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/scheduler/vehicle/panel?site=` + param + '&date=' + sdate), fetch(`${apiUrl}/api/v1/scheduler/docs/panelwithRange?site=` + param + '&sdate=' + sdate + '&edate=' + edate), fetch(`${apiUrl}/api/v1/scheduler/tripsrange?site=` + param + '&sdate=' + sdate + '&edate=' + edate), fetch(`${apiUrl}/api/v1/scheduler/routecodes`),fetch(`${apiUrl}/api/v1/transport/getpickerlist`)])
    .then(([res1, res2, res3, res4, res5]) => {
      return Promise.all([res1.json(), res2.json(), res3.json(), res4.json(),res5.json()])
    });

    // console.log(completeResult, "this is complete result");
  return completeResult;
}

//Scheduler
export async function fetchSchedulerDocsAPI(param, sdate, edate) {
  const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/scheduler/docs/panelwithRange?site=` + param + '&sdate=' + sdate + '&edate=' + edate)])
    .then(([res1]) => {
      return Promise.all([res1.json()])
    });
  return completeResult;
}


//Scheduler
export async function fetchSchedulerDropsPanelwithRange(site, sdate, edate) {
  const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/scheduler/docs/panelwithRange?site=` + site + '&sdate=' + sdate + '&edate=' + edate)])
    .then(([res1]) => {
      return Promise.all([res1.json()])
    });
  return completeResult;
}


//Scheduler
export async function fetchSchedulerAPIOneDate(param, sdate) {
  const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/scheduler/vehicle/panel?site=` + param + '&date=' + sdate), 
    fetch(`${apiUrl}/api/v1/scheduler/docs/panelwithSelDate?site=` + param + '&seldate=' + sdate), 
    fetch(`${apiUrl}/api/v1/scheduler/trips?site=` + param + '&date=' + sdate), 
    fetch(`${apiUrl}/api/v1/scheduler/routecodes`),
    fetch(`${apiUrl}/api/v1/transport/getpickerlist`)])
    .then(([res1, res2, res3, res4,res5]) => {
      return Promise.all([res1.json(), res2.json(), res3.json(), res4.json(), res5.json()])
    });

    console.log(completeResult, "this is complete result");
  return completeResult;
}

// export async function fetchSchedulerAPIOneDate(param, sdate) {
//   const urls = [
//     `${apiUrl}/api/v1/scheduler/vehicle/panel?site=${param}&date=${sdate}`,
//     `${apiUrl}/api/v1/scheduler/docs/panelwithSelDate3?site=${param}&seldate=${sdate}`,
//     `${apiUrl}/api/v1/scheduler/trips?site=${param}&date=${sdate}`,
//     `${apiUrl}/api/v1/scheduler/routecodes`,
//     `${apiUrl}/api/v1/transport/getpickerlist`
//   ];

//   // Step 1: Fetch all URLs
//   const fetchPromises = urls.map(url => fetch(url));

//   const responses = await Promise.allSettled(fetchPromises);

//   // Step 2: Convert fulfilled responses to JSON, handle failures gracefully
//   const jsonPromises = responses.map((result, index) => {
//     if (result.status === 'fulfilled') {
//       return result.value.json().catch(err => {
//         console.error(`JSON parsing failed for request ${index + 1}:`, err);
//         return null;
//       });
//     } else {
//       console.error(`Request ${index + 1} failed:`, result.reason);
//       return Promise.resolve(null); // use null for failed responses
//     }
//   });

//   const completeResult = await Promise.all(jsonPromises);

//   console.log(completeResult, "this is complete result");

//   return completeResult;
// }




//Scheduler
export async function fetchDocumentPanelwithRange(param, sdate, edate) {
  const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/scheduler/docs/panelwithRange?site=` + param + '&sdate=' + sdate + '&edate=' + edate), fetch(`${apiUrl}/api/v1/scheduler/tripsrange?site=` + param + '&sdate=' + sdate + '&edate=' + edate)])
    .then(([res1, res2]) => {
      return Promise.all([res1.json(), res2.json()])
    });
  return completeResult;
}

//Scheduler
export async function fetchDocumentPanelAPI(param, date) {
  const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/scheduler/docs/panelwithSelDate?site=` + param + '&seldate=' + date), fetch(`${apiUrl}/api/v1/scheduler/trips?site=` + param + '&date=' + date)])
    .then(([res1, res2]) => {
      return Promise.all([res1.json(), res2.json()])
    });
  return completeResult;
}

// confirm lvs using soap X3


export async function ConfirmLVS(num) {

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', { soapUrl }, true);

  var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
    ' <codeLang xsi:type="xsd:string">BRI</codeLang>' +
    `<poolAlias xsi:type="xsd:string">TEST</poolAlias>` +
    '<poolId xsi:type="xsd:string"></poolId>' +
    ' <requestConfig xsi:type="xsd:string"></requestConfig>' +
    ' </callContext>' +
    '<publicName xsi:type="xsd:string">X10CCONBUT</publicName>' +

    '  <inputXml xsi:type="xsd:string">' +
    '<![CDATA[<PARAM>' +
    '<FLD NAME="I_XLVSNUM" TYPE="Char">' + num + '</FLD>' +
    '</PARAM>]]>' +
    '</inputXml>' +
    '</wss:run>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';



  return new Promise((resolve, reject) => {

    xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return;
      }
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          // let object =  JSON.parse(xmlhttp.response);
          // console.log("response =",object);
          // return object;

          let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
          // console.log("soap xample =", responeData);
          let extractxmldata = responeData.slice(9, responeData.length - 3)
          // console.log("soap xample extractxmldata=", extractxmldata);
          var xml = new XMLParser().parseFromString(extractxmldata);
          //  const completeResult = return xml;

          resolve(xml);

        }

      }
    }


    xmlhttp.setRequestHeader('Content-Type', 'text/html');

    xmlhttp.setRequestHeader('SOAPAction', 'CAdxWebServiceXmlCC');

    xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa({ soapUsername } + ':' + { soapPassword }));

    try {
      xmlhttp.send(src);
    } catch (error) {
      console.log(error);
    }
  });
}



export async function ToPickData(vrnum) {

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', { soapUrl }, true);

  var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
    ' <codeLang xsi:type="xsd:string">BRI</codeLang>' +
    '<poolAlias xsi:type="xsd:string">TEST</poolAlias>' +
    '<poolId xsi:type="xsd:string"></poolId>' +
    ' <requestConfig xsi:type="xsd:string"></requestConfig>' +
    ' </callContext>' +
    '<publicName xsi:type="xsd:string">X1CROUTDET</publicName>' +

    '  <inputXml xsi:type="xsd:string">' +
    '<![CDATA[<PARAM>' +
    '<FLD NAME="I_XROUTE" TYPE="Char">' + vrnum + '</FLD>' +
    '</PARAM>]]>' +
    '</inputXml>' +
    '</wss:run>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';



  return new Promise((resolve, reject) => {

    xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return;
      }
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          // let object =  JSON.parse(xmlhttp.response);
          // console.log("response =",object);
          // return object;

          let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
          // console.log("soap xample =", responeData);
          let extractxmldata = responeData.slice(9, responeData.length - 3)
          // console.log("soap xample extractxmldata=", extractxmldata);
          var xml = new XMLParser().parseFromString(extractxmldata);
          //  const completeResult = return xml;

          resolve(xml);

        }

      }
    }


    xmlhttp.setRequestHeader('Content-Type', 'text/html');

    xmlhttp.setRequestHeader('SOAPAction', 'CAdxWebServiceXmlCC');

    xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa({ soapUsername } + ':' + { soapPassword }));

    try {
      xmlhttp.send(src);
    } catch (error) {
      console.log(error);
    }
  });
}

export async function ToAllocationFetchData(vrnum, floctyp, tloctyp, floc, tloc) {

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', { soapUrl }, true);

  var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
    ' <codeLang xsi:type="xsd:string">BRI</codeLang>' +
    '<poolAlias xsi:type="xsd:string">TEST</poolAlias>' +
    '<poolId xsi:type="xsd:string"></poolId>' +
    ' <requestConfig xsi:type="xsd:string"></requestConfig>' +
    ' </callContext>' +
    '<publicName xsi:type="xsd:string">X1CALLDET</publicName>' +

    '  <inputXml xsi:type="xsd:string">' +
    '<![CDATA[<PARAM>' +
    '<FLD NAME="I_XROUTE" TYPE="Char">' + vrnum + '</FLD>' +
    '<FLD NAME="I_XFROMLOC" TYPE="Char">' + floctyp + '</FLD>' +
    '<FLD NAME="I_XTOLOC" TYPE="Char">' + tloctyp + '</FLD>' +
    '<FLD NAME="I_XLOCF" TYPE="Char">' + floc + '</FLD>' +
    '<FLD NAME="I_XLOCT" TYPE="Char">' + tloc + '</FLD>' +
    '</PARAM>]]>' +
    '</inputXml>' +
    '</wss:run>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';



  return new Promise((resolve, reject) => {

    xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return;
      }
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          // let object =  JSON.parse(xmlhttp.response);
          // console.log("response =",object);
          // return object;

          let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
          // console.log("soap xample =", responeData);
          let extractxmldata = responeData.slice(9, responeData.length - 3)
          // console.log("soap xample extractxmldata=", extractxmldata);
          var xml = new XMLParser().parseFromString(extractxmldata);
          //  const completeResult = return xml;

          resolve(xml);

        }

      }
    }


    xmlhttp.setRequestHeader('Content-Type', 'text/html');

    xmlhttp.setRequestHeader('SOAPAction', 'CAdxWebServiceXmlCC');

    xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa({ soapUsername } + ':' + { soapPassword }));

    try {
      xmlhttp.send(src);
    } catch (error) {
      console.log(error);
    }
  });
}

export async function ToAllocationSubmitData(vrnum) {

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', { soapUrl }, true);

  var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
    ' <codeLang xsi:type="xsd:string">BRI</codeLang>' +
    '<poolAlias xsi:type="xsd:string">TEST</poolAlias>' +
    '<poolId xsi:type="xsd:string"></poolId>' +
    ' <requestConfig xsi:type="xsd:string"></requestConfig>' +
    ' </callContext>' +
    '<publicName xsi:type="xsd:string">X1CPICALL</publicName>' +

    '  <inputXml xsi:type="xsd:string">' +
    '<![CDATA[<PARAM>' +
    '<FLD NAME="I_XPICKNUM" TYPE="Char">' + vrnum + '</FLD>' +
    '</PARAM>]]>' +
    '</inputXml>' +
    '</wss:run>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';



  return new Promise((resolve, reject) => {

    xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return;
      }
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          // let object =  JSON.parse(xmlhttp.response);
          // console.log("response =",object);
          // return object;

          let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
          // console.log("soap xample =", responeData);
          let extractxmldata = responeData.slice(9, responeData.length - 3)
          // console.log("soap xample extractxmldata=", extractxmldata);
          var xml = new XMLParser().parseFromString(extractxmldata);
          //  const completeResult = return xml;

          resolve(xml);

        }

      }
    }


    xmlhttp.setRequestHeader('Content-Type', 'text/html');

    xmlhttp.setRequestHeader('SOAPAction', 'CAdxWebServiceXmlCC');

    xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa({ soapUsername } + ':' + { soapPassword }));

    try {
      xmlhttp.send(src);
    } catch (error) {
      console.log(error);
    }
  });
}


export async function ToLotDetailsFetchData(prodnum, site, vrnum) {

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', { soapUrl }, true);

  var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
    ' <codeLang xsi:type="xsd:string">BRI</codeLang>' +
    '<poolAlias xsi:type="xsd:string">TEST</poolAlias>' +
    '<poolId xsi:type="xsd:string"></poolId>' +
    ' <requestConfig xsi:type="xsd:string"></requestConfig>' +
    ' </callContext>' +
    '<publicName xsi:type="xsd:string">X1CLOTDET</publicName>' +

    '  <inputXml xsi:type="xsd:string">' +
    '<![CDATA[<PARAM>' +
    '<FLD NAME="I_XFCY" TYPE="Char">' + site + '</FLD>' +
    '<FLD NAME="I_XITMREF" TYPE="Char">' + prodnum + '</FLD>' +
    '<FLD NAME="I_XROUTE" TYPE="Char">' + vrnum + '</FLD>' +
    '</PARAM>]]>' +
    '</inputXml>' +
    '</wss:run>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';



  return new Promise((resolve, reject) => {

    xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return;
      }
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          // let object =  JSON.parse(xmlhttp.response);
          // console.log("response =",object);
          // return object;

          let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
          // console.log("soap xample =", responeData);
          let extractxmldata = responeData.slice(9, responeData.length - 3)
          // console.log("soap xample extractxmldata=", extractxmldata);
          var xml = new XMLParser().parseFromString(extractxmldata);
          //  const completeResult = return xml;

          resolve(xml);

        }

      }
    }


    xmlhttp.setRequestHeader('Content-Type', 'text/html');

    xmlhttp.setRequestHeader('SOAPAction', 'CAdxWebServiceXmlCC');

    xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa({ soapUsername } + ':' + { soapPassword }));

    try {
      xmlhttp.send(src);
    } catch (error) {
      console.log(error);
    }
  });
}

export async function AllocatedDataByStaggingLocations(vrnum, fromloc, toloc, floc, tloc) {

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', { soapUrl }, true);

  var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
    ' <codeLang xsi:type="xsd:string">BRI</codeLang>' +
    '<poolAlias xsi:type="xsd:string">TEST</poolAlias>' +
    '<poolId xsi:type="xsd:string"></poolId>' +
    ' <requestConfig xsi:type="xsd:string"></requestConfig>' +
    ' </callContext>' +
    '<publicName xsi:type="xsd:string">X1CSTASTO</publicName>' +

    '  <inputXml xsi:type="xsd:string">' +
    '<![CDATA[<PARAM>' +
    '<FLD NAME="I_XROUTE" TYPE="Char">' + vrnum + '</FLD>' +
    '<FLD NAME="I_XFROMLOC" TYPE="Char">' + fromloc + '</FLD>' +
    '<FLD NAME="I_XTOLOC" TYPE="Char">' + toloc + '</FLD>' +
    '<FLD NAME="I_XLOCF" TYPE="Char">' + floc + '</FLD>' +
    '<FLD NAME="I_XLOCT" TYPE="Char">' + tloc + '</FLD>' +
    '</PARAM>]]>' +
    '</inputXml>' +
    '</wss:run>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';



  return new Promise((resolve, reject) => {

    xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return;
      }
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          // let object =  JSON.parse(xmlhttp.response);
          // console.log("response =",object);
          // return object;

          let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
          // console.log("soap xample =", responeData);
          let extractxmldata = responeData.slice(9, responeData.length - 3)
          // console.log("soap xample extractxmldata=", extractxmldata);
          var xml = new XMLParser().parseFromString(extractxmldata);
          //  const completeResult = return xml;

          resolve(xml);

        }

      }
    }


    xmlhttp.setRequestHeader('Content-Type', 'text/html');

    xmlhttp.setRequestHeader('SOAPAction', 'CAdxWebServiceXmlCC');

    xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa({ soapUsername } + ':' + { soapPassword }));

    try {
      xmlhttp.send(src);
    } catch (error) {
      console.log(error);
    }
  });
}

export async function ToStaggingLocationFetchData(site) {

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', { soapUrl }, true);

  var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
    ' <codeLang xsi:type="xsd:string">BRI</codeLang>' +
    '<poolAlias xsi:type="xsd:string">TEST</poolAlias>' +
    '<poolId xsi:type="xsd:string"></poolId>' +
    ' <requestConfig xsi:type="xsd:string"></requestConfig>' +
    ' </callContext>' +
    '<publicName xsi:type="xsd:string">X1CSTALOC</publicName>' +

    '  <inputXml xsi:type="xsd:string">' +
    '<![CDATA[<PARAM>' +
    '<FLD NAME="I_XFCY" TYPE="Char">' + site + '</FLD>' +

    '</PARAM>]]>' +
    '</inputXml>' +
    '</wss:run>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';



  return new Promise((resolve, reject) => {

    xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return;
      }
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          // let object =  JSON.parse(xmlhttp.response);
          // console.log("response =",object);
          // return object;

          let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
          // console.log("soap xample =", responeData);
          let extractxmldata = responeData.slice(9, responeData.length - 3)
          // console.log("soap xample extractxmldata=", extractxmldata);
          var xml = new XMLParser().parseFromString(extractxmldata);
          //  const completeResult = return xml;

          resolve(xml);

        }

      }
    }


    xmlhttp.setRequestHeader('Content-Type', 'text/html');

    xmlhttp.setRequestHeader('SOAPAction', 'CAdxWebServiceXmlCC');

    xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa({ soapUsername } + ':' + { soapPassword }));

    try {
      xmlhttp.send(src);
    } catch (error) {
      console.log(error);
    }
  });
}

export async function ToLocationsFetchData(site, floctyp, tloctyp) {

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', { soapUrl }, true);

  var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
    ' <codeLang xsi:type="xsd:string">BRI</codeLang>' +
    '<poolAlias xsi:type="xsd:string">TEST</poolAlias>' +
    '<poolId xsi:type="xsd:string"></poolId>' +
    ' <requestConfig xsi:type="xsd:string"></requestConfig>' +
    ' </callContext>' +
    '<publicName xsi:type="xsd:string">X1CLOCSEL</publicName>' +

    '  <inputXml xsi:type="xsd:string">' +
    '<![CDATA[<PARAM>' +
    '<FLD NAME="I_XFCY" TYPE="Char">' + site + '</FLD>' +
    '<FLD NAME="I_XLOCTYPF" TYPE="Char">' + floctyp + '</FLD>' +
    '<FLD NAME="I_XLOCTYPT" TYPE="Char">' + tloctyp + '</FLD>' +
    '</PARAM>]]>' +
    '</inputXml>' +
    '</wss:run>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';



  return new Promise((resolve, reject) => {

    xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return;
      }
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          // let object =  JSON.parse(xmlhttp.response);
          // console.log("response =",object);
          // return object;

          let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
          // console.log("soap xample =", responeData);
          let extractxmldata = responeData.slice(9, responeData.length - 3)
          // console.log("soap xample extractxmldata=", extractxmldata);
          var xml = new XMLParser().parseFromString(extractxmldata);
          //  const completeResult = return xml;

          resolve(xml);

        }

      }
    }


    xmlhttp.setRequestHeader('Content-Type', 'text/html');

    xmlhttp.setRequestHeader('SOAPAction', 'CAdxWebServiceXmlCC');

    xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa({ soapUsername } + ':' + { soapPassword }));

    try {
      xmlhttp.send(src);
    } catch (error) {
      console.log(error);
    }
  });
}


export async function DeleteDocument(num, count) {

  // console.log("at service num", num)
  // console.log("at service count", count)
  let passeddata = '';
  for (let ii = 0; ii < count; ii++) {
    let doc = num[ii]
    let index1 = ii + 1
    passeddata = passeddata + '<LIN NUM="' + index1 + '"> <FLD NAME="I_XPCKNUM" TYPE="Char">' + doc + '</FLD> </LIN>'
  }

  console.log("at service - final passedData =", passeddata)


  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', { soapUrl }, true);

  var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
    ' <codeLang xsi:type="xsd:string">BRI</codeLang>' +
    '<poolAlias xsi:type="xsd:string">TEST</poolAlias>' +
    '<poolId xsi:type="xsd:string"></poolId>' +
    ' <requestConfig xsi:type="xsd:string"></requestConfig>' +
    ' </callContext>' +
    '<publicName xsi:type="xsd:string">XPCKTCKDL</publicName>' +
    '  <inputXml xsi:type="xsd:string">' +
    '<![CDATA[<PARAM>' +
    '<TAB DIM="99" ID="GRP1" SIZE="1">' + passeddata + '</TAB>' +
    '</PARAM>]]>' +
    '</inputXml>' +
    '</wss:run>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';



  return new Promise((resolve, reject) => {

    xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return;
      }
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          // let object =  JSON.parse(xmlhttp.response);
          // console.log("response =",object);
          // return object;

          let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
          // console.log("soap xample =", responeData);
          let extractxmldata = responeData.slice(9, responeData.length - 3)
          // console.log("soap xample extractxmldata=", extractxmldata);
          var xml = new XMLParser().parseFromString(extractxmldata);
          //  const completeResult = return xml;

          resolve(xml);

        }

      }

    }


    xmlhttp.setRequestHeader('Content-Type', 'text/html');

    xmlhttp.setRequestHeader('SOAPAction', 'CAdxWebServiceXmlCC');

    xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa({ soapUsername } + ':' + { soapPassword }));

    try {
      xmlhttp.send(src);
    } catch (error) {
      console.log(error);
    }
  });

}



