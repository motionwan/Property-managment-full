import * as yup from 'yup';

const AddHotelSchema = yup.object().shape({
    name: yup.string().required('Hotel Name is required'),
    phone: yup.string().required('Hotel Phone Number is required'),
    email: yup.string().email('Please enter a valid email').required('Hotel Email is required'),
    country: yup.string().required('Country is required'),
    state: yup.string().required('State is required'),
    city: yup.string().required('City is required'),
    address: yup.string().required('Address is required'),
    logo: yup.string(),
});

export default AddHotelSchema;
