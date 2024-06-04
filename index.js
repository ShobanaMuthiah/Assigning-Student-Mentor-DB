import express from 'express';
import dotenv from 'dotenv';
import connectDB  from './Databases/Config.js';
import MentorStudent from './Routers/MentorStudent.js'

dotenv.config()

const app=express()

app.use(express.json())
connectDB()
app.use(express.json());

app.use('/api',MentorStudent)

app.get('/',(req,res)=>{
    res.status(200).send("welcome to our api");
})
app.listen(process.env.port,()=>{
    console.log('App is running on the port');

})