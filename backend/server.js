import path from 'path'
import express from 'express';
import dotenv from'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config()

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddlewar.js';
import productsRoutes from './routes/productsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const port = process.env.PORT || 5000
connectDB();

const app = express()

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// CookieParser Middlewar
app.use(cookieParser())


app.use('/api/products',productsRoutes);
app.use('/api/users/',userRoutes);
app.use('/api/orders/',orderRoutes);
app.get('/api/config/paypal',(req,res)=>res.send({clientId: process.env.PAYPAL_CLIENT_ID}))


const __dirname = path.resolve()
if(process.env.NODE_ENV === 'production'){
    
    // set static folder
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    // any route that is not api will be redirected to index.html
    app.get('*', (req,res)=>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', index.html))
    );
}else{
    app.get('/', (req, res)=>{
        res.send("APi is running")
    })
}

app.use(notFound);
app.use(errorHandler)


app.listen(port, ()=>{console.log("server running on: ", port)})