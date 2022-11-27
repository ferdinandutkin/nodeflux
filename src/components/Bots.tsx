import {CSSProperties, useEffect} from "react";
import {useAppDispatch, useBots} from "../state/store";
import {retrieveBots} from "../state/reducers/botsReducer";
import Grid from '@mui/material/Unstable_Grid2'
import {Bot as IBot} from "../models/typings/Bot";
import {AddBot} from "./forms/addBot/AddBot";
import {Bot} from "./bot/Bot";

export const Bots = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(retrieveBots())
    }, [])

    const bots : IBot[] = useBots()

    const style : CSSProperties = {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }

    return (<div style={{marginTop: "16px"}}>
        <Grid container spacing={2}>
            <Grid xs={6} sm={3} key="add-new">
                <AddBot style={style}/>
            </Grid>
            {bots.map((bot) => (
                <Grid xs={6} sm={3} key={bot.id}>
                    <Bot bot={bot} style={style} />
                </Grid>
            ))}
    </Grid>
    </div>
  )
}