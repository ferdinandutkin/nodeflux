import {useAddFormContext} from "../state/context";
import {useEffect} from "react";
import {addBot} from "../../../../state/reducers/botsReducer";
import {DoneAll} from "@mui/icons-material";
import {useAppDispatch} from "../../../../state/store";

export const Done = () => {

    const {name, key, reset} = useAddFormContext()!
    const dispatch = useAppDispatch();

     useEffect(() => {
         dispatch(addBot({name, key}))
         reset()

     }, [])


    return <DoneAll/>

}