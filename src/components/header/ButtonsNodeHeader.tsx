import {INodeInfo} from "../../models/nodes/typings/INode";
import {NodeHeaderProps} from "./NodeHeader";
import React, {KeyboardEvent, MouseEvent, useState} from "react";
import {useAppDispatch} from "../../state/store";
import {changeTitle} from "../../state/reducers/nodesReducer";


export const ButtonsNodeHeader = (props : NodeHeaderProps) => {

    const [isEdited, setIsEdited] = useState(false)

    const inputRef = React.useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch()

    const onInputDoubleClick = () => {
        console.log("CLICK")
        setIsEdited(true)
    }

    const onInputKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            dispatch(changeTitle({title: inputRef.current!.value, nodeId : props.node.id}))
            setIsEdited(false)
        }
    };

    if (isEdited) {
        return <input ref={inputRef} defaultValue={props.node.data?.title ?? ""} onKeyPress={onInputKeyPress}/>
    }



    return <div className="w-100 h-100" onDoubleClick={onInputDoubleClick}>
        {props.node.data?.title}
    </div>
}