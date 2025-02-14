import React from "react";
import FormControl from '@material-ui/core/FormControl';
import SimpleSelect from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    formControl: {
        width: 93,
        height: 32,
        marginLeft:5
    },
    input:{
        background:"#2C3135",
        height:0,
        width:93,
        padding:"6px 0"
    },
    iconOutlined:{
        //paddingTop:3,
        color:"#707070"
    }
}));

const Tablesearch = () => {
    const [sortby, setsortby] = React.useState('');
    const classes = useStyles();
    const onChange = (event) => {
        setsortby(event.target.value);
    }
    return (
        <FormControl variant="outlined" size="small" className={classes.formControl}>
            <InputLabel style={{ fontSize: 12, color:"#929D9F",height:12 }}
                InputLabel id="demo-simple-select-outlined-label">Sort by</InputLabel>
           
            <SimpleSelect
                value={sortby}
                onChange={onChange}
                label="Sort by"
                classes={{
                    root: classes.input,
                    iconOutlined:classes.iconOutlined
                }}
            >
                <MenuItem value={"vehicle Info"}>vehicle Info</MenuItem>
                <MenuItem value={"Trip Id"}>Trip Id</MenuItem>
                <MenuItem value={"Driver"}>Driver</MenuItem>
            </SimpleSelect>
        </FormControl>
    )
}

export default Tablesearch;
