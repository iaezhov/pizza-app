import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

function RequireAuth({ children }: { children: ReactNode }) {
	const token = localStorage.getItem('jwt');

	if (!token) {
		return <Navigate to='/auth/login' replace />;
	}

	return children;
}

export default RequireAuth;