 
const router = require('express').Router()
const { verifyToken, verifyTokenAndAutherization, verifyTokenAdmin } = require('./verifyToken')
const Product = require('../model/product')
const product = require('../model/product')


router.post("/",verifyTokenAdmin,async(req,res)=>{
const newProduct= new Product(req.body)
try {
    const savedProduct=await newProduct.save()
    res.status(200).json(savedProduct)
} catch (error) {
    res.status(500).json(error)
}
})


router.put("/:id", verifyTokenAdmin, async (req, res) => {
const updateProduct = await product.findByIdAndUpdate(
    req.params.id,
    {
        $set:req.body,
        
    },
    {new:true}
)
    })


router.delete('/:id', verifyTokenAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json('Product has deleted')
  } catch (er) {
    res.status(500).json(er)
  }
})
router.get('/find/:id',verifyTokenAndAutherization,async(req,res)=>{
  try {
   const product= await Product.findById(req.params.id)
   res.status(200).json(product)
  } catch (e) {
    res.status(500).json(e)
  }
});
router.get('/find', verifyTokenAdmin, async (req, res) => {
  const qNew = req.query.new
  const qCategory=req.params.category
  try {
    let products;
    if(qNew){
      products=await product.find().sort({createdAt:-1 }).limit(5)
    }else if(qCategory){
      products=await product.find({categories:{
        $in:[qCategory],
      },
    })
    }else{
      products=await Product.find()
    }
  
    res.status(200).json(products)
  } catch (er) {
    res.status(500).json(er)
  }
})
 module.exports = router
