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
        case 'SET_CLICKED':
            // If clicked id exists in the array then update , else add
            let tmpClickedIds = state.clickedIds
            let clickedObjectKey;
            let clickedObjectTyp;
            const clickedObject = action.payload
            clickedObject.map(clickObj => {
                clickedObjectKey = Object.keys(clickObj)[0]     // group id
                clickedObjectTyp = Object.values(clickObj)[1]   // type of group - income, expense or transfer
                tmpClickedIds[clickedObjectKey] = clickObj
                tmpClickedIds['type'] = clickedObjectTyp
            })
            return {
                ...state,
                clickedIds: tmpClickedIds
            }
        case 'RESET_CLICKED':
            return {
                ...state,
                clickedIds: {}
            }
        case 'SET_GRPBY_CD':
            return {
                ...state,
                currGroupByCode: action.payload
            }
        default:
            return state
    }
}

export default ActionsReducer