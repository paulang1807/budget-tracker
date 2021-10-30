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
        case 'OPEN_ADD_MERCH_MODAL':
            return {
                ...state,
                openMerchantModal: true
            }
        case 'CLS_ADD_MERCH_MODAL':
            return {
                ...state,
                openMerchantModal: false
            }
        case 'CHG_TRANS_TYP':
            return {
                ...state,
                transType: action.payload
            }
        case 'GRP_BY_MERCH':
            return {
                ...state,
                grpbyMerch: !state.grpbyMerch
            }
        case 'GRP_BY_CAT':
            return {
                ...state,
                grpbyCat: !state.grpbyCat
            }
        case 'GRP_BY_SUBCAT':
            return {
                ...state,
                grpbySubcat: !state.grpbySubcat
            }
        default:
            return state
    }
}

export default ActionsReducer