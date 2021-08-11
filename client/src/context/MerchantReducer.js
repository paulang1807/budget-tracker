const MerchantReducer = (state, action) => {
    switch (action.type) {
        case 'GET_MERCHANTS':
            return {
                ...state,
                merchants: action.payload,
                loading: false
            }
        case 'DELETE_MERCHANTS':
            return {
                ...state,
                merchants: state.merchants.filter(merchant => merchant._id !== action.payload)
            }
        case 'ADD_MERCHANTS':
            return {
                ...state,
                merchants: [...state.merchants, action.payload]   // order is reversed when getting the data from the server api call
            }
        case 'MERCHANTS_ERR':
            return {
                ...state,
                merchants: action.payload
            }
        default:
            return state
    }
}

export default MerchantReducer