import * as React from 'react';
import { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Logout({ history }: RouteComponentProps) {
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    logout();
    history.push('/');
  }, []);
  return <div />;
}
