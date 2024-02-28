import React, {Component} from "react"
import {Link} from "react-router-dom"
import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants";
import axios from "axios";


export default class CustomerTableRow extends Component
{

    render()
    {
        return (
            <div className="product-container">
                <div className="products">
                    <div className="product-info">
                        <div className="info">{this.props.user.name}</div>
                        <div className="info">{this.props.user.email}</div>
                        {/*<div className="product-actions">*/}
                        {/*    {localStorage.accessLevel > ACCESS_LEVEL_NORMAL_USER ? <Link className="red-button" to={"/DeleteProduct/" + this.props.product._id}>Delete</Link> : null}*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        )
    }
}