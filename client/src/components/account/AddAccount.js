import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { ThemeProvider } from '@material-ui/core/styles';

import { customMUITheme } from '../../styles/common/MaterialUIThemes';

import Alert from '../common/Alert';

export const AddAccount = () => {
    const { addAccount
            ,openAcctModal
            ,handleAcctModalClose
            ,handleAlertOpen } 
            = useContext(GlobalContext);

    const [accountName, setAccountName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [initialBalance, setInitialBalance] = useState(0);
    const [comments, setComments] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        let alertTitle='';
        let alertText='';

        if (!accountName){
            alertTitle="Input Error!"
            alertText='Account Name is required in order to add accounts';
            handleAlertOpen({"alertTitle": alertTitle, "alertText": alertText});
            return (<Alert />);
        }

        handleAcctModalClose();

        const newAcct = {
            accountName,
            accountNumber,
            initialBalance,
            comments
        }
        addAccount(newAcct);
        alertTitle="Operation Successful!"
        alertText='Account has been added.';
        handleAlertOpen({"alertTitle": alertTitle, "alertText": alertText});
        return (<Alert />);

    }

    return (
        <>
        <ThemeProvider theme={customMUITheme}>
            <Dialog open={openAcctModal} onClose={handleAcctModalClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add new account</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Provide the following details for the new account.
                </DialogContentText>
                    <form>
                        <label htmlFor="acctName">AccountName</label>
                        <input id="acctName" type="text" value={accountName} onChange={(event) => setAccountName(event.target.value)} placeholder="Enter account name..." />
                        <label htmlFor="acctNum">AccountNumber</label>
                        <input id="acctNum" type="text" value={accountNumber} onChange={(event) => setAccountNumber(event.target.value)} placeholder="Enter account number..." />
                        <label htmlFor="acctAmount">Initial Balance</label>
                        <input id="acctAmount" type="number" value={initialBalance} onChange={(event) => setInitialBalance(event.target.value)} placeholder="Enter amount..." />
                        <label htmlFor="acctComments">Comments</label>
                        <textarea id="acctComments" value={comments} onChange={(event) => setComments(event.target.value)} placeholder="Enter comments..." />
                    </form>
            </DialogContent>
            <DialogActions>
                    <Button onClick={handleAcctModalClose} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                    Add
                    </Button>
            </DialogActions>
            </Dialog>
        </ThemeProvider>
        <Alert />
        </>
    )
}