import { useContext, useState } from 'react';
import { Sidebar, Menu, MenuItem, sidebarClasses, menuClasses } from 'react-pro-sidebar';
import { Box, IconButton, InputBase, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';
import { tokens } from '../../../theme';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SearchIcon from '@mui/icons-material/Search';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import { admin_link } from '../../../links/admin-links';
import profileImage from '../../../assets/download.jpg';
import AuthContext from '../../../context/AuthContext/AuthContext';
import TopBar from '../top-bar/top-bar';

const Item = ({ title, to, icon, selected, setSelected }: any) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

interface SideBarChildren {
    children?: JSX.Element | Array<JSX.Element | string> | string;
}

const MainSidebar = ({ children }: SideBarChildren) => {
    const { auth } = useContext(AuthContext);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [navBorOpen, setNavBarOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>('Dashboard');

    return (
        <Box>
            <TopBar navbarOpen={navBorOpen} setNavbarOpen={setNavBarOpen} />
            {/* mobile navigation starts here */}
            {navBorOpen && (
                <Box className={`${styles.navContainer} ${styles.nav}`}>
                    {
                        // for admin links
                        auth.permissions?.includes('super-admin') && (
                            <Box>
                                {admin_link.map((adminLink, index) => (
                                    <Box key={index} className={styles.mobileNavContainer}>
                                        <Typography variant="h4" key={index}>
                                            {adminLink.title?.toUpperCase()}
                                        </Typography>
                                        {adminLink?.links?.map((link, index) => {
                                            return (
                                                <Box
                                                    key={index}
                                                    className={styles.navLinkContainer}
                                                >
                                                    <li key={index}>
                                                        <div className={styles.sidebarLinkIcon}>
                                                            {link.icon}
                                                            <Link
                                                                className={styles.link}
                                                                to={link.path}
                                                            >
                                                                <div
                                                                    className={styles.sidebarLabel}
                                                                >
                                                                    {link.label}
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </li>
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                ))}
                            </Box>
                        )
                    }
                </Box>
            )}
            {/* mobile navigation ends here */}
            <Box className={styles.container}>
                <div
                    style={{ backgroundColor: colors.primary[400] }}
                    className={
                        sidebarOpen
                            ? `${styles.sidebarContainer} ${styles.isOpen}`
                            : `${styles.sidebarContainer} ${styles.isClosed}`
                    }
                >
                    <div
                        style={{ backgroundColor: colors.primary[400] }}
                        className={
                            sidebarOpen
                                ? `${styles.sidebar} ${styles.isOpen}`
                                : `${styles.sidebar} ${styles.isClosed}`
                        }
                    >
                        {sidebarOpen && (
                            <div>
                                <InputBase
                                    placeholder="Search"
                                    sx={{
                                        ml: 2,
                                        flex: 1,
                                        backgroundColor: colors.primary[900],
                                        color: colors.grey[100],
                                        p: 1,
                                        borderRadius: 2,
                                    }}
                                />
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </div>
                        )}
                        <div className={styles.logoContainer}>
                            {sidebarOpen && (
                                <div>
                                    <Typography variant="h3">Hotel Name</Typography>
                                </div>
                            )}
                            <div>
                                <IconButton
                                    onClick={() => {
                                        setSidebarOpen(!sidebarOpen);
                                    }}
                                >
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </div>
                        </div>
                        {/* SIDEBAR DIVIDER */}
                        <div
                            style={{ background: colors.grey[600] }}
                            className={styles.sidebarDivider}
                        ></div>
                        {/* SIDE BAR GOES HERE */}
                        {sidebarOpen && (
                            <Box mb="25px">
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <img
                                        alt="profile-user"
                                        width="100px"
                                        height="100px"
                                        src={profileImage}
                                        style={{ cursor: 'pointer', borderRadius: '50%' }}
                                    />
                                </Box>
                                <Box textAlign="center">
                                    <Typography
                                        variant="h2"
                                        color={colors.grey[100]}
                                        fontWeight="bold"
                                        sx={{ m: '10px 0 0 0' }}
                                    >
                                        Ed Roh
                                    </Typography>
                                    <Typography variant="h5" color={colors.greenAccent[500]}>
                                        VP Fancy Admin
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                        <div
                            style={{ background: colors.grey[600] }}
                            className={styles.sidebarDivider}
                        ></div>
                        {/* SIDE BAR LINKS GOES HERE */}
                        {auth.permissions?.includes('admin') ||
                            (auth.permissions?.includes('super-admin') && (
                                <Box>
                                    <ul>
                                        {admin_link.map((adminLink, index) => {
                                            return (
                                                <Box
                                                    className={styles.linkContainer}
                                                    color={colors.grey[100]}
                                                    key={index}
                                                >
                                                    <Typography
                                                        variant="h5"
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            color: colors.grey[400],
                                                        }}
                                                    >
                                                        {adminLink.title}
                                                    </Typography>
                                                    {adminLink?.links?.map((link, index) => {
                                                        return (
                                                            <li key={index}>
                                                                <div
                                                                    className={
                                                                        styles.sidebarLinkIcon
                                                                    }
                                                                >
                                                                    {link.icon}{' '}
                                                                    <Link
                                                                        className={styles.link}
                                                                        to={link.path}
                                                                    >
                                                                        <div
                                                                            className={
                                                                                styles.sidebarLabel
                                                                            }
                                                                        >
                                                                            {link.label}
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            </li>
                                                        );
                                                    })}
                                                </Box>
                                            );
                                        })}
                                    </ul>
                                </Box>
                            ))}
                    </div>
                </div>
                <main>{children}</main>
            </Box>{' '}
        </Box>
    );
};

export default MainSidebar;
