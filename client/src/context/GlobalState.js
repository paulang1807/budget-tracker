import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import AcctReducer from './AcctReducer';
import MerchantReducer from './MerchantReducer';
import AlertsReducer from './AlertsReducer';

import DateSelectReducer from './DateSelectReducer';
import ActionsReducer from './ActionsReducer';

import axios from 'axios';

const yearDefault = new Date().getFullYear()
const monthDefault = new Date().getMonth()
const dateDefault = new Date().getDate()
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Initial State
const initialState = {
    transactions: [],
    merchants: [],
    error: null,
    loading: true,
    // Account states
    accounts: [],
    accountView: true,
    selectedAccount: null,
    // Date states
    monthNames: monthNames,
    displayDate: monthNames[monthDefault] + ' ' + yearDefault,
    selYear: yearDefault,
    selMonth: monthDefault,
    selEndYear: monthDefault + 1 === 12 ? yearDefault + 1 : yearDefault,
    selEndMonth: monthDefault + 1 === 12 ? 0 : monthDefault + 1,
    selYearPrev: null,
    selMonthPrev: null,
    dtToday: yearDefault + String(monthDefault + 1).padStart(2, '0') + String(dateDefault).padStart(2, '0'),
    selDate: yearDefault + String(monthDefault + 1).padStart(2, '0') + String(dateDefault).padStart(2, '0'),
    selEndDate: null,
    selRangeStart: yearDefault + '-' + String(monthDefault + 1).padStart(2, '0') + '-01',
    selRangeEnd: yearDefault + '-' +  String(monthDefault + 1).padStart(2, '0') + '-' +  String(new Date(yearDefault, monthDefault, 0).getDate()).padStart(2, '0'),
    selRangeStartPrev: null,
    selRangeEndPrev:null,
    dateRange: false,
    openDateModal: false,
    // Transaction states
    openTransModal: false,
    selectedTrans: null,
    // Alert states
    openAlert: false,
    alertContent: '',
    // Action states
    transType: '',
}

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const [acctState, acctDispatch] = useReducer(AcctReducer, initialState);
    const [merchantState, merchantDispatch] = useReducer(MerchantReducer, initialState);
    const [dateState, dateDispatch] = useReducer(DateSelectReducer, initialState);
    const [actionsState, actionsDispatch] = useReducer(ActionsReducer, initialState);
    const [alertsState, alertsDispatch] = useReducer(AlertsReducer, initialState);

    // Actions - Transactions
    async function getTransactions() {
        try {
            const res = await axios.get('/api/v1/transactions');
            dispatch({
                type: 'GET_TRANS',
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: 'TRANS_ERR',
                payload: err.response.data.error
            })
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`/api/v1/transactions/${id}`);

            dispatch({
                type: 'DELETE_TRANS',
                payload: id
            });
        } catch (err) {
            dispatch({
                type: 'TRANS_ERR',
                payload: err.response.data.error
            })
        }
    }

    async function addTransaction(transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('api/v1/transactions', transaction, config);

            dispatch({
                type: 'ADD_TRANS',
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: 'TRANS_ERR',
                payload: err.response.data.error
            })
        }
    }

    async function updateTransaction(transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            await axios.put(`/api/v1/transactions`, transaction, config);
            dispatch({
                type: 'UPDATE_TRANS',
                payload: transaction
            });
        } catch (err) {
            dispatch({
                type: 'TRANS_ERR',
                payload: err.response.data.error
            })
        }
    }

    function selectTrans(transId) {
        dispatch({
            type: 'SEL_TRANS',
            payload: transId
        })
    }

    // Actions - Accounts
    async function getAccounts() {
        try {
            const res = await axios.get('/api/v1/accounts');
            acctDispatch({
                type: 'GET_ACCTS',
                payload: res.data.data
            });
        } catch (err) {
            acctDispatch({
                type: 'ACCTS_ERR',
                payload: err.response.data.error
            })
        }
    }

    async function deleteAccount(id) {
        try {
            await axios.delete(`/api/v1/accounts/${id}`);

            acctDispatch({
                type: 'DELETE_ACCTS',
                payload: id
            });
        } catch (err) {
            acctDispatch({
                type: 'ACCTS_ERR',
                payload: err.response.data.error
            })
        }
    }

    async function addAccount(account) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('api/v1/accounts', account, config);

            acctDispatch({
                type: 'ADD_ACCTS',
                payload: res.data.data
            });
        } catch (err) {
            acctDispatch({
                type: 'ACCTS_ERR',
                payload: err.response.data.error
            })
        }
    }

    function toggleAccoutView(showVal) {
        acctDispatch({
            type: 'TOGGLE_ACCT_VIEW',
            payload: showVal
        })
    }

    function selectAccount(acctId) {
        acctDispatch({
            type: 'SEL_ACCT',
            payload: acctId
        })
    }

    // Actions - Merchants
    async function getMerchants() {
        try {
            const res = await axios.get('/api/v1/merchants');
            merchantDispatch({
                type: 'GET_MERCHANTS',
                payload: res.data.data
            });
        } catch (err) {
            merchantDispatch({
                type: 'MERCHANTS_ERR',
                payload: err.response.data.error
            })
        }
    }

    async function deleteMerchant(id) {
        try {
            await axios.delete(`/api/v1/merchants/${id}`);

            merchantDispatch({
                type: 'DELETE_MERCHANTS',
                payload: id
            });
        } catch (err) {
            merchantDispatch({
                type: 'MERCHANTS_ERR',
                payload: err.response.data.error
            })
        }
    }

    async function addMerchant(merchant) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('api/v1/merchants', merchant, config);

            merchantDispatch({
                type: 'ADD_MERCHANTS',
                payload: res.data.data
            });
        } catch (err) {
            merchantDispatch({
                type: 'MERCHANTS_ERR',
                payload: err.response.data.error
            })
        }
    }

    // Actions - Date Arrows
    function handleYearSelect(offset) {
        dateDispatch({
            type: 'SEL_YEAR',
            payload: offset
        })
    }

    function handleMonthSelect(offset) {
        dateDispatch({
            type: 'SEL_MTH',
            payload: offset
        })
    }

    function handleEndYearSelect(offset) {
        dateDispatch({
            type: 'SEL_END_YEAR',
            payload: offset
        })
    }

    function handleEndMonthSelect(offset) {
        dateDispatch({
            type: 'SEL_END_MTH',
            payload: offset
        })
    }

    // Actions - Date Modal
    function handleDateModalOpen() {
        dateDispatch({
            type: 'OPEN_DATE_SEL_MODAL'
        })
    }

    function handleDateModalClose() {
        dateDispatch({
            type: 'CLS_DATE_SEL_MODAL'
        })
    }

    function handleCancelDateRangeSelect() {
        dateDispatch({
            type: 'CANCEL_SEL_DT'
        })
    }

    function handleDateSelect(offset) {
        dateDispatch({
            type: 'SEL_DT',
            payload: offset
        })
    }

    function handleEndDateSelect(offset) {
        dateDispatch({
            type: 'SEL_END_DT',
            payload: offset
        })
    }

    function handleCurrMonth() {
        dateDispatch({
            type: 'CURR_MTH'
        })
    }

    // Actions - Transaction Modal
    function handleTransModalOpen() {
        actionsDispatch({
            type: 'OPEN_ADD_TRANS_MODAL'
        })
    }

    function handleTransModalClose() {
        actionsDispatch({
            type: 'CLS_ADD_TRANS_MODAL'
        })
    }

    function handleTransTypeChange (typ) {
        actionsDispatch({
            type: 'CHG_TRANS_TYP',
            payload: typ
        })
    }

    // Actions - Alerts
    function handleAlertOpen(alertText) {
        alertsDispatch({
            type: 'OPEN_ALERT',
            payload: alertText
        })
    }

    function handleAlertClose() {
        alertsDispatch({
            type: 'CLS_ALERT'
        })
    }

    return (<GlobalContext.Provider value={{
        merchants: merchantState.merchants,
        error: state.error,
        loading: state.loading,
        getMerchants,
        deleteMerchant,
        addMerchant,
        // Account Contexts
        accounts: acctState.accounts,
        accountView: acctState.accountView,
        selectedAccount: acctState.selectedAccount,
        getAccounts,
        deleteAccount,
        addAccount,
        toggleAccoutView,
        selectAccount,
        // Transaction Contexts
        transactions: state.transactions,
        openTransModal: actionsState.openTransModal,
        selectedTrans: state.selectedTrans,
        getTransactions,
        deleteTransaction,
        addTransaction,
        updateTransaction,
        selectTrans,
        // Date Contexts
        monthNames: dateState.monthNames,
        displayDate: dateState.displayDate,
        selYear: dateState.selYear,
        selMonth: dateState.selMonth,
        selEndYear: dateState.selEndYear,
        selEndMonth: dateState.selEndMonth,
        selYearPrev: dateState.selYearPrev,
        selMonthPrev: dateState.selMonthPrev,
        dtToday: dateState.dtToday,
        selDate: dateState.selDate,
        selEndDate : dateState.selEndDate,
        selRangeStart: dateState.selRangeStart,
        selRangeEnd: dateState.selRangeEnd,
        selRangeStartPrev: dateState.selRangeStartPrev,
        selRangeEndPrev: dateState.selRangeEndPrev,
        dateRange: dateState.dateRange,
        openDateModal: dateState.openDateModal,
        handleYearSelect,
        handleMonthSelect,
        handleDateModalOpen,
        handleDateModalClose,
        handleCancelDateRangeSelect,
        handleEndYearSelect,
        handleEndMonthSelect,
        handleDateSelect,
        handleEndDateSelect,
        handleCurrMonth,
        // Action Contexts
        transType: actionsState.transType,
        handleTransModalOpen,
        handleTransModalClose,
        handleTransTypeChange,
        // Alert Contexts
        openAlert: alertsState.openAlert,
        alertContent: alertsState.alertContent,
        handleAlertOpen,
        handleAlertClose,
    }}>
        {children}
    </GlobalContext.Provider>
    )
}