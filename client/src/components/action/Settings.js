import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CategoryIcon from '@material-ui/icons/Category';
import StoreIcon from '@material-ui/icons/Store';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import TableChartIcon from '@material-ui/icons/TableChart';

import { ThemeProvider } from '@material-ui/core/styles';

import { useStyles, useMenuStyles, useMenuActiveStyles, menuListTheme } from '../../styles/action/Settings';

import Tooltip from '../common/Tooltip';

export default function Settings() {

    const { grpbyMerch
            ,grpbyCat
            ,grpbySubcat
            ,handleGroupByMerchant
            ,handleGroupByCategory
            ,handleGroupBySubCategory  } 
            = useContext(GlobalContext);

    const [anchorEl, setAnchorEl] = useState(null);

    const classes = useStyles();
    const menuClasses = useMenuStyles();
    const menuActiveClasses = useMenuActiveStyles();

    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
    setAnchorEl(null);
    };

    return (
        <>
            <Tooltip tooltip={'Group by Merchant, Category and/or Subcategory'}>
                <Button
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    startIcon={<TableChartIcon />}
                    onClick={handleClick}
                    className={classes.button}
                    >
                    GroupBy
                </Button>
            </Tooltip>
            <ThemeProvider theme={menuListTheme}>
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
                        onClick={handleGroupByMerchant}
                        className={grpbyMerch ? menuActiveClasses.root : menuClasses.root}>
                        <ListItemIcon className={menuClasses.root}>
                            <StoreIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Merchants" />
                    </MenuItem>
                    <MenuItem 
                        onClick={handleGroupByCategory}
                        className={grpbyCat ? menuActiveClasses.root : menuClasses.root}>
                        <ListItemIcon className={menuClasses.root}>
                            <CategoryIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Categories" />
                    </MenuItem>
                    <MenuItem 
                        onClick={handleGroupBySubCategory}
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
