import { makeStyles } from '@material-ui/core/styles';

// Style for div containing button group
export const useDivStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#1b476e",
    },
  }));

// Style for button icons
export const useIconStyles = makeStyles(() => ({
    root: {
      '&:hover': {
        backgroundColor: ["#75bee6", "!important"],
     },
    },
  }));