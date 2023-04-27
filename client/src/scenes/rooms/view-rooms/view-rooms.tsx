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
import styles from './view-rooms.module.css';
import MainLayout from '../../layout';
import Header from '../../../components/header/header';
import AddDataContainer from '../../../components/add-button-container/add-data-button';

interface Row {
    _id: string;
    roomNumber: string;
    type: string;
    capacity: number;
    price: number;
    // amenities: string;
}

const Hotels = () => {
    const [rows, setRows] = useState<Row[]>([]);
    const [expandedRow, setExpandedRow] = useState<string | null>(null);
    const theme = useTheme();
    const colors = tokens(theme.palette.colors);

    useEffect(() => {
        const getAllHotels = async () => {
            const res = await axios.get(`${baseUrl}/room/`);
            setRows(res.data);
            // console.log(res.data);
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
                    <Header heading="Rooms" subHeading="Add Update and Delete Rooms" />
                    <AddDataContainer label="Add Room" to="/add-room" />
                    <TableContainer component={Paper}>
                        <Table aria-label="expandable table">
                            <TableHead
                                className={styles.tableHeader}
                                style={{ background: colors.blueAccent[400] }}
                            >
                                <TableRow>
                                    <TableCell>Actions</TableCell>
                                    <TableCell>Room Number</TableCell>
                                    <TableCell>Maximum Capacity</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Price Per Night</TableCell>
                                    {/* <TableCell>Amenities</TableCell> */}
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
                                            <TableCell>{row.roomNumber}</TableCell>
                                            <TableCell>{row.capacity}</TableCell>
                                            <TableCell>{row.type}</TableCell>
                                            <TableCell>GHC {row.price}</TableCell>
                                            {/* <TableCell>{row.phone}</TableCell> */}
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

export default Hotels;
