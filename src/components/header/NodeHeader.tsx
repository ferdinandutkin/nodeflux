import {INodeInfo} from "../../models/nodes/typings/INode";
import {NodeType} from "../../models/nodes/NodeType";
import "./NodeHeader.css"
import React from "react";
import {ButtonsNodeHeader} from "./ButtonsNodeHeader";


export type NodeHeaderProps = {node : INodeInfo}


type NodeTypeHeaderDictionary = {
    [key in NodeType] : (props : NodeHeaderProps) => React.ReactNode
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
        buttons: ButtonsNodeHeader,
    }

    return <div className="header">{nodeTypeBodyDictionary[props.node.type](props)}</div>




}