import {useEffect, useState} from "react";
import {useAppDispatch, useBotState, useUserBots, useUsersBots} from "../state/store";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
    Box,
    Collapse,
    IconButton, Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {retrieveBotsByUserId, retrieveUsers, UsersBots} from "../state/reducers/userBotsReducer";
import {BotAvatar} from "./bot/BotAvatar";
import {BotSubheader} from "./bot/BotSubheader";
import {BotInstanceControls} from "./bot/BotInstanceControls";
import {Bot} from "../models/typings/Bot";

export const AllBots = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(retrieveUsers())
    }, [])

    const bots  = useUserBots()


    return (<div style={{marginTop: "16px"}}>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            
                            <TableCell>
                                Users bots
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bots.map((row) => (
                            <Row key={row.id} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}



function Row({row} : {row : UsersBots} ) {

    const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch()

    const usersBots = useUsersBots(row.id)

    useEffect(() => {
        dispatch(retrieveBotsByUserId(row.id))
    }, [])


    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.login}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                {(usersBots?.bots && usersBots.bots.length)?  "Bots" : "User has no bots yet"}
                            </Typography>
                            <Table size="small">
                                {(usersBots?.bots && usersBots.bots.length)? (<TableHead>
                                    <TableRow>
                                        <TableCell>Avatar</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Username</TableCell>
                                        <TableCell align="right">State</TableCell>
                                        <TableCell align="right">Controls</TableCell>
                                    </TableRow>
                                </TableHead>) : null}
                                <TableBody>
                                    {usersBots?.bots?.map((bot) => 
                                        <UserTableRow key={bot.id} bot={bot}/>
                                    )}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}



const UserTableRow = ({bot} : {bot : Bot}) => {
    
    const botState = useBotState(bot.id)
    
    return (<TableRow>
        <TableCell component="th" scope="row">
            <BotAvatar avatar={bot.avatar}/>
        </TableCell>
        <TableCell>{bot.name}</TableCell>
        <TableCell align="right" >
            <BotSubheader username={bot.username}/>
        </TableCell>
        <TableCell align="right">{botState}</TableCell>
        <TableCell align="right">
            <BotInstanceControls id={bot.id}/>
        </TableCell>
    </TableRow>)
}