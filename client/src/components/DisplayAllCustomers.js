import React, { Component } from "react"
// import { Link } from "react-router-dom"
import axios from "axios"
import {SERVER_HOST } from "../config/global_constants"
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import CustomerTable from "./CustomerTable";

export default class DisplayAllCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []

        }
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/users`).then((res) => {
            if (res.data) {
                if (res.data.errorMessage) {
                    console.log(res.data.errorMessage)
                } else {
                    console.log("user read")
                    this.setState({ users: res.data })
                }

            } else {
                console.log("user not found")
            }
        })
    }

    render() {
console.log(this.state.users)
        return (
            <div>
                <Navbar/>
                <Sidebar/>

                <div className="form-container">
                    <CustomerTable users={this.state.users} />
                </div>
            </div>
        )
    }
}