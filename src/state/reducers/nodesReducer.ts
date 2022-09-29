import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Identifier, INodeInfo, OutputPort as IOutputPort} from "../../models/nodes/typings/INode";
import {organizedNodes} from "../initial";
import {OutputPort} from "../../models/IOPort";

export interface INodesState {
    nodes : INodeInfo[]
}



const initialState: INodesState = {
    nodes : organizedNodes
}




export const nodesSlice = createSlice({
    name: 'nodes',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<INodeInfo>) => {
            state.nodes = [...state.nodes, action.payload]
        },
        remove: (state, action: PayloadAction<INodeInfo>) => {
            state.nodes = state.nodes.filter(node => (node.id !== action.payload.id))
        },
        changeOutputLabel : (state, {payload} : PayloadAction<IOutputPort>) => {
            let output = state.nodes.flatMap(node => node.outputs).find(output => output.id === payload.id);
            if (output) {
                output.label = payload.label
            }
        },
        addOutput : (state, {payload} : PayloadAction<Omit<IOutputPort, "id"> & {nodeId : Identifier}>) => {
            let node = state.nodes.find(node => node.id === payload.nodeId)
            if (node) {
                node.outputs.push(new OutputPort(payload.label))
            }
        }



    },
})

export const { add, remove, changeOutputLabel, addOutput } = nodesSlice.actions

export default nodesSlice.reducer