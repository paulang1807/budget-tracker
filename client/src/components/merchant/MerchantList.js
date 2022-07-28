import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { Merchant } from './Merchant';

import { Menu } from "react-pro-sidebar";

import { Sidebar } from '../common/Sidebar';

export const MerchantList = () => {
    const { merchants, getMerchants } = useContext(GlobalContext);

    useEffect(() => {
        getMerchants();
        // To silence the default warnings, use
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const menuComponent = <Menu iconShape="square">
            {merchants.map(merchant => (
                <Merchant key={merchant._id} merchant={merchant}/>
            ))}
        </Menu>
        ;

    return (
        <Sidebar componentMenu={menuComponent} componentText='Merchants'/>
    )
}
