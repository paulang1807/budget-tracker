import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { ThemeProvider } from '@material-ui/core/styles';

import '../../styles/date/DateSelector.css';
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
            <div className='ds-input' >
                <div className='ds-button'>
                    <div className='dsb-inner' onClick={() => setYear(-1)}>
                        <span className='dsbi-left-arrows'></span>
                    </div>
                </div>
                <div className='ds-button'>
                    <div className='dsb-inner' onClick={()=> setMonth(-1)}>
                        <span className='dsbi-left-arrow'></span>
                    </div>
                </div>
                <div className='ds-button-date' onClick={handleDateModalOpen}>
                      <div className='ds-container'>
                          <div className='dsc-txt'>{displayDate}</div>
                      </div>
                </div>
                <div className='ds-button'>
                    <div className='dsb-inner' onClick={()=> setMonth(1)}>
                        <span className='dsbi-right-arrow'></span>
                    </div>
                </div>
                <div className='ds-button'>
                    <div className='dsb-inner' onClick={()=> setYear(1)}>
                        <span className='dsbi-right-arrows'></span>
                    </div>
                </div>
            </div>
            <Dialog open={openDateModal} 
                    onClose={handleCancelDateRangeSelect} 
                    aria-labelledby="form-dialog-title" 
                    classes={{ paper: classes.paper}}
            >
                <DialogContent>
                    <div className='ds-grid'>
                        <div className='dsg-container'>
                            Begin Date
                            <DateGrid begin={true}/>
                        </div>
                        <div className='dsg-container'>
                            End Date
                            <DateGrid begin={false}/>
                        </div>
                    </div>
                    <button className='ds-button-current' onClick={handleCurrMonth}>Current Month</button>
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
