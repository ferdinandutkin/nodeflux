import './Node.css'
import {Input} from "../Input";
import {Output} from "../Output";
import Draggable from "react-draggable";
import React, {MouseEvent, ReactNode, useState} from "react";
import {useXarrow} from "react-xarrows";
import {NodeBody} from "./body/NodeBody";
import {NodeHeader} from "./header/NodeHeader";
import {INodeInfo, Position} from "../../models/typings/INode";
import {ViewType} from "../BackPanel";
import {NodeMenu} from "../NodeMenu";
import {getNodeColor} from "./nodeStyleInfo";
import {useFieldContext} from "../../state/FieldContext";


export type DragType = "none" | "ghost" | "material"
export type NodeProps = {node : INodeInfo, dragType : DragType | undefined}

export const Node = (props: NodeProps) => {
    const {node} = props
    const dragType = props.dragType ?? "none"

    const [viewType, setViewType] = useState<ViewType>("expanded")

    const {isWithinField} = useFieldContext()

    let styles : React.CSSProperties = {
        width: `${node.dimensions.x}px`,
        height: `${node.dimensions.y}px`,
        backgroundColor: getNodeColor(node.type)
    }

    if (dragType === "material") {
        const {x, y} = node.position
        styles["transform"] = `translateX(${x}px) translateY(${y}px)`
    }



    const [anchorEl, setAnchorEl] = React.useState<undefined | HTMLElement>();


    const onMenuClick = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        setAnchorEl(event.currentTarget)
        return false
    };


    return (
        <>
            {isWithinField?   <NodeMenu anchor={anchorEl} setAnchor={setAnchorEl} node={node} viewType={viewType} setViewType={setViewType}/> : null}
            <WrapConditionally dragType={dragType} position={node.position}>
                {(viewType === "expanded")? (
                        <div className="node" style={styles} draggable={dragType === "ghost"} onContextMenu={onMenuClick}>
                            <div className="row justify-content-center">
                                <NodeHeader node={node}/>
                            </div>
                            <div className="row">
                                <div className="col io-ports" >
                                    {
                                        node.inputs.map(input =>
                                            <Input key={input.id} {...input}/>)
                                    }
                                </div>
                                <div className="col-7">
                                    <NodeBody node={node}/>
                                </div>
                                <div className="col io-ports">
                                    {
                                        node.outputs.map(output =>
                                            <Output key={output.id} {...output}/>)
                                    }
                                </div>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className="node collapsed" draggable={dragType === "ghost"} onContextMenu={onMenuClick}>
                            {node.type}
                            <div className="row">
                                <div className="col io-ports" >
                                    {
                                        node.inputs.map(input =>
                                            <Input key={input.id} {...input}/>)
                                    }
                                </div>
                                <div className="col-7">
                                </div>
                                <div className="col io-ports">
                                    {
                                        node.outputs.map(output =>
                                            <Output key={output.id} {...output}/>)
                                    }
                                </div>
                            </div>
                        </div>
                    )}
            </WrapConditionally>
        </>


    )


}




const WrapConditionally = ({dragType, children, position} : {dragType : DragType, children : ReactNode, position : Position}) : JSX.Element =>
    (dragType === "material") ?
        <WrapperComponent position={position}>{children}</WrapperComponent> : children as JSX.Element;



const WrapperComponent = ({children, position} : { children : ReactNode, position : Position}) => {
    const updateXarrow = useXarrow();

    return (<Draggable defaultPosition={{x : position.x, y : position.y}} onDrag={updateXarrow} onStop={updateXarrow}>
                {children}
            </Draggable>)
}





