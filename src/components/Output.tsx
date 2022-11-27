import React, {MouseEventHandler} from 'react';
import "./Output.css"
import {usePendingConnectionContext} from "../state/PendingConnectionContext";
import {generateOutputId} from "../helpers/generateId";
import {OutputPort} from "../models/typings/INode";

export const Output = ({id} : OutputPort) => {
    const setFrom = usePendingConnectionContext()?.setFrom

    const onMouseDown : MouseEventHandler<HTMLDivElement> = e => {
        e.stopPropagation()
        e.preventDefault()

        setFrom?.(id)

    }

    return <div id={generateOutputId(id!)} className="io-port output-port" onMouseDown={onMouseDown}/>

}