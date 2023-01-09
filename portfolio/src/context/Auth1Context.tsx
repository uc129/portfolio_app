import {createContext} from "react";

interface Auth1ContextType {
    isAuthenticated: boolean;
    logIn: (email: string, password: string) => Promise<void>;
    user: null;
    logOut: () => Promise<void>;
    register: (data: any) => Promise<void>;
}

const Auth1Context= createContext<Auth1ContextType>({
    isAuthenticated: false,
    logIn: (email: string, password: string) => new Promise(() => {}),
    user: null,
    logOut: () => new Promise(() => {}),
    register: (data: any) => new Promise(() => {}),
});

export default Auth1Context


