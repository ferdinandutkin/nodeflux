import {NodeType} from "./nodes/NodeType";


export type CompatibilityDictionary = {
    [key in NodeType] : NodeType[]
}


export const getMaxOutputsCount = (nodeType : NodeType) => {

    const outputCountDictionary : {[key in NodeType] : number} = {
        buttons : 3,
        commands : 3,
        keyboard: 3,
        start : 1,
        default : 1,
        text : 1,
        end : 0


    }

    return outputCountDictionary[nodeType]
}

export const canConnect = (from : NodeType, to : NodeType) => {
    const compatibilityDictionary : CompatibilityDictionary = {
        buttons : ["default", "buttons", "text", "end", "keyboard", "commands"],
        commands : ["default", "buttons", "text", "end", "keyboard", "commands"],
        start : ["end", "default", "text", "buttons", "keyboard","commands"],
        default : [],
        keyboard: ["buttons"],
        end : [],
        text : ["default", "buttons", "end", "keyboard", "text", "commands"],
    }

    return compatibilityDictionary[from].some(compatibleWithFrom => compatibleWithFrom === to)

}



export type OutputsInfoDictionary = {
    [key in NodeType] : { label : string }[]
}

