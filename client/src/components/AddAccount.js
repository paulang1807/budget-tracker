import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddAccount = () => {
    const { accounts, addAccount } = useContext(GlobalContext);
    const [accountName, setAccountName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [initialBalance, setInitialBalance] = useState(0);
    const [comments, setComments] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const newAcct = {
            accountName,
            accountNumber,
            initialBalance,
            comments
        }
        addAccount(newAcct)
    }

    return (
        <>
            <h3>Add new account</h3>
                <form onSubmit={handleSubmit}>
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
                    <input type="textArea" value={comments} onChange={(event) => setComments(event.target.value)} placeholder="Enter comments..." />
                    </div>
                    <button className="btn">Add Account</button>
                </form>
        </>
    )
}