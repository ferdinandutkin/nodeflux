import {INodeInfo} from "../models/typings/INode";
import {useAppDispatch} from "../state/store";
import {removeNode} from "../state/reducers/nodesReducer";
import {Menu, MenuItem} from "@mui/material";
import React from "react";
import {WithSetters} from "../helpers/typeSystem";
import {ViewType} from "./BackPanel";


export type NodeMenuProps = {
    node : INodeInfo
}
& WithSetters<{anchor? : HTMLElement, viewType : ViewType}>

export const NodeMenu = ({node, anchor, setAnchor, viewType, setViewType} : NodeMenuProps) => {

    const dispatch = useAppDispatch();

    const onDeleteClick = () => {
        dispatch(removeNode(node))
    }

    const onToggleViewTypeClick = () => {
        if (viewType == "collapsed") {
            setViewType("expanded")
            return
        }
        setViewType("collapsed")
    }

    const closeMenu = () => {
        setAnchor(undefined)
    }

    return (<Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClick={closeMenu}
        onClose={closeMenu}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
    >
        <MenuItem onClick={onDeleteClick}>Delete</MenuItem>
        <MenuItem onClick={onToggleViewTypeClick}>{viewType === "expanded"? "Collapse" : "Expand"}</MenuItem>
    </Menu>)
}
