import {
    Box, Stack,
    TextField,
    Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {ReactNode, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../state/store";
import {login} from "../state/reducers/userReducer";
import Grid from "@mui/material/Unstable_Grid2";
import {Link} from "react-router-dom";


const loginSchema = object({
    login: string()
        .min(1,'Login is required')
        .max(32, 'Login must be less than 100 characters'),
    password: string()
        .min(1, 'Password is required')
        .min(2, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
});

type LoginInput = TypeOf<typeof loginSchema>;

export const Login = () => {
    const [loading, setLoading] = useState(false);

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
        <Centered>
            <Box sx={{ maxWidth: '30rem' }}>
                <Typography variant='h4' component='h1' sx={{ mb: '2rem' }}>
                    Login
                </Typography>
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
                        loading={loading}
                        type='submit'
                        sx={{ py: '0.8rem', mt: '1rem' }}
                    >
                        Login
                    </LoadingButton>
                </Box>
            </Box>
            <Grid container justifyContent='center'>
                <Stack sx={{ mt: '3rem', textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
                        Don't have an account? <Link to="../register">Register</Link>
                    </Typography>
                </Stack>
            </Grid>
    </Centered>
    );
};



const Centered = ({children} : {children : ReactNode}) => (
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100%', marginTop : "10%" }}
    >

        <Grid xs={3}>
            {children}
        </Grid>

    </Grid>
)


