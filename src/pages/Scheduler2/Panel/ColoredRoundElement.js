import React from 'react';
import { Paper, IconButton } from '@mui/material';
import {  makeStyles } from '@mui/styles';
import { Favorite, ShoppingCart, Search, Send, Star } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  //  padding: theme.spacing(2),
    borderRadius: '50%',
     backgroundColor: (props) => props.color,
        width: 100,
        height: 100,
  },
  icon: {
    fontSize: 40,
  },
}));


const ColoredRoundElement = ({ color, text, icon }) => {
  const classes = useStyles();

  const renderIcon = () => {
    switch (icon) {
      case 'favorite':
        return <Favorite className={classes.icon} />;
      case 'shoppingCart':
        return <ShoppingCart className={classes.icon} />;
      case 'search':
        return <Search className={classes.icon} />;
      case 'send':
        return <Send className={classes.icon} />;
      case 'star':
        return <Star className={classes.icon} />;
      default:
        return null;
    }
  };

  return (
         <>
         {icon && (
           <IconButton color="primary" aria-label="icon">
             {renderIcon()}
           </IconButton>
         )}
         <p>{text}</p>
         </>

  );
};

export default ColoredRoundElement;
