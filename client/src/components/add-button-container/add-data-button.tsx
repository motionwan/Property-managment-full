import React, { ReactNode } from 'react';
import styles from './add-data-button-container.module.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';

interface AddDataProps {
    // children: ReactNode;
    label: string;
    to: string;
}

const AddDataContainer = ({ label, to }: AddDataProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.colors);
    return (
        <div className={styles.container}>
            <Link to={to}>
                <Button
                    sx={{
                        background: colors.greenAccent[500],
                        color: colors.grey[100],
                        '&:hover': {
                            backgroundColor: colors.greenAccent[300], // change this to the desired hover color
                        },
                    }}
                    variant="contained"
                >
                    {label}
                </Button>
            </Link>
        </div>
    );
};

export default AddDataContainer;
