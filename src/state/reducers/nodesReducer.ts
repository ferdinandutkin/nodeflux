import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Identifier, INode, INodeInfo, NodeData, OutputPort as IOutputPort} from "../../models/nodes/typings/INode";
import {organizedNodes} from "../initial";
import {OutputPort} from "../../models/IOPort";
import {getConnections, getNodes} from "../../api/requests";
import {RootState} from "../store";
import {NodeInfo} from "../../models/NodeInfo";
import {buildTree} from "../../models/buildTree";
import { set } from './connectionsReducer';

export interface INodesState {
    nodes : INodeInfo[]
}

const initialState: INodesState = {
    nodes : organizedNodes
}

type WithNodeId = {nodeId : Identifier}


export const fetchNodes = createAsyncThunk<INode[]>
('nodes/fetch', async (_, thunkApi) => {
        const nodesResponse = await getNodes()
        const nodeInfos = nodesResponse.data.map(node => new NodeInfo(node))
    
        const connectionsResponse = await getConnections()
        const connections = connectionsResponse.data
    
        thunkApi.dispatch(set(connections))
    
        const tree = buildTree(nodeInfos, connections, 'start')
    
        return tree
})

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
        addOutput : (state, {payload} : PayloadAction<Omit<IOutputPort, "id"> & WithNodeId>) => {
            let node = state.nodes.find(node => node.id === payload.nodeId)
            if (node) {
                node.outputs.push(new OutputPort(payload.label))
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
        }
    },
    
    extraReducers: builder => {
        builder.addCase(fetchNodes.fulfilled, (state, action) => {
           state.nodes = [];
        })
    }
})



export const { add, remove, changeOutputLabel, addOutput, changeTitle } = nodesSlice.actions

export default nodesSlice.reducer