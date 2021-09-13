import React from 'react';

import { Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

import { ThemeProvider } from '@material-ui/core/styles';

import { useStyles, btnTheme } from '../../styles/action/Actions';

import Settings from './Settings';


export const Actions = () => {


    const classes = useStyles();

    return (
        <>
            <Settings />
            <ThemeProvider theme={btnTheme}>
                <Button
                    variant="contained"
                    className={classes.button}
                    startIcon={<LibraryAddIcon />}
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
        </>
    )
}
