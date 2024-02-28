const mongoose = require(`mongoose`)

let productPicturesModel = new mongoose.Schema({
    filename:{type: String}
})

let productsModel = new mongoose.Schema(
   {
        shirtname: {type: String},
        code: {type: String},
        size: {type: String},
        colour: {type: String},
        material: {type: String},
        gender: {type: String},
        category: {type: String},
        stock: {type: Number},
        price: {type: Number},
        photos: [productPicturesModel]
   },
   {
       collection: `products`
   })

module.exports = mongoose.model(`products`, productsModel)