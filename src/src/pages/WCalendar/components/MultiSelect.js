// import React, { useState, useEffect } from "react";
// import Checkbox from "@material-ui/core/Checkbox";
// import InputLabel from "@material-ui/core/InputLabel";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import ListItemText from "@material-ui/core/ListItemText";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import Chip from '@material-ui/core/Chip';
// import { MenuProps } from "./utils";

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 245,

//   },
//   chips: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     color:'black',
//   },
//   chip: {
//     margin: 2,
//     color:'black',
//   },
//   noLabel: {
//     marginTop: theme.spacing(3),
//   },
// }));

// function MultiSelect(props) {
//   const classes = useStyles();
//   const theme = useTheme();
//   const [selected, setSelected] = useState([]);
//   const handleChange = (event) => {

//     const value = event.target.value;
//     props.setSelectedSites(value.toString());
//     props.selectedSitesArr(value)
//     setSelected(value);
//       console.log("value =",value);
//   };


//   const handledefaultSite = (site) => {
//      console.log("inside multiselect handledefaultsite",props.defaultSelected);
//      // const value = [];
//      // value.push(site);
//       props.setSelectedSites(site);
//       props.selectedSitesArr(site)
//       setSelected(site);
//         console.log("value =",site);
//     };

// /*

//   useEffect(() => {
//      console.log("inside multiselect use effect props",props.defaultSelected);
//        if(props.defaultSelected != ''){
//           console.log("inside multiselect use effect props if",props.defaultSelected);
//           handledefaultSite(props.defaultSelected);
//        }
//       console.log("inside multiselect use effect",selected);

//   },[props.defaultSelected]);

// */


//     useEffect(() => {
//        console.log("inside multiselect use effect props",props.defaultPropsSelected);
//       if(props.defaultPropsSelected.length > 0){
//                 console.log("inside multiselect use effect props if",props.defaultPropsSelected);

//                 handledefaultSite(props.defaultPropsSelected);
//              }
//         console.log("inside multiselect use effect",selected);

//     },[props.defaultPropsSelected]);

//   return (
//     <FormControl className={classes.formControl}>
//       <InputLabel id="demo-mutiple-chip-label" style={{'color' :"black"}}>Site</InputLabel>
//       <Select
//         style ={{'color':'black'}}
//         labelId="demo-mutiple-chip-label"
//         id="demo-mutiple-chip"
//         multiple
//         value={selected}
//         onChange={handleChange}
//         input={<Input id="select-multiple-chip" />}
//         // renderValue={(selected) => selected.join(", ")}
//         renderValue={(selected) => (
//           <div className={classes.chips}>
//             {selected && selected.length > 0 && selected.map((value) => {
//               return (
//                 <Chip key={value} label={value} className={classes.chip} />
//               )
//             })}
//           </div>
//         )}
//         MenuProps={MenuProps}
//       >
//         {props && props.options && props.options.map((option) => {

//           const text = option.label;
//           const breakString = (str, limit) => {
//              let brokenString = '';
//              for(let i = 0, count = 0; i < str.length; i++){
//                 if(count >= limit && str[i] === ' '){
//                    count = 0;
//                    brokenString += '</br>';
//                 }else{
//                    count++;
//                    brokenString += str[i];
//                 }
//              }
//              return {__html: brokenString};
//           }

//           return (
//           <MenuItem key={option.value} value={option.value}          >
//             <div style={{ display: "flex" }}>
//               <input type="checkbox" checked={selected.indexOf(option.value) > -1}
//                 style={{
//                   padding: "10px", margin: "5px",
//                   width: "20px",
//                   height: "15px"
//                 }} />
//               <div style={{ fontSize: "14px", paddingTop: "1px",
//              }} dangerouslySetInnerHTML={breakString(text, 15)}>

//               </div>
//             </div>
//           </MenuItem>
//         )})}
//       </Select>
//     </FormControl>
//   );
// }

// export default MultiSelect;


import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
function MultiSelect(props) {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (props.defaultPropsSelected.length > 0) {
      handledefaultSite(props.defaultPropsSelected);
    }
  }, [props.defaultPropsSelected]);

  const handledefaultSite = (site) => {
    setSelected(site.map(option => ({ value: option, label: option })));
  };

  const handleChange = (selectedOptions) => {
    console.log(selectedOptions ,"multiselect js")
    if(!selectedOptions || selectedOptions.length === 0){
      setSelected([]);
      props.setSelectedSites("");
      props.selectedSitesArr([]);
    }else{
      setSelected(selectedOptions);
      const selectedValues = selectedOptions.map(option => option.value);
      props.setSelectedSites(selectedValues.toString());
      props.selectedSitesArr(selectedValues);
    }
   
  };

  return (
    <Select
        
      value={selected}
      // components={animatedComponents}
      onChange={handleChange}
      isMulti
      options={props.options.map(option => ({ value: option.value, label: option.label }))}
    />
  );
}

export default MultiSelect;
