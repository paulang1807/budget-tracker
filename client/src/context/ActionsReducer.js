const ActionsReducer = (state, action) => {
    switch (action.type) {
        case 'OPEN_ADD_TRANS_MODAL':
            return {
                ...state,
                openTransModal: true
            }
        case 'CLS_ADD_TRANS_MODAL':
            return {
                ...state,
                openTransModal: false
            }
        case 'OPEN_ADD_ACCT_MODAL':
            return {
                ...state,
                openAcctModal: true
            }
        case 'CLS_ADD_ACCT_MODAL':
            return {
                ...state,
                openAcctModal: false
            }
        case 'CHG_TRANS_TYP':
            return {
                ...state,
                transType: action.payload
            }
        default:
            return state
    }
}

export default ActionsReducer