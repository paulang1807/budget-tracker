
import { makeStyles, createTheme } from '@material-ui/core/styles';
// Override button styles
export const dateModalTheme = createTheme({
    overrides: {
      MuiButton: {
        root: {
          padding: "6px",
          borderRadius: "6px",
          '&:hover': {
              backgroundImage: ["linear-gradient(180deg, #b7d5f5, #5990ca)", "!important"],
              color: ["#fff", "!important"]
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
    paper: { minWidth: "675px",
            borderRadius: "10px" },
}));