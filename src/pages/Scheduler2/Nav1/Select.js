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

const Select = (props) => {
    const [vehicleType, setVehicleType] = React.useState('Vehicles');
    const classes = useStyles();
    const onChange = (event) => {
        setVehicleType(event.target.value);
        props.Groupby(event.target.value);
    }
    return (
        <FormControl variant="outlined" size="small" className={classes.formControl}>
            <InputLabel style={{ fontSize: 14 }}
                InputLabel id="demo-simple-select-outlined-label">GroupBy</InputLabel>
            <SimpleSelect
                value={vehicleType}
                onChange={onChange}
                label="Group By"
                classes={{
                    root: classes.input
                }}
            >
                <MenuItem value={"Drivers"}>Drivers</MenuItem>
                <MenuItem value={"Vehicles"}>Vehicles</MenuItem>
            </SimpleSelect>
        </FormControl>
    )
}

export default Select;
