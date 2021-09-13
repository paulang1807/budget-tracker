import { makeStyles, createTheme } from '@material-ui/core/styles';

// Override button styles
export const btnTheme = createTheme({
    overrides: {
      MuiButton: {
        root: {
          padding: "6px",
          borderRadius: "6px",
          '&:hover': {
              backgroundImage: ["linear-gradient(180deg, #b7d5f5, #5990ca)", "!important"],
         },
        },
        contained: {
            color: "#dedede",
            '&:hover': {
                color: "#fff",
           },
        },
      },
    },
  });

export const useStyles = makeStyles(() => ({
    button: {
        margin: "5px",
        fontSize: ".6rem",
        backgroundImage: "linear-gradient(180deg, #c9d9f1, #1a4482)",
    },
  }));