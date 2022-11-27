import {useDndContext} from "../state/DndContext";
import React, {MouseEventHandler} from "react";
import Draggable from "react-draggable";
import {NodeFactoryProps} from "./NodeFactoryExpanded";

export const NodeFactoryCollapsed = ({factory} : NodeFactoryProps) => {
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
        <div ref={factoryRef} onMouseUp={onMouseUp} onMouseDown={onMouseDown} draggable={true}>
            {factory.preview.type}
        </div>)

}
