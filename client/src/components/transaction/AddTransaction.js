import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const AddTransaction = () => {

    const { accounts
            ,merchants
            ,transType
            ,addTransaction
            ,openTransModal
            ,handleTransModalClose } 
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

    },[transType])


    const handleSubmit = (event) => {
        event.preventDefault();

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
        </>
    )
}
