import { createContext, useState, ReactNode } from 'react';

// type hotelId = {
//     name: string;
//     address: string;
//     city: string;
//     state: string;
//     phone: string;
//     logo: string;
//     email: string;
//     country: string;
//     createdAt: Date;
//     timestamps: Date;
//     settings: {
//         host: string;
//         service: string;
//         senderEmail: string;
//         emailPassword: string;
//         hubtelApiSecret: string;
//         hubtelClientId: string;
//     };
// };

type auth = {
    role?: string;
    permissions?: string[];
    accessToken?: string;
    firstName?: string;
    lastName?: string;
    userId?: string;
    hotelId?: string;
    email?: string;
};

type AuthContextType = {
    auth: auth;
    setAuth: (value: object) => void;
    persist: boolean;
    setPersist: (value: boolean) => void;
    currentData: object;
    setCurrentData: (value: object) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState<object>({});
    const [currentData, setCurrentData] = useState<object>({});
    const [persist, setPersist] = useState<boolean>(
        JSON.parse(localStorage.getItem('persist') || 'false')
    );

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                persist,
                setPersist,
                currentData,
                setCurrentData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
