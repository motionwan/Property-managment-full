import * as yup from 'yup';

const AddAmenitySchema = yup.object().shape({
    name: yup.string().required('Amenity Name is required'),
    condition: yup.string().required('Condition of amenity is required'),
});

export default AddAmenitySchema;
