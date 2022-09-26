import { Identifier} from "../models/nodes/INode";
import {createContext, useContext} from "react";


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

