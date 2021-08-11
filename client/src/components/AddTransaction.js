import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
    const { transactions, addTransaction } = useContext(GlobalContext);
    const [transactionName, setTransactionName] = useState("")
    const [type, setType] = useState("")
    const [category, setCategory] = useState("")
    const [subCategory, setSubCategory] = useState("")
    const [transactionDate, setTransactionDate] = useState("")
    const [amount, setAmount] = useState(0)

    const handleSubmit = (event) => {
        event.preventDefault();

        // If first element , set id =1 else , set id = max id + 1
        const id = transactions.length > 0 ? Math.max(...transactions.map(item => item.id)) + 1 : 1

        const newTrans = {
            id: id,
            transactionName,
            type,
            category,
            subCategory,
            transactionDate,
            amount: +amount
        }
        addTransaction(newTrans)
    }

    return (
        <>
            <h3>Add new transaction</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                    <label htmlFor="text">TransactionName</label>
                    <input type="text" value={transactionName} onChange={(event) => setTransactionName(event.target.value)} placeholder="Enter transaction name..." />
                    </div>
                    <div className="form-control">
                    <label htmlFor="text">Type <br />(Income, Expense, Transfer)</label>
                    <input type="text" value={type} onChange={(event) => setType(event.target.value)} placeholder="Enter transaction type..." />
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
                    <button className="btn">Add Transaction</button>
                </form>
        </>
    )
}
