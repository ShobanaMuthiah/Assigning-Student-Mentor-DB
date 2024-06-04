import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB  from './Databases/Config.js';
import MentorStudent from './Routers/MentorStudent.js'

dotenv.config()

const app=express()

app.use(express.json())
app.use(cors({
    origin:"*",
    methods:['POST','PUT','DELETE','GET']

}))

connectDB()
app.use(express.json());

app.use('/api',MentorStudent)

app.get('/',(req,res)=>{
    res.status(200).send("welcome to our api");
})
app.listen(process.env.port,()=>{
    console.log('App is running on the port');

})