import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import {IconButton, ListItemIcon} from "@mui/material";
import {Logout} from "@mui/icons-material";
import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import {useAppDispatch, useIsAuthenticated, useLogin} from "../state/store";
import {logout} from "../state/reducers/userReducer";
import {MeModal} from "../MeModal";

export const AccountMenu = () => {

    const dispatch = useAppDispatch()
    const login = useLogin()
    const isAuthenticated = useIsAuthenticated()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [showMeModal, setShowMeModal] = React.useState(false)
    const open = Boolean(anchorEl);
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout())
    }

    const openMeModal = () => {
        setShowMeModal(true)
    }

    if (!isAuthenticated) {
        return null
    }

    return (<>
            <MeModal open={showMeModal} onClose={() => setShowMeModal(false)}/>
            <Tooltip title="Account settings">

                <Button
                    onClick={handleMenuClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 40, height: 40 }}>{login![0]}</Avatar>
                </Button>

            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={openMeModal}>
                    <Avatar /> {login}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout  fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>)
}
