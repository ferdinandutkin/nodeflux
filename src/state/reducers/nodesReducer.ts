import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {identifier, INodeInfo} from "../../models/INode";
import {NodeInfo} from "../../models/NodeInfo";
import {buildTree} from "../../models/buildTree";

export interface INodesState {
    nodes : INodeInfo[]
}

const nodes =  [
    new NodeInfo({type : "start", id : '1', inputs : [null], outputs : ['2', '3']}),
    new NodeInfo({type : "default", id : '2', inputs: ['1'], outputs : []}),
    new NodeInfo({type : "default", id : '3', inputs: ['1'], outputs : ['4']}),
    new NodeInfo({type : "default", id : '4', inputs: ['3'], outputs : ['5']}),
    new NodeInfo({type : "default", id : '5', inputs: ['4'], outputs : []})
]
const organizedNodes = buildTree(nodes, '1');

const initialState: INodesState = {
    nodes : organizedNodes
}

type TransputInfo = {id : identifier, index : number}
type FinishedConnection = {from : TransputInfo, to : TransputInfo}

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
        connect: (state, {payload : {from, to}} : PayloadAction<FinishedConnection> ) => {
            const fromNodeIndex = state.nodes.findIndex(node => node.id === from.id)
            const toNodeIndex = state.nodes.findIndex(node => node.id === to.id)
            const fromNode = state.nodes[fromNodeIndex]
            const toNode = state.nodes[toNodeIndex]

            fromNode!.outputs[from.index] = to.id;
            toNode!.inputs[to.index] = from.id;

            state.nodes[toNodeIndex] = toNode
            state.nodes[fromNodeIndex] = fromNode
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

export const { add, remove, connect } = nodesSlice.actions

export default nodesSlice.reducer