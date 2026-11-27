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
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
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

app.post("/api/v1/users",async (req: Request, res: Response) => {
    try {
        
        const {name,email,password,age} = req.body;

        const result =await pool.query(`
            INSERT INTO users(name,email,password,age) VALUES(
            $1,$2,$3,$4) RETURNING *`,[name,email,password,age])
            // console.log(result);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data:result.rows[0]



        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message,
            error:error
        })
    }
})


// ALL data get from database

app.get("/api/v1/users",async(req: Request, res: Response) => {
    try{
        const result = await pool.query(`
            SELECT * FROM users`);
            res.status(200).json({
                success:true,
                message:"All users data get successfully",
                data:result.rows
            })
    }catch(error:any){
        res.status(500).json({
            success:false,
            message:error.message,
            error:error
        })
    }
})




app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`)
})


