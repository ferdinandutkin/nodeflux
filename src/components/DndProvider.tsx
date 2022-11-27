import React, {useState} from 'react';
import {DndContext} from '../state/DndContext';
import {INodeInfo, Position} from "../models/typings/INode";


export const DndProvider = ({children}: {children : React.ReactNode}) => {
    const [isOverDropZone, setIsOverDropZone] = useState(false)
    const [dragged, setDragged] = useState<INodeInfo>()
    const [relativePosition, setRelativePosition] = useState<Position>();

    const drag = ({dragged, relativePosition} : {dragged : INodeInfo, relativePosition : Position}) => {
        setDragged(dragged)
        setRelativePosition(relativePosition)
    }

    const drop = () => {
        console.log("drop?")
        if (isOverDropZone) {
            console.log("drop!")
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
