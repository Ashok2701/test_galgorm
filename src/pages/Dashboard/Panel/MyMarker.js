import React, { useState } from 'react';
import './myMakerStyles.css';
import { red, blue } from '@material-ui/core/colors';
import RoomOutlined from '@material-ui/icons/Room';
import HomeIcon from '@material-ui/icons/Home';
import DisplayMapInfo from "./DisplayMapInfo";
import Badge from '@material-ui/core/Badge';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  homeAnchorTopRight: {
    // transform: "translate(-100%, -50%)",
    top: '29px',
    right: '28px',
    width: '22px',
    height: '34px'
  },
  badgeHome: {
    fontSize: 9,
    fontWeight: 'bold',
    backgroundColor: "#00ccff",
    color: "black",
  },
  endAnchorTopRight: {
    // transform: "translate(-100%, -50%)",
    top: '29px',
    right: '27px',
    width: '22px',
    height: '34px'
  },
  badgeEnd: {
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: "#ff751a",
    color: "black",
  },
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
    backgroundColor: "#009900",
    color: "white",
  },
  badgePreceipt: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: red[500],
    color: "white",
  },
  badgePick: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: blue[500],
    color: "white",
  }
}));

export default function MyMarker(props) {

  const [dlvError, setDlvError] = useState(false);
  const [preceiptError, setPreceiptError] = useState(false);
  const [pickError, setPickError] = useState(false);
  const [homeError, setHomeError] = useState(false);
  const [arrError, setArrError] = useState(false);
  const [type] = useState('Home');

  const classes = useStyles();

  const enableModalWindow = (data) => {
    if (data.type === type || data.tooltip === type) {
      setHomeError(!homeError)
    }
    else if (data.type === "DLV") {
      setDlvError(!dlvError)
    } else if (data.type === "PRECEIPT") {
      setPreceiptError(!preceiptError)
    } else if (data.type === 'PICK') {
      setPickError(!pickError)
    } else if (data.tooltip === 'arrival') {
      setArrError(!arrError)
    }
  }

  const OncloseClick = (data) => {
    if (data === type) {
      setHomeError(false)
    } else if (data === "DLV") {
      setDlvError(false)
    } else if (data === "PRECEIPT") {
      setPreceiptError(false)
    } else if (data === "PICK") {
      setPickError(false)
    } else if (data === "arrival") {
      setArrError(false)
    } else {
      setHomeError(false)
    }
  }
  return (
    <div>
      <div>
        {
          (props.tooltip === 'Home') &&
          <div>
            <Badge badgeContent={props.sameSite ? '' : "START"}
              onClick={() => enableModalWindow(props)}
              classes={{
                anchorOriginTopRightRectanglar: classes.homeAnchorTopRight,
                badge: classes.badgeHome,
              }}>
              <HomeIcon title="Home" style={{ color: "#00ccff", fontSize: 55 }} />
            </Badge>
            {homeError &&
              <DisplayMapInfo data={props.selectedTrips} num={props.text}
                OncloseClick={() => OncloseClick()}
                type={type} site={props.site} />
            }
          </div>
        }
        {
          props.type === "DLV" &&
          <div>
            <Badge badgeContent={props.text + 1 + (props.occurrence ? "" : '+')}
              onClick={() => enableModalWindow(props)}
              classes={{
                anchorOriginTopRightRectanglar: classes.anchorTopRight,
                badge: classes.badgeDlv,
              }}>
              <RoomOutlined style={{ color: "#009900", fontSize: 44 }} />
            </Badge>
            {dlvError &&
              <DisplayMapInfo data={props.selectedTrips} pointsMulti={props.pointsMulti}
                type={props.type} lat={props.lat} lng={props.lng} id={props.text}
                num={props.text} OncloseClick={OncloseClick} />
            }
          </div>
        }
        {
          props.type === 'PRECEIPT' &&
          <div>
            <Badge badgeContent={props.text + 1  + (props.occurrence ? "" : '+')}
              onClick={() => enableModalWindow(props)}
              classes={{
                anchorOriginTopRightRectanglar: classes.anchorTopRight,
                badge: classes.badgePreceipt
              }}>
              <RoomOutlined style={{ color: red[500], fontSize: 44 }} />
            </Badge>
            {preceiptError &&
              <DisplayMapInfo data={props.selectedTrips} pointsMulti={props.pointsMulti}
                lat={props.lat} lng={props.lng} id={props.text}
                type={props.type} num={props.text} OncloseClick={OncloseClick} />
            }
          </div>
        }
        {
          props.type === 'PICK' &&
          <div>
            <Badge badgeContent={props.text + 1 + (props.occurrence ? "" : '+')}
              onClick={() => enableModalWindow(props)}
              classes={{
                anchorOriginTopRightRectanglar: classes.anchorTopRight,
                badge: classes.badgePick
              }}>
              <RoomOutlined style={{ color: blue[500], fontSize: 44 }} />
            </Badge>
            {pickError &&
              <DisplayMapInfo data={props.selectedTrips} pointsMulti={props.pointsMulti}
                type={props.type} lat={props.lat} lng={props.lng} id={props.text}
                num={props.text} OncloseClick={OncloseClick} />
            }
          </div>
        }
        {
          props.tooltip === 'arrival' &&
          <div>
            <Badge badgeContent="END"
              onClick={() => enableModalWindow(props)}
              classes={{
                anchorOriginTopRightRectanglar: classes.endAnchorTopRight,
                badge: classes.badgeEnd,
              }}>
              <HomeIcon title="Home" style={{ color: "#ff751a", fontSize: 55 }} />
            </Badge>
            {arrError &&
              <DisplayMapInfo data={props.selectedTrips} num={props.text}
                OncloseClick={OncloseClick}
                type={props.tooltip} site={props.site} />
            }
          </div>
        }
      </div>
    </div>
  )
}