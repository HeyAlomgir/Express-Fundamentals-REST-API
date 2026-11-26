import express, { type Application, type Request, type Response } from "express";

const app: Application = express();
const PORT = 5000;
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Home route
app.get("/", (req: Request, res: Response) => {
    // res.send("Welcome to Express Server");
    res.status(200).json({
        success: true,
        messgage: "Welcome to Express Server",
        author: "PH"
    })
})

app.post("/", (req: Request, res: Response) => {
    console.log(req.body);
})



app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`)
})