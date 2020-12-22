import 'reflect-metadata';
import { router } from './routes/Routes';
import express from 'express';
import session from 'express-session';
import { createConnection, ConnectionOptions } from 'typeorm';
import * as bodyParser from 'body-parser';
import ormconfig from '../ormconfig.js';
import cors from 'cors';
import { redis } from './services/redis';
import connectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
require('dotenv').config();

createConnection(ormconfig as ConnectionOptions)
    .then(async () => {
        const app = express();
        app.use(bodyParser.json());
        app.use(cookieParser());

        const RedisStore = connectRedis(session);

        const sessionOption: session.SessionOptions = {
            name: 'user_sid',
            store: new RedisStore({
                client: redis as any,
            }),
            secret: process.env.REDIS_SECRET!,
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: false,
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
            },
        };

        app.use(session(sessionOption));

        // This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
        app.use((req, res, next) => {
            if (req.cookies.user_sid && !req.session.user) {
                res.clearCookie('user_sid');
            }
            next();
        });

        const corsOptions = {
            credentials: true,
            origin: 'http://localhost:3000',
        };
        app.use(cors(corsOptions));

        app.use('/api', router);

        app.listen(4000, () => {
            console.log(`Example app listening at http://localhost:4000`);
        });
    })
    .catch((error) => console.error(error));
