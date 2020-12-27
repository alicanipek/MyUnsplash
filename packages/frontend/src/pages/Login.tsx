import * as React from 'react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { User } from '../model/User';
import { RouteComponentProps } from 'react-router-dom';

const Login = ({ history }: RouteComponentProps) => {
    const { login } = useContext(AuthContext);

    const { register, handleSubmit } = useForm<User>();
    const onSubmit = handleSubmit(({ UserName, Password }) => {
        login({
            UserName: UserName,
            Password: Password,
        })
            .then(() => history.push('/posts'))
            .catch((err) => alert(err));
    });
    return (
        <>
            <form onSubmit={onSubmit}>
                <label>First Name</label>
                <input name="UserName" ref={register} />
                <label>Last Name</label>
                <input name="Password" ref={register} />
                <button type="submit">login</button>
            </form>
        </>
    );
};

export default Login;
