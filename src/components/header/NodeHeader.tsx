import {INodeInfo} from "../../models/nodes/typings/INode";
import {NodeType} from "../../models/nodes/NodeType";
import React from "react";


export type NodeHeaderProps = {node : INodeInfo}


type NodeTypeHeaderDictionary = {
    [key in NodeType] : (props : NodeHeaderProps) => JSX.Element
}



export const NodeHeader = (props : NodeHeaderProps) => {

    const {node} = props;
    const nodeTypeBodyDictionary : NodeTypeHeaderDictionary = {
        default(props: NodeHeaderProps): JSX.Element {
            return <div> Default </div>;
        }, end(props: NodeHeaderProps): JSX.Element {
            return <div> End </div>;
        }, start(props: NodeHeaderProps): JSX.Element {
            return <div> Start </div>;
        },
        buttons(props: NodeHeaderProps): JSX.Element {
            return <div> Button Node </div>;
        },
    }

    return nodeTypeBodyDictionary[node.type](props)

}