import Nodes from "./Nodes";
import Connections from "./Connections";
import {Xwrapper} from "react-xarrows";
import React, {CSSProperties, DragEventHandler} from "react";
import {useAppDispatch} from "../state/store";
import {add} from "../state/reducers/nodesReducer";
import './Field.css'
import useWindowScroll from "../hooks/useWindowScroll";
import {useDndContext} from "../state/DndContext";
import {FieldContext} from "../state/FieldContext";
export const Field = () => {
    const {isDraggingOverDropZone, isOverDropZone, dragged, relativePosition, setIsOverDropZone, drop, dragLeave} = useDndContext()!

    const dispatch = useAppDispatch()
    
    const scroll = useWindowScroll()

    const fieldRef = React.useRef<HTMLDivElement>(null);

    const onDragEnter : DragEventHandler<HTMLDivElement> = (e) => {
        console.log("dragEnter")
        if (dragged) {
            setIsOverDropZone(true)
        }

    }

    const onDragLeave : DragEventHandler<HTMLDivElement> = (e) => {
        if (e.target === fieldRef.current) {
            console.log("dragLeave")
            dragLeave()
        }

    }

    const onDragOver : DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault()
    }

    const onDrop : DragEventHandler<HTMLDivElement> = (e) => {
        if (isDraggingOverDropZone) {
            const position = {
                x: e.clientX - fieldRef.current!.offsetLeft - (relativePosition?.x ?? 0) + scroll.x,
                y: e.clientY - fieldRef.current!.offsetTop - (relativePosition?.y ?? 0) + scroll.y
            }
            dispatch(add({...dragged!, position}))
            drop()
        }


    }

    const style : CSSProperties = {
        pointerEvents : isOverDropZone ? "none" : "auto"
    }




    return (

        <div className="field" ref={fieldRef} onDragEnter={onDragEnter} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
            <FieldContext.Provider value={{isWithinField: true}}>
                <Xwrapper>
                <div style={style}>
                        <Nodes/>
                        <Connections/>
                </div>
                </Xwrapper>
            </FieldContext.Provider>
        </div>
        );
}




