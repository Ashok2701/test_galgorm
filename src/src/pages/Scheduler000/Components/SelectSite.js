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
        marginLeft: 5
    },
    input: {
        background: "#EAEAEA",
    }
}));

const SelectSite = (props) => {
   console.log("inside SElectSite - selected site",props.selectedSite);
    const [seletedsite, setseletedsite] = React.useState(props.selectedSite);
    const [seletedVehicle, setseletedVehicle] = React.useState('');

    const classes = useStyles();
    const onChange = (type, event) => {
        if (type === 'Site') {
            setseletedsite(event.target.value);
            props.OnSiteSelection(event.target.value);
        } else {
            setseletedVehicle(event.target.value);
            props.OnVehicleSelection(event.target.value);
        }

    }
    return (

        <FormControl variant="outlined" size="small" className={classes.formControl}>
            <InputLabel style={{ fontSize: 14 }}
                InputLabel id="demo-simple-select-outlined-label">{props.labelName}</InputLabel>
            <SimpleSelect
                value={props.type === 'Site' ? props.selectedSite : seletedVehicle}
                onChange={(e) => onChange(props.type, e)}
                label={props.labelName}
                classes={{
                    root: classes.input
                }}
            >
                {(props.type === 'Site') && (props.data && props.data || []).map((site, i) => (
                    <MenuItem value={site.id}>{site.id}</MenuItem>
                ))}
                {(props.type === 'Vehicle') && (props.data && props.data || []).map((vehicle, i) => (
                    <MenuItem value={vehicle.name}>{vehicle.name}</MenuItem>
                ))}

            </SimpleSelect>
        </FormControl>
    )
}

export default SelectSite;