import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import { AccountList } from '../account/AccountList';
import { MerchantList } from '../merchant/MerchantList';

export const SidebarDisplay = () => {

    const { accountView, merchantView, sideBar } = useContext(GlobalContext);

    return (
        sideBar && (accountView ? (<AccountList />) : merchantView ? (<MerchantList />) : (<></>))
    )
}
