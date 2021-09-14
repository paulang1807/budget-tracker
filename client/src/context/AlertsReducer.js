const AlertsReducer = (state, action) => {
    switch (action.type) {
        case 'OPEN_ALERT':
            return {
                ...state,
                openAlert: true,
                alertContent: action.payload
            }
        case 'CLS_ALERT':
            return {
                ...state,
                openAlert: false
            }
        default:
            return state
    }
}

export default AlertsReducer