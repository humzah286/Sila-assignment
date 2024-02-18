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

app.get("/get-random-text", (req: Request, res: Response) => {
    res.json({ random_text: "Node : Moments its musical age explain. But extremity sex now education concluded earnestly her continual. Oh furniture acuteness suspected continual ye something frankness. Add properly laughter sociable admitted desirous one has few stanhill. Opinion regular in perhaps another enjoyed no engaged he at. It conveying he continual ye suspected as necessary. Separate met packages shy for kindness." });
});


app.use('/api', defaultRouter);


app.listen(port, () => {
    console.log(`Listening on PORT : ${port}`);
});

