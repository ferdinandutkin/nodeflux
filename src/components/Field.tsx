import Nodes from "./Nodes";
import Connections from "./Connections";
import {Xwrapper} from "react-xarrows";
import React, {DragEventHandler} from "react";
import {useAppDispatch} from "../state/store";
import {add} from "../state/reducers/nodesReducer";
import './Field.css'
import {useDndContext} from "../state/DndContext";
const Field = () => {


    const {isDraggingOverDropZone, isOverDropZone, dragged, relativePosition, setIsOverDropZone, drop, dragLeave} = useDndContext()!

    const dispatch = useAppDispatch()

    const fieldRef = React.useRef<HTMLDivElement>(null);

    const onDragEnter : DragEventHandler<HTMLDivElement> = (e) => {
        setIsOverDropZone(true)
    }

    const onDragLeave : DragEventHandler<HTMLDivElement> = (e) => {
        console.log("dragLeave")
        dragLeave()
    }

    const onDragOver : DragEventHandler<HTMLDivElement> = (e) => {
       e.preventDefault()
    }

    const onDrop : DragEventHandler<HTMLDivElement> = (e) => {
        console.log("onDrop", e)
        if (isDraggingOverDropZone) {

            const position = {
                X : e.clientX - fieldRef.current!.offsetLeft - (relativePosition?.X ?? 0),
                Y : e.clientY - fieldRef.current!.offsetTop - (relativePosition?.Y ?? 0)}
            dispatch(add({...dragged!, position}))
            drop()
        }


    }


    const style : React.CSSProperties = {
        pointerEvents : isOverDropZone ? "none" : "auto"
    }


    return (
        <div className={"field"} ref={fieldRef} onDragEnter={onDragEnter} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
            <div style={style}>
                <Xwrapper>
                    <Nodes/>
                    <Connections/>
                 </Xwrapper>
            </div>
        </div>);
}

export default Field;



