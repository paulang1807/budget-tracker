import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import { MenuItem } from "react-pro-sidebar";

import '../../styles/common/Sidebar.css';

export const Merchant = ({merchant}) => {

    const { selectMerchant, selectedMerchant } = useContext(GlobalContext);

    console.log("MERCHANT:", merchant);

    return (
        <MenuItem className={ merchant._id==selectedMerchant ? "selSidebarListItem" : null} onClick={() => selectMerchant(merchant._id)}>
            {merchant.merchantName}
        </MenuItem>
    )
}
