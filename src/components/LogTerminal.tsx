import {useAppSelector} from "../state/store";
import React, {CSSProperties} from "react";

export const LogTerminal = () => {
    const logs : string[] = useAppSelector(state => state.logs.logs)

    const style : CSSProperties = {
        overflowY: 'scroll',
        color: "white",
        padding: '5px',
        minHeight: "100%",
        flexGrow: 1,
        backgroundColor: "black",
        fontFamily: "consolas, monaco, monospace"
    }

    return (
        <div style={style} >
            {logs.map((log, idx) =>

                <div key={idx}>{log}</div>

            )}
        </div>
    )

}
