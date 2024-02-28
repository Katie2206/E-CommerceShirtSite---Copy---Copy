import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


export default class AddProduct extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            shirtname: "",
            code: "",
            size: "",
            colour: "",
            material: "",
            gender: "",
            stock: "",
            price: "",
            selectedFiles: null,
            redirectToDisplayAllProducts:localStorage.accessLevel < ACCESS_LEVEL_ADMIN
        }
    }


    componentDidMount()
    {
        this.inputToFocus.focus()
    }


    handleChange = (e) =>
    {
        console.log("Here");
        this.setState({[e.target.name]: e.target.value})
    }
    handleFileChange = (e) =>
    {
        this.setState({selectedFiles: e.target.files})
    }

    handleSubmit = (e) =>
    {
        e.preventDefault()

        this.setState({ wasSubmittedAtLeastOnce: true });

        const formInputsState = this.validate();

        if (Object.keys(formInputsState).every(index => formInputsState[index]))
        {
            // const productObject = {
            //     shirtname: this.state.shirtname,
            //     code: this.state.code,
            //     size: this.state.size,
            //     colour: this.state.colour,
            //     material: this.state.material,
            //     gender: this.state.gender,
            //     stock: this.state.stock,
            //     price: this.state.price,
            //     wasSubmittedAtLeastOnce: false
            // }
            let fileData = new FormData()
            if(this.state.selectedFiles){
                for(let i = 0; i < this.state.selectedFiles.length; i++)
                {
                    fileData.append("productPictures", this.state.selectedFiles[i])
                }
            }
            fileData.append("shirtname", this.state.shirtname)
            fileData.append("code", this.state.code)
            fileData.append("size", this.state.size)
            fileData.append("colour", this.state.colour)
            fileData.append("material", this.state.material)
            fileData.append("gender", this.state.gender)
            fileData.append("stock", this.state.stock)
            fileData.append("price", this.state.price)
            fileData.append("wasSubmittedAtLeastOnce", false)

            // if(this.state.selectedFiles){
            //     for(let i = 0; i < this.state.selectedFiles.length; i++)
            //     {
            //         fileData.append("productPictures", this.state.selectedFiles[i])
            //     }
            // }
             // console.log(productObject)
            axios.post(`${SERVER_HOST}/products`, fileData, {headers: {"authorization": localStorage.token}})
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
                        console.log("Product added")
                        this.setState({redirectToDisplayAllProducts:true})
                    }
                }
                else
                {
                    console.log("Record not added")
                }
            })
        }
    }


    validateShirtname()
    {
        const pattern = /^[A-Za-z\s]+$/;
        return pattern.test(String(this.state.shirtname))
    }

    validateCode()
    {
        const pattern = /^[0-9A-Za-z]+$/;
        return pattern.test(String(this.state.code))
    }

    validateSize()
    {
        const pattern = /^[A-Za-z]+$/;
        return pattern.test(String(this.state.size))
    }

    validateColour()
    {
        const pattern = /^[A-Za-z]+$/;
        return pattern.test(String(this.state.colour))
    }

    validateMaterial()
    {
        const pattern = /^[A-Za-z]+$/;
        return pattern.test(String(this.state.material))
    }

    validateGender()
    {
        const pattern = /^[A-Za-z]+$/;
        return pattern.test(String(this.state.gender))
    }

    validateStock()
    {
        const price = parseInt(this.state.stock)
        return (price >= 0 && price <= 100)
    }

    validatePrice()
    {
        const price = parseInt(this.state.price)
        return (price >= 15 && price <= 60)
    }

    validate()
    {
        console.log(this.validateShirtname())
        console.log(this.validateCode())
        console.log(this.validateSize())
        console.log(this.validateColour())
        console.log(this.validateMaterial())
        console.log(this.validateGender())
        console.log(this.validateStock())
        console.log(this.validatePrice())
        return {
            shirtname: this.validateShirtname(),
            code: this.validateCode(),
            size: this.validateSize(),
            colour: this.validateColour(),
            material: this.validateMaterial(),
            gender: this.validateGender(),
            stock: this.validateStock(),
            price: this.validatePrice()
        };
    }

    render()
    {
        let errorMessage = "";
        if(this.state.wasSubmittedAtLeastOnce)
        {
            errorMessage = <div className="error">Product Details are incorrect<br/></div>;
        }

        return (
            <div className="form-container">
                {this.state.redirectToDisplayAllProducts ? <Redirect to="/DisplayAllProducts"/> : null}

                <Form>
                    {errorMessage}

                    <Form.Group controlId="shirtname">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="shirtname" value={this.state.shirtname} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="code">
                        <Form.Label>Code</Form.Label>
                        <Form.Control type="text" name="code" value={this.state.code} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="size">
                        <Form.Label>Size</Form.Label>
                        <Form.Control type="text" name="size" value={this.state.size} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="colour">
                        <Form.Label>Colour</Form.Label>
                        <Form.Control type="text" name="colour" value={this.state.colour} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="material">
                        <Form.Label>Material</Form.Label>
                        <Form.Control type="text" name="material" value={this.state.material} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control type="text" name="gender" value={this.state.gender} onChange={this.handleChange} />
                        </Form.Group>

                    <Form.Group controlId="stock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control type="text" name="stock" value={this.state.stock} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="photos">
                        <Form.Label>Photos</Form.Label>
                        <Form.Control
                            type = "file" multiple onChange = {this.handleFileChange}
                        /></Form.Group> <br/><br/>

                    <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit}/>

                    <Link className="red-button" to={"/DisplayAllProducts"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}