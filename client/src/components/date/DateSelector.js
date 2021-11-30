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

import Tooltip from '../common/Tooltip';

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
                <Tooltip tooltip={'Previous Year'}>
                <DateSelectorArrows>
                    <div onClick={() => setYear(-1)}>
                        <YearArrow left></YearArrow>
                    </div>
                </DateSelectorArrows>
                </Tooltip>
                <Tooltip tooltip={'Previous Month'}>
                <DateSelectorArrows>
                    <div onClick={()=> setMonth(-1)}>
                        <MonthArrow left></MonthArrow>
                    </div>
                </DateSelectorArrows>
                </Tooltip>
                <Tooltip tooltip={'Open Date Selector'}>
                <DateSelectorButton onClick={handleDateModalOpen}>{displayDate}</DateSelectorButton>
                </Tooltip>
                <Tooltip tooltip={'Next Month'}>
                <DateSelectorArrows>
                    <div onClick={()=> setMonth(1)}>
                        <MonthArrow right></MonthArrow>
                    </div>
                </DateSelectorArrows>
                </Tooltip>
                <Tooltip tooltip={'Next Year'}>
                <DateSelectorArrows>
                    <div onClick={()=> setYear(1)}> 
                        <YearArrow right></YearArrow>
                    </div>
                </DateSelectorArrows>
                </Tooltip>
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
