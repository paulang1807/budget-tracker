import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//Styles
import { ThemeProvider } from '@material-ui/core/styles';
import { customMUITheme } from '../../styles/common/MaterialUIThemes';

export default function Alert() {
    const { openAlert
            ,alertContent
            ,alertTitle
            ,handleAlertClose } 
            = useContext(GlobalContext);

    return (
        <div>
            <Dialog
            open={openAlert}
            onClose={handleAlertClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{alertTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                {alertContent}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ThemeProvider theme={customMUITheme}>
                    <Button onClick={handleAlertClose} color="primary" autoFocus>
                        OK
                    </Button>
                </ThemeProvider>
            </DialogActions>
            </Dialog>
        </div>
    )
}
