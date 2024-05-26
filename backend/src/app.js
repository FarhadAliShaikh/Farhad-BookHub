import express from 'express';
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json());

// routes import 
import bookRouter from "./routes/book.routes.js"

// routes declaration
app.use("/api/books", bookRouter)

export { app };