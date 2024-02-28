import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {SERVER_HOST} from "../config/global_constants"


export default class Register extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            name:"",
            email:"",
            password:"",
            confirmPassword:"",
            selectedFile:null,
            isRegistered:false
        }
    }


    handleChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value})
    }

    handleFileChange = (e) =>
    {
        this.setState({selectedFile: e.target.files[0]})
    }

    handleSubmit = (e) =>
    {
        e.preventDefault()
        let fileData = new FormData()
        fileData.append("profilePic", this.state.selectedFile)
        axios.defaults.withCredentials = true
        if(this.state.email === "admin@admin.com"){
            axios.post(`${SERVER_HOST}/admin/register/${this.state.name}/${this.state.email}/${this.state.password}`, fileData, {headers: {"Content-type": "multipart/form-data"}})
                .then(res =>
                {
                    if(res.data) {
                        if (res.data.errorMessage) {
                            console.log(res.data.errorMessage)
                        } else {
                            console.log("Admin registered and logged in")
                            localStorage.name = res.data.name
                            localStorage.accessLevel = res.data.accessLevel
                            localStorage.profilePic = res.data.profilePic
                            localStorage.token = res.data.token

                            this.setState({isRegistered: true})
                        }
                    }else
                    {
                        console.log("Admin Registration failed")
                    }
                })
        }else{
        axios.post(`${SERVER_HOST}/users/register/${this.state.name}/${this.state.email}/${this.state.password}`, fileData, {headers: {"Content-type": "multipart/form-data"}})
            .then(res =>
            {
                if(res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
//                         if(this.state.email === "admin@admin.com"){
//                             localStorage.name = res.data.name
// // localStorage.setItem('accessLevel', ACCESS_LEVEL_ADMIN)
//                             localStorage.setItem('accessLevel', ACCESS_LEVEL_ADMIN.toString())
//                             localStorage.token = res.data.token
//                             console.log("Admin: ", localStorage.name, localStorage.accessLevel)
//                         }else{
//                             localStorage.name = res.data.name
//                             localStorage.accessLevel = res.data.accessLevel
//                             localStorage.token = res.data.token
//                             console.log("User: ", localStorage.name, localStorage.accessLevel)
//                         }
                        console.log("User registered and logged in")
                        localStorage.name = res.data.name
                        localStorage.accessLevel = res.data.accessLevel
                        localStorage.profilePic = res.data.profilePic
                        localStorage.token = res.data.token

                        this.setState({isRegistered: true})
                        // console.log(localStorage.name, localStorage.accessLevel)

                    }
                }else
                {
                    console.log("Registration failed")
                }
            })
        }
    }


    render()
    {
        return (

            <form className="form-container3" noValidate = {true} id = "loginOrRegistrationForm" onSubmit={this.handleSubmit}>

                {this.state.isRegistered ? <Redirect to="/DisplayAllProduct"/> : null}
                <div className="form-contents2">
                <h2>New User Registration</h2>
                    <h3>Name</h3>
                <input
                    name = "name"
                    type = "text"
                    placeholder = "Name"
                    autoComplete="name"
                    value = {this.state.name}
                    onChange = {this.handleChange}
                    ref = {(input) => { this.inputToFocus = input }}
                /><br/>
                    <h3>Email</h3>
                <input
                    name = "email"
                    type = "email"
                    placeholder = "Email"
                    autoComplete="email"
                    value = {this.state.email}
                    onChange = {this.handleChange}
                /><br/>
                    <h3>Password</h3>
                <input
                    name = "password"
                    type = "password"
                    placeholder = "Password"
                    autoComplete="password"
                    title = "Password must be at least ten-digits long and contains at least one lowercase letter, one uppercase letter, one digit and one of the following characters (£!#€$%^&*)"
                    value = {this.state.password}
                    onChange = {this.handleChange}
                /><br/>

                <input
                    name = "confirmPassword"
                    type = "password"
                    placeholder = "Confirm password"
                    autoComplete="confirmPassword"
                    value = {this.state.confirmPassword}
                    onChange = {this.handleChange}
                /><br/>
                <input
                    type = "file"
                    onChange = {this.handleFileChange}
                /><br/><br/>

                <LinkInClass value="Register New User" className="green-button3" onClick={this.handleSubmit} />
                <Link className="red-button3" to={"/DisplayAllProduct"}>Cancel</Link>
                </div>
                </form>
        )
    }
}