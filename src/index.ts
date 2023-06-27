import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

import { config } from "dotenv";
import router from './routes';
import EmailService from './services/email.service';

config();

const PORT = process.env.PORT || 8080;

export const prisma = new PrismaClient();

const app = express();

app.use(cors({
    origin: '*',
}));

app.use(express.json());

app.use(router);

app.listen(PORT, () => console.log(`🚀 Server ready at: http://localhost:${PORT}`));