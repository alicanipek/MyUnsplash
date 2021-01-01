import * as React from 'react';
import { ReactElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { userService } from '../service';
import { UserService } from '../service/Auth/UserService';

interface Token {
    token: string;
}
export default function ConfirmUser({
    match,
    history,
}: RouteComponentProps<Token>): ReactElement {
    React.useEffect(() => {
        async function confirm() {
            let t = await userService.confirm(match.params.token);
            if (t) {
                history.push('/login');
            } else {
                alert('confirmation error');
            }
        }
        confirm();
    });
    return <div></div>;
}
