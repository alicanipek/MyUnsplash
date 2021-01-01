import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, RouteComponentProps } from 'react-router-dom';
import Button from '../components/Button';
import FormGroup from '../components/FormGroup';
import TextBox from '../components/TextBox';
import LogoBlack from '../images/LogoBlack';
import { User } from '../model/User';
import { authService, userService } from '../service';

export default function Register({ history }: RouteComponentProps) {
    const [error, setError] = useState(false);
    const { handleSubmit, control } = useForm<User>();
    const onSubmit = handleSubmit(({ UserName, Password, Email }) => {
        console.log(UserName + ' ' + Password + ' ' + Email);
        userService
            .save({
                Email: Email,
                UserName: UserName,
                Password: Password,
            })
            .then(() => history.push('/login'))
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
                    <div>Error</div>
                </div>
            )}
            <div className="absolute flex top-0 bottom-0 left-0 right-0">
                <div className="flex flex-1 flex-row w-full min-h-screen overflow-auto">
                    <div className="flex flex-1 flex-col w-2/5 justify-between  bg-green-400  px-20 py-16 overflow-auto">
                        <div>
                            <LogoBlack
                                width={36}
                                height={36}
                                className="mb-6"
                                fill="white"
                            ></LogoBlack>
                        </div>
                        <div>
                            <div className="text-5xl text-white font-bold mb-4">
                                Creation starts here
                            </div>
                            <div className="text-2xl text-white font-normal pb-7">
                                Access 2,451,867 free, high-resolution photos
                                you can’t find anywhere else
                            </div>
                        </div>

                        <div>
                            <p className="text-base text-white font-normal mb-4">
                                Uploaded about 7 years ago by Matthew Skinner
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col w-3/5 justify-center items-center content-center  pb-5 pt-20 px-36 overflow-auto">
                        <div className="flex flex-col items-center mb-14">
                            <div className="font-bold text-5xl mb-4">
                                Join Unsplash
                            </div>
                            <div className="my-4">
                                <p>
                                    Already have an account?{' '}
                                    <Link
                                        to="/login"
                                        className="underline text-gray-500"
                                    >
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className="w-full">
                            <form onSubmit={onSubmit}>
                                <FormGroup label="Email">
                                    <TextBox
                                        name="Email"
                                        control={control}
                                    ></TextBox>
                                </FormGroup>
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
                                    <Button type="submit">Join</Button>
                                </FormGroup>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
