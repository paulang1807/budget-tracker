import { makeStyles } from '@material-ui/core/styles';
import "../App.css";

export const useStyles = makeStyles(() => ({
  root: { visibility: (props) => props.showRow ? "visible" : "collapse",
          color: "var(--title-text)",
          fontWeight: 'bold',
          backgroundImage: (props) => props.groupByCode==='MCS' ? "linear-gradient(180deg, var(--group3-grad1), var(--group3-grad2))" : 
            (props.groupByCode==='CS' || props.groupByCode==='MS' || props.groupByCode==='MC') ? "linear-gradient(180deg, var(--group2-grad1), var(--group2-grad2))" : 
            "linear-gradient(180deg, var(--group1-grad1), var(--group1-grad2) )",
          },
}));

export const useCellStyles = makeStyles(() => ({
  root: {  color: "var(--title-text)",
            padding: ["0 24px 0 16px", "!important"],
          },
}));