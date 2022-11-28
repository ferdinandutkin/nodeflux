import {NodeBodyProps} from "./NodeBody";
import {useAppDispatch} from "../../../state/store";
import {changeText} from "../../../state/reducers/nodesReducer";
import {DebouncedInput} from "../../misc/DebouncedInput";
import React from "react";
import {useFieldContext} from "../../../state/FieldContext";
import {TextNodeData} from "../../../models/typings/TextNodeData";

export const TextNodeBody = ({node} : NodeBodyProps) => {
    const dispatch = useAppDispatch()

    const {isWithinField} = useFieldContext()

    const onChanged = (text : string) => {
        dispatch(changeText({id : node.id, text}))
    }

    const data = node.data as TextNodeData;

    return <DebouncedInput readOnly={!isWithinField} value={data.text} variant="area" onChange={onChanged} delay={500} rows={5} />

}
