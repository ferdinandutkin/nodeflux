import { Outlet, Link } from "react-router-dom";
import {useIsAuthenticated} from "../state/store";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {AccountMenu} from "./AccountMenu";

export const appBarHeight = '64px'

export const Layout = () => {


    const pages : {title : string, link : string}[] = useIsAuthenticated() ? [
        {title : "bots", link : "/bots"},
        {title : 'login', link : '/login'},
        {title : 'editor', link: '/editor'},
        {title: 'bots', link: '/all-bots'}
    ] : []



    return (
        <>
                <AppBar position="fixed" sx={{ zIndex: 4, height: appBarHeight}}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Box sx={{ flexGrow: 1, display: 'flex'  }}>
                                {pages.map((page) => (
                                    <Link to={page.link} key={page.link} style={{textDecoration: 'none'}}>
                                        <Typography sx={{ my: 2, mr: 4, color: 'white', display: 'block', fontSize : 20}}>
                                            {page.title}
                                        </Typography>
                                    </Link>
                                ))}
                            </Box>
                            <Box  sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                                <AccountMenu/>
                            </Box>
                        </Toolbar>

                    </Container>
                </AppBar>
            <Box sx={{height : '100%', width : '100%', mt: appBarHeight}}>
                <Outlet/>
            </Box>
        </>

    );
};

