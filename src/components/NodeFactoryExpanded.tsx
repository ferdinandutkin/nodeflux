
import React, {MouseEventHandler} from "react";
import {Node} from "./node/Node";
import {INodeFactory} from "../models/INodeFactory";
import {useDndContext} from "../state/DndContext";
import Draggable from "react-draggable";



export type NodeFactoryProps = {factory : INodeFactory}
export const NodeFactoryExpanded = ({factory} : NodeFactoryProps) => {
    const {drag, dragLeave} = useDndContext()!

    const factoryRef = React.useRef<HTMLDivElement>(null);

    const onMouseUp: MouseEventHandler<HTMLDivElement> = (e) => {
        dragLeave();
    }

    const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
        const relativePosition = {x: e.clientX - factoryRef.current!.offsetLeft, y: e.clientY - factoryRef.current!.offsetTop}
        drag({dragged: factory.createInstance(), relativePosition : relativePosition})
    }

    return (
        <div ref={factoryRef} onMouseUp={onMouseUp} onMouseDown={onMouseDown}>
            <Node node={factory.preview} dragType="ghost"/>
        </div>)

}
