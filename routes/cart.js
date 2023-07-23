const router=require('express').Router()

const { verifytoken, verifyTokenAndAutherization, verifyTokenAdmin } = require('./verifyToken')
const Cart = require('../model/cart')



router.post("/",verifytoken,async(req,res)=>{
const newCart= new Cart (req.body)
try {
    const savedCart=await newCart.save()
    res.status(200).json(savedCart)
} catch (error) {
    res.status(500).json(error)
}
})


router.put("/:id", verifyTokenAdmin, async (req, res) => {
const updateCart = await Cart.findByIdAndUpdate(
    req.params.id,
    {
        $set:req.body,
        
    },
    {new:true}
)
    })


router.delete('/:id', verifyTokenAndAutherization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id)
    res.status(200).json('Cart has deleted')
  } catch (er) {
    res.status(500).json(er)
  }
})


router.get('/find/:userId',verifyTokenAndAutherization,async(req,res)=>{
  try {
   const cart= await Cart.findOne({userId:req.params.userId})
   res.status(200).json(cart)
  } catch (e) {
    res.status(500).json(e)
  }
});
router.get('/find', verifyTokenAdmin, async (req, res) => {
  try {
    const cartss =await Cart.find()
    res.status(200).json(carts)
  } catch (e) {
    res.status(500).json(e)
  }
}) 

module.exports=router