import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import Divider from "@material-ui/core/Divider";

import IconButton from '@material-ui/core/IconButton';
import CategoryIcon from '@material-ui/icons/Category';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

//Styles
import { ThemeProvider } from '@material-ui/core/styles';
import { useDivStyles, useIconStyles } from '../../styles/menu/Menu';
import { customMUITheme } from '../../styles/common/MaterialUIThemes';

import Tooltip from '../common/Tooltip';
import Groupings from './Groupings';

import { AccountActions } from './AccountActions';
import { MerchantActions } from './MerchantActions';
import { AddTransaction } from '../transaction/AddTransaction';

import { AddAccount } from '../account/AddAccount';
import { AddMerchant } from '../merchant/AddMerchant';
import { DarkModeToggle } from './Toggle';
export const Menu = () => {

    const { handleTransModalOpen 
            ,handleTransTypeChange
            ,selectedTrans
            ,deleteTransaction
            ,selectTrans } 
            = useContext(GlobalContext);

    const divClasses = useDivStyles();
    const iconClasses = useIconStyles();

    const handleAdd = () => {
        handleTransTypeChange('Add');
        handleTransModalOpen();
    }

    const handleDelete = () => {
        deleteTransaction(selectedTrans);
        selectTrans(null)
    }

    const handleCopy = () => {
        handleTransTypeChange('Copy');
        handleTransModalOpen();
    }

    const handleEdit = () => {
        handleTransTypeChange('Edit');
        handleTransModalOpen();
    }
    
    return (
        <>
        <div className={divClasses.root}>
            <ThemeProvider theme={customMUITheme}>
                <div className={divClasses.groups}>
                    <div>
                        <AccountActions />
                        <MerchantActions />
                        <Tooltip tooltip={'Category'}>
                            <IconButton color="primary" aria-label="category" size="small" className={iconClasses.root}>
                                <CategoryIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip tooltip={'Subcategory'}>
                            <IconButton color="primary" aria-label="subcategory" size="small" className={iconClasses.root}>
                                <AccountTreeIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                        <AddAccount />
                        <AddMerchant />
                    </div>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <div>
                        <Groupings />
                        <Tooltip tooltip={'Add New Transaction'}>
                            <IconButton color="primary" aria-label="add" size="small" className={iconClasses.root} onClick={handleAdd}>
                                <LibraryAddIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip tooltip={'Copy Selected Transaction'}>
                            <IconButton color="primary" aria-label="copy" size="small" disabled={selectedTrans ? false : true} className={iconClasses.root} onClick={handleCopy}>
                                <FileCopyIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip tooltip={'Edit Selected Transaction'}>
                            <IconButton color="primary" aria-label="edit" size="small" disabled={selectedTrans ? false : true} className={iconClasses.root} onClick={handleEdit}>
                                <EditIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip tooltip={'Delete Selected Transaction'}>
                            <IconButton color="primary" aria-label="delete" size="small" disabled={selectedTrans ? false : true} className={iconClasses.root} onClick={handleDelete}>
                                <DeleteIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <Divider orientation="vertical" variant="middle" flexItem />
                </div>
                <DarkModeToggle />
            </ThemeProvider>
            <AddTransaction />
        </div>
        </>
    )
}
