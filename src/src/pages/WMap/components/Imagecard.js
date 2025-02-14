import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import abc from "../Images/truck.jpg"


const useStyles = makeStyles({
    root: {
        maxWidth: 170,
    },
    padding0: {
        padding: 0
    },
    title: {
        textAlign: "center",
        background: "#6E64D3",
        color: "White"
    },
    capacity: {
        color: "#757782"
    }
});

const Imagecard = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="volvo XC556878"
                    height="100"
                    image={abc}
                    title="vehicle name"
                />
                <CardContent className={classes.padding0}>
                    <Typography gutterBottom variant="subtitle1" className={classes.title}>
                        {props.vehicleNumber}
                    </Typography>
                    {/* <div style={{ display: "flex", justifyContent: "space-between", padding: 6 }}>
                        <div>
                        <Typography gutterBottom variant="body2" className={classes.capacity}>
                                Capacity
                        </Typography>
                            <ProgressBar  />
                        </div>
                        <div>
                        <Typography gutterBottom variant="body2" className={classes.capacity}>
                                Time
                        </Typography>
                            <ProgressBar  />
                        </div>
                    </div> */}
                </CardContent>
            </CardActionArea>
            {/* <CardActions>
                <IconButton size="small" >
                    <InfoOutlinedIcon />
                </IconButton>
                <IconButton size="small">
                    <PublishOutlinedIcon />
                </IconButton>
                <IconButton size="small">
                    <PauseCircleOutlineIcon />
                </IconButton>
                <IconButton size="small">
                    <CancelOutlinedIcon />
                </IconButton>
            </CardActions> */}
        </Card>
    );
}

export default Imagecard;
