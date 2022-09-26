import React, {useState} from 'react';
import {
    PendingConnectionContext,
} from "../state/PendingConnectionContext";
import {Identifier} from "../models/nodes/INode";


export const PendingConnectionProvider = ({children}: {children : React.ReactNode}) => {

    const [from, setFrom] = useState<Identifier>()

    const [to, setTo] = useState<Identifier>()

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