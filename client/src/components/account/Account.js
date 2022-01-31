import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import { MenuItem } from "react-pro-sidebar";

import '../../styles/account/AccountList.css';

export const Account = ({account}) => {

    const { selectAccount, selectedAccount } = useContext(GlobalContext);

    return (
        <MenuItem className={ account._id==selectedAccount ? "selAccountListItem" : null} onClick={() => selectAccount(account._id)}>
            {account.accountName}
        </MenuItem>
    )
}
