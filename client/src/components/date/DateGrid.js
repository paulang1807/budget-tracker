import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

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
            ,handleEndMonthSelect } 
        = useContext(GlobalContext);

    const getMonthStr = monthNames[props.begin ? selMonth : selEndMonth];

    const setYear = offset => {
        props.begin ? handleYearSelect(offset) : handleEndYearSelect(offset)
    }

    const setMonth = offset => {
        props.begin ? handleMonthSelect(offset) : handleEndMonthSelect(offset)
    }

    return (
        <>
                <div className='dg-root'>
                  <div className='dg-head'>
                      <div className='dgh-button'>
                          <div className='dghb-inner' onClick={() => setYear(-1)}>
                              <span className='dghbi-left-arrows'></span>
                          </div>
                      </div>
                      <div className='dgh-button'>
                          <div className='dghb-inner' onClick={()=> setMonth(-1)}>
                              <span className='dghbi-left-arrow'></span>
                          </div>
                      </div>
                      <div className='dgh-container'>
                          <div className='dghc-year'>{props.begin ? selYear : selEndYear}</div>
                          <div className='dghc-month'>{getMonthStr}</div>
                      </div>
                      <div className='dgh-button'>
                          <div className='dghb-inner' onClick={()=> setMonth(1)}>
                              <span className='dghbi-right-arrow'></span>
                          </div>
                      </div>
                      <div className='dgh-button'>
                          <div className='dghb-inner' onClick={()=> setYear(1)}>
                              <span className='dghbi-right-arrows'></span>
                          </div>
                      </div>
                  </div>
                </div>
        </>
    )
}
