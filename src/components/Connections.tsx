import {useConnections} from "../state/store";
import {Connection} from "./Connection";



const Connections = () => {
    const connections = useConnections(c => c);

    return (
        <>
            {
                connections.map(connection =>
                    <Connection {...connection}/>
                )
            }
        </>
    )
}

export default Connections;



