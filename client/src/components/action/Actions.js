import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import { Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

import { ThemeProvider } from '@material-ui/core/styles';

import { useStyles, btnTheme } from '../../styles/action/Actions';

import Settings from './Settings';
import { AddTransaction } from '../transaction/AddTransaction';


export const Actions = () => {

    const { handleTransModalOpen 
            ,handleTransTypeChange} 
            = useContext(GlobalContext);

    const classes = useStyles();

    const handleAdd = () => {
        handleTransTypeChange('Add');
        handleTransModalOpen();
    }

    return (
        <>
            <Settings />
            <ThemeProvider theme={btnTheme}>
                <Button
                    variant="contained"
                    className={classes.button}
                    startIcon={<LibraryAddIcon />}
                    onClick={handleAdd}
                >
                    Add
                </Button>
                <Button
                    variant="contained"
                    className={classes.button}
                    startIcon={<FileCopyIcon />}
                >
                    Copy
                </Button>
                <Button
                    variant="contained"
                    className={classes.button}
                    startIcon={<EditIcon />}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
            </ThemeProvider>
            <AddTransaction />
        </>
    )
}
