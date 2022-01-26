import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CategoryIcon from '@material-ui/icons/Category';
import StoreIcon from '@material-ui/icons/Store';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import TableChartIcon from '@material-ui/icons/TableChart';

//Styles
import { ThemeProvider } from '@material-ui/core/styles';
import { useMenuStyles, useMenuActiveStyles } from '../../styles/menu/Groupings';
import { useIconStyles } from '../../styles/menu/Menu';
import { customMUITheme } from '../../styles/common/MaterialUIThemes';

import Tooltip from '../common/Tooltip';

export default function Groupings() {

    const { grpbyMerch
            ,grpbyCat
            ,grpbySubcat
            ,handleGroupByMerchant
            ,handleGroupByCategory
            ,handleGroupBySubCategory } 
            = useContext(GlobalContext);

    const iconClasses = useIconStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const menuClasses = useMenuStyles();
    const menuActiveClasses = useMenuActiveStyles();

    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
    setAnchorEl(null);
    };

    const handleMenuClick = (typ) => {
        switch(typ) {
            case 'merchant' :  {
                handleGroupByMerchant();
                handleClose();
                return;
            }
            case 'category' :  {
                handleGroupByCategory();
                handleClose();
                return;
            }
            case 'subcategory' :  {
                handleGroupBySubCategory();
                handleClose();
                return;
            }
        } 
    }

    return (
        <>
            <Tooltip tooltip={'Group by Merchant, Category and/or Subcategory'}>
                <IconButton color="primary" aria-label="groupby" size="small" className={iconClasses.root} onClick={handleClick}>
                    <TableChartIcon fontSize="large" />
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
                        onClick={() => handleMenuClick('merchant')}
                        className={grpbyMerch ? menuActiveClasses.root : menuClasses.root}>
                        <ListItemIcon className={menuClasses.root}>
                            <StoreIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Merchants" />
                    </MenuItem>
                    <MenuItem 
                        onClick={() => handleMenuClick('category')}
                        className={grpbyCat ? menuActiveClasses.root : menuClasses.root}>
                        <ListItemIcon className={menuClasses.root}>
                            <CategoryIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Categories" />
                    </MenuItem>
                    <MenuItem 
                        onClick={() => handleMenuClick('subcategory')}
                        className={grpbySubcat ? menuActiveClasses.root : menuClasses.root}>
                        <ListItemIcon className={menuClasses.root}>
                            <AccountTreeIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="SubCategories" />
                    </MenuItem>
                </Menu>
            </ThemeProvider>
        </>
    )
}
