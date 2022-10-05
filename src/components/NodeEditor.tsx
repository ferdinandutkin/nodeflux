import {Field} from "./Field";
import {BackPanel} from "./BackPanel";
import {DndProvider} from "./DndProvider";
import {PendingConnectionProvider} from "./PendingConnectionProvider";
import {PendingConnectionOverlay} from "./PendingConnectionOverlay";
import React from "react";
import {useAppSelector} from "../state/store";
import {postConnections, postNodes} from "../api/requests";


export const NodeEditor = () =>
    {
        const {nodes : {nodes}, connections : {connections}} = useAppSelector(state => state)
        
        const save = () => {
            console.log('save')
            postNodes(nodes).then(v => 
                postConnections(connections)).then(f => console.log(f))
            
        }

        return (

                <DndProvider>
                    <div className="row no-gutters">
                        <div className="col">
                            <BackPanel/>
                        </div>


                        <div className="col">
                            <button onClick={save}>HUI</button>
                            <PendingConnectionProvider>
                                <PendingConnectionOverlay/>
                                <Field/>
                            </PendingConnectionProvider>
                        </div>
                    </div>
                </DndProvider>

           )
    }
