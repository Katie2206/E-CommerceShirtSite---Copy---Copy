const router = require(`express`).Router()

const adminModel = require(`../models/admin`)

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')


router.post(`/admin/register/:name/:email/:password`, (req, res) =>
{

    adminModel.findOne({email: req.params.email}, (uniqueError, uniqueData) =>
    {
        if (uniqueData)
        {
            res.json({errorMessage: `Admin already exists`})

        } else
        {
            bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) =>
            {
                adminModel.create({name: req.params.name, email: req.params.email, password: hash}, (error, data) =>
                {
                    if (data)
                    {
                        const token = jwt.sign({email:data.email, accessLevel:data.accessLevel}, JWT_PRIVATE_KEY, {algorithm:'HS256', expiresIn:process.env.JWT_EXPIRY})
                        res.json({name: data.name, accessLevel:data.accessLevel, token:token})
                    } else
                    {
                        res.json({errorMessage: `Admin was not registered`})
                    }
                })
            })
        }
    })
})

router.post(`/admin/login/:email/:password`, (req,res) =>
{
    adminModel.findOne({email:req.params.email}, (error, data) =>
    {
        if(data)
        {

            bcrypt.compare(req.params.password, data.password, (err, result) =>
            {
                if(result)
                {
                    const token = jwt.sign({email:data.email, accessLevel:data.accessLevel}, JWT_PRIVATE_KEY, {algorithm:'HS256', expiresIn:process.env.JWT_EXPIRY})

                    res.json({name: data.name, accessLevel:data.accessLevel, token:token})
                }
                else
                {
                    res.json({errorMessage:`Admin is not logged in`})
                }
            })
        }
        else
        {
            console.log("not found in db")
            res.json({errorMessage:`Admin is not logged in`})
        }
    })
})


router.post(`/admin/logout`, (req,res) =>
{
    res.json({})
})

module.exports = router