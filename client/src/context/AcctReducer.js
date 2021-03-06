const AcctReducer = (state, action) => {
    switch (action.type) {
        case 'GET_ACCTS':
            return {
                ...state,
                accounts: action.payload,
                loading: false
            }
        case 'DELETE_ACCTS':
            return {
                ...state,
                accounts: state.accounts.filter(account => account._id !== action.payload)
            }
        case 'ADD_ACCTS':
            return {
                ...state,
                accounts: [...state.accounts, action.payload]   // order is reversed when getting the data from the server api call
            }
        case 'TOGGLE_ACCT_VIEW':
            return {
                ...state,
                accountView: action.payload
            }
        case 'SEL_ACCT':
            return {
                ...state,
                selectedAccount: action.payload
            }
        case 'ACCTS_ERR':
            return {
                ...state,
                accounts: action.payload
            }
        default:
            return state
    }
}

export default AcctReducer