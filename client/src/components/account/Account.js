import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import { MenuItem } from "react-pro-sidebar";

import '../../styles/common/Sidebar.css';

export const Account = ({account}) => {

    const { selectAccount, selectedAccount } = useContext(GlobalContext);

    console.log("ACCT:", account);

    return (
        <MenuItem className={ account._id==selectedAccount ? "selSidebarListItem" : null} onClick={() => selectAccount(account._id)}>
            {account.accountName}
        </MenuItem>
    )
}
