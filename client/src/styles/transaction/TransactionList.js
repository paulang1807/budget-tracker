import { makeStyles } from '@material-ui/core/styles';

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
        fontSize: ".75rem"
      }
  }));