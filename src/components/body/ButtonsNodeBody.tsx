import React, {MouseEventHandler} from "react";
import {useAppDispatch} from "../../state/store";
import {DebouncedInput} from "../misc/DebouncedInput";
import "./TwoButtonsNodeBody.css"
import {NodeBodyProps} from "./NodeBody";
import {OutputPort} from "../../models/nodes/typings/INode";
import {addOutput, changeOutputLabel} from "../../state/reducers/nodesReducer";
import {useFieldContext} from "../../state/FieldContext";
import {getMaxOutputsCount} from "../../models/nodeTypesInfo";

const NodeOutputTextInput = ({id, label} : OutputPort) => {
    const dispatch = useAppDispatch()

    const {isWithinField} = useFieldContext()

    const onChanged = (newLabel : string) => {
       dispatch(changeOutputLabel({id, label: newLabel}))
    }

    return  <DebouncedInput readOnly={!isWithinField} className="node-input" delay={500} value={label} onChange={onChanged}/>

}
export const ButtonsNodeBody = (props : NodeBodyProps) => {
    const dispatch = useAppDispatch()

    const onClick : MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(addOutput({nodeId : props.node.id}))
    }

    return(
        <div>
            {props.node.outputs.map(output =>
               <div className="row" key={output.id}>
                   <NodeOutputTextInput  {...output}/>
               </div>)
            }
            {
                (props.node.outputs.length < getMaxOutputsCount(props.node.type))?
                <div className="row" key="add-new" >
                    <button className="node-input" onClick={onClick}>+</button>
                </div>
                    :
                    null
            }


        </div>)

}