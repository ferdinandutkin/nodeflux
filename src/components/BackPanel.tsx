import './BackPanel.css'
import {
    EndNodeFactory,
    StartNodeFactory,
    ButtonsNodeFactory,
    TextNodeFactory, KeyboardNodeFactory, CommandsNodeFactory
} from "../models/NodeFactories";
import {NodeFactory} from "./NodeFactory";
import {
    Box,
    Button, Drawer,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent, Tooltip
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import React, {useState} from "react";
import {useAppDispatch} from "../state/store";
import {saveConfig} from "../state/reducers/nodesReducer";
import {useParams} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import {appBarHeight} from "./Layout";
import {BotInfo} from "./bot/BotInfo";


export const BackPanel = () => {
    const factories = [
        new StartNodeFactory(),
        new ButtonsNodeFactory(),
        new CommandsNodeFactory(),
        new KeyboardNodeFactory(),
        new EndNodeFactory(),
        new TextNodeFactory()]

    const {botId} = useParams();

    const dispatch = useAppDispatch()

    const drawerWidth = 240

    const onClick = () => {
        dispatch(saveConfig(botId!))
    }

    const [viewType, setViewType] = useState<ViewType>("expanded")

    return (
        <Drawer
            variant="permanent"
            className="panel"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                padding : 2,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', zIndex: 2,  mt: appBarHeight }
            }}
        >

        <Grid>
            <BotInfo id={botId!}/>
            <Grid xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'right',  marginX: 1 }}>
                    <Button variant="outlined" onClick={onClick} sx={{minWidth: '100%'}} startIcon={<SaveIcon/>}>
                        Save
                    </Button>
                </Box>
            </Grid>
        </Grid>
        <Box sx={{ display: 'flex', alignItems: 'center',  justifyContent: 'center', marginY: 2, marginX: 1  }}>
            <ViewTypeSelect value={viewType} onChange={setViewType}/>
        </Box>
        {
            factories.map(factory =>
                <Box
                    key={factory.preview.id}
                    display="flex"
                    marginY={2}
                    justifyContent="center"
                    alignItems="center"
                >
                        <Tooltip title={factory.preview.type} followCursor>
                            <div>
                                <NodeFactory factory={factory} type={viewType} />
                            </div>
                        </Tooltip>
                </Box>

            )
        }
        </Drawer>)
}


export type ViewType = "collapsed" | "expanded"
export const ViewTypeSelect = ({onChange, value} : {onChange : (value : ViewType) => void, value : ViewType}) => {

    const handler = (event: SelectChangeEvent<ViewType>) => {
        onChange(event!.target!.value as ViewType)
    }
    return (
        <FormControl fullWidth>
            <InputLabel id="view-type-select">
                View type
            </InputLabel>
            <Select
                value={value}
                label="View type"
                onChange={handler}
                labelId="view-type-select"
            >

                <MenuItem value="expanded">Expanded</MenuItem>
                <MenuItem value="collapsed">Collapsed</MenuItem>
            </Select>
        </FormControl>
    )
}
