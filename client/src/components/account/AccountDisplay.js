import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import { AccountList } from './AccountList';
import { Balance } from './Balance';

export const AccountDisplay = () => {

    const { accountView } = useContext(GlobalContext);

    return (
            accountView ? <AccountList /> : <Balance />
    )
}
