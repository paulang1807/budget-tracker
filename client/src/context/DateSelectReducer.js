const DateSelectReducer = (state, action) => {
    let year = '';
    let month = '';

    switch (action.type) {
        case 'SEL_YEAR':
            year = state.selYear + action.payload
            month = state.selMonth
            return {
                ...state,
                selYear: year,
                displayDate: state.monthNames[month] + ' ' + year
            }
        case 'SEL_MTH':
            month = state.selMonth + action.payload
            year =  state.selYear
            if(month === -1) {
                month = 11;
                year--;
            } else if(month === 12) {
                month = 0;
                year++;
            }
            return {
                ...state,
                selMonth: month,
                selYear: year,
                displayDate: state.monthNames[month] + ' ' + year
            }
        case 'SEL_END_YEAR':
            year = state.selEndYear + action.payload
            return {
                ...state,
                selEndYear: year,
            }
        case 'SEL_END_MTH':
            month = state.selEndMonth + action.payload
            year =  state.selEndYear
            if(month === -1) {
                month = 11;
                year--;
            } else if(month === 12) {
                month = 0;
                year++;
            }
            return {
                ...state,
                selEndMonth: month,
                selEndYear: year,
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