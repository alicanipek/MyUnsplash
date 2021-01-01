import * as React from 'react';
import { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { User } from '../model/User';
import { RouteComponentProps } from 'react-router-dom';
import FormGroup from '../components/FormGroup';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import LogoBlack from '../images/LogoBlack';

const Login = ({ history }: RouteComponentProps) => {
    const { login } = useContext(AuthContext);
    const [error, setError] = useState(false);
    const { handleSubmit, control } = useForm<User>();
    const onSubmit = handleSubmit(({ UserName, Password }) => {
        console.log(UserName + ' ' + Password);
        login({
            UserName: UserName,
            Password: Password,
        })
            .then(() => history.push('/posts'))
            .catch((err) => {
                setError(true);
                setTimeout(function () {
                    setError(false);
                }, 3000);
            });
    });
    return (
        <>
            {error && (
                <div className="absolute bg-red-400 text-white w-full h-16 py-5 flex  flex-row justify-center">
                    <div>
                        You need to sign in or sign up before continuing.{' '}
                    </div>
                </div>
            )}
            <div className="container mx-auto flex flex-row justify-center items-center content-center h-screen">
                <div className="w-2/5">
                    <div className="flex flex-col items-center">
                        <a href="/">
                            <LogoBlack
                                width={64}
                                height={64}
                                className="mb-6"
                            ></LogoBlack>
                        </a>
                        <div className="text-3xl font-bold mb-2">Login</div>
                        <p className="mb-8">Welcome back.</p>
                    </div>
                    <form onSubmit={onSubmit}>
                        <FormGroup label="Username">
                            <TextBox
                                name="UserName"
                                control={control}
                            ></TextBox>
                        </FormGroup>
                        <FormGroup label="Password">
                            <TextBox
                                name="Password"
                                type="Password"
                                control={control}
                            ></TextBox>
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit">Login</Button>
                        </FormGroup>
                    </form>
                    <div className="flex flex-col items-center">
                        <div>
                            <p>
                                Don't have an account?{' '}
                                <a
                                    href="/register"
                                    className="underline text-gray-500"
                                >
                                    Join
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
