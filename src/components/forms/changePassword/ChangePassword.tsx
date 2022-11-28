import {Box, Button, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {changePassword, login} from "../../../state/reducers/userReducer";
import {ChangePasswordInput, changePasswordSchema} from "./ChangePasswordSchema";
import {useAppDispatch} from "../../../state/store";



export const ChangePassword = () => {

    const {
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
    } = useForm<ChangePasswordInput>({
        resolver: zodResolver(changePasswordSchema),
    });


    const dispatch = useAppDispatch()

    const onSubmitHandler: SubmitHandler<ChangePasswordInput> = ({password, newPassword}) => {
        dispatch(changePassword({password, newPassword}))
    };

    return (<Box
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmitHandler)}
    >
            <TextField
                sx={{ mb: 2 }}
                label='Old password'
                fullWidth
                required
                error={!!(errors.password)}
                helperText={errors.password?.message ?? ''}
                {...register('password')}
            />
            <TextField
                sx={{ mb: 2 }}
                label='New password'
                fullWidth
                required
                error={!!(errors.newPassword)}
                helperText={errors.newPassword?.message ?? ''}
                {...register('newPassword')}
            />

            <Button
                fullWidth
                variant="contained"
                type='submit'
            >
                Confirm
            </Button>
        </Box>
    )
}

