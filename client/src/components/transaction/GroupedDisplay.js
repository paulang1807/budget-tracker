import React from "react";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import {
  useStyles,
  useCellStyles,
} from "../../styles/transaction/GroupedDisplay";

import { Transaction } from "./Transaction";

export const GroupedDisplay = ({
  index,
  key,
  stableSort,
  getComparator,
  order,
  orderBy,
  groupByCode,
  grpTrans,
  recurse,            // This parameter is used to differentiate between calls frm the parent and recursive calls within this component
  showRow,
}) => {

  const classes = useStyles({showRow: showRow, groupByCode: groupByCode});
  const cellClasses = useCellStyles();

  const colArrSpan=recurse? grpTrans.colArrSpan : groupByCode==='I' ? null : grpTrans.colArrSpan
  const indOpen=recurse? grpTrans.indOpen : groupByCode==='I' ? null : grpTrans.indOpen
  const setIndOpen=recurse? grpTrans.setIndOpen : groupByCode==='I' ? null : grpTrans.setIndOpen
  const colGrpSpan=recurse? grpTrans.colGrpSpan : groupByCode==='I' ? null : grpTrans.colGrpSpan
  const grpId=grpTrans.groupId 
  const blnGrpId=grpTrans[grpId] 
  const titleStr=recurse ? (groupByCode === "C" || groupByCode === "CS" ? grpTrans.category : groupByCode === "S" ? grpTrans.subCategory : grpTrans.merchant) : (groupByCode==='I' ? null : (groupByCode==='M' || groupByCode==='MC' || groupByCode==='MS' || groupByCode==='MCS') ? grpTrans.merchant : (groupByCode==='C' || groupByCode==='CS') ? grpTrans.category : groupByCode==='S' ? grpTrans.subCategory : null)
  const amount=recurse? grpTrans.amount : groupByCode==='I' ? null : grpTrans.amount 
  const tran=recurse? grpTrans.trans : groupByCode==='I' ? grpTrans : grpTrans.trans 

  const nextGroupByCode =
    groupByCode === "MCS"
      ? "CS"
      : groupByCode === "CS" || groupByCode === "MS"
      ? "S"
      : groupByCode === "MC"
      ? "C"
      : groupByCode === "M" || groupByCode === "C" || groupByCode === "S"
      ? "L1"
      : null;

  const handleExpandToggle = () => {
    setIndOpen(!indOpen);
  }

  return (
    <>
      {groupByCode === "I" ? (
        <Transaction
          key={tran._id}
          index={index}
          tran={tran}
          showRow={showRow}
        />
      ) : nextGroupByCode === "L1" ? (
        <>
          <TableRow key={key} className={classes.root}>
            <TableCell colSpan={colArrSpan} className={cellClasses.root}>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => handleExpandToggle()}
              >
                {indOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell
              align="left"
              colSpan={colGrpSpan}
              className={cellClasses.root}
            >
              {titleStr}
            </TableCell>
            <TableCell align="left" colSpan={4} className={cellClasses.root}>
              {amount}
            </TableCell>
          </TableRow>
          {stableSort(tran, getComparator(order, orderBy)).map((inc, index) => (
            <Transaction
              key={inc._id}
              index={index}
              tran={inc}
              showRow={indOpen}
            />
          ))}
        </>
      ) : nextGroupByCode ? (
        <>
          <TableRow key={key} className={classes.root}>
            <TableCell colSpan={colArrSpan} className={cellClasses.root}>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => handleExpandToggle()}
              >
                {indOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell
              align="left"
              colSpan={colGrpSpan}
              className={cellClasses.root}
            >
              {titleStr}
            </TableCell>
            <TableCell align="left" colSpan={4} className={cellClasses.root}>
              {amount}
            </TableCell>
          </TableRow>
          {stableSort(tran, getComparator(order, orderBy)).map(
            (inc1, index1) => (
              <GroupedDisplay
                key={inc1.trans._id}
                index={index1}
                stableSort={stableSort}
                getComparator={getComparator}
                order={order}
                orderBy={orderBy}
                groupByCode={nextGroupByCode}
                grpTrans={inc1} 
                recurse={true}
                showRow={indOpen}
              />
            )
          )}
        </>
      ) : null}
    </>
  );
};
