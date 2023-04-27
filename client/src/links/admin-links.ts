import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';

interface SubLink {
    label: string;
    path: string;
    icon?: JSX.Element;
}

export interface Link {
    title?: string;
    links?: SubLink[];
}

export const admin_link: Link[] = [
    { title: 'Dashboard' },
    {
        links: [
            {
                label: 'Dashboard',
                path: '/dashboard',
                //icon: <HomeOutlinedIcon />,
            },
        ],
    },
    { title: 'Hotel Management' },
    {
        links: [
            {
                label: 'Hotels Dashboard',
                path: '/view-hotels',
            },
            {
                label: 'Manage Hotels',
                path: '/view-hotels',
                //card representation of all hotels
            },
            // {
            //     label: 'Update Hotel',
            //     path: '/update-hotel',
            // },
            // {
            //     label: 'Settings',
            //     path: '/system-settings',
            // },
        ],
    },
    { title: 'Hotel' },
    {
        links: [
            {
                label: 'Hotel Dashboard',
                path: '/hotel-dashboard',
            },
            {
                label: 'Manage Amenities',
                path: '/manage-amenities',
            },
            {
                label: 'Settings',
                path: '/hotel-settings',
            },
            // {
            //     label: 'Manage Hotel',
            //     path: '/manage-hotel',
            // },
            // {
            //     label: 'Delete Hotel',
            //     path: '/delete-hotel',
            // },
        ],
    },
    { title: 'Rooms' },
    {
        links: [
            {
                label: 'Manage Rooms',
                path: '/view-rooms',
            },
            {
                label: 'Room Reservation',
                path: '/room-reservation',
            },
            // {
            //     label: 'Delete Hotel',
            //     path: '/delete-hotel',
            // },
        ],
    },

    { title: 'Calendar' },
    {
        links: [
            {
                label: 'View Calendar',
                path: '/view-calendar',
            },
            // {
            //     label: 'Update Hotel',
            //     path: '/update-hotel',
            // },
            // {
            //     label: 'Delete Hotel',
            //     path: '/delete-hotel',
            // },
        ],
    },
    { title: 'Staffs' },
    {
        links: [
            {
                label: 'Manage Staffs',
                path: '/manage-staffs',
            },
            // {
            //     label: 'Update Hotel',
            //     path: '/update-hotel',
            // },
            // {
            //     label: 'Delete Hotel',
            //     path: '/delete-hotel',
            // },
        ],
    },
    { title: 'Guests' },
    {
        links: [
            {
                label: 'Manage Guests',
                path: '/manage-guests',
            },
            // {
            //     label: 'Update Hotel',
            //     path: '/update-hotel',
            // },
            // {
            //     label: 'Delete Hotel',
            //     path: '/delete-hotel',
            // },
        ],
    },
];
