import Xarrow from "react-xarrows";
import {connectedNodeIdentifier, identifier} from "../models/INode";
import React, {useState} from "react";
import {xarrowPropsType} from "react-xarrows/lib/types";
import {useAppDispatch} from "../state/store";

export type ConnectionProps = {from : identifier, to : connectedNodeIdentifier}
export const Connection = ({from, to} : ConnectionProps) => {

    const [isHovered, setIsHovered] = useState(false)

    const dispatch = useAppDispatch()

    if (to === null) {
        return null
    }


    const arrowProps : xarrowPropsType = {
        startAnchor : "right",
        endAnchor: "left",
        start: `output-${from}-${to}`,
        end:`input-${from}-${to}`,
        color : isHovered ? "red" : "black",
        dashness : isHovered ? {strokeLen : 2, nonStrokeLen : 2} : false
    }
    const onMouseEnter : React.MouseEventHandler<HTMLDivElement> = (e) => {
        setIsHovered(true)
    }

    const onMouseLeave : React.MouseEventHandler<HTMLDivElement> = (e) => {
        setIsHovered(false)
    }

    const onDoubleClick : React.MouseEventHandler<HTMLDivElement> = (e) => {

    }



    return (
        <div onMouseEnter={onMouseEnter} onDoubleClick={onDoubleClick} onMouseLeave={onMouseLeave}>
            <Xarrow
                {...arrowProps}
            />
        </div>

    )

}
