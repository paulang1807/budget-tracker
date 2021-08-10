const AppReducer = (state, action) => {
    switch (action.type) {
        case 'GET_TRANS':
            return {
                ...state,
                transactions: action.payload,
                loading: false
            }
        case 'DELETE_TRANS':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
            }
        case 'ADD_TRANS':
            return {
                ...state,
                transactions: [...state.transactions, action.payload]   // order is reversed when getting the data from the server api call
            }
        case 'TRANS_ERR':
            return {
                ...state,
                transactions: action.payload
            }
        default:
            return state
    }
}

export default AppReducer