import { Box, IconButton, useTheme } from '@mui/material';
import { useContext, useState } from 'react';
import { colorModeContext, tokens } from '../../../theme';
import styles from './topar.module.css';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

interface Props {
    navbarOpen: boolean;
    setNavbarOpen: (open: boolean) => void;
}

const TopBar = ({ navbarOpen, setNavbarOpen }: Props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(colorModeContext);

    return (
        <div className={styles.topBarContainer}>
            {/* SEARCH BAR */}
            {/* note to self background color not working */}
            <Box display="flex">
                <Box
                    className={styles.doughnutButton}
                    //display="flex"
                    borderRadius="3px"
                    bgcolor={colors.primary[400]}
                >
                    <IconButton onClick={() => setNavbarOpen(!navbarOpen)}>
                        <MenuOutlinedIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box display="flex" className={styles.userOptions}>
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>
        </div>
    );
};

export default TopBar;
