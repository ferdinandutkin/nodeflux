import {Field} from "./Field";
import {BackPanel} from "./BackPanel";
import {DndProvider} from "./DndProvider";
import {PendingConnectionProvider} from "./PendingConnectionProvider";
import {PendingConnectionOverlay} from "./PendingConnectionOverlay";
import React, {useEffect} from "react";
import {useAppDispatch} from "../state/store";
import {useParams} from "react-router-dom";
import {retrieveConfig} from "../state/reducers/nodesReducer";
import Grid from "@mui/material/Unstable_Grid2";


export const NodeEditor = () =>
    {
        const {botId} = useParams();

        const dispatch = useAppDispatch()

        useEffect(() => {
            if (botId) {
                dispatch(retrieveConfig(botId))
            }
        }, [])


        if (!botId) {
            return <div>No botId provided</div>
        }

        return (
                <DndProvider>

                    <Grid container spacing={0}>
                        <Grid xs={0} sm={2} display={{xs : 'none', md : 'flex'}}>
                            <BackPanel/>
                        </Grid>
                        <Grid xs={12} sm={10}>
                            <PendingConnectionProvider>
                                <PendingConnectionOverlay/>
                                <Field/>
                            </PendingConnectionProvider>
                        </Grid>
                    </Grid>
                </DndProvider>
           )
    }
