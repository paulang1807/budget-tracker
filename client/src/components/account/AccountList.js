import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { Account } from './Account';

export const AccountList = () => {
    const { accounts, getAccounts } = useContext(GlobalContext);

    useEffect(() => {
        getAccounts();
        // To silence the default warnings, use
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ul className="accountListItem">
            {accounts.map(account => (
                <Account key={account._id} account={account}/>
            ))}
        </ul>
    )
}