const mongoose=require('mongoose')

const ProductShema=new mongoose.Schema(
    {
        title:{type:String,required:true,unique:true},
        description:{type:String,required:true,unique:true},
        img:{type:String,required:true},
        category:{type:Array},
        size:{type:String,required:true},
        color:{type:String,required:true},
        price:{type:Number,required:true},
        isAdmin:{
            type:Boolean,
            default:false,
        },
    },
    {timestamps:true}
)
module.exports=mongoose.model("Products",ProductShema)