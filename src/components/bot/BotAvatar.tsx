import {Avatar} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import * as React from "react";

export const BotAvatar = ({avatar} : {avatar : string | null}) =>
    avatar ?
        <Avatar src={`data:image/jpeg;base64,${avatar}`}/>
        :
        <Avatar><SmartToyIcon/></Avatar>