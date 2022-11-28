import {
    Box, Stack,
    Typography,
} from '@mui/material';
import {ReactNode, useEffect, useState} from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {Link} from "react-router-dom";
import {Login as LoginForm} from "./forms/login/LoginForm";

export const Login = () => {

    return (
        <Centered>
            <Box sx={{ maxWidth: '30rem' }}>
                <Typography variant='h4' component='h1' sx={{ mb: '2rem' }}>
                    Login
                </Typography>
                <LoginForm/>
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


