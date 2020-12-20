import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
export default {
    jwt_secret: process.env.JWT_TOKEN as jwt.Secret,
};
