import React from 'react';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PersonSharpIcon from '@material-ui/icons/PersonSharp';
import FaceIcon from '@material-ui/icons/Face';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import Timeline from '../Timeline/Timeline';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        marginTop: 0
    },
    root1: {
        display: 'flex',
        marginTop: 0,
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    body2: {
        color: "#2C3A3D",
        fontWeight: 600,
        fontSize: 14,

    },

    emptySpace : {
        height : 200,
    },

    bodyContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    verticalColorLine: {
        marginRight: 8,
        backgroundColor: '#12AA8B',
        width: 4,
        height: 137,
        borderRadius: 100
    },
    verticalColorLineYellow: {
        marginRight: 8,
        backgroundColor: '#FEB308',
        width: 4,
        height: 137,
        borderRadius: 100
    },
    driverName: {
        flex: 2.2
    },
    h5: {
        fontSize: 14,
        fontWeight: 600,
        height: 32,
        // width: 90,
        marginBottom: 16
    },
     h6: {
            fontSize: 14,
            fontWeight: 600,
            height: 10,
            // width: 90,
            marginBottom: 16
        },
     lvs: {
                 fontSize: 14,
                 fontWeight: 600,
                 height: 10,
                 // width: 90,
                 marginBottom: 16,
                 color : 'black',
             },
     h7: {
            fontSize: 12,
        },
    chipheader: {
        display: 'flex',
        justifyContent: 'space-between'

    },
    Vrhighlight : {
       fontSize: 20,
       fontWeight: 600,
       backgroundColor : '#003366',
       color : '#F5F5F5',
        width: 1200,
        height: 57,
        padding : '15px',

    },

    TopHead : {
        backgroundColor : '#F5F5F5',
        color : '#2C3A3D',
        padding : '25px 10px 1px 10px',
        borderRadius : '30px',

    }





}));

