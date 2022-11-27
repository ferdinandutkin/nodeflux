
import {createContext, useContext} from "react";
import {Identifier} from "../models/typings/INode";


export type PendingConnectionContextState = {
    from? : Identifier
    to? : Identifier
    isActive : boolean
    reset : () => void
    setTo : (to : Identifier) => void
    setFrom : (from : Identifier) => void
}

export const PendingConnectionContext = createContext<PendingConnectionContextState | undefined>(undefined);

export const usePendingConnectionContext = () => useContext(PendingConnectionContext);

