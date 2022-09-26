import React, {MouseEventHandler, useState} from 'react';
import "./Input.css"
import {usePendingConnectionContext} from "../state/PendingConnectionContext";
import {useNodes} from "../state/store";
import {canConnect} from "../models/nodeTypesInfo";
import {generateInputId} from "../helpers/generateId";
import {InputPort} from "../models/nodes/INode";
type InputState = "default" | "rejected"

export const Input = ({ id, label} : InputPort) => {
    const context = usePendingConnectionContext()

    const from = context?.from

    const setTo = context?.setTo

    const [state, setState] = useState<InputState>("default")


    const toType =  useNodes(nodes => nodes.find(node => node.inputs.some(input => input.id === id)))?.type

    const fromType = useNodes(nodes => nodes.find(node => node.outputs.some(output => output.id === from)))?.type

    const onMouseDown : MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation()

        console.log({fromType, toType}, {from, id})
        if (fromType && toType && canConnect(fromType, toType)) {
                 setTo?.(id)
        }
        else {
                 setState("rejected")
        }
    }

    const onMouseLeave : MouseEventHandler<HTMLDivElement> = () => {
        setState("default")
    }
    return <div id={generateInputId(id)} className={`input-port ${state}`} onMouseDown={onMouseDown} onMouseLeave={onMouseLeave}/>

}