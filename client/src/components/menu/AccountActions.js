import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

//Styles
import { ThemeProvider } from '@material-ui/core/styles';
import { useMenuStyles } from '../../styles/menu/Groupings';
import { useIconStyles } from '../../styles/menu/Menu';
import { customMUITheme } from '../../styles/common/MaterialUIThemes';

import Tooltip from '../common/Tooltip';

export const AccountActions = () => {

    const { handleAcctModalOpen
            ,toggleAccountView } 
            = useContext(GlobalContext);

    const iconClasses = useIconStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const menuClasses = useMenuStyles();

    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
    setAnchorEl(null);
    };

    const handleMenuClick = (typ) => {
        switch(typ) {
            case 'add' :  {
                handleAcctModalOpen();
                handleClose();
                return;
            }
            case 'show' :  {
                toggleAccountView(true);
                handleClose();
                return;
            }
        } 
    }

    return (
        <>
            <Tooltip tooltip={'Account Actions'}>
                <IconButton color="primary" aria-label="acctactions" size="small" className={iconClasses.root} onClick={handleClick}>
                    <AccountBalanceIcon fontSize="large" />
                </IconButton>
            </Tooltip>
            <ThemeProvider theme={customMUITheme}>
                <Menu
                    getContentAnchorEl={null}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem 
                        onClick={() => handleMenuClick('add')}
                        className={menuClasses.root}>
                        <ListItemText primary="Add Accounts" />
                    </MenuItem>
                    <MenuItem 
                        onClick={() => handleMenuClick('show')}
                        className={ menuClasses.root}>
                        <ListItemText primary="Show Accounts" />
                    </MenuItem>
                </Menu>
            </ThemeProvider>
        </>
    )
}
