import React, {ChangeEventHandler, CSSProperties, ReactNode, useEffect, useState} from "react";
import {useDebounce} from "../../hooks/useDebouce";
import {Input, InputAdornment} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';



export type InputVariant = "area" | "input"


export type BaseDebouncedInputProps = {
    formatter? : (value : string) => string,
    variant : InputVariant,
    adornment? : ReactNode,
    onChange : (value : string) => void, delay : number, className? : string, value? : string, readOnly? : boolean
}

export type InputVariantDebouncedInputProps = BaseDebouncedInputProps & {
    variant : "input"
}

export type TextAreaVariantDebouncedInputProps = BaseDebouncedInputProps & {
    variant : "area"
    rows : number,
    cols : number

}


export const DebouncedInput = (props : InputVariantDebouncedInputProps | TextAreaVariantDebouncedInputProps) => {

    const {onChange, delay, className, value, readOnly, formatter, adornment} = props;

    const [text, setText] = useState(value ?? '');

    const debouncedText = useDebounce(text, delay);

    const style : CSSProperties = {
        width: "100%"
    }

    useEffect(() => {
        onChange(debouncedText)
    }, [debouncedText])

    const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setText(formatter? formatter(e.target.value) : e.target.value)
    }

    if (props.variant === "input") {
        return <Input style={style} readOnly={readOnly} className={className} onChange={handleChange} value={text} endAdornment={adornment}/>
    }

    return <textarea style={style} readOnly={readOnly} className={className} cols={props.cols} rows={props.rows}  onChange={handleChange}  value={text}/>

}
