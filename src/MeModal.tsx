import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Modal,
    Typography
} from "@mui/material"
import {useLogin, useRoles} from "./state/store";
import {Role} from "./models/Role";
import {ChangePassword} from "./components/forms/changePassword/ChangePassword";



export type RoleColorDictionary = {
    [key in Role] : string
}


export const MeModal = ({open, onClose} : {open : boolean, onClose: () => void}) => {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "100vw",
        height: "100vh"

    };

    const roleColorDictionary : RoleColorDictionary = {
        "admin" : "red",
        "user": "green"
    }


    const login = useLogin()
    const roles = useRoles()

    const roleStyle = {
        padding: 2,
        margin: 2,
        borderRadius: '5%'
    }

    return (
        <Dialog open={open} onClose={onClose} sx={style}>
            <DialogTitle>About me</DialogTitle>
            <DialogContent>

                <DialogContentText>
                    <Typography variant='h6' sx={{ mb: '2rem' }}>
                        Login: {login}
                    </Typography>
                    <Typography variant='h6' sx={{ mb: '4rem' }}>
                        Roles: {roles.map((role : Role) => <span style={{...roleStyle, background: roleColorDictionary[role]}}>{role}</span>)}
                    </Typography>
                    <Typography variant='h6' sx={{ mt: '2rem' }}>
                        Change Password
                    </Typography>
                </DialogContentText>
                <ChangePassword/>
            </DialogContent>
        </Dialog>
    )

}
