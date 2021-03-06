import React, { useState, useContext } from 'react';
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
        <ThemeProvider theme={customMUITheme}>
            <Dialog open={openMerchantModal} onClose={handleMerchModalClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add new merchant</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Provide the following details for the new merchant.
                </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="merchName">MerchantName</label>
                        <input id="merchName" type="text" value={merchantName} onChange={(event) => setMerchantName(event.target.value)} placeholder="Enter merchant name..." />
                    </form>
            </DialogContent>
            <DialogActions>
                    <Button onClick={handleMerchModalClose} color="primary">
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