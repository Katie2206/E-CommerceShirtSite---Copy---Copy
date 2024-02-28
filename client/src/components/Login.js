import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"
import {SERVER_HOST} from "../config/global_constants"


export default class Login extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            email:"",
            password:"",
            isLoggedIn:false
        }
    }


    handleChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value})
    }


    handleSubmit = (e) =>
    {
        if(this.state.email === "admin@admin.com"){
            axios.post(`${SERVER_HOST}/admin/login/${this.state.email}/${this.state.password}`)
                .then(res =>
                {
                    if(res.data)
                    {
                        if (res.data.errorMessage)
                        {
                            console.log(res.data.errorMessage)
                        }else
                        {
                            localStorage.name = res.data.name
                            localStorage.accessLevel = res.data.accessLevel
                            localStorage.profilePic = res.data.profilePic
                            localStorage.token = res.data.token
                            this.setState({isLoggedIn:true})
                        }
                    }
                    else
                    {
                        console.log("Admin Login failed")
                    }
                })
        }else{
        axios.post(`${SERVER_HOST}/users/login/${this.state.email}/${this.state.password}`)
            .then(res =>
            {
                if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage)
                    }else // user successfully logged in
                    {
//                         if(this.state.email === "admin@admin.com"){
//                             localStorage.name = res.data.name
// // localStorage.setItem('accessLevel', ACCESS_LEVEL_ADMIN)
//                             localStorage.setItem('accessLevel', ACCESS_LEVEL_ADMIN.toString())
//                             localStorage.token = res.data.token
//                             console.log("Admin: ", localStorage.name, localStorage.accessLevel)
//                         }else{
                            localStorage.name = res.data.name
                            localStorage.accessLevel = res.data.accessLevel
                            localStorage.token = res.data.token
//                             console.log("User: ", localStorage.name, localStorage.accessLevel)
//                         }
                        this.setState({isLoggedIn:true})
                    }
                    // if(this.state.email === 'admin@admin.com'){
                        //     console.log("Admin logged in")
                        //     localStorage.accessLevel = ACCESS_LEVEL_ADMIN
                        //     console.log("Access level: ", localStorage.accessLevel)
                        // }else{
                        //     console.log("Nope")
                        // }

                }
                else
                {
                    console.log("Login failed")
                }
            })
        }
    }


    render()
    {
        // <img className="logo" src="/images/brand.png" alt=""></img>
        return (

            <form className="form-container2" noValidate = {true} id = "loginOrRegistrationForm">
                <div className="form-contents">
                <h2>Login</h2>
                <br/>
                {this.state.isLoggedIn ? <Redirect to="/DisplayAllProduct"/> : null}
                <h3>Email</h3>
                <input
                    type = "email"
                    name = "email"
                    placeholder = "Email"
                    autoComplete="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                /><br/>
                <h3>Password</h3>
                <input
                    type = "password"
                    name = "password"
                    placeholder = "Password"
                    autoComplete="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                /><br/><br/>

                <LinkInClass value="Login" className="green-button2" onClick={this.handleSubmit}/>
                <Link className="red-button2" to={"/DisplayAllProduct"}>Cancel</Link>
                </div>
                </form>
        )
    }
}