import {useConnections} from "../state/store";
import {Connection} from "./Connection";



const Connections = () => {
    const connections = useConnections(c => c);

    return (
        <>
            {
                connections.map(connection =>
                    <Connection key={connection.id} {...connection}/>
                )
            }
        </>
    )
}

export default Connections;



