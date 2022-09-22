import React from 'react';
import {OutputProps} from "./TransputProps";
import "./Output.css"
import {usePendingConnectionContext} from "../state/PendingConnectionContext";

export const Output = ({from, to, index} : OutputProps) => {
    const setFrom = usePendingConnectionContext()?.setFrom
    const onMouseDown : React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation()
        e.preventDefault()
        if (to == null) {
            setFrom?.({id : from, index})
        }
    }

    return <div id={`output-${from}-${to}`} onMouseDown={onMouseDown} className="output-port"/>

}