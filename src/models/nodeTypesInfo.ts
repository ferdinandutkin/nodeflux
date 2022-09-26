import {NodeType} from "./nodes/NodeType";


export type CompatibilityDictionary = {
    [key in NodeType] : NodeType[]
}


export const canConnect = (from : NodeType, to : NodeType) => {
    const compatibilityDictionary : CompatibilityDictionary = {
        twoButtons: ["default"],
        start : ["end", "default"],
        default : ["end"],
        end : []
    }

    return compatibilityDictionary[from].some(compatibleWithFrom => compatibleWithFrom === to)

}



export type OutputsInfoDictionary = {
    [key in NodeType] : { label : string }[]
}

