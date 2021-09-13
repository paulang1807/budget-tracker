import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

import { useStyles, useCustomTableHeadStyles } from '../../styles/transaction/TransactionList';

import { Transaction } from './Transaction';

// Helper functions for sorting
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// Enhanced Table Header
const headCells = [
  { id: 'transactionName', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'account', numeric: false, disablePadding: false, label: 'Account' },
  { id: 'merchant', numeric: false, disablePadding: false, label: 'Merchant' },
  { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
  { id: 'subCategory', numeric: false, disablePadding: false, label: 'Subcategory' },
  { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
  { id: 'transactionDate', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'notes', numeric: false, disablePadding: false, label: 'Notes' },
];

const EnhancedTableHead = (props) => {
  const { classes, customClasses, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={customClasses.root}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  customClasses: PropTypes.object,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};


export const TransactionList = () => {

    const { getMerchants, transactions, getTransactions } = useContext(GlobalContext);
    
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('transactionName');

    useEffect(() => {
        getTransactions();
        getMerchants();
        // To silence the default warnings, use
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const classes = useStyles();
    const tblHeadClasses = useCustomTableHeadStyles();

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <div className={classes.root}>
        <Paper className={classes.paper}>
            <TableContainer>
            <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size='small'
                aria-label="enhanced table"
            >
                <EnhancedTableHead
                classes={classes}
                customClasses={tblHeadClasses}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                />
                <TableBody>
                {stableSort(transactions, getComparator(order, orderBy))
                    .map((inc, index) => (
                    <Transaction key={inc._id} index={index} tran={inc}/>
                ))}
                </TableBody>


            </Table>
            </TableContainer>
        </Paper>
        </div>
    );
    }
