const router = require(`express`).Router()

const productsModel = require(`../models/products`)
const jwt = require('jsonwebtoken')
const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')
const multer  = require('multer')
var upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})

// read all records
router.get(`/products`, (req, res) => 
{   

    productsModel.find((error, data) =>
    {
        res.json(data)
    })
})
router.get(`/products/photo/:filename`, (req, res) =>
{
    fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.params.filename}`, 'base64', (err, fileData) =>
    {
        if(fileData)
        {
            res.json({image:fileData})
        }
        else
        {
            res.json({image:null})
        }
    })
})


// Read one record
router.get(`/products/:id`, (req, res) => 
{
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) =>
    {
        if (err)
        {
            res.json({errorMessage:`User is not logged in`})
        }
        else
        {
            productsModel.findById(req.params.id, (error, data) =>
            {
                res.json(data)
            })
        }
    })
})


// Add new record
router.post(`/products`, upload.array("productPictures", parseInt(process.env.MAX_NUMBER_OF_UPLOAD_FILES_ALLOWED)), (req, res) =>
{

    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) =>{
    if (err) {
            res.json({errorMessage: `User Is Not Logged In`})
        } else {
            if (decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
                console.log(req.body)
                if(!/^[a-zA-Z\s]+$/.test(req.body.shirtname))
                {
                    res.json({errorMessage:`Product Name must be a string`});
                    // console.log("shirt")
                }
                else if(!/^[0-9a-zA-Z]+$/.test(req.body.code))
                {
                    res.json({errorMessage:`Product Code must be a string with numbers`});
                    // console.log("code")
                }
                else if(!/^[a-zA-Z]+$/.test(req.body.size))
                {
                    res.json({errorMessage:`Size must be a string`});
                    // console.log("size")
                }
                else if(!/^[a-zA-Z]+$/.test(req.body.colour))
                {
                    res.json({errorMessage:`Colour must be a string`});
                    // console.log("colour")
                }
                else if(!/^[a-zA-Z]+$/.test(req.body.material))
                {
                    res.json({errorMessage:`Material must be a string`});
                    // console.log("material")
                }
                else if(!/^[a-zA-Z]+$/.test(req.body.gender))
                {
                    res.json({errorMessage:`Gender must be a string`});
                    // console.log("gender")
                }
                else if(req.body.stock < 0 || req.body.stock > 100)
                {
                    res.json({errorMessage:`Stock needs to be between 0 and 100`});
                    // console.log("stock")
                }
                else if(req.body.price < 15 || req.body.price > 60)
                {
                    res.json({errorMessage:`Price needs to be between €15 and €60`});
                    // console.log("price")
                }
                else
                {
                    let productImages = req.body
                    productImages.photos = []
                    req.files.map((file, index) =>{
                        productImages.photos[index] = {filename: `${file.filename}`}
                    })
                    productsModel.create(req.body, (error, data) =>
                    {
                        res.json(data)
                    })
                }
            } else {
                res.json({errorMessage: `User Is Not An Administrator, So They Cannot Add New Records`})
            }
        }
    })
})


// Update one record
router.put(`/products/:id`, (req, res) =>
{
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) =>
    {
        if(err){
            res.json({errorMessage: `User Is Not Logged In`})
        }else {
            if(!/^[a-zA-Z\s]+$/.test(req.body.shirtname))
            {
                res.json({errorMessage:`Product Name must be a string`});
            }
            else if(!/^[0-9a-zA-Z]+$/.test(req.body.code))
            {
                res.json({errorMessage:`Product Code must be a string with numbers`});
            }
            else if(!/^[a-zA-Z]+$/.test(req.body.size))
            {
                res.json({errorMessage:`Size must be a string`});
            }
            else if(!/^[a-zA-Z]+$/.test(req.body.colour))
            {
                res.json({errorMessage:`Colour must be a string`});
            }
            else if(!/^[a-zA-Z]+$/.test(req.body.material))
            {
                res.json({errorMessage:`Material must be a string`});
            }
            else if(!/^[a-zA-Z]+$/.test(req.body.gender))
            {
                res.json({errorMessage:`Gender must be a string`});
            }
            else if(req.body.stock < 0 || req.body.stock > 100)
            {
                res.json({errorMessage:`Stock needs to be between 0 and 100`});
            }
            else if(req.body.price < 15 || req.body.price > 60)
            {
                res.json({errorMessage:`Price needs to be between €15 and €60`});
            }
            else
            {
                productsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) =>
                {
                    res.json(data)
                })
            }
        }
    })

})


// Delete one record
router.delete(`/products/:id`, (req, res) => 
{
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => {
        if (err) {
            res.json({errorMessage: `User Is Not Logged In`})
        } else {
            if(decodedToken.accessLevel >= process.env.Access_LEVEL_ADMIN){
                productsModel.findByIdAndRemove(req.params.id, (error, data) => {
                    res.json(data)
                })
            }else{
                res.json({errorMessage: `User Is Not An Administrator, So They Cannot Delete Records`})
            }
        }
    })
    // productsModel.findByIdAndRemove(req.params.id, (error, data) =>
    // {
    //     res.json(data)
    // })
})

module.exports = router