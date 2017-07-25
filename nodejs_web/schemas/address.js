var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AddressSchema = new Schema({
    name:{type:String},
    location:{type:String}
})


module.exports = AddressSchema