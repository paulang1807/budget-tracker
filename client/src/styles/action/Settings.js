import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    button: {
      fontSize: ".6rem",
      margin: "4px",
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