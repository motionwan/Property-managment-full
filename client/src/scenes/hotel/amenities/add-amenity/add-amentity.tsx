import React, { useContext, useEffect, useState } from 'react';
import MainLayout from '../../../layout';
import Header from '../../../../components/header/header';
import { Box, Button, InputLabel, MenuItem, Select, TextField, useTheme } from '@mui/material';
import styles from './add-amenity.module.css';
import { tokens } from '../../../../theme';
import { useFormik } from 'formik';
import { baseUrl } from '../../../../helpers/baseUrl';
import axios from 'axios';
import AddAmenitySchema from '../../../../form-schema/add-amentity';
import AuthContext from '../../../../context/AuthContext/AuthContext';

const AddAmenity = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { auth } = useContext(AuthContext);

    interface value {
        name: string;
        condition: string;
    }

    const onSubmit = async (values: value) => {
        try {
            const res = await axios.post(`${baseUrl}/amenity`, {
                name: values.name,
                condition: values.condition,
                hotelId: auth?.hotelId,
            });
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const { values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue } =
        useFormik({
            initialValues: {
                name: '',
                condition: '',
                hotelId: auth?.hotelId,
            },
            validationSchema: AddAmenitySchema,
            onSubmit,
        });
    console.log(values);
    return (
        <div>
            <MainLayout>
                <Header heading="Add Amenity" subHeading="Add A New Amenity" />
                <Box className={styles.mainContainer}>
                    <Box sx={{ backgroundColor: colors.primary[400] }} className={styles.container}>
                        <form onSubmit={handleSubmit}>
                            <Box className={styles.inputBox}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Amenity Name"
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
                                <InputLabel id="condition">Condition</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="condition"
                                    id="condition"
                                    label="Condition"
                                    variant="outlined"
                                    name="condition"
                                    value={values.condition}
                                    onChange={(e) => {
                                        setFieldValue('condition', e.target.value);
                                    }}
                                    onBlur={handleBlur}
                                >
                                    {/* select goes here */}
                                    <MenuItem value="working">Working</MenuItem>
                                    <MenuItem value="faulty">Faulty</MenuItem>
                                    <MenuItem value="in service">In Service</MenuItem>
                                </Select>
                            </Box>

                            <Box className={styles.buttonContainer}>
                                <Button type="submit" variant="contained" color="error">
                                    Add Amenity
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </MainLayout>
        </div>
    );
};

export default AddAmenity;
