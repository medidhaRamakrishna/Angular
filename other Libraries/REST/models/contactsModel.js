const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const contactSchema=new Schema({
First_Name:{
type:String
},
Middle_Name:{
type:String
},
Last_Name:{
    type:String
},     
Contact_Number:{
    type:String
},
Contact_Email:{
    type:String
}	
});

const ContactModel=mongoose.model('contactCollection',contactSchema);
module.exports=ContactModel;