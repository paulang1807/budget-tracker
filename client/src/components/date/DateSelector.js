import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import '../../styles/date/DateSelector.css';

export const DateSelector = () => {

    const { displayDate } = useContext(GlobalContext);

    return (
            <div className='ds-input' >
                <div className='ds-button'>
                    <div className='dsb-inner'>
                        <span className='dsbi-left-arrows'></span>
                    </div>
                </div>
                <div className='ds-button'>
                    <div className='dsb-inner'>
                        <span className='dsbi-left-arrow'></span>
                    </div>
                </div>
                <div className='ds-button-date'>
                      <div className='ds-container'>
                          <div className='dsc-txt'>{displayDate}</div>
                      </div>
                </div>
                <div className='ds-button'>
                    <div className='dsb-inner'>
                        <span className='dsbi-right-arrow'></span>
                    </div>
                </div>
                <div className='ds-button'>
                    <div className='dsb-inner'>
                        <span className='dsbi-right-arrows'></span>
                    </div>
                </div>
            </div>
    )
}
