import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    width: 250
  },
  selected: {
    backgroundColor: "turquoise !important",
    color: "white",
    fontWeight: 400
  },
  indeterminateColor: {
    color: "#f50057"
  },
  selectAllText: {
    fontWeight: 400
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)"
    }
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  root: {
    style:{
      color:'red'
    }
  },
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    }
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center"
  },
  variant: "menu"
};
export { useStyles, MenuProps };
