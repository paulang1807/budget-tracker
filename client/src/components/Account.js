import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Account = ({account}) => {
    const { deleteAccount } = useContext(GlobalContext);

    return (
        <li >
            {account.accountName} <button className="delete-btn" onClick={() => deleteAccount(account._id)}>x</button>
        </li>
    )
}
