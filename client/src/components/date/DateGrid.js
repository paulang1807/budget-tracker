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
                      <div className='dgh-button'>
                          <div className='dghb-inner'>
                              <span className='dghbi-left-arrows'></span>
                          </div>
                      </div>
                      <div className='dgh-button'>
                          <div className='dghb-inner'>
                              <span className='dghbi-left-arrow'></span>
                          </div>
                      </div>
                      <div className='dgh-container'>
                          <div className='dghc-year'>{selYear}</div>
                          <div className='dghc-month'>{getMonthStr}</div>
                      </div>
                      <div className='dgh-button'>
                          <div className='dghb-inner'>
                              <span className='dghbi-right-arrow'></span>
                          </div>
                      </div>
                      <div className='dgh-button'>
                          <div className='dghb-inner'>
                              <span className='dghbi-right-arrows'></span>
                          </div>
                      </div>
                  </div>
                </div>
        </>
    )
}
