import React from 'react';

import { Button } from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import FunctionsIcon from '@material-ui/icons/Functions';

import { ThemeProvider } from '@material-ui/core/styles';

import { useStyles, btnTheme } from '../../styles/account/AccountView';

export const AccountView = () => {

    const classes = useStyles();
    return (
        <>
            <ThemeProvider theme={btnTheme}>
                    <Button
                        variant="contained"
                        className={classes.button}
                        startIcon={<AccountBalanceIcon />}
                        >
                            Accounts
                    </Button>
                    <Button
                        variant="contained"
                        className={classes.button}
                        startIcon={<FunctionsIcon />}
                        >
                            Summary
                    </Button>
            </ThemeProvider>
        </>
    )
}
