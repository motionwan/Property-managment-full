import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const refresh = useRefreshToken();
    const { persist } = useAuth();
    const { auth } = useAuth() as { auth: { accessToken: string } };

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        /* persist checks to see if device is trusted */
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
        // console.log(auth?.accessToken);
    }, [refresh, auth]);

    useEffect(() => {
        // console.log(`isLoading: ${isLoading}`);
        // console.log(`username: ${auth?.firstName}`);
        // console.log(`permissions: ${auth.role}`);
        // console.log(`username: ${auth.name}`);
        // console.log(`userId: ${auth.userId}`);
        // console.log(`userImage: ${auth.image}`);
    }, [isLoading, auth]);

    return <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
