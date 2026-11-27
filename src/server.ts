import express, { type Application, type Request, type Response } from "express";
import {Pool} from "pg";
const app: Application = express();
const PORT = 5000;

// Middleware

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));


const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_oKrze4jum8QM@ep-dawn-wind-bi4z6dqa.c-5.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})


const intDB =async()=>{
    try{
        await pool.query(`
            CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            age INT,
            is_active BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )`)
    }catch(error){
        console.log(error)
    }
}
intDB()


app.get("/", (req: Request, res: Response) => {
    // res.send("Welcome to Express Server")
    res.status(200).json({
        success: true,
        message: "Welcome to Express Server",
        Author: "Alomgir Hossain",
    })
})

app.post("/", (req: Request, res: Response) => {
    try {
        const body = req.body;
        res.status(200).json({
            success: true,
            message: "This is Test api!!",
            data: body
        })
    } catch (error) {
        console.log(error)
    }
})




app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`)
})


