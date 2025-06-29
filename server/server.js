import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './configs/cloudinary.js'
import courseRouter from './routes/courseRoute.js'
import userRouter from './routes/userRoutes.js'
import serverless from 'serverless-http';

//initialize express
const app=express()

//connect to database
await connectDB()
await connectCloudinary()
//Middleware
app.use(cors())
app.use(clerkMiddleware())

//routes
app.get('/',(req,res)=>res.send('Api running'))
app.post('/clerk',express.json(),clerkWebhooks)
app.use('/api/educator',express.json(),educatorRouter)
app.use('/api/course',express.json(),courseRouter)
app.use('/api/user',express.json(),userRouter)
app.post('/stripe',express.raw({type:'application/json'}),stripeWebhooks)
//port     
const port=process.env.PORT||5000
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})

