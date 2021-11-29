import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { numberWithCommas } from '../../utils/format';

// Styles
import { AccountTotal } from '../../styles/account/Account';

export const Balance = () => {
    const { transactions } = useContext(GlobalContext);

    const incomes = transactions.filter(transaction => transaction.type == 'income').map(transaction => transaction.amount);
    const expenses = transactions.filter(transaction => transaction.type == 'expense').map(transaction => transaction.amount);

    const total = (incomes.reduce((acc, item) => (acc += item), 0) - expenses.reduce((acc, item) => (acc += item), 0)).toFixed(2);

    return (
        <AccountTotal>
            <h4>Your Balance</h4>
            <h1>${numberWithCommas(total)}</h1>
        </AccountTotal>
    )
}
