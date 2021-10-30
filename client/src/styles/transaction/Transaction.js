import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    root: { visibility: (showRow) => showRow ? "visible" : "collapse",
            fontSize: ".7rem"
            },
}));

export const useCellStyles = makeStyles(() => ({
    root: { lineHeight: ".7",
            fontSize: ".7rem"
            },
}));