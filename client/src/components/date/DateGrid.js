import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

// styles
import { DateGridWrapper, DataGridHead, DataGridBody, DateGridButton, DateGridArrows, DataGridHeader, DataGridYear, DataGridMonth, DataGridBodyWrapper, DataGridBodyDayWrapper, DataGridWeekday, DataGridBodyDay, DataGridDayContainer, MonthArrow, YearArrow } from '../../styles/date/DateGrid';
import '../../styles/date/DateGrid.css';

export const DateGrid = (props) => {

    const { selYear
            ,selMonth
            ,monthNames 
            ,selEndYear
            ,selEndMonth
            ,handleYearSelect
            ,handleMonthSelect
            ,handleEndYearSelect
            ,handleEndMonthSelect
            ,dtToday
            ,selDate
            ,selEndDate
            ,handleDateSelect
            ,handleEndDateSelect } 
        = useContext(GlobalContext);

    const dayNamesShort = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 

    const getMonthStr = monthNames[props.begin ? selMonth : selEndMonth];

    const setYear = offset => {
        props.begin ? handleYearSelect(offset) : handleEndYearSelect(offset)
    }

    const setMonth = offset => {
        props.begin ? handleMonthSelect(offset) : handleEndMonthSelect(offset)
    }

    const setDate = dt => {
        props.begin ? handleDateSelect(dt) : handleEndDateSelect(dt)
    }

    const dayDetails = (p) => {
        let dateOffset = p.index - p.firstDay; 
        let weekDayNum = p.index%7;   // Weekday index
        let prevMonth = p.month-1;
        let prevMthYear = p.year;  //Year corresponding to previous month
        let nxtMonth = p.month+1;
        let nxtMthYear = p.year;  //Year corresponding to next month
        if(prevMonth === -1) {
            prevMonth = 11;
            prevMthYear--;
        }
        if(nxtMonth === 12) {
          nxtMonth = 0;
          nxtMthYear++;
        }
        let prevMonthNumberOfDays = new Date(prevMthYear, prevMonth, 0).getDate();
        let arrDate = (dateOffset < 0 ? prevMonthNumberOfDays+dateOffset : dateOffset % p.numberOfDays) + 1;   // Date to be shown in current index position
        let arrDateMth = dateOffset < 0 ? prevMonth : dateOffset >= p.numberOfDays ? nxtMonth : p.month;    // month number relative to date in current index position
        let arrDateYr = dateOffset < 0 ? prevMthYear : dateOffset >= p.numberOfDays ? nxtMthYear : p.year;    // month number relative to date in current index position
        let relMonthNum = dateOffset < 0 ? -1 : dateOffset >= p.numberOfDays ? 1 : 0;    // month number relative to current month
        let dateString = arrDateYr + String(arrDateMth + 1).padStart(2, '0') + String(arrDate).padStart(2, '0');
        return {
            date: arrDate,
            weekDayNum,
            month: relMonthNum, 
            dateString,
            dayString: dayNames[weekDayNum],
            numberOfDays: p.numberOfDays,
            firstDay: p.firstDay,
        }
    }

    const monthDetails =()=> {
        let rows = 6;       // Number of rows for calendar grid
        let cols = 7;       // Number of columns for calendar grid
        let monthArray = [];
        let year = props.begin ? selYear : selEndYear;
        let month = props.begin ? selMonth : selEndMonth;
        let firstDay = new Date(year, month).getDay();   // Index of the first day of month
        let numberOfDays = new Date(year, month + 1, 0).getDate();
        let dayDtl = null;
        let index = 0;    // Grid Index
  
        for(let row=0; row<rows; row++) {
            for(let col=0; col<cols; col++) { 
                dayDtl = dayDetails({
                    index,
                    numberOfDays,
                    firstDay,
                    year,
                    month
                });
                monthArray.push(dayDtl);
                index++;
            }
        }
        return monthArray;
    }

    const renderCalendar = () => {
        let monthDtls = monthDetails();
        let days = monthDtls.map((day, index)=> {
            return (
                <DataGridDayContainer className={(day.month !== 0 ? ' disabled' : '') + 
                    (day.dateString === dtToday ? ' highlight' : '') + 
                      (day.dateString === selDate ? ' highlight-blue' : '') + 
                        (day.dateString === selEndDate ? ' highlight-blue' : '') + 
                        (day.dateString > selDate && day.dateString < selEndDate ? ' highlight-blue-range' : '')} key={index}>
                    <DataGridBodyDay className='dgbdc-day'>
                        <span onClick={()=>setDate(day.date)}>
                            {day.date}
                        </span>
                    </DataGridBodyDay>
                </DataGridDayContainer>
            )
        })
        return (
            <DataGridBodyWrapper>
                <div>
                    {dayNamesShort.map((d,i)=><DataGridWeekday key={i} >{d}</DataGridWeekday>)}
                </div>
                <DataGridBodyDayWrapper>
                    {days}
                </DataGridBodyDayWrapper>
            </DataGridBodyWrapper>
        )
    }

    return (
        <DateGridWrapper>
                <DataGridHead>
                    <DateGridButton>
                        <DateGridArrows onClick={() => setYear(-1)}>
                            <YearArrow left></YearArrow>
                        </DateGridArrows>
                    </DateGridButton>
                    <DateGridButton>
                        <DateGridArrows onClick={()=> setMonth(-1)}>
                            <MonthArrow left></MonthArrow>
                        </DateGridArrows>
                    </DateGridButton>
                    <DataGridHeader>
                        <DataGridYear>{props.begin ? selYear : selEndYear}</DataGridYear>
                        <DataGridMonth>{getMonthStr}</DataGridMonth>
                    </DataGridHeader>
                    <DateGridButton>
                        <DateGridArrows onClick={()=> setMonth(1)}>
                            <MonthArrow right></MonthArrow>
                        </DateGridArrows>
                    </DateGridButton>
                    <DateGridButton>
                        <DateGridArrows onClick={()=> setYear(1)}>
                            <YearArrow right></YearArrow>
                        </DateGridArrows>
                    </DateGridButton>
                </DataGridHead>
                <DataGridBody>
                    {renderCalendar()}
                </DataGridBody>
        </DateGridWrapper>
    )
}
