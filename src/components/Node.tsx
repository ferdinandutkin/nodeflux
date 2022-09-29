import {INodeInfo, Position} from "../models/nodes/typings/INode";
import './Node.css'
import {Input} from "./Input";
import {Output} from "./Output";
import Draggable from "react-draggable";
import React, {ReactNode} from "react";
import {useXarrow} from "react-xarrows";
import {NodeType} from "../models/nodes/NodeType";
import {NodeBody} from "./body/NodeBody";
import {NodeHeader} from "./header/NodeHeader";


export type DragType = "none" | "ghost" | "material"
export type NodeProps = {node : INodeInfo, dragType : DragType | undefined}
type TypeColorDict = {
    [key in NodeType]: string;
};

export const Node = (props: NodeProps) => {
    const {node} = props
    const dragType = props.dragType ?? "none"

    let nodeColors : TypeColorDict = {
        "start" : "red",
        "default" : "yellow",
        "end" : "blue",
        "buttons" : "purple"
    }
    let styles : React.CSSProperties = {
        width: `${node.dimensions.x}px`,
        height: `${node.dimensions.y}px`,
        backgroundColor: nodeColors[node.type]
    }

    if (dragType === "material") {
        const {x, y} = node.position
        styles["transform"] = `translateX(${x}px) translateY(${y}px)`
    }



    return (
            <WrapConditionally dragType={dragType} position={node.position}>
                <div className="node" style={styles} draggable={dragType === "ghost"}>
                    <div className="row">
                        <NodeHeader node={props.node}/>
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
            </WrapConditionally>

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





