import express, { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import helmet from 'helmet';

import { config } from "dotenv";
import router from './routes';

config();

const PORT = process.env.PORT || 8080;

export const prisma = new PrismaClient();

const app = express();

app.use(cors());

app.use(express.json());

app.use(helmet());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    return res.status(500).json({ error: 'Internal Server Error' });
});

app.use(router);

app.listen(PORT, () => console.log(`🚀 Server ready at: http://localhost:${PORT}`));