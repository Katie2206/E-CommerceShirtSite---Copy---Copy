import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"

import {ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"


export default class DeleteProduct extends Component
{
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
        axios.delete(`${SERVER_HOST}/products/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
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