import { NextFunction, Request, Response } from 'express';

export const checkAuth = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    if (!request.session.user && !request.cookies.user_sid) {
        response.sendStatus(401);
        return;
    }
    next();
};
