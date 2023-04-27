import React from 'react';
import MainLayout from '../../layout';
import Header from '../../../components/header/header';
import { Box, Button, Input, InputLabel, TextField, useTheme } from '@mui/material';
import styles from './update-hotels.module.css';
import { tokens } from '../../../theme';
import { useFormik } from 'formik';
import AddHotelSchema from '../../../form-schema/add-hotel';
import { baseUrl } from '../../../helpers/baseUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateHotel = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    interface value {
        name: string;
        phone: string;
        email: string;
        country: string;
        state: string;
        city: string;
        address: string;
        logo: string;
    }

    const onSubmit = async (values: value) => {
        const data = new FormData();
        data.append('name', values.name);
        data.append('phone', values.phone);
        data.append('email', values.email);
        data.append('country', values.country);
        data.append('state', values.state);
        data.append('city', values.city);
        data.append('address', values.address);
        data.append('logo', values.logo);
        try {
            const res = await axios.put(`${baseUrl}/hotel`, data);
            if (res) {
                navigate('/hotels');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            country: '',
            state: '',
            city: '',
            address: '',
            logo: '',
        },
        validationSchema: AddHotelSchema,
        onSubmit,
    });
    console.log(values);
    return (
        <div>
            <MainLayout>
                <Header
                    heading="Update Hotel"
                    subHeading="Update A Hotel. Please Do NOT refresh this page, before submitting data"
                />
                <Box className={styles.mainContainer}>
                    <Box sx={{ backgroundColor: colors.primary[400] }} className={styles.container}>
                        <form onSubmit={handleSubmit}>
                            <Box className={styles.inputBox}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Hotel Name"
                                    variant="outlined"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputProps={{
                                        style: {
                                            color: colors.grey[100],
                                        },
                                    }}
                                    InputLabelProps={{
                                        style: { fontSize: 20, color: colors.grey[100] },
                                    }}
                                    error={!!touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                />
                            </Box>
                            <Box className={styles.inputBox}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Phone Number"
                                    variant="outlined"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputProps={{
                                        style: {
                                            color: colors.grey[100],
                                        },
                                    }}
                                    InputLabelProps={{
                                        style: { fontSize: 20, color: colors.grey[100] },
                                    }}
                                    error={!!touched.phone && !!errors.phone}
                                    helperText={touched.phone && errors.phone}
                                />
                            </Box>
                            <Box className={styles.inputBox}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputProps={{
                                        style: {
                                            color: colors.grey[100],
                                        },
                                    }}
                                    InputLabelProps={{
                                        style: { fontSize: 20, color: colors.grey[100] },
                                    }}
                                    error={!!touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                />
                            </Box>

                            <Box className={styles.inputBox}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Country"
                                    variant="outlined"
                                    name="country"
                                    value={values.country}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputProps={{
                                        style: {
                                            color: colors.grey[100],
                                        },
                                    }}
                                    InputLabelProps={{
                                        style: { fontSize: 20, color: colors.grey[100] },
                                    }}
                                    error={!!touched.country && !!errors.country}
                                    helperText={touched.country && errors.country}
                                />
                            </Box>
                            <Box className={styles.inputBox}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Region/State"
                                    variant="outlined"
                                    name="state"
                                    value={values.state}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputProps={{
                                        style: {
                                            color: colors.grey[100],
                                        },
                                    }}
                                    InputLabelProps={{
                                        style: { fontSize: 20, color: colors.grey[100] },
                                    }}
                                    error={!!touched.state && !!errors.state}
                                    helperText={touched.state && errors.state}
                                />
                            </Box>
                            <Box className={styles.inputBox}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="City"
                                    variant="outlined"
                                    name="city"
                                    value={values.city}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputProps={{
                                        style: {
                                            color: colors.grey[100],
                                        },
                                    }}
                                    InputLabelProps={{
                                        style: { fontSize: 20, color: colors.grey[100] },
                                    }}
                                    error={!!touched.city && !!errors.city}
                                    helperText={touched.city && errors.city}
                                />
                            </Box>
                            <Box className={styles.inputBox}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Address"
                                    variant="outlined"
                                    name="address"
                                    value={values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputProps={{
                                        style: {
                                            color: colors.grey[100],
                                        },
                                    }}
                                    InputLabelProps={{
                                        style: { fontSize: 20, color: colors.grey[100] },
                                    }}
                                    error={!!touched.address && !!errors.address}
                                    helperText={touched.address && errors.address}
                                />
                            </Box>
                            <Box className={styles.inputBox}>
                                <InputLabel
                                    sx={{ fontSize: '20px', mb: '10px' }}
                                    htmlFor="file-upload"
                                >
                                    Logo
                                </InputLabel>
                                <Input
                                    id="file-upload"
                                    type="file"
                                    name="logo"
                                    value={values.logo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Box>
                            <Box className={styles.buttonContainer}>
                                <Button type="submit" variant="contained" color="error">
                                    Add Hotel
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </MainLayout>
        </div>
    );
};

export default UpdateHotel;