export default function StatusCard(props) {
    const classes = useStyles();
    const theme = useTheme();

    const [enableDetails, setEnableDetails] = React.useState(false);
    const [detailsPopover, setDetailsPopover] = React.useState({})
    const [detailsPopvr, setDetailsPopvr] = React.useState({})
    const [detailsPoplvs, setDetailsPoplvs] = React.useState({})

    const showDetails = (data,vr, lvs) => {
        setEnableDetails(!enableDetails);
        setDetailsPopover(data)
        setDetailsPoplvs(lvs)
        setDetailsPopvr(vr)
    }

    const handleClose = () => {
        setEnableDetails(!enableDetails);
    }


    const getStatus = (code) => {

 switch (code) {

            case 1: return ("  To-Load   ");
            case 2: return ("  To-Load  ");
            case 3: return ("  Loaded  ");
            case 4: return ("  Confirmed  ");
            case 5: return ("  Trip Completed  ");
            case 6: return ("  Unloaded  ");
            case 7: return ("  Returned  ");
            case 8: return ("  ALL  ");
            case 11: return ("  To-Load  ");
            default: return ("  To-Load  ");
        }


    }


    return (
        <Paper className={classes.root} elevation={0}>
            {props.dataList && props.dataList.length > 0 &&
                props.dataList.map((data, index) => {
                    let colorDisplay = '';
                    if (index % 2 !== 0) {
                        colorDisplay = 'yellow'
                    }
    const vr_url = "https://wfs-dev.mycloudatwork.com:8443/html/main.html?url=/trans/x3/erp/LIVE/$sessions?f=GESXX10CPLC/2//M/" + data.itemCode;
  const loadvehstock_url = "https://wfs-dev.mycloudatwork.com:8443/html/main.html?url=/trans/x3/erp/LIVE/$sessions?f=GESXX10CS/2//M/" + data.lvsno;



                    return (
                        <div>
                            {Object.keys(data).length > 0 &&

                                <div>
                                    <div style={{ marginBottom: 8, marginTop: 15 }}>

                                          <label style={{fontSize:'13px'}}>Trip ID</label><br />
                                          <a className={classes.h6} target="_blank" href={vr_url}>{data.itemCode} </a>

                                      </div>

                                    <div className={classes.bodyContent}>
                                        <div className={colorDisplay !== 'yellow' ? classes.verticalColorLine : classes.verticalColorLineYellow} />
                                        <div className={classes.driverName}>
                                            <div style={{ display: 'flex' }} className={classes.h5}>
                                                <div style={{ width: '120px' }}>{data.driverName}</div>
                                                <div style={{ float: 'right' }}> #{data.trips} </div>
                                            </div>
                                            <div style={{ display: 'flex' }} className={classes.h6}>
                                               <div style={{ width: '200px' }}>{getStatus(data.dlvystatus)}</div>
                                            </div>
                                            <div style={{ display: 'flex' }} className={classes.h6}>
                                                   <div style={{ width: '120px' }}>{data.depSite} - {data.arrSite}</div>
                                            </div>
                                            <div style={{ display: 'flex' }} className={classes.h5}>
                                                <div style={{ width: '120px' }}>{data.startTime} - {data.endTime === "null" ? '':data.endTime}</div>
                                                <IconButton aria-label="delete" style={{ float: 'right', cursor: 'pointer', marginTop: '-14px', color: 'black' }} onClick={() => showDetails(data,vr_url,loadvehstock_url)}>
                                                    <ArrowRightIcon />
                                                </IconButton>
                                            </div>
                                            <div className={classes.root1}>
                                                <Badge badgeContent={data.drops} color="primary">
                                                    <Avatar style={{ height: '26px', width: '26px' }} >D</Avatar>
                                                </Badge>

                                                <Badge badgeContent={data.pickups} color="secondary">
                                                    <Avatar style={{ height: '26px', width: '26px' }} >P</Avatar>
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    )
                })
            }
            {enableDetails &&
                <Popover
                    PaperProps={{
                        style: {
                            width: '500px',
                            height: '1200px',
                            marginTop: '50px',
                            background: "#EAEAEA"
                        },
                    }}
                    id={'simple-popover'}
                    open={enableDetails}
                    anchorEl={enableDetails}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <CancelTwoToneIcon style={{ marginTop: '2px', color: "white", float: 'right', fontSize: 24 }}
                        onClick={() => handleClose()} />

                    <Typography align='center' className={classes.Vrhighlight}>
                        {detailsPopover.itemCode}
                    </Typography>
                    <br />
                    <div className={classes.TopHead}>
                     <div >
                    <Typography align='left' className={classes.typography}>
                  LVS : <a className={classes.lvs} target="_blank" href={detailsPoplvs}>{detailsPopover.lvsno}</a>
                    </Typography>
                    <br />
                    <Typography align='left' className={classes.typography}>
                                      ROUTE-STATUS : <span> <b> {getStatus(detailsPopover.dlvystatus)} </b></span>
                                                            </Typography>

                                                            <br />
                    <Typography align='left' className={classes.typography}>
                          VEHICLE : <span><b> {detailsPopover.code} </b></span>
                    </Typography>
                                    <br />

                     <Typography align='left' className={classes.typography}>
                                               DRIVER : <span><b> {detailsPopover.driverName} </b></span>
                                         </Typography>

                                  </div>
                     <br />
{/*
                    <div className={classes.chipheader}>
                        <Chip
                            avatar={<LocalShippingIcon />}
                            label={detailsPopover.code}
                            clickable
                            color="primary"

                        />
                    </div>
                    <div>
                        <br />
                        <Chip
                            avatar={<PersonSharpIcon />}
                            label={detailsPopover.driverName}
                            clickable
                            color="secondary"

                        />
                    </div>

*/}
 </div>
                    <Timeline
                        timelineData={detailsPopover.timlindata}
                    />

                    <div className={classes.emptySpace}>

                    </div>
                </Popover>
            }
        </Paper >
    );
}