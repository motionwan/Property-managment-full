import classNames from 'classnames';
import styles from './sign-up.module.scss';
import { FormRow } from '../form-row/form-row';
import { Label } from '../label/label';
import { Input } from '../input/input';
import { SubmitButton } from '../submit-button/submit-button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFormState } from 'react-hook-form';
import axios from 'axios';
import { RiseLoader } from 'react-spinners';
import { useState } from 'react';
import { signUpSchema } from '../../form-schema/sign-up-schema';
import { baseUrl } from '../../helpers/baseUrl';
import { Link } from 'react-router-dom';
export interface SignUpProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-sign-ups-and-templates
 */
export const SignUp = ({ className }: SignUpProps) => {
    interface Error {
        message: string;
        // Other properties, if any
    }
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<Error | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signUpSchema),
    });

    const onSubmit = async (data: Record<string, string>) => {
        setLoading(true);
        try {
            const res = await axios.post(`${baseUrl}/users`, data);
        } catch (err: any) {
            setErrorMessage({ message: err?.response?.data?.message ?? 'An error occurred' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={classNames(styles.root, className)}>
            <div />
            <div className={styles.mainPage}>
                {loading ? (
                    <RiseLoader />
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <h2>Sign up</h2>
                        <div>{errorMessage && <p>{errorMessage.message}</p>}</div>
                        <FormRow>
                            <Label htmlFor={'firstName'}>First Name</Label>
                            <Input id="firstName" {...register('firstName')} />
                        </FormRow>
                        <FormRow>
                            <Label htmlFor={'lastName'}>Last Name</Label>
                            <Input id={'lastName'} {...register('lastName')} />
                        </FormRow>
                        <FormRow>
                            <Label htmlFor={'email'}>Email</Label>
                            <Input id={'email'} {...register('email')} />
                        </FormRow>
                        <FormRow>
                            <Label htmlFor={'password'}>Password</Label>
                            <Input type="password" id={'password'} {...register('password')} />
                        </FormRow>
                        <FormRow>
                            <Label htmlFor={'repeatPassword'}>Repeat Password</Label>
                            <Input
                                type="password"
                                id={'repeatPassword'}
                                {...register('repeatPassword')}
                            />
                        </FormRow>
                        <SubmitButton>SIGN UP</SubmitButton>
                        <div>
                            <p>
                                Already a member? <Link to="/login">Login.</Link>
                            </p>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
