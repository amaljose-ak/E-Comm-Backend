const express=require('express')
const app=express()
const dotenv=require('dotenv/config')
const mongoose =require('mongoose')

// importing routes
const userRouter =require('./routes/user')
const authRouter=require('./routes/auth')
const ProductRouter=require('./routes/product')
const cartRouter=require('./routes/cart')
const orderRouter=require('./routes/order')


// DB Connection
 mongoose.connect(process.env.DB_STRING).then(()=>{
    console.log("Database Connected Succesfully")
 }).catch((err)=>{
    console.log('error ',err)
 })
// app.use
 app.use(express.json())
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/product',ProductRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.listen(3000,()=>{
    console.log(`server running on ${process.env.PORT ||5000}`)
})  