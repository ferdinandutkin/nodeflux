import {NodeType} from "../../../models/nodes/NodeType";
import React from "react";
import {ButtonsNodeBody} from "./ButtonsNodeBody";
import {INodeInfo} from "../../../models/typings/INode";
import {TextNodeBody} from "./TextNodeBody";
import {CommandsNodeBody} from "./CommandsNodeBody";

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
        keyboard(props: NodeBodyProps): JSX.Element {
            return <div> Keyboard </div>;
        },
        text: TextNodeBody,
        commands : CommandsNodeBody,
        buttons : ButtonsNodeBody
    }

    return <div className="d-flex justify-content-center">
        {
            nodeTypeBodyDictionary[node.type](props)
        }
    </div>

}
