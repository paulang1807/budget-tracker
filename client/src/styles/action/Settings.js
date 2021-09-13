import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    button: {
      fontSize: ".6rem",
      margin: "10px 4px 4px 4px",
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