import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { Account } from './Account';

import { Menu } from "react-pro-sidebar";

import { Sidebar } from '../common/Sidebar';

export const AccountList = () => {
    const { accounts, getAccounts } = useContext(GlobalContext);

    useEffect(() => {
        getAccounts();
        // To silence the default warnings, use
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const menuComponent = <Menu iconShape="square">
            {accounts.map(account => (
                <Account key={account._id} account={account}/>
            ))}
        </Menu>
        ;

    return (
        <Sidebar componentMenu={menuComponent} componentText='Accounts'/>
    )
}
