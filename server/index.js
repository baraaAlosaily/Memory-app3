import express from 'express';
import bodyParser from 'body-parser';
import  mongoose  from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

//intialize app;

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app=express();
dotenv.config();


app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors())
app.use('/posts',postRoutes);
app.use('/users',userRoutes)

app.use('/',(req,res)=>{
    res.send('hello to memories app')
})

//https://www.mongodb.com/cloud/atlas
// const CONNECTION_URL='mongodb+srv://mastery:test123@cluster0.erxur.mongodb.net/mastery?retryWrites=true&w=majority'

const PORT=process.env.PORT||3003;

mongoose.connect (process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology: true})
.then(()=>{
    app.listen(PORT,()=>console.log(`server work at cddvdvdvd ${PORT} `))
})
.catch((err)=> console.log(err.message));

mongoose.connect(process.env.CONNECTION_URL, { useFindAndModify: false });
// mongoose.set('useFindAndModify',false);