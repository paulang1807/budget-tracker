import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Merchant = ({merchant}) => {
    const { deleteMerchant } = useContext(GlobalContext);

    return (
        <li >
            {merchant.merchantName} <button className="delete-btn" onClick={() => deleteMerchant(merchant._id)}>x</button>
        </li>
    )
}
