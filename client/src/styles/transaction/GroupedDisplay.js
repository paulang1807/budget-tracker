import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: { visibility: (props) => props.showRow ? "visible" : "collapse",
          color: "#fff",
          fontWeight: 'bold',
          backgroundImage: (props) => props.groupByCode==='MCS' ? "linear-gradient(180deg, #cedbf2, #4d7bd1)" : 
            (props.groupByCode==='CS' || props.groupByCode==='MS' || props.groupByCode==='MC') ? "linear-gradient(180deg, #8dabe2, #193261)" : 
            "linear-gradient(180deg, #4d7bd1, #081120 )",
          },
}));

export const useCellStyles = makeStyles(() => ({
  root: {  color: "#fff",
            padding: ["0 24px 0 16px", "!important"],
          },
}));