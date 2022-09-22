import {useAppSelector} from "../state/store";
import {Connection} from "./Connection";

type ConnectionInfo = {

}
const Connections = () => {
    const outputs = useAppSelector(state=>state.nodes.nodes.flatMap(from => from.outputs.map(to => ({from : from.id, to}))));
    return (
        <>
            {
                outputs.map(({from, to}) =>
                    <Connection key={from+to} from={from} to={to}/>
                )
            }
        </>
    )
}

export default Connections;



