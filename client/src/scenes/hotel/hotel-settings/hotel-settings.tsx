import MainLayout from '../../layout';
import Header from '../../../components/header/header';
import { Box, Button, Input, InputLabel, TextField, useTheme } from '@mui/material';
import styles from './hotel-settings.module.css';
import { tokens } from '../../../theme';
import { useFormik } from 'formik';
import AddHotelSchema from '../../../form-schema/add-hotel';
import { baseUrl } from '../../../helpers/baseUrl';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext/AuthContext';

const HotelSettings = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { auth } = useContext(AuthContext);

    interface value {
        hubtelApiKey: string;
        host: string;
        email: string;
        service: string;
        emailPassword: string;
        hubtelClientId: string;
    }

    const onSubmit = async (values: value) => {
        try {
            const res = await axios.put(`${baseUrl}/hotel`, {
                host: values.host,
                email: values.email,
                service: values.service,
                emailPassword: values.emailPassword,
                hubtelApiKey: values.hubtelApiKey,
                hubtelClientId: values.hubtelClientId,
            });
        } catch (err) {
            console.log(err);
        }
    };

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            host: '',
            service: '',
            email: '',
            emailPassword: '',
            hubtelApiKey: '',
            hubtelClientId: '',
        },
        validationSchema: AddHotelSchema,
        onSubmit,
    });
    console.log(values);
    return (
        <div>
            <MainLayout>
                <Header heading="Hotel Settings" subHeading="Settings for your Hotel" />
                <Box className={styles.mainContainer}>
                    <Box sx={{ backgroundColor: colors.primary[400] }} className={styles.container}>
                        <form onSubmit={handleSubmit}>
                            <Box className={styles.inputBox}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Email Host"
                                    placeholder="e.g google"
                                    variant="outlined"
                                    name="host"
                                    value={values.host}
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
                                    error={!!touched.host && !!errors.host}
                                    helperText={touched.host && errors.host}
                                />
                            </Box>
                            <Box className={styles.inputBox}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Service"
                                    variant="outlined"
                                    name="service"
                                    value={values.service}
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
                                    error={!!touched.service && !!errors.service}
                                    helperText={touched.service && errors.service}
                                />
                            </Box>
                            <Box className={styles.inputBox}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Hotel Email"
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
                                    label="Email Password"
                                    type="password"
                                    variant="outlined"
                                    name="emailPassword"
                                    value={values.emailPassword}
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
                                    error={!!touched.emailPassword && !!errors.emailPassword}
                                    helperText={touched.emailPassword && errors.emailPassword}
                                />
                            </Box>
                            <Box className={styles.inputBox}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Hubtel Api Key"
                                    variant="outlined"
                                    name="hubtelApiKey"
                                    value={values.hubtelApiKey}
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
                                    error={!!touched.hubtelApiKey && !!errors.hubtelApiKey}
                                    helperText={touched.hubtelApiKey && errors.hubtelApiKey}
                                />
                            </Box>
                            <Box className={styles.inputBox}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Hubtel Api Client ID"
                                    variant="outlined"
                                    name="hubtelClientId"
                                    value={values.hubtelClientId}
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
                                    error={!!touched.hubtelClientId && !!errors.hubtelClientId}
                                    helperText={touched.hubtelClientId && errors.hubtelClientId}
                                />
                            </Box>

                            <Box className={styles.buttonContainer}>
                                <Button type="submit" variant="contained" color="error">
                                    Confirm Settings
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </MainLayout>
        </div>
    );
};

export default HotelSettings;
