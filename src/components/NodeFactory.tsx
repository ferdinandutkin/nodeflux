
import React, {MouseEventHandler} from "react";
import {Node} from "./node/Node";
import {INodeFactory} from "../models/INodeFactory";
import {useDndContext} from "../state/DndContext";
import Draggable from "react-draggable";



export type NodeFactoryProps = {factory : INodeFactory, type : "expanded" | "collapsed"}
export const NodeFactory = ({factory, type} : NodeFactoryProps) => {
    const {drag, dragLeave} = useDndContext()!

    const factoryRef = React.useRef<HTMLDivElement>(null);

    const onMouseUp: MouseEventHandler<HTMLDivElement> = (e) => {
        dragLeave();
    }

    const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
        const rect = factoryRef.current!.getBoundingClientRect();
        const relativePosition = {x: e.clientX - rect.x, y: e.clientY - rect.y}
        drag({dragged: factory.createInstance(), relativePosition : relativePosition})
    }

    return (type === "expanded")?
                <div ref={factoryRef} onMouseUp={onMouseUp} onMouseDown={onMouseDown}>
                    <Node node={factory.preview} dragType="ghost"/>
                </div>
                :
                <div ref={factoryRef} onMouseUp={onMouseUp} onMouseDown={onMouseDown} draggable={true}>
                    {factory.preview.type}
                </div>
}

