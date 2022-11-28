import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    Menu, MenuItem,
    Tooltip,
    Typography
} from "@mui/material";
import {Bot as IBot} from '../../models/typings/Bot'
import BuildIcon from "@mui/icons-material/Build";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {CSSProperties, MouseEvent} from "react";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {removeBot} from "../../state/reducers/botsReducer";
import {Link} from "react-router-dom";
import * as React from "react";
import {BotAvatar} from "./BotAvatar";
import {BotSubheader} from "./BotSubheader";
import {BotInstanceControls} from "./BotInstanceControls";






export const Bot = ({bot, style} : {bot : IBot, style : CSSProperties}) => {

    const dispatch = useAppDispatch()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLButtonElement>(null);

    const onDeleteClick = () => {
        dispatch(removeBot(bot.id))
    }

    const onMoreClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    };

    const closeMenu = () => {
        setAnchorEl(null)
    }



    return (<Card style={style}>
        <CardHeader avatar={<BotAvatar avatar={bot.avatar}/>}
                    subheader={<BotSubheader username={bot.username}/>}
                    action={
                        <IconButton onClick={onMoreClick} >
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title={bot.name}/>
        <CardContent>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClick={closeMenu}
                onClose={closeMenu}
            >
                <MenuItem onClick={onDeleteClick}>Delete</MenuItem>
                <MenuItem component={Link} to={`/logs/${bot.id}`}>Logs</MenuItem>
            </Menu>
            <Typography gutterBottom variant="body2" component="h2" noWrap>
                {bot.state}
            </Typography>
        </CardContent>
        <CardActions>
            <Box sx={{ flexGrow: 1, display: 'flex'  }}>
                <BotInstanceControls id={bot.id}/>
            </Box>
            <Box sx={{ flexGrow: 0, display: 'flex'  }}>
                <Tooltip title="Edit dialog">
                    <Link to={`../editor/${bot.id}`}>
                        <IconButton>
                            <BuildIcon/>
                        </IconButton>
                    </Link>
                </Tooltip>
            </Box>
        </CardActions>
    </Card>)
}
