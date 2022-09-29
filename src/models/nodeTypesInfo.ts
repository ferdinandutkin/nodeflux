import {NodeType} from "./nodes/NodeType";


export type CompatibilityDictionary = {
    [key in NodeType] : NodeType[]
}


export const getMaxOutputsCount = (nodeType : NodeType) => {

    const outputCountDictionary : {[key in NodeType] : number} = {
        buttons : 3,
        start : 1,
        default : 1,
        end : 0
    }

    return outputCountDictionary[nodeType]
}

export const canConnect = (from : NodeType, to : NodeType) => {
    const compatibilityDictionary : CompatibilityDictionary = {
        buttons : ["default", "buttons"],
        start : ["end", "default"],
        default : ["end"],
        end : []
    }

    return compatibilityDictionary[from].some(compatibleWithFrom => compatibleWithFrom === to)

}



export type OutputsInfoDictionary = {
    [key in NodeType] : { label : string }[]
}

