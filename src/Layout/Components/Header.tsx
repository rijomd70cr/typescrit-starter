import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { openSideBarAction, getSideBarStatus } from '../Reducer/LayoutActions'
import { useAppDispatch, useAppSelector } from '../../Services/Hook/Hook';


const styles: { [key: string]: React.CSSProperties } = {
    flexGrow: { flexGrow: "1" },
    mr: { marginRight: "2" }
}


const Header = () => {
    const dispatch = useAppDispatch();
    const isSideBarOpen = useAppSelector(getSideBarStatus);
    const openSideBar = () => {
        dispatch(openSideBarAction(!isSideBarOpen));
    }
    return (
        <Box sx={styles.flexGrow}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={styles.mr}
                        onClick={() => openSideBar()}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={styles.flexGrow}>
                        Starter
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default Header;