import {INodeInfo, NodeType, Position} from "../models/INode";
import './Node.css'
import {Input} from "./Input";
import {Output} from "./Output";
import Draggable from "react-draggable";
import React from "react";
import {useXarrow} from "react-xarrows";

export type DragType = "none" | "ghost" | "material"
export type NodeProps = {node : INodeInfo, dragType : DragType | undefined}
type TypeColorDict = {
    [key in NodeType]: string;
};

const Node = (props: NodeProps) => {
    const {node} = props
    const dragType = props.dragType ?? "none"

    let nodeColors : TypeColorDict = {
        "start" : "red",
        "default" : "yellow",
        "end" : "blue"
    }
    let styles : React.CSSProperties = {
        width: `${node.dimensions.X}px`,
        height: `${node.dimensions.Y}px`,
        backgroundColor: nodeColors[node.type]
    }

    if (dragType === "material") {
        const {X, Y} = node.position
        styles["transform"] = `translateX(${X}px) translateY(${Y}px)`
    }



    return (
            <WrapConditionally dragType={dragType} position={node.position}>
                <div className={"node"} style={styles} draggable={dragType === "ghost"}>
                    {node.id}
                    <div className="row">
                        <div className="col">
                            {
                                node.inputs.map((id, idx) => <Input key={idx} index={idx} from={id} to={node.id}/>)
                            }
                        </div>
                        <div className="col">
                            {
                                node.outputs.map((id, idx)  => <Output key={idx} index={idx} from={node.id} to={id}/>)
                            }
                        </div>
                    </div>
                </div>
            </WrapConditionally>

    )


}


const WrapConditionally = ({dragType, children, position} : {dragType : DragType, children : JSX.Element, position : Position}) => {
    if (dragType === "material") {

        return  <WrapperComponent position={position}>{children}</WrapperComponent>
    }
    return children
}

const WrapperComponent = ({children, position} : { children : JSX.Element, position : Position}) => {
    const updateXarrow = useXarrow();

    return (<Draggable defaultPosition={{x : position.X, y : position.Y}}  onDrag={updateXarrow} onStop={updateXarrow}>
                {children}
            </Draggable>)
}



export default Node