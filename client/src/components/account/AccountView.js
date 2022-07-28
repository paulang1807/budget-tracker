import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import { Button } from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import FunctionsIcon from '@material-ui/icons/Functions';

//Styles
import { ThemeProvider } from '@material-ui/core/styles';
import { useStyles } from '../../styles/account/AccountView';
import { customMUITheme } from '../../styles/common/MaterialUIThemes';

import Tooltip from '../common/Tooltip';

export const AccountView = () => {

    const { toggleAccountView
            ,toggleSideBar } = useContext(GlobalContext);

    function showAccounts() {
        toggleAccountView(true);
        toggleSideBar(true);
    }
    
    function showSummary() {
        toggleAccountView(false);
    }

    const classes = useStyles();
    return (
        <>
            <ThemeProvider theme={customMUITheme}>
                <Tooltip tooltip={'Show accounts'}>
                    <Button
                        variant="contained"
                        className={classes.button}
                        startIcon={<AccountBalanceIcon />}
                        onClick={showAccounts}
                        >
                            Accounts
                    </Button>
                </Tooltip>
                <Tooltip tooltip={'Show summary of all accounts'}>
                    <Button
                        variant="contained"
                        className={classes.button}
                        startIcon={<FunctionsIcon />}
                        onClick={showSummary}
                        >
                            Summary
                    </Button>
                </Tooltip>
            </ThemeProvider>
        </>
    )
}
