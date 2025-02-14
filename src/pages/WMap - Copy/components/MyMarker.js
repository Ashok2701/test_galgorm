import React, { useState } from "react";
import RoomOutlined from '@material-ui/icons/Room';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';

const useStyles = makeStyles(theme => ({
  anchorTopRight: {
    // transform: "translate(-100%, -50%)",
    top: '20px',
    right: '22px',
    width: '20px',
    height: '20px'
  },
  badgeDlv: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: props => props.color,
    color: "white",
  },
}));

export default function MyMarker(props) {
  console.log("inside mymarkers",props);
  const classes = useStyles(props);
  const [enableModelWindow, setEnableModelWindow] = useState(false);

  const enableModalWindow = () => {
    setEnableModelWindow(!enableModelWindow)
  }
  const OncloseClick = () => {
    setEnableModelWindow(false)
  }
 let url = "";

  const  getStatus = (code) => {
      switch(code) {
      case "0":
         return(
             <span className="status" style={{background : "#1e81b0",color: "#fff"}}>To Plan</span>
          )
      case "1":
              return(
                                    <span className="status" style={{background : "#eab676",color: "#fff"}}>Scheduled</span>
                                 )
      case "2":
                   return(
                       <span className="status" style={{background : "#E0a839",color: "#fff"}}>On the Way</span>
                    )
      case "3":
                        return(
                            <span className="status" style={{background : "#1e81b0",color: "#fff"}}>In Progress</span>
                         )
      case "4":
                        return(
                            <span className="status" style={{background : "#458B00",color: "#fff"}}>Completed</span>
                         )
      case "5":
                        return(
                            <span className="status" style={{background : "#E07339",color: "#fff"}}>Skipped</span>
                         )
      case "6":
                        return(
                            <span className="status" style={{background : "#1659e7",color: "#fff"}}>Re-Scheduled</span>
                         )
      case "7" :
                             return(
                                 <span className="status" style={{background : "#E73a16",color: "#fff"}}>Cancelled</span>
                              )
      case "8":
              return(
                  <span className="status" style={{background : "#16dde7",color: "#fff"}}>To Plan</span>
               )
      }
     }




 const getlink = (type,id) => {
  if(type === 'PRECEIPT') {
   url = "https://wfs-dev.mycloudatwork.com:8443/html/main.html?url=/trans/x3/erp/LIVE/$sessions?f=GESXX10CPTH/2//M/" + id
    return (
        <a target="_blank" href={url}>{id}</a>
    )
  }
  else if(type === "DEP-SITE" || type === "RETURN-SITE"){
   url = "https://wfs-dev.mycloudatwork.com:8443/html/main.html?url=/trans/x3/erp/LIVE/$sessions?f=GESFCY/2//M/" + id
   return (
          <a target="_blank" href={url}>{id}</a>
      )
  }
  else if(type === "DLV"){
   url = "https://wfs-dev.mycloudatwork.com:8443/html/main.html?url=/trans/x3/erp/LIVE/$sessions?f=GESSDH/2//M/" + id
   return (
          <a target="_blank" href={url}>{id}</a>
      )
  }
  else if(type === 'PICK'){
   url = "https://wfs-dev.mycloudatwork.com:8443/html/main.html?url=/trans/x3/erp/LIVE/$sessions?f=GESPRH2/2//M/" + id
   return (
          <a target="_blank" href={url}>{id}</a>
      )

  }
  else {
  }

}



  return (
    <div>
      {
        props.type &&
        <div>
          <Badge badgeContent={props.position}
            onClick={() => enableModalWindow()}
            classes={{
              anchorOriginTopRightRectangle: classes.anchorTopRight,
              badge: classes.badgeDlv,
            }}>
            <RoomOutlined style={{ color: props.color, fontSize: 44 }} />
          </Badge>
        </div>
      }
      {
        enableModelWindow &&
        <Paper
          style={{ width: 211, height: 155, border: "2px solid #FF2E56" }}
        >
          <div style={{ paddingLeft: 15 }}>
            <div
              style={{
                // display: "flex",
                justifyContent: "space-between",
                paddingTop: 10,
                paddingBottom: 15,
              }}
            >
              <Typography variant="subtitle">Seq #{props.position}</Typography>
              <CancelTwoToneIcon style={{ marginTop: '-10px', color: "red", float: 'right', fontSize: 20 }}
                onClick={() => OncloseClick()} />
              <Typography
                variant="subtitle2"
                style={{ color: "red", marginRight: 16, float: 'right', fontWeight: 600 }}
              >
                {props.type}
              </Typography>

            </div>
            <Typography variant="subtitle2">
                          {getlink(props.type,props.id)}
                        </Typography>
             <Typography variant="subtitle2">
                                      {getStatus(props.docstatus)}
                                     </Typography>
                           <br />
            <Typography variant="subtitle2">
              {props.custName}
            </Typography>
            <Typography variant="subtitle">
              {props.itemCode}
            </Typography>

          </div>
        </Paper>
      }

    </div>
  )
}


