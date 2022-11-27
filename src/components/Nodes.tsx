import {useAppSelector} from "../state/store";
import {Node} from './node/Node'
import {INodeInfo} from "../models/typings/INode";



const Nodes = () => {

    const {nodes} : {nodes : INodeInfo[]} = useAppSelector(state=>state.nodes);

    return (
        <>
            {nodes.map(node =>
                <Node dragType="material" key={node.id} node={node}/>
            )
            }
        </>


    )
}

export default Nodes;



