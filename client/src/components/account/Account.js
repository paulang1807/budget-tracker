import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

export const Account = ({account}) => {

    const { selectAccount, selectedAccount } = useContext(GlobalContext);

    return (
        <li className={ account._id==selectedAccount ? "selAccountListItem" : null} onClick={() => selectAccount(account._id)}>
            {account.accountName}
        </li>
    )
}
