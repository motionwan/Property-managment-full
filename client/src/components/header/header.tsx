import { Typography, useTheme } from '@mui/material';
import styles from './header.module.css';
import { tokens } from '../../theme';

export interface headerProps {
    heading: string;
    subHeading: string;
}

const Header = ({ heading, subHeading }: headerProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <div className={styles.container}>
            <div>
                <Typography color={colors.grey[100]} variant="h2">
                    {heading}
                </Typography>
            </div>
            <div>
                <Typography variant="h5" color={colors.greenAccent[400]}>
                    {subHeading}
                </Typography>
            </div>
        </div>
    );
};

export default Header;
