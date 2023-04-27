import React, { useContext, useEffect, useState } from 'react';
import MainLayout from '../../layout';
import Header from '../../../components/header/header';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Input,
    TextField,
    useTheme,
} from '@mui/material';
import styles from './add-room.module.css';
import { tokens } from '../../../theme';
import { useFormik } from 'formik';
import { baseUrl } from '../../../helpers/baseUrl';
import axios from 'axios';
import addRoomSchema from '../../../form-schema/add-room-schema';
import AuthContext from '../../../context/AuthContext/AuthContext';

const AddNewRoom = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [amenities, setAmenities] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [roomPics, setRoomPics] = useState<File[]>([]);
    const { auth } = useContext(AuthContext);

    // get all amenities
    useEffect(() => {
        const getAllAmenities = async () => {
            const res = await axios.get(`${baseUrl}/amenity`);
            setAmenities(res.data);
            console.log(res.data);
        };
        getAllAmenities();
    }, []);

    const onSubmit = async (values: any) => {
        const formData = new FormData();
        formData.append('roomNumber', values.roomNumber);
        formData.append('type', values.type);
        formData.append('hotelId', auth?.hotelId!);
        formData.append('capacity', values.capacity);
        formData.append('price', values.price);
        roomPics.forEach((image) => formData.append('roomPics', image));
        formData.append('amenities', values.amenities);
        try {
            const res = await axios.post(`${baseUrl}/room`, formData);
        } catch (err) {
            console.log(err);
        }
    };

    const { values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue } =
        useFormik({
            initialValues: {
                roomNumber: '',
                type: '',
                capacity: '',
                price: '',
                amenities: [],
                roomPics: [],
            },
            validationSchema: addRoomSchema,
            onSubmit,
        });
    console.log(values);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amenityId = event.target.name;
        if (event.target.checked) {
            setSelectedAmenities([...selectedAmenities, amenityId]);
            setFieldValue('amenities', [...values?.amenities!, amenityId]);
        } else {
            setSelectedAmenities(selectedAmenities.filter((id) => id !== amenityId));
            setFieldValue(
                'amenities',
                values?.amenities?.filter((id) => id !== amenityId)
            );
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []);
        setRoomPics(files);
        setFieldValue('roomPics', files);
    };

    return (
        <div>
            <MainLayout>
                <Header heading="Add Room" subHeading="Add A New Room" />
                <Box className={styles.mainContainer}>
                    <Box sx={{ backgroundColor: colors.primary[400] }} className={styles.container}>
                        <form onSubmit={handleSubmit}>
                            <Box className={styles.inputBox}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Room Number"
                                    variant="outlined"
                                    name="roomNumber"
                                    value={values.roomNumber}
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
                                    error={!!touched.roomNumber && !!errors.roomNumber}
                                    helperText={touched.roomNumber && errors.roomNumber}
                                />
                            </Box>
                            <Box className={styles.inputBox}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Maximum Capacity"
                                    type="number"
                                    variant="outlined"
                                    name="capacity"
                                    value={values.capacity}
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
                                    error={!!touched.capacity && !!errors.capacity}
                                    helperText={touched.capacity && errors.capacity}
                                />
                            </Box>
                            <Box className={styles.inputBox}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Price Per Night"
                                    type="number"
                                    variant="outlined"
                                    name="price"
                                    value={values.price}
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
                                    error={!!touched.price && !!errors.price}
                                    helperText={touched.price && errors.price}
                                />
                            </Box>
                            <Box className={styles.inputBox}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Type"
                                    variant="outlined"
                                    name="type"
                                    value={values.type}
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
                                    error={!!touched.type && !!errors.type}
                                    helperText={touched.type && errors.type}
                                />
                            </Box>
                            <Box className={styles.inputBox}>
                                <FormGroup>
                                    {amenities.map(({ _id, name }) => (
                                        <FormControlLabel
                                            key={_id}
                                            control={
                                                <Checkbox
                                                    name={_id}
                                                    checked={values?.amenities?.includes(_id)}
                                                    onChange={handleCheckboxChange}
                                                />
                                            }
                                            label={name}
                                        />
                                    ))}
                                </FormGroup>
                                {errors.amenities && (
                                    <div style={{ color: 'red' }}>{errors.amenities}</div>
                                )}
                            </Box>

                            <Box className={styles.inputBox}>
                                <Input
                                    type="file"
                                    inputProps={{ multiple: true }}
                                    onChange={handleImageChange}
                                />
                                {errors.roomPics && (
                                    <div style={{ color: 'red' }}>{errors.roomPics}</div>
                                )}
                            </Box>
                            <Box className={styles.buttonContainer}>
                                <Button type="submit" variant="contained" color="error">
                                    Add Room
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </MainLayout>
        </div>
    );
};

export default AddNewRoom;
