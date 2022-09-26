import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {INodeInfo} from "../../models/nodes/INode";
import {organizedNodes} from "../initial";

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

        // disconnect: (state, {payload : {from, to}} : PayloadAction<FinishedConnection> ) => {
        //     const fromNodeIndex = state.nodes.findIndex(node => node.id === from.id)
        //     const toNodeIndex = state.nodes.findIndex(node => node.id === to.id)
        //     const fromNode = state.nodes[fromNodeIndex]
        //     const toNode = state.nodes[toNodeIndex]
        //
        //     fromNode!.outputs[from.index] = to.id;
        //     toNode!.inputs[to.index] = from.id;
        //
        //     state.nodes[toNodeIndex] = toNode
        //     state.nodes[fromNodeIndex] = fromNode
        // },
    },
})

export const { add, remove } = nodesSlice.actions

export default nodesSlice.reducer