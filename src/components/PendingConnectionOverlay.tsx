import './PendingConnectionOverlay.css'
import useLeftClickState from "../hooks/useMouseState";
import {usePendingConnectionContext} from "../state/PendingConnectionContext";
import Xarrow from "react-xarrows";
import {CSSProperties, useEffect, useRef} from "react";
import useMousePosition from "../hooks/useMousePosition";
import {useAppDispatch} from "../state/store";
import {connect} from "../state/reducers/connectionsReducer";
import useWindowScroll from "../hooks/useWindowScroll";
import {generateInputId, generateOutputId} from "../helpers/generateId";
import {xarrowPropsType} from "react-xarrows/lib/types";

export const PendingConnectionOverlay = () => {
    const {isActive, reset, from, to} = usePendingConnectionContext()!
    const leftClickState = useLeftClickState()
    const mousePosition = useMousePosition()!
    const windowScroll = useWindowScroll()
    const dispatcher = useAppDispatch()!

    const overlayDiv = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (leftClickState === "pressed" && isActive) {
            reset()
        }
    }, [leftClickState, isActive])

    useEffect(() => {
        if (from && to) {
            dispatcher(connect({from, to}))
            reset()
        }
    }, [from, to])



    if (isActive) {


        const Y = mousePosition.y - overlayDiv.current!.offsetTop + windowScroll.y
        const X = mousePosition.x - overlayDiv.current!.offsetLeft + windowScroll.x


        const arrowProps : xarrowPropsType = {
            startAnchor : "right",
            endAnchor: "left",
            start: generateOutputId(from!),
            end: "arrowTarget",
            dashness: {strokeLen : 3, nonStrokeLen : 1},
        }

        const arrowTargetStyle : CSSProperties = {
            display : "hidden",
            position : "absolute",
            transform : `translateX(${X}px) translateY(${Y}px)`
        }


        return (
            <div className="overlay" ref={overlayDiv}>
                <Xarrow {...arrowProps}/>
                <div id="arrowTarget"  style={arrowTargetStyle}/>
            </div>
            )
    }

    return <div ref={overlayDiv}/>;
}

