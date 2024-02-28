import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import LinkInClass from "../components/LinkInClass"
import {ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants";


export default class AddToCart extends Component{

    constructor(props)
    {
        super(props)

        this.state = {
            redirectToDisplayAllProducts:localStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER
        }
    }


    componentDidMount()
    {
        axios.defaults.withCredentials = true
        axios.post(`${SERVER_HOST}/products/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
            .then(res =>
            {
                if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage)
                    }
                    else
                    {
                        console.log("Product deleted")
                    }
                    this.setState({redirectToDisplayAllProducts:true})
                }
                else
                {
                    console.log("Product not deleted")
                }
            })
    }

    render()
    {
        return (
            <div>
                {this.state.redirectToDisplayAllProducts ? <Redirect to="/DisplayAllProduct"/> : null}
            </div>
        )
    }
}