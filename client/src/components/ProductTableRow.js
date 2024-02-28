import React, {Component} from "react"
import {Link} from "react-router-dom"
import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants";
import axios from "axios";


export default class ProductTableRow extends Component
{

    componentDidMount() {
        this.props.product.photos.map(photo =>
        {
            return axios.get(`${SERVER_HOST}/products/photo/${photo.filename}`)
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
                            document.getElementById(photo._id).src = `data:;base64,${res.data.image}`
                        }
                    }
                    else
                    {
                        console.log("Record not found")
                    }
                })
        })
    }

    render() 
    {
        return (
            <div className="product-container">
                <div className="products">
                        {this.props.product.photos.map(photo => <img key={photo._id} id={photo._id} alt=""/>)}
                    <div className="product-info">

                <div className="info">{this.props.product.shirtname}</div>
                {/*<div className="info">{this.props.product.code}</div>*/}
                <div className="info">{this.props.product.size}</div>
                {/*<div className="info">{this.props.product.colour}</div>*/}
                {/*<div className="info">{this.props.product.material}</div>*/}
                {/*<div className="info">{this.props.product.gender}</div>*/}
                {/*<div className="info">{this.props.product.stock}</div>*/}
                <div className="info">£{this.props.product.price}</div>
                <div className="product-actions">
                    {localStorage.accessLevel >= ACCESS_LEVEL_GUEST ? <Link className="blue-button" to={"/AddToCart/" + this.props.product._id}>Cart</Link> : null}
                    {localStorage.accessLevel > ACCESS_LEVEL_NORMAL_USER ? <Link className="green-button" to={"/EditProduct/" + this.props.product._id}>Edit</Link> : null}
                    {localStorage.accessLevel > ACCESS_LEVEL_NORMAL_USER ? <Link className="red-button" to={"/DeleteProduct/" + this.props.product._id}>Delete</Link> : null}
                </div>
                    </div>
                </div>
            </div>
        )
    }
}