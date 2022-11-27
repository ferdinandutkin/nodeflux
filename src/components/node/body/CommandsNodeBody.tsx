import React, {MouseEventHandler} from "react";
import {useAppDispatch, useNodeOutputs, useNodes} from "../../../state/store";
import "./ButtonsNodeBody.css"
import {NodeBodyProps} from "./NodeBody";
import {addOutput} from "../../../state/reducers/nodesReducer";
import {getMaxOutputsCount} from "../../../models/nodeTypesInfo";
import { EditableLabelOutput } from "./EditableLabelOutput";
import {useFieldContext} from "../../../state/FieldContext";



export const CommandsNodeBody = (props : NodeBodyProps) => {
    const dispatch = useAppDispatch()

    const formatter = (value : string) => {
        if (value.startsWith('/')) {
            return value
        }
        return `/${value}`
    }

    const onClick : MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(addOutput({nodeId : props.node.id}))
    }

    const {isWithinField} = useFieldContext()

    let outputs = useNodeOutputs(props.node.id)

    if (!isWithinField) {
        outputs = props.node.outputs
    }

    return(
        <div>
            {outputs.map((output, number) =>
               <div className="row" key={output.id}>
                   <EditableLabelOutput canRemove={!!number}  {... output} formatter={formatter}/>
               </div>)
            }
            {
                (outputs.length < getMaxOutputsCount(props.node.type))?
                <div className="row" key="add-new" >
                    <button className="node-input" onClick={onClick}>+</button>
                </div>
                    :
                    null
            }
        </div>)

}



