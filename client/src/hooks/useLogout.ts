import axios from 'axios';
import { baseUrl } from '../helpers/baseUrl';
import useAuth from './useAuth';

const useLogout = (): (() => Promise<void>) => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({}); // any value to represent a non authenticated person
        try {
            await axios.get(`${baseUrl}/logout`, {
                withCredentials: true,
            });
        } catch (err) {
            console.log(err);
        }
    };
    return logout;
};

export default useLogout;

// usage example
// const logout = useLogout();
// const signOut = async () => {
//   await logout();
//   navigate('/to wherever you want');
// };
