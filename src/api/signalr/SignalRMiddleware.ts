import {HubConnection, HubConnectionBuilder, ISubscription, JsonHubProtocol, LogLevel} from '@microsoft/signalr'
import {BotState} from "../../models/BotState";
import {Identifier} from "../../models/typings/INode";
import {setBotState, startBot, stopBot} from "../../state/reducers/botsReducer";
import {Middleware} from "redux";
import {login} from "../../state/reducers/userReducer";
import {pushLog, startReceivingLogs, stopReceivingLogs} from "../../state/reducers/logsReduces";
import {IStreamResult} from "@microsoft/signalr/dist/esm/Stream";


export const SignalRMiddleware : Middleware  = (store) => {

    const createConnection = async (token : string)  => {
        const connection: HubConnection = new HubConnectionBuilder()
            .withUrl("api/botHub", {
                accessTokenFactory(): string {
                    return token
                }

            })
            .withHubProtocol(new JsonHubProtocol())
            .configureLogging(LogLevel.Trace)
            .withAutomaticReconnect()
            .build();

        await connection.start()

        connection.on('stateChanged', (id: Identifier, state: BotState) => {
            store.dispatch(setBotState({id, state}));
            console.log('state changed', state)
        })

        return connection
    }

    const reconnect = async (token : string) => {
        if (connection) {
            await connection.stop()
        }
        connection = await createConnection(token)
    }

    const reconnectIfDisconnected = async () => {
        if (connection?.state !== "Connected") {
            connection = await createConnection(store.getState().users.token)
        }
    }

    let connection : HubConnection | undefined;

    let logsStream : ISubscription<string> | undefined;

    const invoke = async (methodName: string, ...params: any[]) => {
        await reconnectIfDisconnected();
        connection?.invoke(methodName, ...params)
                .catch((err) => console.log(err));
    };

    const subscribeToLogs = (botId : Identifier) => {
        return connection?.stream<string>("Logs", botId).subscribe({
            next: (item : string) => {
                store.dispatch(pushLog(item))
            },
            complete: () => {
            },
            error: (err) => {
            },
        })
    }


        return (next) => async (action) => {
            switch (action.type) {
                case startBot.type: {

                    store.dispatch(setBotState({id : action.payload, state : "pending"}))

                    await invoke("Start", action.payload)

                    if (store.getState().logs.isSubscribed) {
                        logsStream?.dispose()
                        logsStream = subscribeToLogs(action.payload)
                    }
                    break
                }
                case stopBot.type: {

                    store.dispatch(setBotState({id : action.payload, state : "pending"}))
                    await invoke("Stop", action.payload)
                    break
                }
                case login.fulfilled.type: {
                    await reconnect(action.payload.token)
                    break;
                }
                case stopReceivingLogs.type: {
                    logsStream?.dispose()
                    break;
                }
                case startReceivingLogs.type: {
                    logsStream?.dispose()
                    logsStream = subscribeToLogs(action.payload)
                    break;
                }
                case "persist/REHYDRATE" : {
                    await reconnect(action.payload.users.token)
                    break
                }
            }
            return next(action);
        };
    }

