import {Identifier} from "../models/nodes/INode";

export const generateOutputId = (id : Identifier) =>
    `output-${id}`


export const generateInputId =  (id : Identifier) =>
    `input-${id}`
