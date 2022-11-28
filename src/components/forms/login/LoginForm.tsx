import {Box, TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {login} from "../../../state/reducers/userReducer";
import {object, string, TypeOf} from "zod";
import {LoginInput, loginSchema} from "./LoginSchema";




export const Login = () => {

    const dispatch = useAppDispatch()
    const loginError = useAppSelector(state => state.users.loginErrors?.join("."))
    const {
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
        console.log(values);
        dispatch(login(values))
    };
    console.log(errors);

    return (
    <Box
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmitHandler)}
    >
        <TextField
            sx={{ mb: 2 }}
            label='Name'
            fullWidth
            required
            error={!!(errors['login'] || loginError)}
            helperText={errors['login']?.message ?? loginError ?? ''}
            {...register('login')}
        />
        <TextField
            sx={{ mb: 2 }}
            label='Password'
            fullWidth
            required
            type='password'
            error={!!(errors['password'] || loginError)}
            helperText={errors['password']?.message ?? loginError ?? ''}
            {...register('password')}
        />
        <LoadingButton
            variant='contained'
            fullWidth
            type='submit'
            sx={{ py: '0.8rem', mt: '1rem' }}
        >
            Login
        </LoadingButton>
    </Box>)
}

