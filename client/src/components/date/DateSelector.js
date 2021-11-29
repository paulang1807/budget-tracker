import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

// Styles
import { DateSelectorWrapper, DateSelectorArrows, DateSelectorButton, DateSelectorGrid, DateSelectorCurrentMonth, MonthArrow, YearArrow } from '../../styles/date/DateSelector';
import { ThemeProvider } from '@material-ui/core/styles';
import { useStyles, dateModalTheme } from '../../styles/date/DateSelector';

import { DateGrid } from './DateGrid';

export const DateSelector = () => {

    const { displayDate
            ,handleYearSelect
            ,handleMonthSelect
            ,openDateModal
            ,handleDateModalOpen
            ,handleDateModalClose
            ,handleCancelDateRangeSelect
            ,handleCurrMonth  } 
            = useContext(GlobalContext);

    const setYear = offset => {
        handleYearSelect(offset)
    }

    const setMonth = offset => {
        handleMonthSelect(offset)        
    }

    const classes = useStyles();

    return (
        <>
            <DateSelectorWrapper>
                <DateSelectorArrows>
                    <div onClick={() => setYear(-1)}>
                        <YearArrow left></YearArrow>
                    </div>
                </DateSelectorArrows>
                <DateSelectorArrows>
                    <div onClick={()=> setMonth(-1)}>
                        <MonthArrow left></MonthArrow>
                    </div>
                </DateSelectorArrows>
                {/* <div className='ds-button-date' onClick={handleDateModalOpen}> */}
                      {/* <div className='ds-container'> */}
                <DateSelectorButton onClick={handleDateModalOpen}>{displayDate}</DateSelectorButton>
                      {/* </div> */}
                {/* </div> */}
                <DateSelectorArrows>
                    <div onClick={()=> setMonth(1)}>
                        <MonthArrow right></MonthArrow>
                    </div>
                </DateSelectorArrows>
                <DateSelectorArrows>
                    <div onClick={()=> setYear(1)}>
                        <YearArrow right></YearArrow>
                    </div>
                </DateSelectorArrows>
            </DateSelectorWrapper>
            <Dialog open={openDateModal} 
                    onClose={handleCancelDateRangeSelect} 
                    aria-labelledby="form-dialog-title" 
                    classes={{ paper: classes.paper}}
            >
                <DialogContent>
                    <DateSelectorGrid>
                        <div>
                            Begin Date
                            <DateGrid begin={true}/>
                        </div>
                        <div>
                            End Date
                            <DateGrid begin={false}/>
                        </div>
                    </DateSelectorGrid>
                    <DateSelectorCurrentMonth onClick={handleCurrMonth}>Current Month</DateSelectorCurrentMonth>
                </DialogContent>
                <DialogActions>
                    <ThemeProvider theme={dateModalTheme}>
                        <Button onClick={handleCancelDateRangeSelect} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={handleDateModalClose} color="primary">
                        OK
                        </Button>
                    </ThemeProvider>
                </DialogActions>
            </Dialog>
        </>
    )
}
