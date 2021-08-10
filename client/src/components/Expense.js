import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Expense = () => {
    const { transactions } = useContext(GlobalContext);

    const amounts = transactions.map(transaction => transaction.amount);
  
    // const expense = amounts.reduce((acc, item) => (acc += item < 0 ? item : 0), 0).toFixed(2);

    const expense = (
        amounts.filter(item => item < 0)
                .reduce((acc, item) => (acc += item), 0) * -1)
                .toFixed(2);

    return (
        <div>
            <h4>Expense</h4>
            <p className="money minus">-${numberWithCommas(expense)}</p>
        </div>
    )
}
