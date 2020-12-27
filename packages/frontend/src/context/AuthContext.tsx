import * as React from 'react';
import { useState, useEffect } from 'react';
import { User } from '../model/User';
import { authService } from '../service';

interface IAuthContext {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (user: User) => Promise<boolean>;
    logout: () => void;
}

const initialContext = {
    isAuthenticated: false,
    isLoading: true,
    login: () => new Promise<boolean>(() => false),
    logout: () => {},
};

export const AuthContext = React.createContext<IAuthContext>(initialContext);

export default function Auth({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        let t = await authService.loggedIn();
        setIsAuthenticated(t);
        setIsLoading(false);
    };

    const login = async (user: User) => {
        let t = await authService.login(user);

        setIsAuthenticated(t);
        return t;
    };

    const logout = () => {
        authService
            .logout()
            .then(() => setIsAuthenticated(false))
            .catch((err) => alert(err));
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, isLoading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}
