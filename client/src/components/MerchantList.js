import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Merchant } from './Merchant';

export const MerchantList = () => {
    const { merchants, getMerchants } = useContext(GlobalContext);

    useEffect(() => {
        getMerchants();
        // To silence the default warnings, use
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <h3>Merchants</h3>
                <ul className="list">
                    {merchants.map(merchant => (
                        <Merchant key={merchant._id} merchant={merchant}/>
                    ))}
                </ul>
        </>
    )
}
