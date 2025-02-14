import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from '@material-ui/core/Chip';
import { MenuProps } from "./utils";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 245,
    maxWidth: 250,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

function MultiVehicleCode(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [selected, setSelected] = useState([]);
  const handleChange = (event) => {
    const value = event.target.value;
    props.setSelectedVehicleCodes(value.toString());
    props.selectedVehicleCodeArr(value)
    setSelected(value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-mutiple-chip-label">Vehicles</InputLabel>
      <Select
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
        multiple
        value={selected}
        onChange={handleChange}
        input={<Input id="select-multiple-chip" />}
        // renderValue={(selected) => selected.join(", ")}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((value) => {
              return (
                <Chip key={value} label={value} className={classes.chip} />
              )
            })}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {props && props.options && props.options.map((option) => {
          const text = option.label;
          const breakString = (str, limit) => {
             let brokenString = '';
             for(let i = 0, count = 0; i < str.length; i++){
                if(count >= limit && str[i] === ' '){
                   count = 0;
                   brokenString += '</br>';
                }else{
                   count++;
                   brokenString += str[i];
                }
             }
             return {__html: brokenString};
          }

          return (
          <MenuItem key={option.value} value={option.value}          >
            <div style={{ display: "flex" }}>
              <input type="checkbox" checked={selected.indexOf(option.value) > -1}
                style={{
                  padding: "10px", margin: "5px",
                  width: "20px",
                  height: "20px"
                }} />
              <div style={{ fontSize: "14px", paddingTop: "5px",
             }} dangerouslySetInnerHTML={breakString(text, 15)}>

              </div>
            </div>
          </MenuItem>
        )})}
      </Select>
    </FormControl>
  );
}

export default MultiVehicleCode;