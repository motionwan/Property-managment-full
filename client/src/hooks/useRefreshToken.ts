import axios from 'axios';
import useAuth from './useAuth';
import { baseUrl } from '../helpers/baseUrl';

interface Auth {
    accessToken: string;
    refreshToken: string;
    permissions: string[];
    firstName: string;
    lastName: string;
    image: string;
    userId: string;
    hotelId: string;
    currentTermId: string;
    photoId: string;
}

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const res = await axios.get(`${baseUrl}/refresh`, {
            withCredentials: true,
        });

        setAuth((prev: Auth) => {
            return {
                ...prev,
                accessToken: res.data?.accessToken,
                permissions: [res?.data?.role],
                firstName: res?.data?.firstName,
                lastName: res?.data?.lastName,
                image: res?.data?.image,
                userId: res.data.userId,
                hotelId: res?.data?.hotelId,
                photoId: res?.data?.photoId,
            };
        });
        console.log('refresh token', res?.data?.accessToken);
        console.log('permissions', [res?.data?.role]);
        console.log('firstName', res?.data?.firstName);
        console.log('lastName', res?.data?.lastName);
        console.log('userId', res?.data?.userId);
        console.log('hotelId', res?.data?.hotelId);
        console.log('role', res?.data?.role);
        console.log('photoId', res?.data?.photoId);
        return res?.data?.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
