const express=require('express');
const cors=require('cors');
const dotenv = require('dotenv')
const db=require('./database/db');
const router = express.Router();

dotenv.config()

const app=express();
app.use(cors());
app.use(express.json());

const indexRoutes = require('./Routes/index.route');

app.get('/', (req,res)=>{
    return res.json({
        success:true,
        message:"Welcome to Airothon Backend!!!"
    })
});

app.use('/api',indexRoutes)
app.listen(process.env.PORT,()=>{
    console.log(process.env.DB_USER);
    console.log(`Listening at http://localhost:${process.env.PORT}`);
})