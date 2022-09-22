import { identifier} from "../models/INode";
import {createContext, useContext} from "react";

export type PendingConnectionInfo = {id : identifier, index : number} | undefined
export type PendingConnectionContextState = {
    from : PendingConnectionInfo
    to : PendingConnectionInfo
    isActive : boolean
    reset : () => void
    setTo : (to : PendingConnectionInfo) => void
    setFrom : (from : PendingConnectionInfo) => void
}

export const PendingConnectionContext = createContext<PendingConnectionContextState | undefined>(undefined);

export const usePendingConnectionContext = () => useContext(PendingConnectionContext);

