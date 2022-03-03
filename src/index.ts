import express, { Application, Request, Response } from 'express';
import log from './logger';
import connect from './db/connect';
import route from './route';
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(route);

// interface Params {
//     a: number
//     b: number
// }
// const add = (a: number, b: number) => {
//     return a + b;
// }

// const add = (x: Params) => {
//     return x.a + x.b;
// }

// app.get('/', (req: Request, res: Response) => {
//     let name = "hardik";
//     res.json({ sum: add(5, 3), name });
// });

const port = 3001;
app.listen(port, () => {
    console.log("Server Started !");
    connect();
});