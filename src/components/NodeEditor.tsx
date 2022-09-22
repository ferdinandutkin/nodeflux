import Field from "./Field";
import {BackPanel} from "./BackPanel";
import {DndProvider} from "./DndProvider";
import {PendingConnectionProvider} from "./PendingConnectionProvider";
import {PendingConnectionOverlay} from "./PendingConnectionOverlay";
import React from "react";

export const NodeEditor = () =>
    {


        return (

                <DndProvider>

                    <div className="row no-gutters">
                        <div className="col">
                            <BackPanel/>
                        </div>

                        <div className="col">
                            <PendingConnectionProvider>
                                <PendingConnectionOverlay/>
                                <Field/>
                            </PendingConnectionProvider>
                        </div>
                    </div>
                </DndProvider>

           )
    }
