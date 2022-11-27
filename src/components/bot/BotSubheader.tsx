import {Link as MUILink} from "@mui/material";
import * as React from "react";

export const BotSubheader = ({username} : {username: string}) =>
    <MUILink href={`https://t.me/${username}`}>
        {`@${username}`}
    </MUILink>
