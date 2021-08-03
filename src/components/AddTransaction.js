import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
    const { addTransaction } = useContext(GlobalContext);
    const [text, setText] = useState("")
    const [amount, setAmount] = useState(0)

    const handleSubmit = (event) => {
        event.preventDefault();

        const newTrans = {
            id: Math.floor(Math.random() * 100000000),
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
