import {Identifier} from "../../models/typings/INode";
import {useAppDispatch, useBotState} from "../../state/store";
import {startBot, stopBot} from "../../state/reducers/botsReducer";
import {IconButton, Paper, Tooltip} from "@mui/material";
import {PlayArrow} from "@mui/icons-material";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import * as React from "react";
import {LoadingButton} from "@mui/lab";

export const BotInstanceControls = ({id} : {id : Identifier}) => {

    const dispatch = useAppDispatch()

    const onStartClick = () => {
        dispatch(startBot(id))
    }

    const onStopClick = () => {
        dispatch(stopBot(id))
    }

    const state = useBotState(id)

    const loading = state === "pending"
    const alreadyStopped = state === "stopped"
    const alreadyStarted = state === "running"

    return (
       <>
           <Tooltip title="Start">
               <span>
                   <LoadingButton
                       disabled={alreadyStarted}
                       onClick={onStartClick}
                       loading={loading}
                       startIcon={<PlayArrow/>}
                   />
               </span>
           </Tooltip>
           <Tooltip title="Stop">
               <span>
                    <LoadingButton
                        disabled={alreadyStopped}
                        onClick={onStopClick}
                        loading={loading}
                        startIcon={<StopCircleIcon/>}
                    />
               </span>
           </Tooltip>
       </>

        )

}

