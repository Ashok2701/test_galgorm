import React from 'react';
import DisplayProducts from './DisplayProducts';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

 const TimelineItem = ({data}) => {
    console.log("inside timelineitem",data);
const [productList, setproductList] = React.useState();
 const [open, setOpen] = React.useState(false);

const [productshow, setproductshow] = React.useState(false);
const [docnum, setdocnum] = React.useState("");
const [doctype, setdoctype] = React.useState("");
   const  getStatus = (code) => {

     switch(code) {

     case "0":
        return(
            <span className="status" style={{background : "#1e81b0"}}>To Plan</span>
         )
     case "1":
             return(
                                   <span className="status" style={{background : "#eab676"}}>Scheduled</span>
                                )
     case "2":
                  return(
                      <span className="status" style={{background : "#E0a839"}}>On the Way</span>
                   )
     case "3":
                       return(
                           <span className="status" style={{background : "#1e81b0"}}>In Progress</span>
                        )
     case "4":
                       return(
                           <span className="status" style={{background : "#458B00"}}>Completed</span>
                        )
     case "5":
                       return(
                           <span className="status" style={{background : "#E07339"}}>Skipped</span>
                        )
     case "6":
                       return(
                           <span className="status" style={{background : "#1659e7"}}>Re-Scheduled</span>
                        )
     case "7" :
                            return(
                                <span className="status" style={{background : "#E73a16"}}>Cancelled</span>
                             )
     case "8":
             return(
                 <span className="status" style={{background : "#16dde7"}}>To Plan</span>
              )


     }

    }



    var url = "";
 if(data.type === 'PRECEIPT') {
 url = "https://wfs-dev.mycloudatwork.com:8443/html/main.html?url=/trans/x3/erp/LIVE/$sessions?f=GESXX10CPTH/2//M/" + data.custid
}
else if(data.type === "DEP-SITE" || data.type === "RETURN-SITE"){
 url = "https://wfs-dev.mycloudatwork.com:8443/html/main.html?url=/trans/x3/erp/LIVE/$sessions?f=GESFCY/2//M/" + data.custid
}
else if(data.type === "DLV"){
 url = "https://wfs-dev.mycloudatwork.com:8443/html/main.html?url=/trans/x3/erp/LIVE/$sessions?f=GESSDH/2//M/" + data.custid
}
else if(data.type === 'PICK'){
 url = "https://wfs-dev.mycloudatwork.com:8443/html/main.html?url=/trans/x3/erp/LIVE/$sessions?f=GESPRH2/2//M/" + data.custid
}
else {
}

const timeformat = (hm) => {

  let strlen = hm.length;
  if(strlen > 2){
     if(strlen == 4){
       let hr = hm.substring(0, 2);
           let mm = hm.substring(2, 4);
           return hr + ':' + mm;
     }
     else{
         return hm;
     }

  }else{
     return "";
  }
}



  const   documentBadgeLink = (docno, dtype) => {
                  const docmvt = dtype;
                  let url, content;

                  if (docmvt == 'PICK') {
                       url = "https://wfs-dev.mycloudatwork.com:8443/html/main.html?url=/trans/x3/erp/LIVE/$sessions?f=GESPRH2/2//M/"+docno;
                                           // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
                                       return (
                                                <a href={url} target='_blank'>{docno} </a>
                       );
                  }
                  if (docmvt == 'DLV') {

                           url = "https://wfs-dev.mycloudatwork.com:8443/html/main.html?url=/trans/x3/erp/LIVE/$sessions?f=GESSDH/2//M/"+docno;
                          // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
                      return (
                               <a href={url} target='_blank'>{docno} </a>
                      );
                  }
                  if (docmvt == 'PRECEIPT') {
                       url = "https://wfs-dev.mycloudatwork.com:8443/html/main.html?url=/trans/x3/erp/LIVE/$sessions?f=GESXX10CPTH/2/M//"+docno;
                                           // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
                                       return (
                                                <a href={url} target='_blank'>{docno} </a>
                                       );
                  }
              }



let products = "" ;
 const handleOpen = (product, docNum, doctype) => {
 products = product;
 console.log("prod list",products);
 products = products;
 setproductList(products);
 console.log("prod list",productList);
 setOpen(true);
 setdocnum(docNum);
 setdoctype(doctype);
 }

 const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 1000,
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   p: 4,
 };


  const handleClose = () => setOpen(false);



    return (
      <div className="timeline-item">
      <div className="timeline-item-content">
          <span className="tag" style={{background : data.color}}>
             {data.type === "PICK" ? "PICK-TICKET" : data.type}
          </span>
          <time>{data.stime}</time> <br />

          <b><a target="_blank" href={url}>{data.custid}</a></b>

           <p> {data.custName} <br />
          {data.poscod}- {data.city}</p>

      {data.type === 'PRECEIPT' || data.type === 'DLV' || data.type === 'PICK' ?
 <span style={{ cursor: 'pointer' }}  onClick={() => handleOpen(data.products,data.custid, data.type)}><u>Product-Details</u></span>
  : ''}  <br />
<span>{getStatus(data.docstatus)}</span>

          <div className='circle'>

            <div className="circledata">{timeformat(data.adtime)}</div>
           </div>


      </div>
    <Modal

        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
               List of Products for <b> ({documentBadgeLink(docnum, doctype)}) </b>
          </Typography>
           <hr class="m-0 p-0" />
           <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Prodcode</TableCell>
                      <TableCell align="right">ProdName</TableCell>
                      <TableCell align="right">ProdCateg</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">UOM</TableCell>
                      <TableCell align="right">lineno</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                    (productList || []).map((row) => (

                      <TableRow
                        key={row.productCode}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.productCode}
                        </TableCell>
                        <TableCell align="right">{row.productName}</TableCell>
                        <TableCell align="right">{row.productCateg}</TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">{row.uom}</TableCell>
                        <TableCell align="right">{row.docLineNum}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
        </Box>
      </Modal>

   </div>


    )
    
 };

 export default TimelineItem;