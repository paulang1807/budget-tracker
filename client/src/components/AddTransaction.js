import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
    const { transactions, addTransaction } = useContext(GlobalContext);
    const [text, setText] = useState("")
    const [amount, setAmount] = useState(0)

    const handleSubmit = (event) => {
        event.preventDefault();

        // If first element , set id =1 else , set id = max id + 1
        const id = transactions.length > 0 ? Math.max(...transactions.map(item => item.id)) + 1 : 1

        const newTrans = {
            id: id,
            text,
            amount: +amount
        }
        addTransaction(newTrans)
    }

    return (
        <>
            <h3>Add new transaction</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" value={text} onChange={(event) => setText(event.target.value)} placeholder="Enter text..." />
                    </div>
                    <div className="form-control">
                    <label htmlFor="amount">Amount <br />(negative - expense, positive - income)</label>
                    <input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="Enter amount..." />
                    </div>
                    <button className="btn">Add transaction</button>
                </form>
        </>
    )
}
