import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Styles
import { ThemeProvider } from '@material-ui/core/styles';
import { FormDiv } from '../../styles/transaction/AddTransaction';
import { customMUITheme } from '../../styles/common/MaterialUIThemes';
import '../../styles/transaction/AddTransaction.css';

import Alert from '../common/Alert';

export const AddTransaction = () => {

    const { accounts
            ,merchants
            ,transactions
            ,transType
            ,addTransaction
            ,updateTransaction
            ,openTransModal
            ,handleTransModalClose
            ,handleAlertOpen
            ,selectedTrans } 
            = useContext(GlobalContext);

    const [_id, setTransactionId] = useState("")
    const [transactionName, setTransactionName] = useState("")
    const [type, setType] = useState("")
    const [category, setCategory] = useState("")
    const [subCategory, setSubCategory] = useState("")
    const [transactionDate, setTransactionDate] = useState("")
    const [amount, setAmount] = useState(0)
    const [accountId, setAccountId] = useState("")
    const [merchantId, setMerchantId] = useState("")
    const [description, setDescription] = useState("")
    const [comments, setComments] = useState("")


    const [defaultTypSelection, setDefaultTypSelection] = useState("None");
    const [defaultAcctSelection, setDefaultAcctSelection] = useState("None");
    const [defaultMerchSelection, setDefaultMerchSelection] = useState("None");

    const [transModalTitle, setTransModalTitle] = useState("Add new transaction");
    const [transModalDesc, setTransModalDesc] = useState("Provide the following details for the new transaction.");

    useEffect(() => {
        if((transType==='Copy' || transType==='Edit') && selectedTrans) {
            // Pre-populate form with selected transaction details

            let selTrans = transactions.filter((transaction) => transaction._id===selectedTrans);

            let year = new Date(selTrans[0].transactionDate).getFullYear()
            let month = new Date(selTrans[0].transactionDate).getMonth()
            let date = new Date(selTrans[0].transactionDate).getDate()
            let selTransDate = year + '-' +  String(month + 1).padStart(2, '0') + '-' +  String(date).padStart(2, '0')

            setTransactionName(selTrans[0].transactionName);
            setType(selTrans[0].type);
            setCategory(selTrans[0].category);
            setSubCategory(selTrans[0].subCategory);
            setTransactionDate(selTransDate);
            setAmount(selTrans[0].amount);
            setAccountId(selTrans[0].accountId);
            setMerchantId(selTrans[0].merchantId);
            setDescription(selTrans[0].description);
            setComments(selTrans[0].comments);

            setDefaultTypSelection(selTrans[0].type);
            setDefaultAcctSelection(selTrans[0].accountId);
            setDefaultMerchSelection(selTrans[0].merchantId);

            if(transType==='Edit') {
                setTransactionId(selTrans[0]._id);
                setTransModalTitle("Edit Transaction");
                setTransModalDesc("Edit the current transaction.");
            } else {
                setTransModalTitle("Copy Transaction");
                setTransModalDesc("Create a new record based on the existing transaction.");
            }
        } else {
            setTransactionName("");
            setType("");
            setCategory("");
            setSubCategory("");
            setTransactionDate("");
            setAmount("");
            setAccountId("");
            setMerchantId("");
            setDescription("");
            setComments("");

            setDefaultTypSelection("None");
            setDefaultAcctSelection("None");
            setDefaultMerchSelection("None");

            setTransModalTitle("Add Transaction");
            setTransModalDesc("Provide the following details for the new transaction.");
        }

    },[selectedTrans, transType, transactions])

    const handleSubmit = (event) => {
        event.preventDefault();

        let alertTitle='';
        let alertText='';

        if (!transactionName){
            alertTitle="Input Error!"
            alertText='Transaction Name is required in order to add a transaction';
            handleAlertOpen({"alertTitle": alertTitle, "alertText": alertText});
            return (<Alert />);
        }

        if (accountId === '' || accountId === 'None'){
            alertTitle="Input Error!"
            alertText='Related account must be selected in order to add a transaction';
            handleAlertOpen({"alertTitle": alertTitle, "alertText": alertText});
            return (<Alert />);
        }

        if (merchantId === '' || merchantId === 'None'){
            alertTitle="Input Error!"
            alertText='Related Merchant must be selected in order to add a transaction';
            handleAlertOpen({"alertTitle": alertTitle, "alertText": alertText});
            return (<Alert />);
        }

        if (type === '' || type === 'None'){
            alertTitle="Input Error!"
            alertText='Type must be selected in order to add a transaction';
            handleAlertOpen({"alertTitle": alertTitle, "alertText": alertText});
            return (<Alert />);
        }

        handleTransModalClose();

        if(transType==='Copy' || transType==='Add') {
            const newTrans = {
                transactionName,
                type,
                category,
                subCategory,
                transactionDate,
                amount: +amount,
                accountId,
                merchantId,
                description,
                comments
            }
            addTransaction(newTrans)
            alertText='Transaction has been added.';
        } else {
            const modTrans = {
                _id,
                transactionName,
                type,
                category,
                subCategory,
                transactionDate,
                amount: +amount,
                accountId,
                merchantId,
                description,
                comments
            }
            updateTransaction(modTrans)
            alertText='Transaction has been updated.';
        }
        alertTitle="Operation Successful!"
        handleAlertOpen({"alertTitle": alertTitle, "alertText": alertText});
        return (<Alert />);
    }

    return (
        <>
        <ThemeProvider theme={customMUITheme}>
            <Dialog open={openTransModal} onClose={handleTransModalClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{transModalTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    {transModalDesc}
                    </DialogContentText>
                        <form className="form-content">
                            <FormDiv>
                            <label htmlFor="transName">TransactionName</label>
                            <input id="transName" type="text" value={transactionName} onChange={(event) => setTransactionName(event.target.value)} placeholder="Enter transaction name..." />
                            <label htmlFor="transDate">Transaction Date</label><br />
                            <input id="transDate" type="date" value={transactionDate} onChange={(event) => setTransactionDate(event.target.value)}/>
                            <label htmlFor="transAmount">Amount</label>
                            <input id="transAmount" type="number" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="Enter amount..." />
                            <label htmlFor="merchant">Merchant Name</label><br />
                                <select name="merchant" id="merchant" defaultValue={defaultMerchSelection} onChange={(event) => {setMerchantId(event.target.options[event.target.selectedIndex].value)}}>
                                    <option value="None">Select Merchant</option>
                                    {merchants.map((merchant) => (<option key={merchant._id} value={merchant._id}>{merchant.merchantName}</option>))}
                                </select>
                            <label htmlFor="transDesc">Description</label>
                            <textarea id="transDesc" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Enter description..." />
                            </FormDiv>
                            <FormDiv>
                            <label htmlFor="type">Type</label><br />
                                <select name="type" id="type" defaultValue={defaultTypSelection} onChange={(event) => {setType(event.target.options[event.target.selectedIndex].value)}}>
                                    <option value="None">Select Type</option>
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                    <option value="transfer">Transfer</option>
                                </select>
                            <label htmlFor="transCat">Category</label>
                            <input id="transCat" type="text" value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Enter transaction category..." />
                            <label htmlFor="transSubcat">Sub Category</label>
                            <input id="transSubcat" type="text" value={subCategory} onChange={(event) => setSubCategory(event.target.value)} placeholder="Enter transaction sub category..." />
                            <label htmlFor="account">Account Name</label><br />
                                <select name="account" id="account" defaultValue={defaultAcctSelection} onChange={(event) => {setAccountId(event.target.options[event.target.selectedIndex].value)}}>
                                    <option value="None">Select Account</option>
                                    {accounts.map((account) => (<option key={account._id} value={account._id} >{account.accountName}</option>))}
                                </select>
                            <label htmlFor="transCmnts">Comments</label>
                            <textarea id="transCmnts" value={comments} onChange={(event) => setComments(event.target.value)} placeholder="Enter comments..." />
                            </FormDiv>
                        </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleTransModalClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {transType==='Edit' ? 'OK' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
        <Alert />
        </>
    )
}
