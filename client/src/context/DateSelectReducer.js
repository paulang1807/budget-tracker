const DateSelectReducer = (state, action) => {
    let year = '';
    let month = '';

    switch (action.type) {
        case 'SEL_YEAR':
            year = state.selYear + action.payload
            month = state.selMonth
            console.log("YEAR: ", year, month)
            return {
                ...state,
                selYear: year,
                displayDate: state.monthNames[month] + ' ' + year
            }
        case 'SEL_MTH':
            month = state.selMonth + action.payload
            year =  state.selYear
            console.log("MONTH: ", year, month)
            if(month === -1) {
                month = 11;
                year--;
            } else if(month === 12) {
                month = 0;
                year++;
            }
            console.log("MONTH2: ", year, month,state.monthNames[month])
            return {
                ...state,
                selMonth: month,
                selYear: year,
                displayDate: state.monthNames[month] + ' ' + year
            }
        case 'OPEN_DATE_SEL_MODAL':
            return {
                ...state,
                openDateModal: true,
            }
        case 'CLS_DATE_SEL_MODAL':
            return {
                ...state,
                openDateModal: false,
            }
        case 'CANCEL_SEL_DT':
            return {
                ...state,
                openDateModal: false
            }
        default:
            return state
    }
}

export default DateSelectReducer