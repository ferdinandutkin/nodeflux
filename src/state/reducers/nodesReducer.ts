import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {organizedNodes} from "../initial";
import {OutputPort} from "../../models/IOPort";
import {getStateMachineConfiguration, saveStateMachineConfiguration} from "../../api/requests";
import {buildTree} from "../../models/buildTree";
import { setConnections } from './connectionsReducer';
import {OutputPort as IOutputPort} from "../../models/typings/INode"
import {Identifier, INodeInfo, NodeData} from "../../models/typings/INode";
import {NodeInfo} from "../../models/NodeInfo";
import {RootState} from "../store";

export interface INodesState {
    nodes : INodeInfo[]
}

const initialState: INodesState = {
    nodes : organizedNodes
}

type WithNodeId = {nodeId : Identifier}


export const retrieveConfig = createAsyncThunk
('nodes/retrieveConfig', async (botId : Identifier, thunkApi) => {

        const config = await getStateMachineConfiguration(botId)

        const {connections, nodes} = config.data

        const nodeInfos = nodes.map(node => new NodeInfo(node))
    
        const rootId = nodeInfos.find(node => node.type === "start")!.id

        const tree = buildTree(nodeInfos, connections, rootId)

        thunkApi.dispatch(setConnections(connections))
        thunkApi.dispatch(setNodes(nodeInfos))
})


export const saveConfig = createAsyncThunk
('nodes/saveConfig', async (botId : Identifier, thunkApi) => {

    const state : RootState = thunkApi.getState()

    const {connections : {connections}, nodes : {nodes}} = state

    await saveStateMachineConfiguration(botId, {connections, nodes})
})

export const nodesSlice = createSlice({
    name: 'nodes',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<INodeInfo>) => {
            state.nodes = [...state.nodes, action.payload]
        },
        removeNode: (state, action: PayloadAction<INodeInfo>) => {
            state.nodes = state.nodes.filter(node => (node.id !== action.payload.id))
        },
        changeOutputLabel : (state, {payload} : PayloadAction<IOutputPort>) => {
            let output = state.nodes.flatMap(node => node.outputs).find(output => output.id === payload.id);
            if (output) {
                output.label = payload.label
            }
        },
        addOutput : (state, {payload} : PayloadAction<Omit<IOutputPort, "id"> & WithNodeId>) => {
            let node = state.nodes.find(node => node.id === payload.nodeId)
            if (node) {
                node.outputs.push(new OutputPort(payload.label))
            }
        },
        removeOutput : (state, {payload} : PayloadAction<Identifier>) => {
            const index = state.nodes.findIndex(node => node.outputs.some(output => output.id === payload))
            if (index != -1) {
                const node = state.nodes[index]
                state.nodes[index].outputs = node.outputs.filter(output => output.id !== payload)
                console.log(state.nodes[index].outputs)
            }
        },

        changeTitle : (state, {payload} : PayloadAction<NodeData & WithNodeId>) => {
            let node = state.nodes.find(node => node.id === payload.nodeId)
            if (node) {
                if (node.data) {
                    node.data.title = payload.title
                    return
                }
                node.data = {title: payload.title}
                return
            }
        },

        changeText : (state, {payload} : PayloadAction<{ id : Identifier, text : string }>) => {
            let node = state.nodes.find(node => node.id === payload.id)
            if (node?.type === "text") {
                const data = {...node.data, text : payload.text}
                node.data = data
            }
        },

        setNodes : (state, {payload} : PayloadAction<INodeInfo[]>) => {
            console.log('set nodes', payload)
            state.nodes = payload
        },
    },

})



export const { add, removeNode, changeOutputLabel, addOutput, changeTitle, setNodes, changeText, removeOutput } = nodesSlice.actions

export default nodesSlice.reducer
