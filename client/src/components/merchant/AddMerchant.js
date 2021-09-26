import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { ThemeProvider } from '@material-ui/core/styles';

import { merchantModalBtnTheme } from '../../styles/merchant/AddMerchant';

import Alert from '../common/Alert';

export const AddMerchant = () => {
    const { merchants, addMerchant, openMerchantModal, handleMerchModalClose , handleAlertOpen} = useContext(GlobalContext);
    const [merchantName, setMerchantName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        let alertTitle='';
        let alertText='';

        if (!merchantName){
            alertTitle="Input Error!"
            alertText='Merchant Name is required in order to add merchants';
            handleAlertOpen({"alertTitle": alertTitle, "alertText": alertText});
            return (<Alert />);
        }

        handleMerchModalClose();

        const merchantExists = merchants.filter((merchant) => merchant.merchantName.toLowerCase()===merchantName.toLowerCase())
        if (merchantExists.length > 0){
            alertTitle="Input Error!"
            alertText='Merchant already exists in the database';
            handleAlertOpen({"alertTitle": alertTitle, "alertText": alertText});
            return (<Alert />);
        } else {
            const newMerchant = {
                merchantName
            }
            addMerchant(newMerchant)
            alertTitle="Operation Successful!"
            alertText='Merchant has been added.';
            handleAlertOpen({"alertTitle": alertTitle, "alertText": alertText});
            return (<Alert />);
        }
    }

    return (
        <>
        <Dialog open={openMerchantModal} onClose={handleMerchModalClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add new merchant</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Provide the following details for the new merchant.
            </DialogContentText>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                    <label htmlFor="text">MerchantName</label>
                    <input type="text" value={merchantName} onChange={(event) => setMerchantName(event.target.value)} placeholder="Enter merchant name..." />
                    </div>
                </form>
          </DialogContent>
          <DialogActions>
            <ThemeProvider theme={merchantModalBtnTheme}>
                <Button onClick={handleMerchModalClose} color="primary">
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