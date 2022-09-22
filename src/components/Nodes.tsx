import {useAppSelector} from "../state/store";
import Node from './Node'

const Nodes = () => {

    const {nodes} = useAppSelector(state=>state.nodes);
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



