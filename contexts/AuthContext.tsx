import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean | null;
    // other auth related properties and methods
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setToken(window.localStorage.getItem('token'));
        }, 100);
    }, []);

    useEffect(() => {
        // Simulate an async authentication check
        setTimeout(() => {
            // Example: set it to true for authenticated and false for unauthenticated
            if (token) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        }, 1000);
    }, [token]);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
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
