import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/db.js";

dotenv.config({
    path: "./.env"
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 5555, () => {
        console.log(`Server is listening on the port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.log(error);
})

