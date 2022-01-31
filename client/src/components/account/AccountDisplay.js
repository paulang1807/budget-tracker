import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import { AccountList } from './AccountList';

export const AccountDisplay = () => {

    const { accountView } = useContext(GlobalContext);

    return (
        accountView ? (<AccountList />) : (<></>)
    )
}
