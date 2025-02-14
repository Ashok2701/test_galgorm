import React from "react";
import FormControl from '@material-ui/core/FormControl';
import SimpleSelect from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: 159,
        height: 32,
        marginLeft:5
    },
    input:{
        background:"#EAEAEA",
    }
}));

const Select = () => {
    const [vehicleType, setVehicleType] = React.useState('');
    const classes = useStyles();
    const onChange = (event) => {
        setVehicleType(event.target.value);
    }
    return (
        <FormControl variant="outlined" size="small" className={classes.formControl}>
            <InputLabel style={{ fontSize: 14 }}
                InputLabel id="demo-simple-select-outlined-label">Select Operator</InputLabel>
            <SimpleSelect
                value={vehicleType}
                onChange={onChange}
                label="Select Vehicle"
                classes={{
                    root: classes.input
                }}
            >
                <MenuItem value={"VolvoXC1"}>VolvoXC1</MenuItem>
                <MenuItem value={"VolvoXC2"}>VolvoXC2</MenuItem>
                <MenuItem value={"VolvoXC3"}>VolvoXC3</MenuItem>
            </SimpleSelect>
        </FormControl>
    )
}

export default Select;
