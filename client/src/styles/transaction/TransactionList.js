import { makeStyles, createTheme } from '@material-ui/core/styles';

// Override icon styles
export const arrowIconTheme = createTheme({
    overrides: {
      MuiSvgIcon: {
        root: {
          '&:hover': {
              color: ["#fff", "!important"]
         },
        },
      },
    },
  });

export const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: .5,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }));
  
  
export const useCustomTableHeadStyles = makeStyles(() => ({
      root: {
        backgroundImage: "linear-gradient(180deg, #fbeeef, #f0bcc0)",
        fontWeight: 'bold',
        lineHeight: ".7",
        fontSize: ".75rem",
        padding: ["0 24px 0 16px", "!important"],
      }
  }));

  export const useCustomIncHeadStyles = makeStyles(() => ({
      root: {
          backgroundImage: "linear-gradient(180deg, #80cfdb, #2d909f)",
          color: "white",
          fontWeight: 'bold',
          lineHeight: ".7",
          fontSize: ".75rem",
          padding: ["0 24px 0 16px", "!important"],
      },
  }));
  
  export const useCustomExpHeadStyles = makeStyles(() => ({
    root: {
      backgroundImage: "linear-gradient(180deg, #da5863, #97212b)",
      color: "white",
      fontWeight: 'bold',
      lineHeight: ".7",
      fontSize: ".75rem",
      padding: ["0 24px 0 16px", "!important"],
    }
  }));
  
  export const useCustomTransHeadStyles = makeStyles(() => ({
    root: {
      backgroundImage: "linear-gradient(180deg, #d9d3d6, #ada0a6)",
      color: "white",
      fontWeight: 'bold',
      lineHeight: ".7",
      fontSize: ".75rem",
      padding: ["0 24px 0 16px", "!important"],
    }
  }));