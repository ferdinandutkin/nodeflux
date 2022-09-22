import {connectedNodeIdentifier, identifier, INodeInfo, Vector} from "./INode";
import * as _ from "lodash";


export function buildTree(nodes : INodeInfo[], rootId : identifier) {
    const margin : Vector = {X : 50, Y : 50}
    const knownNodes = new Set<identifier>()

    const nodesByLevel = new Map<number, INodeInfo[]>()

    function getNodeById(id : identifier) {
        return nodes.find(node => node.id === id)
    }

    function assignLevels(currentNodeId : connectedNodeIdentifier, currentLevel= 0) {
        if (currentNodeId === null) {
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

        for (const outputId of currentNode.outputs) {
            assignLevels(outputId, currentLevel  + 1)
        }

        for (const inputId of currentNode.inputs) {
            assignLevels(inputId, currentLevel  + 1)
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
        const heightKeyValuePairs = Array.from(nodesByLevel).map(([level, nodes]) => [level, _.sumBy(nodes, node => node.dimensions.Y) + (nodes.length + 1) * margin.Y] as readonly [number, number]);

        const heightDictionary = new Map<number, number>(heightKeyValuePairs)

        const maxHeight = _.maxBy(heightKeyValuePairs, ([_, height]) => height)![1]

        const nodesKeyValuePairs = Array.from(nodesByLevel)

        let currentX = margin.X


        _.sortBy(nodesKeyValuePairs, kvp => kvp[0]).forEach(([level, nodes]) => {
            const levelHeight = heightDictionary.get(level)!

            const maxWidthInLevel = _.maxBy(nodes, node => node.dimensions.X)!.dimensions.X;

            let currentY = (maxHeight - levelHeight) / 2;

            nodes.forEach(node => {
                node.position.Y = currentY
                node.position.X = currentX
                currentY += node.dimensions.Y + margin.Y

            })
            currentX += maxWidthInLevel + margin.X

        });

    }

    function build() {
        assignLevels(rootId)
        calculatePositions()
    }

    build()

    return nodes

}