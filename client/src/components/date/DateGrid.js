import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import '../../styles/date/DateGrid.css';

export const DateGrid = () => {

    const { selYear
            ,selMonth
            ,monthNames  } 
        = useContext(GlobalContext);

    const getMonthStr = monthNames[selMonth];

    return (
        <>
                <div className='dg-root'>
                  <div className='dg-head'>
                      <div className='dgh-container'>
                          <div className='dghc-year'>{selYear}</div>
                          <div className='dghc-month'>{getMonthStr}</div>
                      </div>
                  </div>
                </div>
        </>
    )
}
