import {ReactNode} from "react";
import {NameStep} from "./NameStep";
import {useAddFormContext} from "../state/context";
import {KeyStep} from "./KeyStep";
import {Done} from './Done'

export const CurrentStep = () => {

    const {step} = useAddFormContext()!

    const stepMap : Record<number, ReactNode> = {
        0 : <KeyStep/>,
        1 : <NameStep/>,
        2 : <Done/>
    };

    return (<>
        {
        stepMap[step] || null
        }
    </>)


}