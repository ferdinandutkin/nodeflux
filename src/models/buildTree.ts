import * as _ from "lodash";
import {IConnection} from "./nodes/typings/IConnection";
import {Identifier, INodeInfo} from "./nodes/typings/INode";
import {Vector} from "./nodes/typings/Vector";


export function buildTree(nodes : INodeInfo[], connections : IConnection[], rootId : Identifier) {


    const margin : Vector = {x : 50, y : 50}
    const knownNodes = new Set<Identifier>()

    const nodesByLevel = new Map<number, INodeInfo[]>()


    function getOutputs(id : Identifier) {
        const node = getNodeById(id)



        return  node!.outputs
            .map(output => output.id)
            .flatMap(outputPortId => connections.filter(connection => connection.from === outputPortId))
            .map(connection => connection.to)
            .flatMap(to => nodes.filter(node => node.inputs.some(input => input.id === to)).map(node => node.id));
    }
    function getNodeById(id : Identifier) {
        return nodes.find(node => node.id === id)
    }

    function assignLevels(currentNodeId : Identifier | undefined, currentLevel= 0) {
        if (currentNodeId === undefined) {
            return
        }

        if (knownNodes.has(currentNodeId)) {
            return
        }

        knownNodes.add(currentNodeId)

        const currentNode = getNodeById(currentNodeId)

        if (currentNode === undefined) {
            return
        }

        for (const outputId of getOutputs(currentNode.id)) {
            assignLevels(outputId, currentLevel  + 1)
        }

        const nodesOfCurrentLevel = nodesByLevel.get(currentLevel)
        if (nodesOfCurrentLevel === undefined) {
           nodesByLevel.set(currentLevel, [currentNode])
        }
        else {
            nodesByLevel.set(currentLevel, [...nodesOfCurrentLevel, currentNode])
        }
    }

    function calculatePositions() {
        const heightKeyValuePairs = Array.from(nodesByLevel).map(([level, nodes]) => [level, _.sumBy(nodes, node => node.dimensions.y) + (nodes.length + 1) * margin.y] as readonly [number, number]);

        const heightDictionary = new Map<number, number>(heightKeyValuePairs)

        const maxHeight = _.maxBy(heightKeyValuePairs, ([_, height]) => height)![1]

        const nodesKeyValuePairs = Array.from(nodesByLevel)

        let currentX = margin.x


        _.sortBy(nodesKeyValuePairs, kvp => kvp[0]).forEach(([level, nodes]) => {
            const levelHeight = heightDictionary.get(level)!

            const maxWidthInLevel = _.maxBy(nodes, node => node.dimensions.x)!.dimensions.x;

            let currentY = (maxHeight - levelHeight) / 2;

            nodes.forEach(node => {
                node.position.y = currentY
                node.position.x = currentX
                currentY += node.dimensions.y + margin.y

            })
            currentX += maxWidthInLevel + margin.x

        });

    }

    function build() {
        assignLevels(rootId)
        calculatePositions()
    }

    build()

    return nodes

}