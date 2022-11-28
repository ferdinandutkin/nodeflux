import Grid from "@mui/material/Unstable_Grid2";
import {Box} from "@mui/material";
import {BotAvatar} from "./BotAvatar";
import {BotSubheader} from "./BotSubheader";
import React from "react";
import {Identifier} from "../../models/typings/INode";
import {useBot} from "../../state/store";

export const BotInfo = ({id} : {id : Identifier}) => {

    const bot = useBot(id)

    return (
        <Grid>
            <Grid xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, justifyContent: 'center'}}>
                    <BotAvatar avatar={bot.avatar}/>
                </Box>
            </Grid>
            <Grid xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center',  justifyContent: 'center', marginY: 1 }}>
                    {bot.name}
                </Box>
            </Grid>
            <Grid xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center',  justifyContent: 'center', marginY: 1 }}>
                    <BotSubheader username={bot.username}/>
                </Box>
            </Grid>
        </Grid>
    )
}
