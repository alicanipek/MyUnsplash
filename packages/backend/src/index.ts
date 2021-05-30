import 'reflect-metadata';
import express from 'express';
import session from 'express-session';
import { createConnection, ConnectionOptions } from 'typeorm';
import cors from 'cors';
import connectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import { redis } from './services/redis';
import ormconfig from '../ormconfig';
import { router } from './routes/Routes';

require('dotenv').config();

createConnection(ormconfig as ConnectionOptions)
  .then(async () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    const RedisStore = connectRedis(session);

    const sessionOption: session.SessionOptions = {
      name: 'user_sid',
      store: new RedisStore({
        client: redis as any,
      }),
      resave: false,
      rolling: true,
      secret: process.env.REDIS_SECRET!,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 15, // 7 years
      },
    };

    app.use(session(sessionOption));

    app.use((req, res, next) => {
      if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
      }
      next();
    });

    const corsOptions = {
      credentials: true,
      origin: 'http://localhost:1337',
    };
    app.use(cors(corsOptions));

    app.use('/', router);

    app.listen(4000, () => {
      console.log('Example app listening at http://localhost:4000');
    });
  })
  .catch((error) => console.error(error));
