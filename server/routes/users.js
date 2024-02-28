const router = require(`express`).Router()

const usersModel = require(`../models/users`)

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

const multer  = require('multer')
const upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})



router.post(`/users/register/:name/:email/:password`, upload.single("profilePic"), (req, res) =>
{
    if(!req.file){
        res.json({errorMessage: `No File Selected`})
    }else if(req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg")
    {
        fs.unlink(`${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`, (error) => {res.json({errorMessage:`Only .png, .jpg and .jpeg format accepted`})})
    }else{
    usersModel.findOne({email: req.params.email}, (uniqueError, uniqueData) =>
    {
        if (uniqueData)
        {
            res.json({errorMessage: `User already exists`})

        } else
        {
            bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) =>
            {
            usersModel.create({name: req.params.name, email: req.params.email, password: hash, profilePictureFile:req.file.filename}, (error, data) =>
            {
                // if(data.email === "admin@admin.com"){
                //     // res.json({errorMessage: `User was admin`})
                // }
                if (data)
                {

                    const token = jwt.sign({email:data.email, accessLevel:data.accessLevel}, JWT_PRIVATE_KEY, {algorithm:'HS256', expiresIn:process.env.JWT_EXPIRY})
                    fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`, 'base64', (err, fileData) => {
                        res.json({name: data.name, accessLevel: data.accessLevel, profilePic:fileData, token: token})
                    })
                } else
                {
                    res.json({errorMessage: `User was not registered`})
                }
            })
            })
        }
    })
    }
})

router.get(`/users`, (req, res) =>
{

    usersModel.find((error, data) =>
    {
        res.json(data)
    })
})

router.post(`/users/login/:email/:password`, (req,res) =>
{
    usersModel.findOne({email:req.params.email}, (error, data) =>
    {
        if(data)
        {

            bcrypt.compare(req.params.password, data.password, (err, result) =>
            {
                if(result)
                {
                    const token = jwt.sign({email:data.email, accessLevel:data.accessLevel}, JWT_PRIVATE_KEY, {algorithm:'HS256', expiresIn:process.env.JWT_EXPIRY})
                    fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${data.profilePictureFile}`, 'base64', (err, fileData) => {
                        if(fileData) {
                            res.json({name: data.name, accessLevel: data.accessLevel, profilePic:fileData, token: token})
                        }else{
                            res.json({name: data.name, accessLevel:data.accessLevel, profilePic:null, token:token})
                        }
                    })
                }
                else
                {
                    res.json({errorMessage:`User is not logged in`})
                }
            })
        }
        else
        {
            console.log("not found in db")
            res.json({errorMessage:`User is not logged in`})
        }
    })
})




router.post(`/users/logout`, (req,res) =>
{
    res.json({})
})

module.exports = router