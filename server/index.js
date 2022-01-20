import express from 'express';
const app = express();
import './mongo/mongo_connect.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { default as userRouter } from "./routes/user.routes.js";
import { default as teamRouter } from "./routes/teams.routes.js";

app.use(cors());
app.use(express.json());
app.use('/api/auth/', userRouter);
app.use('/api/teams/', teamRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));