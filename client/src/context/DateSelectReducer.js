const DateSelectReducer = (state, action) => {
    let year = '';
    let month = '';
    let rangeStart = '';
    let rangeEnd = '';
    let rangeStartPrev = '';
    let rangeEndPrev = '';

    switch (action.type) {
        case 'SEL_YEAR':
            year = state.selYear + action.payload
            month = state.selMonth
            rangeStartPrev = state.selRangeStartPrev ? state.selRangeStartPrev : state.selRangeStart
            rangeEndPrev = state.selRangeEndPrev ? state.selRangeEndPrev : state.selRangeEnd
            rangeStart = state.dateRange ? state.rangeStart : year + '-' + String(month + 1).padStart(2, '0') + '-01'
            rangeEnd = state.dateRange ? state.selRangeEnd : year + '-' + String(month + 1).padStart(2, '0') + '-' + String(new Date(year, month + 1, 0).getDate()).padStart(2, '0')
            return {
                ...state,
                selYear: year,
                displayDate: state.monthNames[month] + ' ' + year,
                selRangeStart: rangeStart,
                selRangeEnd: rangeEnd,
                selRangeStartPrev: rangeStartPrev,
                selRangeEndPrev: rangeEndPrev,
            }
        case 'SEL_MTH':
            month = state.selMonth + action.payload
            year =  state.selYear
            rangeStartPrev = state.selRangeStartPrev ? state.selRangeStartPrev : state.selRangeStart
            rangeEndPrev = state.selRangeEndPrev ? state.selRangeEndPrev : state.selRangeEnd
            if(month === -1) {
                month = 11;
                year--;
            } else if(month === 12) {
                month = 0;
                year++;
            }
            rangeStart = state.dateRange ? state.rangeStart : year + '-' + String(month + 1).padStart(2, '0') + '-01'
            rangeEnd = state.dateRange ? state.selRangeEnd : year + '-' + String(month + 1).padStart(2, '0') + '-' + String(new Date(year, month + 1, 0).getDate()).padStart(2, '0')
            return {
                ...state,
                selMonth: month,
                selYear: year,
                displayDate: state.monthNames[month] + ' ' + year,
                selRangeStart: rangeStart,
                selRangeEnd: rangeEnd,
                selRangeStartPrev: rangeStartPrev,
                selRangeEndPrev: rangeEndPrev,
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
        case 'SEL_DT':
            month = state.selMonth
            year =  state.selYear
            rangeStartPrev = state.selRangeStartPrev ? state.selRangeStartPrev : state.selRangeStart
            rangeEndPrev = state.selRangeEndPrev ? state.selRangeEndPrev : state.selRangeEnd
            rangeStart = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(action.payload).padStart(2, '0')
            return {
                ...state,
                selDate: year + String(month + 1).padStart(2, '0') + String(action.payload).padStart(2, '0'),
                dateRange: true,
                selRangeStart: rangeStart,
                selRangeStartPrev: rangeStartPrev,
                selRangeEndPrev: rangeEndPrev,
            }
        case 'SEL_END_DT':
            year = state.selEndYear
            month = state.selEndMonth
            rangeStartPrev = state.selRangeStartPrev ? state.selRangeStartPrev : state.selRangeStart
            rangeEndPrev = state.selRangeEndPrev ? state.selRangeEndPrev : state.selRangeEnd
            rangeEnd = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(action.payload).padStart(2, '0')
            return {
                ...state,
                selEndDate: year + String(month + 1).padStart(2, '0') + String(action.payload).padStart(2, '0'),
                dateRange: true,
                selRangeEnd: rangeEnd,
                selRangeStartPrev: rangeStartPrev,
                selRangeEndPrev: rangeEndPrev,
            }
        case 'OPEN_DATE_SEL_MODAL':
            year = new Date().getFullYear()
            month = new Date().getMonth()
            return {
                ...state,
                openDateModal: true,
                selYearPrev: state.selYear,
                selMonthPrev: state.selMonth,
                selRangeStartPrev: state.selRangeStart,
                selRangeEndPrev: state.selRangeEnd,
                selYear: year,
                selMonth: month,
                selEndYear: month + 1 == 12 ? year + 1 : year,
                selEndMonth: month + 1 == 12 ? 0 : month + 1,
                selDate: year + String(month + 1).padStart(2, '0') + String(new Date().getDate()).padStart(2, '0'),
                selEndDate: null,
                selRangeStart: year + '-' + String(month + 1).padStart(2, '0') + '-01',
                selRangeEnd: year + '-' +  String(month + 1).padStart(2, '0') + '-' +  String(new Date(year, month, 0).getDate()).padStart(2, '0'),
            }
        case 'CLS_DATE_SEL_MODAL':
            let displayDt = '';
            if(state.dateRange){
                let startDay = Date.parse(state.selRangeStart) < Date.parse(state.selRangeEnd) ? String(state.selDate).trim().substr(6,2) : String(state.selEndDate).trim().substr(6,2)
                let endDay = Date.parse(state.selRangeStart) > Date.parse(state.selRangeEnd) ? String(state.selDate).trim().substr(6,2) : String(state.selEndDate).trim().substr(6,2)
                let startMonth = Date.parse(state.selRangeStart) < Date.parse(state.selRangeEnd) ? state.selMonth : state.selEndMonth
                let endMonth = Date.parse(state.selRangeStart) > Date.parse(state.selRangeEnd) ? state.selMonth : state.selEndMonth
                let startYr = Date.parse(state.selRangeStart) < Date.parse(state.selRangeEnd) ? state.selYear : state.selEndYear
                let endYr = Date.parse(state.selRangeStart) > Date.parse(state.selRangeEnd) ? state.selYear : state.selEndYear
                if(state.selYear == state.selEndYear && state.selMonth == state.selEndMonth && (new Date(state.selYear, state.selMonth, 0).getDate() == String(state.selEndDate).trim().substr(6,2))) {
                        displayDt = state.monthNames[state.selMonth] + ' ' + state.selYear
                } else {
                    displayDt = startDay + ' ' + state.monthNames[startMonth] + ' ' + startYr + ' To ' + endDay + ' ' + state.monthNames[endMonth]+ ' '  + endYr
                }
            } else {
                displayDt = state.monthNames[state.selMonth] + ' ' + state.selYear
            }
            return {
                ...state,
                openDateModal: false,
                displayDate: displayDt
            }
        case 'CANCEL_SEL_DT':
            year = new Date().getFullYear()
            month = new Date().getMonth()
            return {
                ...state,
                openDateModal: false,
                displayDate: state.monthNames[month] + ' ' + year,
                selYear: state.selYearPrev,
                selMonth: state.selMonthPrev,
                selRangeStart: state.selRangeStartPrev,
                selRangeEnd: state.selRangeEndPrev,
                selYearPrev: null,
                selMonthPrev: null,
                selRangeStartPrev: null,
                selRangeEndPrev: null,
            }
        case 'CURR_MTH':
            year = new Date().getFullYear()
            month = new Date().getMonth()
            return {
                ...state,
                openDateModal: false,
                selYearPrev: null,
                selMonthPrev: null,
                selRangeStartPrev: null,
                selRangeEndPrev: null,
                selYear: year,
                selMonth: month,
                selEndYear: month + 1 == 12 ? year + 1 : year,
                selEndMonth: month + 1 == 12 ? 0 : month + 1,
                selDate: year + String(month + 1).padStart(2, '0') + String(new Date().getDate()).padStart(2, '0'),
                selEndDate: null,
                selRangeStart: year + '-' + String(month + 1).padStart(2, '0') + '-01',
                selRangeEnd: year + '-' +  String(month + 1).padStart(2, '0') + '-' +  String(new Date(year, month, 0).getDate()).padStart(2, '0'),
                displayDate: state.monthNames[month] + ' ' + year
            }
        default:
            return state
    }
}

export default DateSelectReducer