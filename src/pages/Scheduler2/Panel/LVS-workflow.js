import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import RouteIcon from '@mui/icons-material/Route';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import StorageIcon from '@mui/icons-material/Storage';
import PrintIcon from '@mui/icons-material/Print';
//import RouteIcon from '@mui/icons-material/Route';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import ColoredRoundElement from './ColoredRoundElement';
import Alert from './Alert';
import LVSToPickDetail from './LVS_ToPick_Detail';
import LVSPrintDetail from './LVS_Print_Detail';
import LVSAllocationDetail from './LVS_Allocation_Detail';
import Link from '@mui/material/Link';

import { IconButton } from '@mui/material';

// x3 link from .env
const x3Url = process.env.REACT_APP_X3_URL;

export default function CustomizedSteppers(props) {

  const [addAlertClose, setaddAlertClose] = React.useState(true);
  const [addAlertShow, setAddAlertShow] = React.useState(false);
  const [ErrorMessage, setErrorMessage] = React.useState("");
  const [addToPickClose, setAddToPickClose] = React.useState(true);
  const [addToPickShow, setAddToPickShow] = React.useState(false);
  const [addToPrintClose, setAddToPrintClose] = React.useState(true);
  const [addToPrintShow, setAddToPrintShow] = React.useState(false);
  const [addToAllocationClose, setAddToAllocationClose] = React.useState(true);
  const [addToAllocationShow, setAddToAllocationShow] = React.useState(false);
  const print_url = { x3Url } + "/$sessions?f=GESXREPORT/2//M/" + props.vrdata.xnumpc;


  const AlertClose = () => {
    setErrorMessage("");
    setAddAlertShow(false);
    setaddAlertClose(true);

  }

  const ToPickClose = () => {
    setAddToPickShow(false)
    setAddToPickClose(true)
  }

  const ToPrintClose = () => {
    setAddToPrintShow(false)
    setAddToPrintClose(true)
  }

  const ToAllocationClose = () => {
    setAddToAllocationShow(false)
    setAddToAllocationClose(true)
  }

  const ToSubmitAllocation = () => {
    console.log("Inside allocation submit at workflow");
    props.SubmitforAllocation();
    setAddToAllocationShow(false)
    setAddToAllocationClose(true)
  }

  const showMessage = () => {

    window.alert("Please ensure to connect to TMSPILOT folder at SageX3");
  }



  const handleMoveToStageIconClick = () => {

    setAddAlertShow(true);
    setErrorMessage("Move to Stage");


  }


  const handleRouteValidateIconClick2 = () => {
    props.createLVS();
  }



  const handleRouteValidateIconClick = () => {

    if (props.vrdata.allocationflg === 2) {
      props.createLVS();
    }
    else {

      setAddAlertShow(true);
      setErrorMessage("Complete allocation not yet for this Route, please verify");

    }

  }


  const handleRouteValidateIconClick_validated = () => {

    setAddAlertShow(true);
    setErrorMessage("Route Already Validated");

  }


  const handleAllocationIconClick = () => {
    props.ToAllocationData();
    // setAddToAllocationShow(true);


  }
  const handlePrintIconClick = () => {

    setAddToPrintShow(true);


  }
  const handleToPickIconClick = () => {
    props.ToPickData();
    // setAddToPickShow(true);
  }

  const handleLoadToTruckIconClick = () => {

    console.log("T444 inside LVS workflow - LVS");
    props.confirmLVS();


  }



  return (
    <>
      {


        props.onlyReceiptflg ?

          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {props.selectedVrValidated ?
              <div style={{ textAlignLast: "center" }} >
                <IconButton disabled="true" color="success" aria-label="icon" onClick={handleRouteValidateIconClick2}>
                  <RouteIcon style={{ fontSize: "34px" }} />
                </IconButton>
                <div style={{ backgroundColor: "green", 'color': 'white', fontSize: "18px" }}> Validated </div>
              </div>
              :
              <div style={{ textAlignLast: "center" }} >
                <IconButton color="primary" aria-label="icon" onClick={handleRouteValidateIconClick2}>
                  <RouteIcon style={{ fontSize: "34px" }} />
                </IconButton>
                <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>Route Validation </div>
              </div>
            }
          </div>


          :

          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {props.selectedVrValidated ?
              <div style={{ textAlignLast: "center" }} >
                <IconButton disabled="true" color="success" aria-label="icon" onClick={handleRouteValidateIconClick2}>
                  <RouteIcon style={{ fontSize: "34px" }} />
                </IconButton>
                <div style={{ backgroundColor: "green", 'color': 'white', fontSize: "18px" }}> Validated </div>
              </div>
              :
              <div style={{ textAlignLast: "center" }} >
                <IconButton color="primary" aria-label="icon" onClick={handleRouteValidateIconClick2}>
                  <RouteIcon style={{ fontSize: "34px" }} />
                </IconButton>
                <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>Route Validation </div>
              </div>
            }

          </div>
      }
      <Alert
        show={addAlertShow}
        onHide={AlertClose}
        errorMessage={ErrorMessage}
      ></Alert>
      <LVSToPickDetail
        show={addToPickShow}
        onHide={ToPickClose}
        vrdata={props.vrdata}
        toPickDataList={props.toPickDataList}

      ></LVSToPickDetail>
      <LVSPrintDetail
        show={addToPrintShow}
        onHide={ToPrintClose}
        vrdata={props.vrdata}
        lvsData={props.lvsData}

      ></LVSPrintDetail>
      <LVSAllocationDetail
        show={addToAllocationShow}
        onHide={ToAllocationClose}
        vrdata={props.vrdata}
        toAllocationDataList={props.toAllocationDataList}
        SubmitforAllocation={ToSubmitAllocation}

      ></LVSAllocationDetail>
    </>
  );
}
