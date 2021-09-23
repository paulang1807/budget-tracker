const DateSelectReducer = (state, action) => {
    let year = '';
    let month = '';
    let day = '';
    let endYear = '';
    let endMonth = '';
    let endDay = '';
    let rangeStart = '';
    let rangeEnd = '';
    let rangeStartPrev = '';
    let rangeEndPrev = '';
    let displayDt = '';

    switch (action.type) {
        case 'SEL_YEAR':
            year = state.selYear + action.payload
            month = state.selMonth

            rangeStartPrev = state.selRangeStartPrev ? state.selRangeStartPrev : state.selRangeStart
            rangeEndPrev = state.selRangeEndPrev ? state.selRangeEndPrev : state.selRangeEnd

            displayDt = '';
            // If current selection is for a date range (or even a single date), adjust year for the entire range
            if(state.dateRange){
                endMonth = state.selEndMonth
                endYear =  state.selEndYear + action.payload

                day = Date.parse(state.selRangeStart) < Date.parse(state.selRangeEnd) ? String(state.selDate).trim().substr(6,2) : String(state.selEndDate).trim().substr(6,2)
                endDay = Date.parse(state.selRangeStart) > Date.parse(state.selRangeEnd) ? String(state.selDate).trim().substr(6,2) : String(state.selEndDate).trim().substr(6,2)

                rangeStart = year + '-' + String(month + 1).padStart(2, '0') +  '-' + day
                rangeEnd = endYear + '-' + String(endMonth + 1).padStart(2, '0') +  '-' + endDay

                if(year == endYear && month == endMonth && day == endDay) {
                        displayDt = state.monthNames[month] + ' ' + year
                } else {
                    displayDt = day + ' ' + state.monthNames[month] + ' ' + year + ' To ' + endDay + ' ' + state.monthNames[endMonth]+ ' '  + endYear
                }
            } else {
                // If current selection is for a single month, just adjust the year keeping the month the same
                endMonth = state.selEndMonth
                endYear =  state.selEndYear
                rangeStart = year + '-' + String(month + 1).padStart(2, '0') + '-01'
                rangeEnd = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(new Date(year, month + 1, 0).getDate()).padStart(2, '0')
                displayDt = state.monthNames[month] + ' ' + year
            }

            return {
                ...state,
                selYear: year,
                selEndYear: endYear,
                displayDate: displayDt,
                selRangeStart: rangeStart,
                selRangeEnd: rangeEnd,
                selRangeStartPrev: rangeStartPrev,
                selRangeEndPrev: rangeEndPrev,
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

            rangeStartPrev = state.selRangeStartPrev ? state.selRangeStartPrev : state.selRangeStart
            rangeEndPrev = state.selRangeEndPrev ? state.selRangeEndPrev : state.selRangeEnd

            displayDt = '';
            // If current selection is for a date range (or even a single date), adjust month for the entire range
            if(state.dateRange){
                endMonth = state.selEndMonth  + action.payload
                endYear =  state.selEndYear

                if(endMonth === -1) {
                    endMonth = 11;
                    endYear--;
                } else if(endMonth === 12) {
                    endMonth = 0;
                    endYear++;
                }

                day = Date.parse(state.selRangeStart) < Date.parse(state.selRangeEnd) ? String(state.selDate).trim().substr(6,2) : String(state.selEndDate).trim().substr(6,2)
                endDay = Date.parse(state.selRangeStart) > Date.parse(state.selRangeEnd) ? String(state.selDate).trim().substr(6,2) : String(state.selEndDate).trim().substr(6,2)

                rangeStart = year + '-' + String(month + 1).padStart(2, '0') +  '-' + day
                rangeEnd = endYear + '-' + String(endMonth + 1).padStart(2, '0') +  '-' + endDay

                if(year == endYear && month == endMonth && day == endDay) {
                        displayDt = state.monthNames[month] + ' ' + year
                } else {
                    displayDt = day + ' ' + state.monthNames[month] + ' ' + year + ' To ' + endDay + ' ' + state.monthNames[endMonth]+ ' '  + endYear
                }
            } else {
                endMonth = state.selEndMonth
                endYear =  state.selEndYear
                rangeStart = year + '-' + String(month + 1).padStart(2, '0') + '-01'
                rangeEnd = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(new Date(year, month + 1, 0).getDate()).padStart(2, '0')
                displayDt = state.monthNames[month] + ' ' + year
            }

            return {
                ...state,
                selMonth: month,
                selYear: year,
                selEndMonth: endMonth,
                selEndYear: endYear,
                displayDate: displayDt,
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
                selMonth: month,
                selYear: year,
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
                selEndMonth: month,
                selEndYear: year,
            }
        case 'OPEN_DATE_SEL_MODAL':
            year = new Date().getFullYear()
            month = new Date().getMonth()
            return {
                ...state,
                openDateModal: true,
                selYearPrev: state.selYear,
                selMonthPrev: state.selMonth,
                selEndYearPrev: state.selEndYear,
                selEndMonthPrev: state.selEndMonth,
                selRangeStartPrev: state.selRangeStart,
                selRangeEndPrev: state.selRangeEnd,
                selDatePrev: state.selDate,
                selEndDatePrev: state.selEndDate,
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
            displayDt = '';
            if(state.dateRange){
                day = Date.parse(state.selRangeStart) < Date.parse(state.selRangeEnd) ? String(state.selDate).trim().substr(6,2) : String(state.selEndDate).trim().substr(6,2)
                endDay = Date.parse(state.selRangeStart) > Date.parse(state.selRangeEnd) ? String(state.selDate).trim().substr(6,2) : String(state.selEndDate).trim().substr(6,2)
                month = Date.parse(state.selRangeStart) < Date.parse(state.selRangeEnd) ? state.selMonth : state.selEndMonth
                endMonth = Date.parse(state.selRangeStart) > Date.parse(state.selRangeEnd) ? state.selMonth : state.selEndMonth
                year = Date.parse(state.selRangeStart) < Date.parse(state.selRangeEnd) ? state.selYear : state.selEndYear
                endYear = Date.parse(state.selRangeStart) > Date.parse(state.selRangeEnd) ? state.selYear : state.selEndYear
                if(year == endYear && month == endMonth && day == endDay) {
                        displayDt = day + ' ' + state.monthNames[state.selMonth] + ' ' + state.selYear
                } else {
                    displayDt = day + ' ' + state.monthNames[month] + ' ' + year + ' To ' + endDay + ' ' + state.monthNames[endMonth]+ ' '  + endYear
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
            return {
                ...state,
                openDateModal: false,
                displayDate: state.displayDate,
                selYear: state.selYearPrev,
                selMonth: state.selMonthPrev,
                selEndYear: state.selEndYearPrev,
                selEndMonth: state.selEndMonthPrev,
                selRangeStart: state.selRangeStartPrev,
                selRangeEnd: state.selRangeEndPrev,
                selDate: state.selDatePrev,
                selEndDate: state.selEndDatePrev,
                selYearPrev: null,
                selMonthPrev: null,
                selEndYearPrev: null,
                selEndMonthPrev: null,
                selRangeStartPrev: null,
                selRangeEndPrev: null,
                selDatePrev: null,
                selEndDatePrev: null,
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
                displayDate: state.monthNames[month] + ' ' + year,
                dateRange: false,
            }
        default:
            return state
    }
}

export default DateSelectReducer