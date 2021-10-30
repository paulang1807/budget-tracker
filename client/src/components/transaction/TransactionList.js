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
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { ThemeProvider } from '@material-ui/core/styles';

import { useStyles, 
          useCustomTableHeadStyles,
          useCustomIncHeadStyles,
          useCustomExpHeadStyles,
          useCustomTransHeadStyles,
          arrowIconTheme
        } from '../../styles/transaction/TransactionList';

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
        <TableCell
          padding="checkbox"
          className={customClasses.root}
        ></TableCell>
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

  const { getMerchants
          ,transactions
          ,getTransactions
          ,accountView
          ,selectTrans
          ,selectedAccount
          ,selRangeStart
          ,selRangeEnd } 
          = useContext(GlobalContext);

  // Variable to control the expansion and collapse of grouped rows at top level
  const [incOpen, setIncOpen] = useState(false);
  const [expOpen, setExpOpen] = useState(false);
  const [transOpen, setTransOpen] = useState(false);
  
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('transactionName');

  useEffect(() => {
      getTransactions();
      getMerchants();
      // To silence the default warnings, use
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Collapse groups
    setIncOpen(false);
    setExpOpen(false);
    setTransOpen(false);
    // Disable action buttons
    selectTrans(null);
  }, [accountView, selectedAccount])

  const classes = useStyles();
  const tblHeadClasses = useCustomTableHeadStyles();
  const tblIncClasses = useCustomIncHeadStyles();
  const tblExpClasses = useCustomExpHeadStyles();
  const tblTransClasses = useCustomTransHeadStyles();

  const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
  };

  const rangeStart = Date.parse(selRangeStart) < Date.parse(selRangeEnd) ? selRangeStart : selRangeEnd
  const rangeSEnd = Date.parse(selRangeEnd) > Date.parse(selRangeStart) ? selRangeEnd : selRangeStart

  console.log("DATES: ", rangeStart, rangeSEnd)
  
  // If any account is selected, show transaction only for selected account
  const filteredTransactions = (selectedAccount  && accountView)? 
                                (transactions.filter(transaction => transaction.accountId===selectedAccount 
                                && Date.parse(transaction.transactionDate) >= Date.parse(rangeStart)
                                && Date.parse(transaction.transactionDate) <= Date.parse(rangeSEnd))) : 
                                (transactions.filter(transaction => Date.parse(transaction.transactionDate) >= Date.parse(rangeStart)
                                && Date.parse(transaction.transactionDate) <= Date.parse(rangeSEnd)));

  // Separate out transactions based on type
  const incomes = filteredTransactions.filter(
    (transaction) => transaction.type === "income"
  );
  const expenses = filteredTransactions.filter(
    (transaction) => transaction.type === "expense"
  );
  const transfers = filteredTransactions.filter(
    (transaction) => transaction.type === "transfer"
  );

  // Calculate totals for each transaction type
  const totalIncome = incomes
    .reduce((acc, item) => (acc += item.amount), 0)
    .toFixed(2);
  const totalExpenses = expenses
    .reduce((acc, item) => (acc += item.amount), 0)
    .toFixed(2);
  const totalTransfers = transfers
    .reduce((acc, item) => (acc += item.amount), 0)
    .toFixed(2);

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
              {/* Income Grouping */}
              {/* Income Header */}
              <TableRow className={tblIncClasses.tableRow}>
                <ThemeProvider theme={arrowIconTheme}>
                  <TableCell className={tblIncClasses.root}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setIncOpen(!incOpen)}>
                      {incOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                </ThemeProvider>
                <TableCell align="left" colSpan={5}  className={tblIncClasses.root}>Incomes</TableCell>
                <TableCell align="left" colSpan={4}  className={tblIncClasses.root}>{totalIncome}</TableCell>
              </TableRow>
              {/* Income Body */}
              {stableSort(incomes, getComparator(order, orderBy))
                  .map((inc, index) => (
                  <Transaction key={inc._id} index={index} tran={inc} showRow={incOpen}/>
              ))}
              {/* Expense Grouping */}
              {/* Expense Header */}
              <TableRow>
                <ThemeProvider theme={arrowIconTheme}>
                  <TableCell className={tblExpClasses.root}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setExpOpen(!expOpen)}>
                      {expOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                </ThemeProvider>
                <TableCell align="left" colSpan={5}  className={tblExpClasses.root}>Expenses</TableCell>
                <TableCell align="left" colSpan={4}  className={tblExpClasses.root}>{totalExpenses}</TableCell>
              </TableRow>
              {/* Expense Body */}
              {stableSort(expenses, getComparator(order, orderBy))
                  .map((exp, index) => (
                  <Transaction key={exp._id} index={index} tran={exp} showRow={expOpen}/>
              ))}
              {/* Transfer Grouping */}
              {/* Transfer Header */}
              <TableRow>
                <ThemeProvider theme={arrowIconTheme}>
                  <TableCell className={tblTransClasses.root}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setTransOpen(!transOpen)}>
                      {transOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                </ThemeProvider>
                <TableCell align="left" colSpan={5}  className={tblTransClasses.root}>Transfers</TableCell>
                <TableCell align="left" colSpan={4}  className={tblTransClasses.root}>{totalTransfers}</TableCell>
              </TableRow>
              {/* Transfer Body */}
              {stableSort(transfers, getComparator(order, orderBy))
                  .map((xfer, index) => (
                  <Transaction key={xfer._id} index={index} tran={xfer} showRow={transOpen}/>
              ))}
              </TableBody>


          </Table>
          </TableContainer>
      </Paper>
      </div>
  );
}
