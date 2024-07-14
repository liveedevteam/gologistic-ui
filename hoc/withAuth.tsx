// hoc/withAuth.tsx
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, ComponentType } from 'react';

const withAuth = (WrappedComponent: ComponentType) => {
    return (props: any) => {
        const { isAuthenticated } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (isAuthenticated === null) {
                // Handle loading state
                return;
            }
            if (!isAuthenticated) {
                router.push('/login');
            }
        }, [isAuthenticated, router]);

        if (isAuthenticated === null) {
            // Render a loading indicator while checking authentication status
            return <div>Loading...</div>;
        }

        if (!isAuthenticated) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;