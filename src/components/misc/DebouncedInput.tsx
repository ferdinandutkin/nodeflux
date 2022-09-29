import React, {ChangeEventHandler, FocusEventHandler, useEffect, useState} from "react";
import {useDebounce} from "../../hooks/useDebouce";

export const DebouncedInput =
    ({onChange, delay, className, value, readOnly} : {onChange : (value : string) => void, delay : number, className : string, value? : string, readOnly? : boolean}) => {

    const [text, setText] = useState('');

    const debouncedText = useDebounce(text, delay);

    useEffect(() => {
        onChange(debouncedText)
    }, [debouncedText, onChange])

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
       setText(e.target.value)
    }



    return <input readOnly={readOnly} className={className} onChange={handleChange} value={value}/>
}