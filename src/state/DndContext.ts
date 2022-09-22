import {INodeInfo, Position} from "../models/INode";
import {createContext, useContext} from "react";

export type DndContextState = {
    drag : ({dragged, relativePosition} : {dragged : INodeInfo, relativePosition : Position}) => void
    drop : () => void
    dragged : INodeInfo | undefined,
    dragLeave : () => void
    isOverDropZone : boolean,
    isDragging :  boolean
    relativePosition : Position | undefined,
    isDraggingOverDropZone : boolean
    setIsOverDropZone : (isDragged : boolean) => void

}

export const DndContext = createContext<DndContextState | undefined>(undefined);

export const useDndContext = () => useContext(DndContext);

