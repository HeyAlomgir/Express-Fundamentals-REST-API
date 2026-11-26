import express, { type Application, type Request, type Response } from "express";
import { Pool } from "pg";
const app: Application = express();
const PORT = 5000;
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_eKX5hBLy6ClJ@ep-muddy-queen-biysrocv.c-5.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})



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
    // console.log(req.body);
    const body = req.body;
    res.status(200).json({
        success: true,
        message: "This is Test api!!",
        data: body
    })

})




app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`)
})