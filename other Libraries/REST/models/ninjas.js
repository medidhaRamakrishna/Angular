const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//creating geolocation schema
const GeoSchema=new Schema({
type:{
    type:String,
    default:"Point"
},
coordinates:{
    type:[Number],
    index:"2dsphere"
}
});

//creating ninja Schema & Model
const NinjaSchema=new Schema({
name:{
    type:String,
    required:[true,"Name field is mandatory"]
    
},
rank:{
    type:String
},
available:{
    type:Boolean,
    default:false
},
//add in geo location
geometry:GeoSchema
});
const Ninja=mongoose.model('ninja',NinjaSchema);
module.exports=Ninja; 