const AlertsReducer = (state, action) => {
    switch (action.type) {
        case 'OPEN_ALERT':
            return {
                ...state,
                openAlert: true,
                alertTitle: action.payload.alertTitle,
                alertContent: action.payload.alertText
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