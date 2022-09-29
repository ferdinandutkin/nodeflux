import Xarrow from "react-xarrows";
import React, {MouseEventHandler, useState} from "react";
import {xarrowPropsType} from "react-xarrows/lib/types";
import {generateInputId, generateOutputId} from "../helpers/generateId";
import {useAppDispatch} from "../state/store";
import {disconnect} from "../state/reducers/connectionsReducer";
import {IConnection} from "../models/nodes/typings/IConnection";


export const Connection = ({from, to, id} : IConnection) => {

    const [isHovered, setIsHovered] = useState(false)

    const dispatch = useAppDispatch()

    const arrowProps : xarrowPropsType = {
        startAnchor : "right",
        endAnchor: "left",
        start: generateOutputId(from),
        end: generateInputId(to),
        color : isHovered ? "red" : "black",
        dashness : isHovered ? {strokeLen : 2, nonStrokeLen : 2} : false
    }

    const onMouseEnter : MouseEventHandler<HTMLDivElement> = () => {
        setIsHovered(true)
    }

    const onMouseLeave : MouseEventHandler<HTMLDivElement> = () => {
        setIsHovered(false)
    }

    const onDoubleClick : MouseEventHandler<HTMLDivElement> = () => {
        dispatch(disconnect(id))
    }

    return (
            <div onMouseEnter={onMouseEnter} onDoubleClick={onDoubleClick} onMouseLeave={onMouseLeave}>
                <Xarrow
                    {...arrowProps}
                />
            </div>
    )

}
