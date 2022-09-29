import {createContext, useContext} from "react";

export type FieldState = {
    isWithinField : boolean
}

export const FieldContext = createContext<FieldState>({isWithinField : false});

export const useFieldContext = () => useContext(FieldContext);

