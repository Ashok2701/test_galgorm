import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme) => ({
    
    inputLabel: {
        fontSize: 14,
    }
}));

const Search = () => {
    const [searchItem, setSearchItem] = useState("");
    const classes = useStyles();
    const onChangefunc = ((event) => {
        setSearchItem(event.target.value)
    });

    return (
        <TextField size='small' style={{backgroundColor: '#EAEAEA', borderRadius: 4,width:191}} id="outlined-basic"
                   //classes={{inputProps: classes.some}}
                   label="Select vehicle" 
                   InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                   variant="outlined" onChange={onChangefunc}
                   InputLabelProps={{classes: {root: classes.inputLabel}}}
                   value={searchItem}/>
    );
}

export default Search;
