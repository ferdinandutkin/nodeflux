import {BotState} from "../BotState";
import {Identifier} from "./INode";

export type Bot = {
    state : BotState,
    id : Identifier,
    name : string,
    avatar : string | null
    username : string
}