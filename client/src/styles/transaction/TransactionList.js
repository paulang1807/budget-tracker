import { makeStyles } from '@material-ui/core/styles';
import "../App.css";

export const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      margin: "0 0.5vw 16px 0.5vw",
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
        backgroundImage: "linear-gradient(180deg, var(--trans-table-header-grad1), var(--trans-table-header-grad2))",
        fontWeight: 'bold',
        lineHeight: ".7",
        fontSize: ".75rem",
        padding: ["0 24px 0 16px", "!important"],
      }
  }));

  export const useCustomIncHeadStyles = makeStyles(() => ({
      root: {
          backgroundImage: "linear-gradient(180deg, var(--income-grad1), var(--income-grad2))",
          color: "var(--title-text)",
          fontWeight: 'bold',
          lineHeight: ".7",
          fontSize: ".75rem",
          padding: ["0 24px 0 16px", "!important"],
      },
  }));
  
  export const useCustomExpHeadStyles = makeStyles(() => ({
    root: {
      backgroundImage: "linear-gradient(180deg, var(--expense-grad1), var(--expense-grad2))",
      color: "var(--title-text)",
      fontWeight: 'bold',
      lineHeight: ".7",
      fontSize: ".75rem",
      padding: ["0 24px 0 16px", "!important"],
    }
  }));
  
  export const useCustomTransHeadStyles = makeStyles(() => ({
    root: {
      backgroundImage: "linear-gradient(180deg, var(--transfer-grad1), var(--transfer-grad2))",
      color: "var(--title-text)",
      fontWeight: 'bold',
      lineHeight: ".7",
      fontSize: ".75rem",
      padding: ["0 24px 0 16px", "!important"],
    }
  }));