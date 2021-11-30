import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import { Button } from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import FunctionsIcon from '@material-ui/icons/Functions';

import { ThemeProvider } from '@material-ui/core/styles';

import { useStyles, btnTheme } from '../../styles/account/AccountView';

import Tooltip from '../common/Tooltip';

export const AccountView = () => {

    const { toggleAccoutView } = useContext(GlobalContext);

    function showAccounts() {
        toggleAccoutView(true);
    }
    
    function showSummary() {
        toggleAccoutView(false);
    }

    const classes = useStyles();
    return (
        <>
            <ThemeProvider theme={btnTheme}>
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
