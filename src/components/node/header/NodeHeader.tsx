import {NodeType} from "../../../models/nodes/NodeType";
import "./NodeHeader.css"
import React from "react";
import {EditableHeader} from "./EditableHeader";
import {INodeInfo} from "../../../models/typings/INode";

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
        keyboard:  EditableHeader,
        buttons: EditableHeader,
        commands : EditableHeader,
        text(props: NodeHeaderProps): JSX.Element {
            return <div> Text </div>
        }
    }

    return <div className="header justify-content-center">{nodeTypeBodyDictionary[props.node.type](props)}</div>




}
