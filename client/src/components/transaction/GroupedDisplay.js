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
  colArrSpan,
  indOpen,
  setIndOpen,
  colGrpSpan,
  titleStr,
  amount,
  tran,
  showRow,
}) => {

  const classes = useStyles({showRow: showRow, groupByCode: groupByCode});
  const cellClasses = useCellStyles();

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
                onClick={() => setIndOpen(!indOpen)}
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
                onClick={() => setIndOpen(!indOpen)}
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
                colArrSpan={inc1.colArrSpan}
                indOpen={inc1.indOpen}
                setIndOpen={inc1.setIndOpen}
                colGrpSpan={inc1.colGrpSpan}
                titleStr={
                  nextGroupByCode === "C" || nextGroupByCode === "CS"
                    ? inc1.category
                    : nextGroupByCode === "S"
                    ? inc1.subCategory
                    : inc1.merchant
                }
                amount={inc1.amount}
                tran={inc1.trans}
                showRow={indOpen}
              />
            )
          )}
        </>
      ) : null}
    </>
  );
};
