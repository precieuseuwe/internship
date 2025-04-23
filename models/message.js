import mongoose from "mongoose";
const messageSchema=mongoose.Schema(
    {
        username:{
            type: String,
            required:true
        },
        message:{
            type: String,
            required:true
        }
    }
)
export default mongoose.model('Message',messageSchema);