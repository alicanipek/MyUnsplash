import * as React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
export default function Home() {
    const { isAuthenticated, user } = useContext(AuthContext);
    return (
        <div>
            {isAuthenticated ? (
                <>
                    <div>
                        {user?.Confirmed ? '' : 'Please confirm your email'}
                    </div>
                    <Link to="logout">Logout</Link>
                </>
            ) : (
                <>
                    <Link to="login">Login</Link>
                    <Link to="register">Register</Link>
                </>
            )}
            <Link to="posts">Posts</Link>
        </div>
    );
}
