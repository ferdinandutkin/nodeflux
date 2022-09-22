
import React from 'react';
import "./Input.css"
import {InputProps} from "./TransputProps";
import {usePendingConnectionContext} from "../state/PendingConnectionContext";

export const Input = ({from, to, index} : InputProps) => {
    const setTo = usePendingConnectionContext()?.setTo
    const onMouseDown : React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation()
        if (from == null) {
            setTo?.({id : to, index})
        }
    }
    return <div className="input-port" id={`input-${from}-${to}`} onMouseDown={onMouseDown}/>

}