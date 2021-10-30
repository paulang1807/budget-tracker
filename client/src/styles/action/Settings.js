import { makeStyles, createTheme } from '@material-ui/core/styles';

// Override List styles
export const menuListTheme = createTheme({
  overrides: {
    MuiList: {
      padding: {
        paddingTop: "0",
        paddingBottom: "0",
      },
    },
  },
});

export const useStyles = makeStyles(() => ({
    button: {
      fontSize: ".6rem",
      color: "#dedede",
      margin: "4px",
      backgroundImage: "linear-gradient(180deg, #c9d9f1, #1a4482)",
      '&:hover': {
          backgroundImage: ["linear-gradient(180deg, #b7d5f5, #5990ca)", "!important"],
     },
    },
  }));

export const useMenuStyles = makeStyles((theme) => ({
    root: {
      '&:hover': {
        backgroundColor: theme.palette.info.light,
        color: theme.palette.common.white,
      },
    },
  }));

export const useMenuActiveStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.info.light,
      color: theme.palette.common.white,
    },
  },
}));