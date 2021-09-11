import { makeStyles, createTheme } from '@material-ui/core/styles';

// Override icon button primary color
export const menuBtntheme = createTheme({
    overrides: {
      MuiIconButton: {
        colorPrimary: {
          color: ["#1e51a0fa", "!important"],
        },
      },
    },
  });

// Style for div containing button group
export const useDivStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

// Style for button icons
export const useIconStyles = makeStyles(() => ({
    root: {
      '&:hover': {
        backgroundColor: ["#6e9de6", "!important"],
     },
    },
  }));