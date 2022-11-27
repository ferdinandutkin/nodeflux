import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../state/store";
import {startReceivingLogs, stopReceivingLogs} from "../state/reducers/logsReduces";
import Grid from "@mui/material/Unstable_Grid2";
import {Box, Paper} from "@mui/material";
import {BotInstanceControls} from "./bot/BotInstanceControls";
import {LogTerminal} from "./LogTerminal";
import {AddBot} from "./forms/addBot/AddBot";
import {Bot} from "./bot/Bot";


export const Logs = () => {

    const {botId} = useParams();

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (botId) {
            dispatch(startReceivingLogs(botId))
        }

        return () => {
            dispatch(stopReceivingLogs)
        }
    }, [])

    if (!botId) {
        return null
    }


    return (
        <Box display="flex" flexDirection="column">
            <Grid container sx={{minHeight:  '100%',  flexGrow: 1}} alignItems="stretch">
                <Grid xs={2}>
                    <BotInstanceControls id={botId}/>

                </Grid>
                <Grid xs={10} >
                    <LogTerminal/>
                </Grid>
            </Grid>
        </Box>

    )
}
