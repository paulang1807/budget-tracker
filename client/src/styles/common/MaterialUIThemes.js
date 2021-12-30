import { createTheme } from '@material-ui/core/styles';
import "../App.css";

// Override button styles
export const customMUITheme = createTheme({
    overrides: {
      MuiButton: {
        root: {
          padding: ["6px 10px", "!important"],
          borderRadius: "6px",
          color: ["var(--title-text)", "!important"],
          backgroundImage: "linear-gradient(180deg, var(--button-background-grad1), var(--button-background-grad2))",
          '&:hover': {
              backgroundImage: ["linear-gradient(180deg, var(--button-hover-grad1), var(--button-hover-grad2))", "!important"],
              color: ["var(--button-hover-text)", "!important"]
         },
         '&:disabled': {
             color: ["var(--button-disabled-text)", "!important"]
        },
        },
        startIcon: {
          marginRight: ["2px", "!important"]
        },
        contained: {
            color: "var(--title-text)",
            '&:hover': {
                color: "var(--button-hover-text)",
           },
        },
      },
      MuiPaper: {
        root: {
          color: "var(--input-text)",
          backgroundColor: ["var(--form-background-color)", "!important"],
        },
      },
      MuiTypography: {
        colorTextSecondary: {
          color: "var(--input-text)",
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
          color: ["var(--menu-icon)", "!important"],
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
              color: ["var(--menu-icon-hover)", "!important"]
         },
        }
      }
    },
  });