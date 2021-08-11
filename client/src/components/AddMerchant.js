import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddMerchant = () => {
    const { merchants, addMerchant } = useContext(GlobalContext);
    const [merchantName, setMerchantName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const newMerchant = {
            merchantName
        }
        addMerchant(newMerchant)
    }

    return (
        <>
            <h3>Add new merchant</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                    <label htmlFor="text">MerchantName</label>
                    <input type="text" value={merchantName} onChange={(event) => setMerchantName(event.target.value)} placeholder="Enter merchant name..." />
                    </div>
                    <button className="btn">Add Merchant</button>
                </form>
        </>
    )
}