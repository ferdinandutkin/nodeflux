import './BackPanel.css'
import {DefaultNodeFactory, EndNodeFactory, StartNodeFactory} from "../models/NodeFactories";
import {NodeFactory} from "./NodeFactory";

export const BackPanel = () => {
    const factories = [new StartNodeFactory(), new DefaultNodeFactory(), new EndNodeFactory()]

    return (<div className={"panel"}>
        {

            factories.map(factory => <NodeFactory factory={factory} key={factory.preview.id}/>)
        }

    </div>)
}