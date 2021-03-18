import * as React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';
export default function Home() {
    const { isAuthenticated, isLoading, user } = useContext(AuthContext);
    return (
        <>
            {isLoading ? (
                <div>Loading</div>
            ) : (
                <>
                    <Header></Header>
                    <div>
                        {isAuthenticated ? (
                            <>
                                <div>
                                    {user?.Confirmed
                                        ? ''
                                        : 'Please confirm your email'}
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
                </>
            )}
        </>
    );
}
