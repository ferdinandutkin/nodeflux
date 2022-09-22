
import React, {MouseEventHandler} from "react";
import Node from "./Node";
import {INodeFactory} from "../models/INodeFactory";
import {useDndContext} from "../state/DndContext";



type NodeFactoryProps = {factory : INodeFactory}
export const NodeFactory = ({factory} : NodeFactoryProps) => {
    const {drag, dragLeave} = useDndContext()!

    const factoryRef = React.useRef<HTMLDivElement>(null);

    const onMouseUp: MouseEventHandler<HTMLDivElement> = (e) => {
        dragLeave();
    }

    const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
        const relativePosition = {X : e.clientX - factoryRef.current!.offsetLeft, Y : e.clientY - factoryRef.current!.offsetTop}
        drag({dragged: factory.createInstance(), relativePosition : relativePosition})
    }

    return (
        <div ref={factoryRef} onMouseUp={onMouseUp} onMouseDown={onMouseDown}>
            <Node node={factory.preview} dragType="ghost"/>
        </div>)

}