import {INodeInfo} from "../../models/nodes/typings/INode";
import {NodeType} from "../../models/nodes/NodeType";
import React from "react";
import {ButtonsNodeBody} from "./ButtonsNodeBody";

export type NodeBodyProps = {node : INodeInfo}


type NodeTypeBodyDictionary = {
    [key in NodeType]: (props: NodeBodyProps) => React.ReactNode
}



export const NodeBody = (props : NodeBodyProps) => {

    const {node} = props;
    const nodeTypeBodyDictionary : NodeTypeBodyDictionary = {
        default(props: NodeBodyProps): JSX.Element {
            return <div> DEFAULT </div>;
        }, end(props: NodeBodyProps): JSX.Element {
            return <div> END </div>;
        }, start(props: NodeBodyProps): JSX.Element {
            return <div> START </div>;
        },
        buttons : ButtonsNodeBody
    }

    return <div className="d-flex">
        {
            nodeTypeBodyDictionary[node.type](props)
        }
    </div>

}