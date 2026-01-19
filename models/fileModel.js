import mongoose, { Schema } from "mongoose";

const fileSchema = new Schema({
    fileName:{
        type:String,
        required:true
    },
    noOfRow:{
        type:Number,
        required:true
    },
    noOfColumn:{
        type:Number,
        required:true
    },
    colArr:{
        type:Array,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})


const File = mongoose.model('File',fileSchema);
export default File;

