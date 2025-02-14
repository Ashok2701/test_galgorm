import React from "react";
import FormControl from '@material-ui/core/FormControl';
import SimpleSelect from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: 359,
        height: 32,
        marginLeft:5
    },
    input:{
        background:"#EAEAEA",
    }
}));

const Select = (props) => {
    const [RailcarcheckIn, setRailcarcheckIn] = React.useState(props.data);
    const [selectedRailCar, SetselectedRailCar] = React.useState(props.selectedRailCar);
    const [seletedVehicle, setseletedVehicle] = React.useState(props.selectedSite);
    const classes = useStyles();
    const onChange = (type , event) => {
        //setVehicleType(event.target.value);
          if (type === 'CheckIn') {
                    SetselectedRailCar(event.target.value);
                    props.OnSiteSelection(event.target.value);
                } else {
                    setseletedVehicle(event.target.value);
                    props.onModeChange(event.target.value);
                }
    }
    return (
        <FormControl variant="outlined" size="small" className={classes.formControl}>
            <InputLabel style={{ fontSize: 14 }}
                InputLabel id="demo-simple-select-outlined-label">Select Site</InputLabel>
            <SimpleSelect
                value={props.type === 'CheckIn' ? props.selectedRailCar : props.selectedRailCar}
                 onChange={(e) => onChange(props.type, e)}
                label={props.labelName}
                classes={{
                    root: classes.input
                }}
            >
      {(props.data && props.data || []).map((site, i) => (
                          <MenuItem value={site.id}>{site.id}</MenuItem>
                      ))}

            </SimpleSelect>
        </FormControl>
    )
}

export default Select;
