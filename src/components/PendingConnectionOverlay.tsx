import './PendingConnectionOverlay.css'
import useLeftClickState from "../hooks/useMouseState";
import {usePendingConnectionContext} from "../state/PendingConnectionContext";
import Xarrow from "react-xarrows";
import React, {useEffect, useRef} from "react";
import useMousePosition from "../hooks/useMousePosition";
import {useAppDispatch} from "../state/store";
import {connect} from "../state/reducers/nodesReducer";

export const PendingConnectionOverlay = () => {
    const {isActive, reset, from, to} = usePendingConnectionContext()!
    const leftClickState = useLeftClickState()
    const mousePosition = useMousePosition()!
    const dispatcher = useAppDispatch()!

    const overlayDiv = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (leftClickState === "pressed" && isActive) {
            reset()
        }
    }, [leftClickState, isActive, reset])

    useEffect(() => {
        if (from !== undefined && to !== undefined) {
            dispatcher(connect({from, to}))
            reset()
        }
    }, [from, to, dispatcher, reset])



    if (isActive) {

        const Y = mousePosition.Y - overlayDiv.current!.offsetTop
        const X = mousePosition.X - overlayDiv.current!.offsetLeft

        const arrowTargetStyle : React.CSSProperties = {
            display : "hidden",
            position : "absolute",
            transform : `translateX(${X}px) translateY(${Y}px)`
        }


        return (
            <div className="overlay" ref={overlayDiv}>
                <Xarrow start={`output-${from!.id}-null`} dashness={{strokeLen : 3, nonStrokeLen : 1}} end="arrowTarget"/>
                <div id="arrowTarget"  style={arrowTargetStyle}/>
            </div>
            )
    }

    return <div ref={overlayDiv}/>;
}

