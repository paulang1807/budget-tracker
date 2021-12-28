import { createTheme } from '@material-ui/core/styles';
// Override button styles
export const customMUITheme = createTheme({
    overrides: {
      MuiButton: {
        root: {
          padding: ["6px 10px", "!important"],
          borderRadius: "6px",
          color: ["whitesmoke", "!important"],
          backgroundImage: "linear-gradient(180deg, #c9d9f1, #1a4482)",
          '&:hover': {
              backgroundImage: ["linear-gradient(180deg, #b7d5f5, #5990ca)", "!important"],
              color: ["#fff", "!important"]
         },
         '&:disabled': {
             color: ["#bbb", "!important"]
        },
        },
        startIcon: {
          marginRight: ["2px", "!important"]
        },
        contained: {
            color: "whitesmoke",
            '&:hover': {
                color: "#fff",
           },
        },
      },
      MuiDialogActions: {
        root: {
          padding: "12px 35px"
        },
      },
      MuiDialogContent: {
        root: {
          padding: "8px 30px"
        },
      },
      MuiList: {
        padding: {
          paddingTop: "0",
          paddingBottom: "0",
        },
      },
      MuiIconButton: {
        colorPrimary: {
          color: ["#c2cddffa", "!important"],
        },
        sizeSmall: {
          padding: ["3px 4px", "!important"],
        }
      },
      MuiSvgIcon: {
        root: {
          width: ["0.75em", "!important"],
          height: ["0.75em", "!important"],
          '&:hover': {
              color: ["#fff", "!important"]
         },
        }
      }
    },
  });