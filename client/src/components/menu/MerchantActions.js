import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import StoreIcon from '@material-ui/icons/Store';

//Styles
import { ThemeProvider } from '@material-ui/core/styles';
import { useMenuStyles } from '../../styles/menu/Groupings';
import { useIconStyles } from '../../styles/menu/Menu';
import { customMUITheme } from '../../styles/common/MaterialUIThemes';

import Tooltip from '../common/Tooltip';

export const MerchantActions = () => {

    const { handleMerchModalOpen
            ,toggleAccountView
            ,toggleMerchantView
            ,toggleSideBar } 
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
                handleMerchModalOpen();
                handleClose();
                return;
            }
            case 'show' :  {
                toggleSideBar(true);
                toggleMerchantView(true);
                toggleAccountView(false);
                handleClose();
                return;
            }
        } 
    }

    return (
        <>
            <Tooltip tooltip={'Merchant Actions'}>
                <IconButton color="primary" aria-label="merchactions" size="small" className={iconClasses.root} onClick={handleClick}>
                    <StoreIcon fontSize="large" />
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
                        <ListItemText primary="Add Merchants" />
                    </MenuItem>
                    <MenuItem 
                        onClick={() => handleMenuClick('show')}
                        className={ menuClasses.root}>
                        <ListItemText primary="Show Merchants" />
                    </MenuItem>
                </Menu>
            </ThemeProvider>
        </>
    )
}
