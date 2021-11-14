import React,{ useContext, useEffect } from "react";
import { GlobalContext } from '../../context/GlobalState';

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
  type,    // Type of group - income, expense or transfer
  groupByCode,
  grpTrans,
  recurse,            // This parameter is used to differentiate between calls frm the parent and recursive calls within this component
  showRow,   
}) => {
  const classes = useStyles({showRow: showRow, groupByCode: groupByCode});
  const cellClasses = useCellStyles();

  const { 
    // Object with groupIds and toggle boolean for the items that are clicked for expand/collapse
    // format -> {groupId1: {groupId1: toggle_boolean1}...}
    clickedIds   
    // function for modifying clickedIds
    // Reducer: ActionReducer   
    ,handleClicked
    // function for clearing clickedIds
    // This is called whenever the grouping changes
    // Reducer: ActionReducer
    ,clearClicked
    ,currGroupByCode } 
    = useContext(GlobalContext);

  const colArrSpan=recurse? grpTrans.colArrSpan : groupByCode==='I' ? null : grpTrans.colArrSpan
  const colGrpSpan=recurse? grpTrans.colGrpSpan : groupByCode==='I' ? null : grpTrans.colGrpSpan
  const grpId=grpTrans.groupId 
  // Array containing group ids of child elements
  const childGroupIds=grpTrans.childGroupIds
  const titleStr=recurse ? (groupByCode === "C" || groupByCode === "CS" ? grpTrans.category : groupByCode === "S" ? grpTrans.subCategory : grpTrans.merchant) : (groupByCode==='I' ? null : (groupByCode==='M' || groupByCode==='MC' || groupByCode==='MS' || groupByCode==='MCS') ? grpTrans.merchant : (groupByCode==='C' || groupByCode==='CS') ? grpTrans.category : groupByCode==='S' ? grpTrans.subCategory : null)
  const amount=recurse? grpTrans.amount : groupByCode==='I' ? null : grpTrans.amount 
  const tran=recurse? grpTrans.trans : groupByCode==='I' ? grpTrans : grpTrans.trans 

  // Temporary vars for storing the group ids and toggle boolean for the clicked row groups
  let clickedGrpIdAndBool={};
  let arrClickedGrpIdAndBool = [];

  // If group code is different from previous group code, clear clicked id array
  useEffect(() => {
    if (groupByCode !== currGroupByCode) {
      clearClicked()
    }
  },[currGroupByCode])

  // Set the toggle boolean for the groups based on the values in clickedIds
  if(grpId in clickedIds){
    const clickedIdGrp = clickedIds[grpId]
    grpTrans[grpId] = clickedIdGrp[grpId]
  }

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
    // Toggle show hide boolean and add to array
    clickedGrpIdAndBool[grpId] = !grpTrans[grpId]
    clickedGrpIdAndBool['type'] = type
    arrClickedGrpIdAndBool.push(clickedGrpIdAndBool)
    // If parent row toggle set to false (hide row), set the toggle for all the corresponding child rows to false as well
    if (!clickedGrpIdAndBool[grpId]){
      childGroupIds.map(id => {
        clickedGrpIdAndBool = {}
        clickedGrpIdAndBool[id] = false
        clickedGrpIdAndBool['type'] = type
        arrClickedGrpIdAndBool.push(clickedGrpIdAndBool)
      }) 
    }
    handleClicked(arrClickedGrpIdAndBool)
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
                {grpTrans[grpId] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
              showRow={grpTrans[grpId]}
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
                { grpTrans[grpId] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> }
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
                type={type}
                groupByCode={nextGroupByCode}
                grpTrans={inc1} 
                recurse={true}
                showRow={grpTrans[grpId]}
              />
            )
          )}
        </>
      ) : null}
    </>
  );
};
