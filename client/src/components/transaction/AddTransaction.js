import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Alert from '../common/Alert';

export const AddTransaction = () => {

    const { accounts
            ,merchants
            ,transactions
            ,transType
            ,addTransaction
            ,openTransModal
            ,handleTransModalClose
            ,handleAlertOpen
            ,selectedTrans } 
            = useContext(GlobalContext);

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
        if((transType==='Copy') && selectedTrans) {
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

            setTransModalTitle("Copy transaction");
            setTransModalDesc("Create a new record based on the existing transaction.");
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

            setTransModalTitle("Add new transaction");
            setTransModalDesc("Provide the following details for the new transaction.");
        }

    },[selectedTrans, transType, transactions])

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!transactionName){
            let alertText='Transaction Name is required in order to add a transaction';
            handleAlertOpen(alertText);
            return (<Alert />);
        }

        if (accountId === '' || accountId === 'None'){
            let alertText='Related account must be selected in order to add a transaction';
            handleAlertOpen(alertText);
            return (<Alert />);
        }

        if (merchantId === '' || merchantId === 'None'){
            let alertText='Related Merchant must be selected in order to add a transaction';
            handleAlertOpen(alertText);
            return (<Alert />);
        }

        if (type === '' || type === 'None'){
            let alertText='Type must be selected in order to add a transaction';
            handleAlertOpen(alertText);
            return (<Alert />);
        }

        handleTransModalClose();

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
    }

    return (
        <>
            <Dialog open={openTransModal} onClose={handleTransModalClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{transModalTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                {transModalDesc}
                </DialogContentText>
                    <form>
                        <div className="form-control">
                        <label htmlFor="text">TransactionName</label>
                        <input type="text" value={transactionName} onChange={(event) => setTransactionName(event.target.value)} placeholder="Enter transaction name..." />
                        </div>
                        <div className="form-control">
                        <label htmlFor="type">Type</label><br />
                            <select name="type" id="type" defaultValue={defaultTypSelection} onChange={(event) => {setType(event.target.options[event.target.selectedIndex].value)}}>
                                <option value="None">Select Type</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                                <option value="transfer">Transfer</option>
                            </select>
                        </div>
                        <div className="form-control">
                        <label htmlFor="text">Category</label>
                        <input type="text" value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Enter transaction category..." />
                        </div>
                        <div className="form-control">
                        <label htmlFor="text">Sub Category</label>
                        <input type="text" value={subCategory} onChange={(event) => setSubCategory(event.target.value)} placeholder="Enter transaction sub category..." />
                        </div>
                        <div className="form-control">
                        <label htmlFor="text">Transaction Date</label><br />
                        <input type="date" value={transactionDate} onChange={(event) => setTransactionDate(event.target.value)} />
                        </div>
                        <div className="form-control">
                        <label htmlFor="amount">Amount</label>
                        <input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="Enter amount..." />
                        </div>
                        <div>
                        <label htmlFor="account">Account Name</label><br />
                            <select name="account" id="account" defaultValue={defaultAcctSelection} onChange={(event) => {setAccountId(event.target.options[event.target.selectedIndex].value)}}>
                                <option value="None">Select Account</option>
                                {accounts.map((account) => (<option key={account._id} value={account._id} >{account.accountName}</option>))}
                            </select>
                        </div>
                        <div>
                        <label htmlFor="merchant">Merchant Name</label><br />
                            <select name="merchant" id="merchant" defaultValue={defaultMerchSelection} onChange={(event) => {setMerchantId(event.target.options[event.target.selectedIndex].value)}}>
                                <option value="None">Select Merchant</option>
                                {merchants.map((merchant) => (<option key={merchant._id} value={merchant._id}>{merchant.merchantName}</option>))}
                            </select>
                        </div>
                        <div className="form-control">
                        <label htmlFor="text">Description</label>
                        <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Enter description..." />
                        </div>
                        <div className="form-control">
                        <label htmlFor="text">Comments</label>
                        <input type="text" value={comments} onChange={(event) => setComments(event.target.value)} placeholder="Enter comments..." />
                        </div>
                    </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleTransModalClose} color="primary">
                Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                Add
                </Button>
            </DialogActions>
            </Dialog>
            <Alert />
        </>
    )
}
