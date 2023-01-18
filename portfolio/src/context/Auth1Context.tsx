import {createContext, useEffect, useState} from "react";
import axios from "axios";


export interface Auth1ContextType {
    checkAuth: () => boolean;
    isAuthenticated: boolean;
    logIn: (email: string, password: string) => Promise<any>;
    logOut: () => Promise<any>;
    register: (data: any) => Promise<any>;
    token: string | null;
    user: null;
}


const login = async (email: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:5000/api/log/login', {email, password}, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('login response', response);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('isAuthenticated', 'true');
            checkAuth()
            window.location.reload()

        }
    } catch (e) {
        console.log('login error', e);
    }
}

const register = async (data: any) => {
    try {
        const response = await axios.post('http://localhost:5000/api/log/register', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('register response', response);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('isAuthenticated', 'true');
            checkAuth()
            window.location.reload()
        }
    } catch (e) {
        console.log('register error', e);
        return {status: 'error', message: 'Registration failed'};
    }

}

const logOut = async () => {
    try{
        const response = await axios.post('http://localhost:5000/api/log/logout')
        console.log('logout response', response);
        if (response.data.logout) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('isAuthenticated');
                window.location.reload()

                return ({logout: true})
        }
        else{
            console.log('logout error', response.data)
            return ({logout: false})
        }
    }
    catch (e:any) {
        console.log('logout error', e);
        return e
    }
}

const checkAuth = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    return !!(token && user && isAuthenticated);
}

const getAuthUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    }
    return null;
}

const getToken=()=>{
    checkAuth()
    return localStorage.getItem('token')
}



const Auth1Context= createContext<Auth1ContextType>({
    isAuthenticated: false,
    logIn: (email: string, password: string) => new Promise(() => {login(email, password).then(r => r)}),
    user: getAuthUser(),
    logOut: () => new Promise(() => {logOut().then(r => r)}),
    register: (data: any) => new Promise(() => {register(data).then(r => r)}),
    checkAuth: ()=> checkAuth(),
    token: getToken()
});

export default Auth1Context

const Auth1ContextProvider = ({children}:any) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(()=>{
        const check = checkAuth()
        setIsAuthenticated(check)
    },[])

    return (
        <Auth1Context.Provider value={{
            isAuthenticated: isAuthenticated,
            logIn: login,
            user: getAuthUser(),
            logOut: logOut,
            register: register,
            checkAuth: checkAuth,
            token: null
        }}>
            {children}
        </Auth1Context.Provider>
    )

}

export {Auth1ContextProvider, Auth1Context}
