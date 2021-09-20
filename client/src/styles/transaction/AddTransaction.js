import { createTheme } from '@material-ui/core/styles';
// Override button styles
export const modalBtnTheme = createTheme({
    overrides: {
      MuiButton: {
        root: {
          '&:hover': {
              backgroundImage: ["linear-gradient(180deg, #b7d5f5, #5990ca)", "!important"],
              color: ["#fff", "!important"]
         },
        },
      },
    },
  });