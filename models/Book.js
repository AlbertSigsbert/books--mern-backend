const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    // owner: { type : Schema.Types.ObjectId, ref : 'User' },
    title: { type: String, required: true }, 
    price: { type: Number, required: true },
    authors: [{ type: String, required: true }],
    categories: [{ type: String, required: true }],
    cover: { type: String, required: true },
    likes: { type: Number, default: 0 }, 
   
    comments: [{ 
      username: { type : String, required:true }, 
      text: { type: String, required: true } 
    }],
    
},  { timestamps: true })


module.exports = mongoose.model("Book", bookSchema);