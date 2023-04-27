import React from 'react';
import MainLayout from '../../scenes/layout';
import { Typography } from '@mui/material';

const Dashboard = () => {
    return (
        <div>
            <MainLayout>
                <div>
                    <Typography variant="h1">This is the Dashboard</Typography>
                </div>
            </MainLayout>
        </div>
    );
};

export default Dashboard;
