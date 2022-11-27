import {useAppDispatch} from "../../../state/store";
import {useFieldContext} from "../../../state/FieldContext";
import {changeOutputLabel, removeOutput} from "../../../state/reducers/nodesReducer";
import {InputAdornment} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {DebouncedInput} from "../../misc/DebouncedInput";
import React, {ReactNode} from "react";
import {OutputPort} from "../../../models/typings/INode";

type EditableLabelOutputProps = OutputPort & {
    formatter? : (value : string) => string,
    canRemove? : boolean,
    adornment? : ReactNode}


export const EditableLabelOutput = ({id, label, formatter, canRemove} : EditableLabelOutputProps) => {
    const dispatch = useAppDispatch()

    const {isWithinField} = useFieldContext()

    const onChanged = (newLabel : string) => {
        dispatch(changeOutputLabel({id, label: newLabel}))
    }

    const clickHandler = () => {
        dispatch(removeOutput(id))
    }

    const adornment = <InputAdornment style={{cursor: "pointer"}} position="end" onClick={clickHandler}>
                        <CloseIcon />
                      </InputAdornment>

    return  <DebouncedInput variant="input"
                            formatter={formatter}
                            readOnly={!isWithinField}
                            className="node-input"
                            delay={500}
                            value={label}
                            onChange={onChanged}
                            adornment={canRemove? adornment : undefined}
    />

}
