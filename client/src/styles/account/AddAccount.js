import { createTheme } from '@material-ui/core/styles';

// Override button styles
export const acctModalBtnTheme = createTheme({
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