import React, {useState} from 'react';
import {PendingConnectionContext, PendingConnectionInfo} from "../state/PendingConnectionContext";


export const PendingConnectionProvider = ({children}: {children : React.ReactNode}) => {

    const [from, setFrom] = useState<PendingConnectionInfo>()

    const [to, setTo] = useState<PendingConnectionInfo>()

    const isActive = from !== undefined

    const reset = () => {
        setTo(undefined)
        setFrom(undefined)
    }

    const pendingConnectionDefaultValue  = { from, setFrom, to, setTo, isActive, reset}

    return (
        <PendingConnectionContext.Provider value={pendingConnectionDefaultValue}>
            {children}
        </PendingConnectionContext.Provider>
    );
}