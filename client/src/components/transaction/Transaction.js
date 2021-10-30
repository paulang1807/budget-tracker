import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { numberWithCommas } from '../../utils/format';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { useStyles, useCellStyles } from '../../styles/transaction/Transaction';

let transYear = '';
let transMonth = '';
let transDay = '';
export const Transaction = ({index, tran, showRow}) => {

    const classes = useStyles(showRow);
    const cellClasses = useCellStyles();

    const { merchants
            ,accounts
            ,selectTrans
            ,selectedTrans,  } 
            = useContext(GlobalContext);

    let account = accounts.filter((acct) => acct._id===tran.accountId)[0]
    let merchant = merchants.filter((merch) => merch._id===tran.merchantId)[0]
    let acctName = account && account.accountName
    let merchName = merchant && merchant.merchantName

    const isSelected = (id) => selectedTrans === id;

    const isItemSelected = isSelected(tran._id);
    const labelId = `enhanced-table-checkbox-${index}`;

    const handleClick = (event, id) => {
        selectTrans(id)
    };

    transYear = new Date(tran.transactionDate).getFullYear();
    transMonth = new Date(tran.transactionDate).getMonth();
    transDay = new Date(tran.transactionDate).getDate();
    let formattedDate = transYear + '-' +  String(transMonth + 1).padStart(2, '0') + '-' +  String(transDay).padStart(2, '0')

    return (
    <TableRow
        hover
        onClick={(event) => handleClick(event, tran._id)}
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={tran._id}
        selected={isItemSelected}
        className={classes.root}
    >
        <TableCell padding="checkbox" className={cellClasses.root}></TableCell>
        <TableCell component="th" id={labelId} scope="row" className={cellClasses.root}>
        {tran.transactionName}
        </TableCell>
        <TableCell align="left" className={cellClasses.root}>{acctName}</TableCell>
        <TableCell align="left" className={cellClasses.root}>{merchName}</TableCell>
        <TableCell align="left" className={cellClasses.root}>{tran.category}</TableCell>
        <TableCell align="left" className={cellClasses.root}>{tran.subCategory}</TableCell>
        <TableCell align="left" className={cellClasses.root}>{numberWithCommas(Math.abs(tran.amount))}</TableCell>
        <TableCell align="left" className={cellClasses.root}>{formattedDate}</TableCell>
        <TableCell align="left" className={cellClasses.root}>{tran.description}</TableCell>
        <TableCell align="left" className={cellClasses.root}>{tran.notes}</TableCell>
    </TableRow>);
}
