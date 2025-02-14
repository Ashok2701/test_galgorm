import axios from 'axios'
import API from '@configs/API'
import XMLParser from 'react-xml-parser'
import { parseString } from "xml2js"

const getAllPrice =  (site, date, customer, product) => {
    const xmlhttp = new XMLHttpRequest()
    xmlhttp.open('POST', 'https://tms.tema-systems.com/soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC', true)

// eslint-disable-next-line prefer-template
const src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
'<soapenv:Header/>' +
'<soapenv:Body>' +
   '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
        ' <codeLang xsi:type="xsd:string">ENG</codeLang>' +
        '<poolAlias xsi:type="xsd:string">DEMOTMSFR</poolAlias>' +
         '<poolId xsi:type="xsd:string"></poolId>' +
        ' <requestConfig xsi:type="xsd:string"></requestConfig>' +
     ' </callContext>' +
      '<publicName xsi:type="xsd:string">X10CPRISER</publicName>' +

      '  <inputXml xsi:type="xsd:string">' +
     '<![CDATA[<PARAM>' +
   '<FLD NAME="I_XMODTYP" TYPE="Integer">' + 2 + '</FLD>' +
   '<FLD NAME="I_XFCY" TYPE="Char">' + site + '</FLD>' +
   '<FLD NAME="I_XDAT" TYPE="Date">' + date + '</FLD>' +
   '<FLD NAME="I_XBP" TYPE="Char">' + customer + '</FLD>' +
   '<FLD NAME="I_XITM" TYPE="Char">' + product + '</FLD>' +
   '</PARAM>]]>' +
   '</inputXml>' +
   '</wss:run>' +
'</soapenv:Body>' +
'</soapenv:Envelope>'



return new Promise((resolve, reject) => {

xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return
      }
    if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
            const responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML
            const extractxmldata = responeData.slice(9, responeData.length - 3)
          const xml = new XMLParser().parseFromString(extractxmldata)
          const PO =  xml.children[1].children[1]
          const ResultantData = xml.children[1].children
         //  let s = 0
         const finalArray = []

          for (let s = 0; s < ResultantData.length; s++) {
             const tempobj = {}
             const innerResultant = ResultantData[s].children
             for (let s1 = 0; s1 < innerResultant.length; s1++) {
                 const   tname = innerResultant[s1].attributes.NAME
                   const tvalue = innerResultant[s1].value
                  tempobj[tname] = tvalue
              }
             finalArray.push(tempobj)

          }
          resolve(finalArray)
        }
    }
}


xmlhttp.setRequestHeader('Content-Type', 'text/html')

xmlhttp.setRequestHeader('SOAPAction', 'CAdxWebServiceXmlCC')
// eslint-disable-next-line prefer-template
xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa("TESTUSER" + ':' + "TU@123*"))

try {
xmlhttp.send(src)
} catch (error) {
    console.log(error)
}
  })
}

const ProductPriceService = {
  getAllPrice
}

export default ProductPriceService

