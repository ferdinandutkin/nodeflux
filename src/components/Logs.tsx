import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {useAppDispatch} from "../state/store";
import {startReceivingLogs, stopReceivingLogs} from "../state/reducers/logsReduces";
import Grid from "@mui/material/Unstable_Grid2";
import {Box, Drawer} from "@mui/material";
import {BotInstanceControls} from "./bot/BotInstanceControls";
import {LogTerminal} from "./LogTerminal";
import {appBarHeight} from "./Layout";
import {BotInfo} from "./bot/BotInfo";


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
    const drawerWidth = 240


    return (
        <Box display="flex" flexDirection="column">
            <Grid container sx={{minHeight:  '100%',  flexGrow: 1}} alignItems="stretch">
                <Grid xs={2}>
                    <Drawer
                        variant="permanent"
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            padding : 2,
                            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', zIndex: 2,  mt: appBarHeight }
                        }}
                    >
                        <BotInfo id={botId}/>
                        <Grid xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, justifyContent: 'center'}}>
                                <BotInstanceControls id={botId}/>
                            </Box>
                        </Grid>
                    </Drawer>
                </Grid>
                <Grid xs={10} >
                    <LogTerminal/>
                </Grid>
            </Grid>
        </Box>

    )
}
