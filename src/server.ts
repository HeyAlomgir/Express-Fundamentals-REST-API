import express, { type Application, type Request, type Response } from "express";

const app: Application = express();
const PORT = 5000;
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Express Server");
})

app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`)
})