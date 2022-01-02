import { makeStyles } from '@material-ui/core/styles';
import "../App.css";

// Style for menu background
export const useDivStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "var(--menu-background)",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
  }));

// Style for button icons
export const useIconStyles = makeStyles(() => ({
    root: {
      '&:hover': {
        backgroundColor: ["var(--menu-icon-hover-background)", "!important"],
     },
    },
  }));