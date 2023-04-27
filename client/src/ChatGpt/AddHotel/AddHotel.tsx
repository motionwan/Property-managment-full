import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import './addhotel.scss';

const schema = Yup.object().shape({
    name: Yup.string().required('Please enter a hotel name'),
    address: Yup.string().required('Please enter a hotel address'),
    city: Yup.string().required('Please enter a city'),
    state: Yup.string().required('Please enter a state'),
    phone: Yup.string().required('Please enter a phone number'),
    email: Yup.string().required('Please enter an email address'),
    country: Yup.string().required('Please enter a country'),
});

const HotelForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: Record<string, string>) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('address', data.address);
        formData.append('city', data.city);
        formData.append('state', data.state);
        formData.append('phone', data.phone);
        formData.append('email', data.email);
        formData.append('country', data.country);
        formData.append('logo', data.logo[0]);

        try {
            const response = await axios.post('/api/hotels', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="formContainer">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="formGroup">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" {...register('name')} />
                    {errors.name && <p className="errorMessage">{String(errors.name.message)}</p>}

                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" {...register('address')} />
                    {errors.address && (
                        <p className="errorMessage">{String(errors.address.message)}</p>
                    )}

                    <label htmlFor="city">City</label>
                    <input type="text" id="city" {...register('city')} />
                    {errors.city && <p className="errorMessage">{String(errors.city.message)}</p>}

                    <label htmlFor="state">State</label>
                    <input type="text" id="state" {...register('state')} />
                    {errors.state && <p className="errorMessage">{String(errors.state.message)}</p>}

                    <label htmlFor="phone">Phone</label>
                    <input type="text" id="phone" {...register('phone')} />
                    {errors.phone && <p className="errorMessage">{String(errors.phone.message)}</p>}

                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" {...register('email')} />
                    {errors.email && <p className="errorMessage">{String(errors.email.message)}</p>}

                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" {...register('country')} />
                    {errors.country && (
                        <p className="errorMessage">{String(errors.country.message)}</p>
                    )}

                    <label htmlFor="logo">Logo</label>
                    <input type="file" id="logo" {...register('logo')} />
                    {errors.logo && <p className="errorMessage">{String(errors.logo.message)}</p>}
                    <button type="submit">Create Hotel</button>
                </div>
            </form>
        </div>
    );
};

export default HotelForm;
