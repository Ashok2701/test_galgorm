import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  containerStyles: {
    height: 24,
    width: 64,
    backgroundColor: "white", 
    border:"1px solid #5089F5"
  },
  fillerStyles: {
    height: '100%',
    width: `${70}%`,
    backgroundColor: "#D8E7FF",
    borderRadius: 'inherit',
    textAlign: 'right'
  },
  labelStyles:{
    padding: 0,
    color: '#27509E',
    fontSize: 12,
    fontWeight: 600
  }

}));

const ProgressBar = (props) =>{
  const { capacity} =  props;
  const classes = useStyles();
 const fillerStyles1 = {
    height: '100%',
    width: `${capacity}%`,
    maxWidth : '100%',
    backgroundColor: "#D8E7FF",
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  return (
    <div className={classes.containerStyles} >
      <div style={fillerStyles1}>
        <span className={classes.labelStyles}>{`${capacity}%`}</span>
      </div>
    </div>
  );
}

export default ProgressBar;