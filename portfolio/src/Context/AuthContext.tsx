import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

const initialState = {
    isAuthenticated: false,
    user: null,
};

const routes={
    login: 'http://localhost:5000/api/log/login',
    signup: 'http://localhost:5000/api/log/signup',
    getUser: 'http://localhost:5000/api/log/get-user',
}

const authReducer = (state:any, { type, payload }:any) => {
    switch (type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: payload.user,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
    }
};

const AuthContext = createContext({
    ...initialState,
    logIn: (email: string | File, password: string | File) => Promise.resolve(),
    register: (data: any) => Promise.resolve(),
    logOut: () => Promise.resolve(),
});

export const AuthProvider = ({ children }:any) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const getUserInfo = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const res = await axios.get(routes.getUser);
                axios.defaults.headers.common['x-auth-token'] = token;
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        user: res.data.user,
                    },
                });
            } catch (err) {
                console.error(err);
            }
        } else {
            delete axios.defaults.headers.common['x-auth-token'];
        }
    };

    // verify user on reducer state init or changes
    useEffect( () => {
        if (!state.user) {
             getUserInfo().then(r => r);
        }
    }, [state]);

    const logIn = async (email: any, password: any) => {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const body = { email, password };
        console.log('login body', body)

        try {
            const res = await axios.post(routes.login, body, config);
            localStorage.setItem('token', res.data.token);
            await getUserInfo();
        } catch (err:any) {
            console.error(err);
        }
    };

    const register = async (data:any) => {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const body = {data};
        try {
            const res = await axios.post(routes.signup, body, config);
            localStorage.setItem('token', res.data.token);
            await getUserInfo();
        } catch (err) {
            console.error(err);
        }
    };

    const logOut = async () => {
        try {
            localStorage.removeItem('token');
            dispatch({
                type: 'LOGOUT',
                payload: undefined
            });
        } catch (err:any) {
            console.error(err);
        }
    };

    return (
        <AuthContext.Provider value={{ ...state, logIn, register, logOut }}>
         {children}
        </AuthContext.Provider>
);
};

export default AuthContext;
