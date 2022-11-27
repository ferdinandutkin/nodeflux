import Xarrow from "react-xarrows";
import "./Connection.css"
import React, {MouseEventHandler, useState} from "react";
import {xarrowPropsType} from "react-xarrows/lib/types";
import {generateInputId, generateOutputId} from "../helpers/generateId";
import {useAppDispatch, useInputOwner, useOutputOwner} from "../state/store";
import {disconnect} from "../state/reducers/connectionsReducer";
import {IConnection} from "../models/typings/IConnection";
import {getNodeColor} from "./node/nodeStyleInfo";


export const Connection = ({from, to, id} : IConnection) => {

    const [isHovered, setIsHovered] = useState(false)

    const dispatch = useAppDispatch()

    const source = useOutputOwner(from).type

    const target = useInputOwner(to).type

    const arrowProps : xarrowPropsType = {
        passProps: {

        },
        arrowBodyProps : {
            id,
            className : 'connection',
            stroke: `url(#linear-gradient-${from}-${to})`
        },
        arrowHeadProps : {
            fill: getNodeColor(target),
            className: 'head'
        },
        startAnchor : 'right',
        endAnchor: 'left',
        start: generateOutputId(from),
        end: generateInputId(to),
        color : getNodeColor(target),
        dashness : isHovered ? {strokeLen : 2, nonStrokeLen : 2} : false

    }

    const onMouseEnter : MouseEventHandler<HTMLDivElement> = (e ) => {
        if ((e.target as HTMLDivElement).id === id) {
            setIsHovered(true)
        }
    }

    const onMouseLeave : MouseEventHandler<HTMLDivElement> = (e) => {
        setIsHovered(false)
    }

    const onDoubleClick : MouseEventHandler<HTMLDivElement> = (e) => {
        if ((e.target as HTMLDivElement).id === id) {
            dispatch(disconnect(id))
        }
    }

    return (
            <>
                <div onMouseEnter={onMouseEnter} onDoubleClick={onDoubleClick} onMouseLeave={onMouseLeave}>
                    <Xarrow
                        {...arrowProps}
                    />
                    <svg>
                        <defs>
                            <linearGradient id={`linear-gradient-${from}-${to}`} gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor={getNodeColor(source)} />
                                <stop offset="25%" stopColor={getNodeColor(target)} />
                                <stop offset="100%" stopColor={getNodeColor(target)} />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </>)


}
