import express, { Application, Request, Response } from "express";
// import { userRoute } from "./controllers/user.controller";

const app:Application = express()

app.use(express.json());

// app.use("/users", userRoute)

app.get('/', (req:Request, res:Response)=>{
    res.send("Welcome to user app")
})

export default app;