import React, {useState} from 'react';
import {INodeInfo, Position} from "../models/nodes/typings/INode";
import {DndContext} from '../state/DndContext';


export const DndProvider = ({children}: {children : React.ReactNode}) => {
    const [isOverDropZone, setIsOverDropZone] = useState(false)
    const [dragged, setDragged] = useState<INodeInfo>()
    const [relativePosition, setRelativePosition] = useState<Position>();

    const drag = ({dragged, relativePosition} : {dragged : INodeInfo, relativePosition : Position}) => {
        setDragged(dragged)
        setRelativePosition(relativePosition)
    }

    const drop = () => {
        if (isOverDropZone) {
            setDragged(undefined)
            setRelativePosition(undefined)
        }
        setIsOverDropZone(false)
    }

    const dragLeave = () => {
        setIsOverDropZone(false)
        setDragged(undefined)
    }

    const isDragging = dragged !== undefined

    const isDraggingOverDropZone = isDragging && isOverDropZone;

    const dndDefaultValue = {drag, drop, dragLeave, relativePosition, dragged, isOverDropZone, isDragging, isDraggingOverDropZone, setIsOverDropZone }

    return (
        <DndContext.Provider value={dndDefaultValue}>
            {children}
        </DndContext.Provider>
    );
}