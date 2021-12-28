import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import { Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

//Styles
import { ThemeProvider } from '@material-ui/core/styles';
import { useStyles } from '../../styles/action/Actions';
import { customMUITheme } from '../../styles/common/MaterialUIThemes';

import Tooltip from '../common/Tooltip';

import Settings from './Settings';
import { AddTransaction } from '../transaction/AddTransaction';


export const Actions = () => {

    const { handleTransModalOpen 
            ,handleTransTypeChange
            ,selectedTrans
            ,deleteTransaction
            ,selectTrans } 
            = useContext(GlobalContext);

    const classes = useStyles();

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
            <Settings />
            <ThemeProvider theme={customMUITheme}>
                <Tooltip tooltip={'Add New Transaction'}>
                    <Button
                        variant="contained"
                        className={classes.button}
                        startIcon={<LibraryAddIcon />}
                        onClick={handleAdd}
                    >
                        Add
                    </Button>
                </Tooltip>
                <Tooltip tooltip={'Copy Selected Transaction'}>
                    <Button
                        variant="contained"
                        className={classes.button}
                        disabled={selectedTrans ? false : true}
                        startIcon={<FileCopyIcon />}
                        onClick={handleCopy}
                    >
                        Copy
                    </Button>
                </Tooltip>
                <Tooltip tooltip={'Edit Selected Transaction'}>
                    <Button
                        variant="contained"
                        className={classes.button}
                        disabled={selectedTrans ? false : true}
                        startIcon={<EditIcon />}
                        onClick={handleEdit}
                    >
                        Edit
                    </Button>
                </Tooltip>
                <Tooltip tooltip={'Delete Selected Transaction'}>
                    <Button
                        variant="contained"
                        className={classes.button}
                        disabled={selectedTrans ? false : true}
                        startIcon={<DeleteIcon />}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Tooltip>
            </ThemeProvider>
            <AddTransaction />
        </>
    )
}
