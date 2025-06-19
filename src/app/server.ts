import { Server } from "http";

import mongoose from "mongoose";
import app from "./app";

let server : Server;
const PORT = 5000;

async function main() {

    await mongoose.connect('mongodb+srv://mongodb:mongodb@cluster0.226ep.mongodb.net/library-management-system?retryWrites=true&w=majority&appName=Cluster0')
    console.log("mongodb connected")
    try {
        server = app.listen(PORT,()=>{
            console.log(`App is listing on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main()