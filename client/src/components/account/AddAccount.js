import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { ThemeProvider } from '@material-ui/core/styles';

import { acctModalBtnTheme } from '../../styles/account/AddAccount';

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
        <Dialog open={openAcctModal} onClose={handleAcctModalClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add new account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Provide the following details for the new account.
            </DialogContentText>
                <form>
                    <div className="form-control">
                    <label htmlFor="text">AccountName</label>
                    <input type="text" value={accountName} onChange={(event) => setAccountName(event.target.value)} placeholder="Enter account name..." />
                    </div>
                    <div className="form-control">
                    <label htmlFor="text">AccountNumber</label>
                    <input type="text" value={accountNumber} onChange={(event) => setAccountNumber(event.target.value)} placeholder="Enter account number..." />
                    </div>
                    <div className="form-control">
                    <label htmlFor="amount">Initial Balance</label>
                    <input type="number" value={initialBalance} onChange={(event) => setInitialBalance(event.target.value)} placeholder="Enter amount..." />
                    </div>
                    <div className="form-control">
                    <label htmlFor="text">Comments</label>
                    <input type="text" value={comments} onChange={(event) => setComments(event.target.value)} placeholder="Enter comments..." />
                    </div>
                </form>
          </DialogContent>
          <DialogActions>
            <ThemeProvider theme={acctModalBtnTheme}>
                <Button onClick={handleAcctModalClose} color="primary">
                Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                Add
                </Button>
            </ThemeProvider>
          </DialogActions>
        </Dialog>
        <Alert />
        </>
    )
}