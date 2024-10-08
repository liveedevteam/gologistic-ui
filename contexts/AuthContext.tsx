import router from 'next/router';
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
    isAuthenticated: boolean | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    // other auth related properties and methods
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const verifyToken = async (token: string) => {
        const url = process.env.NEXT_PUBLIC_API_URL + '/auths/verify';
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        try {
            await axios.get(url, { headers });
            setIsAuthenticated(true);
        } catch (error: any) {
            console.error('Token verification failed:', error);
            setIsAuthenticated(false);
            window.localStorage.removeItem('token');
        }
    };

    const login = async (email: string, password: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            alert('Invalid email address');
            return;
        }
        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return
        }
        const url = process.env.NEXT_PUBLIC_API_URL + '/auths/login';
        const body = {
            email,
            password
        }
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const res = await axios.post(url, body, { headers });
            const { data } = res;
            setIsAuthenticated(true);
            window.localStorage.setItem('token', data.token);
            setToken(data.token);
            router.push('/dashboard');
        } catch (error: any) {
            console.error(error);
            setIsAuthenticated(false);
            let message = ''
            if (error.response) {
                message = `[${error.response.status}] ${error.response.data.msg}`;
            } else {
                message = error.msg;
            }
            alert(message);
        }
    };

    const logout = () => {
        window.localStorage.removeItem('token');
        setIsAuthenticated(false);
        setToken(null);
        router.push('/login');
    };

    useEffect(() => {
        const storedToken = window.localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            verifyToken(token);
        } else {
            setIsAuthenticated(false);
        }
    }, [token]);

    useEffect(() => {
        const handleRouteChange = () => {
            const storedToken = window.localStorage.getItem('token');
            if (storedToken) {
                verifyToken(storedToken);
            } else {
                setIsAuthenticated(false);
            }
        };

        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};