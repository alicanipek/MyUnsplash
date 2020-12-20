import 'reflect-metadata';
import { router } from './routes/Routes';
import express from 'express';
import { createConnection, ConnectionOptions } from 'typeorm';
import * as bodyParser from 'body-parser';
import ormconfig from '../ormconfig.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
async function main() {
    createConnection(ormconfig as ConnectionOptions)
        .then(async () => {
            app.use(bodyParser.json());
            app.use(cors());
            app.use('/api', router);

            app.listen(3000, () => {
                console.log(`Example app listening at http://localhost:3000`);
            });
        })
        .catch((error) => console.error(error));
}

main().catch((err) => console.error(err));
