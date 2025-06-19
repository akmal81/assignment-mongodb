import express, { Application, Request, Response } from "express";
import { bookRouters } from "./controllers/book.controller";


const app:Application = express()

app.use(express.json());

app.use("/api/books", bookRouters);

app.get('/', (req:Request, res:Response)=>{
    res.send("Welcome to L-M-S app")
})

export default app;