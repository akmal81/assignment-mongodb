import express, { Application, Request, Response } from "express";
import { bookRouters } from "./app/controllers/book.controller";
import { borrowRouters } from "./app/controllers/borrow.controller";


const app:Application = express()

app.use(express.json());

app.use("/api/books", bookRouters);
app.use("/api/borrow", borrowRouters);

app.get('/', (req:Request, res:Response)=>{
    res.send("Welcome to L-M-S app")
})

export default app;