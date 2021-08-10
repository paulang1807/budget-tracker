import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Income = () => {
    const { transactions } = useContext(GlobalContext);

    const amounts = transactions.map(transaction => transaction.amount);
  
    // const income = amounts.reduce((acc, item) => (acc += item > 0 ? item : 0), 0).toFixed(2);

    const income = amounts.filter(item => item > 0)
                            .reduce((acc, item) => (acc += item), 0)
                            .toFixed(2);

    return (
        <div>
            <h4>Income</h4>
            <p className="money plus">+${numberWithCommas(income)}</p>
        </div>
    )
}
