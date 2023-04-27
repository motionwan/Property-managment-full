import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './sign-in.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { SignInSchema } from '../../form-schema/sign-in-schema';
import { FormRow } from '../form-row/form-row';
import { Label } from '../label/label';
import { Input } from '../input/input';
import { SubmitButton } from '../submit-button/submit-button';
import { baseUrl } from '../../helpers/baseUrl';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiseLoader } from 'react-spinners';
import TopBar from '../../scenes/global/top-bar/top-bar';
import MainSidebar from '../../scenes/global/sidebar/sidebar';
import MainLayout from '../../scenes/layout';

export interface SignInProps {
    className?: string;
}

export const SignIn = ({ className }: SignInProps) => {
    interface Error {
        message: string;
        // Other properties, if any
    }
    const [errorMessage, setErrorMessage] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { setAuth, persist, setPersist } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(SignInSchema),
    });

    const onSubmit = async (data: Record<string, string>) => {
        setLoading(true);
        try {
            const res = await axios.post(`${baseUrl}/users/login`, data, { withCredentials: true });

            if (res) {
                setAuth({
                    accessToken: res?.data?.accessToken,
                    permissions: [res?.data?.role],
                    firstName: res?.data?.firstName,
                    lastName: res?.data?.lastName,
                    userId: res?.data?.userId,
                    hotelId: res?.data?.hotelId,
                    email: res?.data?.email,
                    role: res?.data?.role,
                });

                navigate(from, { replace: true });
            }
        } catch (err: any) {
            setErrorMessage({ message: err?.response?.data?.message ?? 'An error occurred' });
        } finally {
            setLoading(false);
        }
    };

    const togglePersist = () => {
        setPersist(!persist);
        //setPersist((prev) => !prev);
    };
    useEffect(() => {
        localStorage.setItem('persist', persist.toString());
    }, [persist]);

    return (
        <div className={classNames(styles.root, className)}>
            <div></div>

            <div className={styles.mainPage}>
                {loading ? (
                    <RiseLoader />
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <h2>Sign in</h2>
                        {errorMessage && <p>{errorMessage.message}</p>}
                        <FormRow>
                            <Label htmlFor={'email'}>Email:</Label>
                            <Input id={'email'} {...register('email')} />
                        </FormRow>
                        <FormRow>
                            <Label htmlFor={'password'}>Password:</Label>
                            <Input id={'password'} {...register('password')} />
                        </FormRow>
                        <SubmitButton>SIGN IN</SubmitButton>
                        <p>
                            Not a member? <a>Sign up</a>
                        </p>
                        <p>
                            Forgot Password? <a>Reset password</a>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};
