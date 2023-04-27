import * as React from 'react';
import { tokens } from '../../../theme';
import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Box,
    Collapse,
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';
import { baseUrl } from '../../../helpers/baseUrl';
import axios from 'axios';
import { useTheme } from '@emotion/react';
import styles from './amenities.module.css';
import MainLayout from '../../layout';
import Header from '../../../components/header/header';
import AddDataContainer from '../../../components/add-button-container/add-data-button';

interface Row {
    _id: string;
    name: string;
    city: string;
    country: string;
    email: string;
    phone: string;
}

const Amenities = () => {
    const [rows, setRows] = useState<Row[]>([]);
    const [expandedRow, setExpandedRow] = useState<string | null>(null);
    const theme = useTheme();
    const colors = tokens(theme.palette.colors);

    useEffect(() => {
        const getAllHotels = async () => {
            const res = await axios.get(`${baseUrl}/amenity/`);
            setRows(res.data);
            console.log(res.data);
        };
        getAllHotels();
    }, []);

    const handleRowClick = (rowId: string) => {
        if (rowId === expandedRow) {
            setExpandedRow(null);
        } else {
            setExpandedRow(rowId);
        }
    };

    return (
        <Box>
            <MainLayout>
                <Box className={styles.tableContainer} sx={{ maxWidth: '100%', overflow: 'auto' }}>
                    <Header heading="Amenities" subHeading="Add Update and Delete Amenities" />
                    <AddDataContainer label="Add Amenity" to="/add-amenity" />
                    <TableContainer component={Paper}>
                        <Table aria-label="expandable table">
                            <TableHead
                                className={styles.tableHeader}
                                style={{ background: colors.blueAccent[400] }}
                            >
                                <TableRow>
                                    <TableCell>Actions</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Room</TableCell>
                                    <TableCell>Condition</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <React.Fragment key={row._id}>
                                        <TableRow onClick={() => handleRowClick(row._id)}>
                                            <TableCell>
                                                <IconButton size="small">
                                                    {expandedRow === row._id ? (
                                                        <KeyboardArrowUpIcon />
                                                    ) : (
                                                        <KeyboardArrowDownIcon />
                                                    )}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row._id}</TableCell>
                                            <TableCell>Functional</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                style={{ paddingBottom: 0, paddingTop: 0 }}
                                                colSpan={6}
                                            >
                                                <Collapse
                                                    in={expandedRow === row._id}
                                                    timeout="auto"
                                                    unmountOnExit
                                                >
                                                    <Box margin={1}>
                                                        <IconButton
                                                            sx={{
                                                                backgroundColor:
                                                                    colors.redAccent[600],
                                                                marginRight: '20px',
                                                            }}
                                                            size="medium"
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            sx={{
                                                                backgroundColor:
                                                                    colors.blueAccent[600],
                                                                marginRight: '20px',
                                                            }}
                                                            size="medium"
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </MainLayout>
        </Box>
    );
};

export default Amenities;
