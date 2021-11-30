import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import IconButton from '@material-ui/core/IconButton';
import CategoryIcon from '@material-ui/icons/Category';
import StoreIcon from '@material-ui/icons/Store';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import { ThemeProvider } from '@material-ui/core/styles';

import { useDivStyles, useIconStyles, menuBtntheme } from '../../styles/menu/Menu';

import Tooltip from '../common/Tooltip';

import { AddAccount } from '../account/AddAccount';
import { AddMerchant } from '../merchant/AddMerchant';
export const Menu = () => {

    const { handleAcctModalOpen
            ,handleMerchModalOpen } 
            = useContext(GlobalContext);

    const divClasses = useDivStyles();
    const iconClasses = useIconStyles();
    
    return (
        <div className={divClasses.root}>
            <ThemeProvider theme={menuBtntheme}>
                <Tooltip tooltip={'Account'}>
                    <IconButton color="primary" aria-label="accounts" className={iconClasses.root} onClick={handleAcctModalOpen}>
                        <AccountBalanceIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
                <Tooltip tooltip={'Merchant'}>
                    <IconButton color="primary" aria-label="merchants" className={iconClasses.root} onClick={handleMerchModalOpen}>
                        <StoreIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
                <Tooltip tooltip={'Category'}>
                    <IconButton color="primary" aria-label="category" className={iconClasses.root}>
                        <CategoryIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
                <Tooltip tooltip={'Subcategory'}>
                    <IconButton color="primary" aria-label="subcategory" className={iconClasses.root}>
                        <AccountTreeIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
            </ThemeProvider>
            <AddAccount />
            <AddMerchant />
        </div>
    )
}
