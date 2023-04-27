import * as Yup from 'yup';

const addRoomSchema = Yup.object().shape({
    roomNumber: Yup.string().required('Room number is required'),
    type: Yup.string().required('Room type is required'),
    price: Yup.number().required('Price per night is required'),
    capacity: Yup.number().required('capacity of this room is required'),
    amenities: Yup.array().min(1, 'At least one amenity must be selected').of(Yup.string()),
    roomPics: Yup.array()
        .min(1, 'Please select at least one image')
        .max(8, 'You can only upload up to 8 images')
        .test('is-image', 'Please select only image files', (value) => {
            if (!value || value.length === 0) {
                // No files selected, so no error
                return true;
            }

            // Check that all selected files are images
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            return value.every((file) => validImageTypes.includes(file.type));
        })
        .test('file-size', 'File size should be less than 10MB', (value) => {
            if (!value || value.length === 0) {
                // No files selected, so no error
                return true;
            }

            // Check that all selected files are less than 10MB
            return value.every((file) => file.size <= 10 * 1024 * 1024);
        }),
});

export default addRoomSchema;
