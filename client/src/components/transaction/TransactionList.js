import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import PropTypes from 'prop-types';
import _ from 'lodash';

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

import { GroupedDisplay } from "./GroupedDisplay";

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
          ,merchants
          ,transactions
          ,getTransactions
          ,accountView
          ,selectTrans
          ,selectedAccount
          ,selRangeStart
          ,selRangeEnd
          ,grpbyMerch
          ,grpbyCat
          ,grpbySubcat } 
          = useContext(GlobalContext);

  // Variable to control the expansion and collapse of grouped rows at top level
  const [incOpen, setIncOpen] = useState(false);
  const [expOpen, setExpOpen] = useState(false);
  const [transOpen, setTransOpen] = useState(false);

  // Variable to control the expansion and collapse of rows grouped by merchant
  const [incMOpen, setIncMOpen] = useState(false);
  const [expMOpen, setExpMOpen] = useState(false);
  const [transMOpen, setTransMOpen] = useState(false);
  // Variable to control the expansion and collapse of rows grouped by category
  const [incCOpen, setIncCOpen] = useState(false);
  const [expCOpen, setExpCOpen] = useState(false);
  const [transCOpen, setTransCOpen] = useState(false);
  // Variable to control the expansion and collapse of rows grouped by subcategory
  const [incSOpen, setIncSOpen] = useState(false);
  const [expSOpen, setExpSOpen] = useState(false);
  const [transSOpen, setTransSOpen] = useState(false);
  
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
  }, [accountView, selectedAccount])

  useEffect(() => {
    // Disable action buttons
    selectTrans(null);
    // Collapse income groups
    setIncMOpen(false);
    setIncCOpen(false);
    setIncSOpen(false);
  }, [selectedAccount, accountView, grpbyMerch , grpbyCat, grpbySubcat])

  useEffect(() => {
    if(!incOpen){
      setIncMOpen(false);
      setIncCOpen(false);
      setIncSOpen(false);
    }
    if(!expOpen){
      setExpMOpen(false);
      setExpCOpen(false);
      setExpSOpen(false);
    }
    if(!transOpen){
      setTransMOpen(false);
      setTransCOpen(false);
      setTransSOpen(false);
    }
    if(grpbyMerch && !incMOpen){
      setIncCOpen(false);
      setIncSOpen(false);
    }
    if(grpbyMerch && !expMOpen){
      setExpCOpen(false);
      setExpSOpen(false);
    }
    if(grpbyMerch && !transMOpen){
      setTransCOpen(false);
      setTransSOpen(false);
    }
    if(grpbyCat && !incCOpen){
      setIncSOpen(false);
    }
    if(grpbyCat && !expCOpen){
      setExpSOpen(false);
    }
    if(grpbyCat && !transCOpen){
      setTransSOpen(false);
    }
  }, [incOpen, expOpen, transOpen, incMOpen, expMOpen, transMOpen, incCOpen, expCOpen, transCOpen, incSOpen, expSOpen, transSOpen])

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

  // Group transactions
  let groupByMerchants=[];
  let groupByCategory=[];
  let groupBySubcategory=[];
  let groupedTransactions=[];
  let groupByCode = '';
  const groupTransactions = (inpTransactions) => {
    if(grpbyMerch){
      groupByMerchants = _.groupBy(inpTransactions, n => {
        return n.merchantId;
      });
      if(grpbyCat){ 
        groupByCategory = _.forEach(groupByMerchants, (value, key) => {
          groupByMerchants[key] = _.groupBy(groupByMerchants[key], n => {
          return n.category;
          });
        });
        if(grpbySubcat){
          groupBySubcategory = _.forEach(groupByCategory, (value, key) => {
            _.forEach(value, (value1, key1) => {
            value[key1] = _.groupBy(value[key1], n => {
            return n.subCategory;
            });
          })
          });
          groupByCode = 'MCS';
        } else {
          groupBySubcategory = groupByCategory;
          groupByCode = 'MC';
        }
      } else {
        if(grpbySubcat){
          groupBySubcategory = _.forEach(groupByMerchants, (value, key) => {
            groupByMerchants[key] = _.groupBy(groupByMerchants[key], n => {
            return n.subCategory;
            });
          });
          groupByCode = 'MS';
        } else {
          groupBySubcategory = groupByMerchants;
          groupByCode = 'M';
        }
      }
    } else {
      if(grpbyCat){ 
        groupByCategory = _.groupBy(inpTransactions, n => {
          return n.category;
        });
        if(grpbySubcat){
          groupBySubcategory = _.forEach(groupByCategory, (value, key) => {
            groupByCategory[key] = _.groupBy(groupByCategory[key], n => {
            return n.subCategory;
            });
          });
          groupByCode = 'CS';
        } else {
          groupBySubcategory = groupByCategory;
          groupByCode = 'C';
        }
      } else {
        if(grpbySubcat){
          groupBySubcategory = _.groupBy(inpTransactions, n => {
            return n.subCategory;
          });
          groupByCode = 'S';
        } else {
          groupBySubcategory = inpTransactions;
          groupByCode = 'I';
        }
      }
    }
    
    groupedTransactions = groupBySubcategory
  }

  // Grouping column spans and indicators
  const getGroupParams = (cd, type,) => {
    let colArrSpan = 0;
    let colGrpSpan = 0;
    let indOpen;
    let setIndOpen;
    if(cd==='M'){
      colArrSpan = 3;
      colGrpSpan = 3;
      indOpen = type==='income' ? incMOpen : type==='expenses' ? expMOpen : transMOpen;
      setIndOpen = type==='income' ? setIncMOpen : type==='expenses' ? setExpMOpen : setTransMOpen;
    } else if (cd==='C'){
      colArrSpan = 4;
      colGrpSpan = 2;
      indOpen = type==='income' ? incCOpen : type==='expenses' ? expCOpen : transCOpen;
      setIndOpen = type==='income' ? setIncCOpen : type==='expenses' ? setExpCOpen : setTransCOpen;
    }  else if (cd==='S'){
      colArrSpan = 5;
      colGrpSpan = 1;
      indOpen = type==='income' ? incSOpen : type==='expenses' ? expSOpen : transSOpen;
      setIndOpen = type==='income' ? setIncSOpen : type==='expenses' ? setExpSOpen : setTransSOpen;
    } 
    return [colArrSpan, colGrpSpan, indOpen, setIndOpen];
  }

  let groupedTrans, groupedTransL2, groupedTransL3;

  // Helper function for adding transactions to array
  const addTransactionsToArray = (pGroupedTrans, pType, pTmpTrans, pGroupByStrKey, pGroupByStr, pAmt, pGrpParms, pArrTrans) => {
    pTmpTrans = {"groupId":pGroupByStrKey, "amount": pAmt, "colArrSpan": pGrpParms[0], "colGrpSpan": pGrpParms[1], "indOpen": pGrpParms[2], "setIndOpen": pGrpParms[3], "trans": pArrTrans};
    pTmpTrans[pGroupByStrKey] = false;
    pTmpTrans[pType] = pGroupByStr;
    pGroupedTrans.push(pTmpTrans)

    return pGroupedTrans;
  }

  // Add additional attributes, aggregates and styling details to grouped data
  const GroupedRow = (type) => {
    groupedTrans = [];
    let amt = 0;
    let amtL2 = 0;
    let amtL3 = 0;
    let groupArrMatch = [];
    let groupByStr = '';
    let groupByStrL2 = '';
    let groupByStrL3 = '';
    let groupByStrKey = '';
    let groupByStrKeyL2 = '';
    let groupByStrKeyL3 = '';
    let groupByStrKeyTmp = '';
    let grpParms = [];
    let tmpTrans = {};
  
    if(groupByCode==='M' || groupByCode==='C' || groupByCode==='S'){
      grpParms = getGroupParams(groupByCode, type);
    _.forEach(groupedTransactions, (value, key) => {
      groupByStr = key;
      groupByStrKey = key.replace(/\s+/g, '').toLowerCase();
      amt = _.sum(_.map(value, (t) => t.amount));
      if(groupByCode==='M'){
        groupArrMatch = merchants.filter((merch) => merch._id===key)[0];
        groupByStr = groupArrMatch && groupArrMatch.merchantName;
        groupByStrKey = groupByStr.replace(/\s+/g, '').toLowerCase();
        groupedTrans = addTransactionsToArray(groupedTrans, "merchant", tmpTrans, groupByStrKey, groupByStr, amt, grpParms, value)
      } else if(groupByCode==='C'){
        groupedTrans = addTransactionsToArray(groupedTrans, "category", tmpTrans, groupByStrKey, groupByStr, amt, grpParms, value)
      } else if(groupByCode==='S'){
        groupedTrans = addTransactionsToArray(groupedTrans, "subCategory", tmpTrans, groupByStrKey, groupByStr, amt, grpParms, value)
      } 
    })
  } else if(groupByCode==='MC' || groupByCode==='MS' || groupByCode==='CS'){
    _.forEach(groupedTransactions, (value, key) => {
      amt = 0;
      groupedTransL2 = [];
      if(groupByCode==='MC' || groupByCode==='MS'){
        groupArrMatch = merchants.filter((merch) => merch._id===key)[0];
        groupByStrKeyTmp = groupArrMatch && groupArrMatch.merchantName;
        groupByStr = groupByStrKeyTmp
        groupByStrKey = groupByStr.replace(/\s+/g, '').toLowerCase();
      } else if(groupByCode==='CS'){
        groupByStr = key
        groupByStrKey = key.replace(/\s+/g, '').toLowerCase(); 
      }
      _.forEach(value, (value1, key1) => {
      // amtL2 = 0;
      groupByStrL2 = key1;
      groupByStrKeyL2 = groupByStrKey + groupByStrL2.replace(/\s+/g, '').toLowerCase();
      amtL2 = _.sum(_.map(value1, (t) => t.amount));    
      amt += amtL2;
      if(groupByCode==='CS' || groupByCode==='MS'){
        grpParms = getGroupParams('S', type);
        groupedTransL2 = addTransactionsToArray(groupedTransL2, "subCategory", tmpTrans, groupByStrKeyL2, groupByStrL2, amtL2, grpParms, value1)
      } else if(groupByCode==='MC'){
        grpParms = getGroupParams('C', type);
        groupedTransL2 = addTransactionsToArray(groupedTransL2, "category", tmpTrans, groupByStrKeyL2, groupByStrL2, amtL2, grpParms, value1)
      } 
      })
      if(groupByCode==='MC' || groupByCode==='MS'){
        grpParms = getGroupParams('M', type);
        groupedTrans = addTransactionsToArray(groupedTrans, "merchant", tmpTrans, groupByStrKey, groupByStr, amt, grpParms, groupedTransL2)
      } else if(groupByCode==='CS'){
        grpParms = getGroupParams('C', type);
        groupedTrans = addTransactionsToArray(groupedTrans, "category", tmpTrans, groupByStrKey, groupByStr, amt, grpParms, groupedTransL2)
      }
    })
  } else if(groupByCode==='MCS') {
    _.forEach(groupedTransactions, (value, key) => {
      amt = 0;
      groupedTransL2 = [];  
      groupArrMatch = merchants.filter((merch) => merch._id===key)[0];
      groupByStrKeyTmp = groupArrMatch && groupArrMatch.merchantName;  
      groupByStr = groupByStrKeyTmp
      groupByStrKey = groupByStr.replace(/\s+/g, '').toLowerCase();
      _.forEach(value, (value1, key1) => {
        amtL2 = 0;
        groupedTransL3 = [];
        groupByStrL2 = key1;
        groupByStrKeyL2 = groupByStrKey + key1.replace(/\s+/g, '').toLowerCase(); 
        _.forEach(value1, (value2, key2) => {
          groupByStrL3 = key2;
          groupByStrKeyL3 = groupByStrKeyL2 + groupByStrL3.replace(/\s+/g, '').toLowerCase();
          amtL3 = _.sum(_.map(value2, (t) => t.amount));
          amtL2 += amtL3;
          grpParms = getGroupParams('S', type);
          groupedTransL3 = addTransactionsToArray(groupedTransL3, "subCategory", tmpTrans, groupByStrKeyL3, groupByStrL3, amtL3, grpParms, value2)
        })
        grpParms = getGroupParams('C', type);
        groupedTransL2 = addTransactionsToArray(groupedTransL2, "category", tmpTrans, groupByStrKeyL2, groupByStrL2, amtL2, grpParms, groupedTransL3)
        amt += amtL2;
      })
      grpParms = getGroupParams('M', type);
      groupedTrans = addTransactionsToArray(groupedTrans, "merchant", tmpTrans, groupByStrKey, groupByStr, amt, grpParms, groupedTransL2)
    
    })
  } else {
    groupedTrans = groupedTransactions
  }
  console.log("GROUPED TRANS: ", groupedTrans)
  }

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
              <TableRow>
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
              {/* Group income rows */}
              {groupTransactions(incomes)}
              {GroupedRow("income")}
              {/* Income Body */}
              {stableSort(groupedTrans, getComparator(order, orderBy))
                .map((inc, index) => (
              <GroupedDisplay index={index} key={groupByCode==='I' ? inc._id : inc.trans._id} stableSort={stableSort} getComparator={getComparator} order={order} orderBy={orderBy} groupByCode={groupByCode} grpTrans={inc} recurse={false} showRow={incOpen}/> 
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
              {/* Group expense rows */}
              {groupTransactions(expenses)}
              {GroupedRow('expenses')}
              {/* Expense Body */}
              {stableSort(groupedTrans, getComparator(order, orderBy))
                .map((exp, index) => (
              <GroupedDisplay index={index} key={groupByCode==='I' ? exp._id : exp.trans._id} stableSort={stableSort} getComparator={getComparator} order={order} orderBy={orderBy} groupByCode={groupByCode} grpTrans={exp} recurse={false} showRow={expOpen}/> 
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
              {/* Group transfer rows */}
              {groupTransactions(transfers)}
              {GroupedRow('transfers')}
              {/* Transfer Body */}
              {stableSort(groupedTrans, getComparator(order, orderBy))
                .map((xfer, index) => (
              <GroupedDisplay index={index} key={groupByCode==='I' ? xfer._id : xfer.trans._id} stableSort={stableSort} getComparator={getComparator} order={order} orderBy={orderBy} groupByCode={groupByCode} grpTrans={xfer} recurse={false} showRow={transOpen}/> 
              ))}
              </TableBody>
          </Table>
          </TableContainer>
      </Paper>
      </div>
  );
}
