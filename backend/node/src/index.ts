import express, { Express, Request, Response } from 'express';
import defaultRouter from './routes/index';
import cors from 'cors';
import corsOptions from './config/corsOptions';
import cookieParser from 'cookie-parser';

const app: Express = express();
const port: string | number = 8000;

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "You hit the home route" });
});

app.use('/api', defaultRouter);

app.listen(port, () => {
    console.log(`Listening on PORT : ${port}`);
});

