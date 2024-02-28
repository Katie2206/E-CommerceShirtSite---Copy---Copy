import React, {Component} from "react"
import Form from "react-bootstrap/Form"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"

export default class EditProduct extends Component
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
            category: "",
            stock: "",
            price: "",
            redirectToDisplayAllProducts: localStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER
        }
    }

    componentDidMount()
    {
        this.inputToFocus.focus()

        axios.get(`${SERVER_HOST}/products/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
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
                    this.setState({
                    shirtname: res.data.shirtname,
                    code: res.data.code,
                    size: res.data.size,
                    colour: res.data.colour,
                    material: res.data.material,
                    gender: res.data.gender,
                    category: res.data.category,
                    stock: res.data.stock,
                    price: res.data.price,
                    })
                }
            }
            else
            {
                console.log(`Product not found`)
            }
        })
    }


    handleChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value})
    }


    handleSubmit = (e) =>
    {
        e.preventDefault()

        this.setState({ wasSubmittedAtLeastOnce: true });

        const formInputsState = this.validate();

        if (Object.keys(formInputsState).every(index => formInputsState[index]))
        {
            const productObject = {
                shirtname: this.state.shirtname,
                code: this.state.code,
                size: this.state.size,
                colour: this.state.colour,
                material: this.state.material,
                gender: this.state.gender,
                category: this.state.category,
                stock: this.state.stock,
                price: this.state.price
            }

            axios.put(`${SERVER_HOST}/products/${this.props.match.params.id}`, productObject, {headers:{"authorization":localStorage.token}})
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
                        console.log(`Product updated`)
                        this.setState({redirectToDisplayAllProducts:true})
                    }
                }
                else
                {
                    console.log(`Product not updated`)
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
    
                {this.state.redirectToDisplayAllProducts ? <Redirect to="/DisplayAllProduct"/> : null}
                        
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
  
                    <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit}/>  
    
                    <Link className="red-button" to={"/DisplayAllProduct"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}