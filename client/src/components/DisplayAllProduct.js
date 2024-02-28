import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import ProductTable from "./ProductTable"
// import Logout from "./Logout"
import {ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"
// import ProductTableRow from "./ProductTableRow";
// import Sizes from "./Sizes";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default class DisplayAllProduct extends Component {
    constructor(props) {
        super(props);
        // const coloursAvailable = this.generateColoursAvailable(props.products)
        this.state = {
            products: [],
            isChecked: {
                colours: {
                    red: "Red",
                    orange: "Orange",
                    yellow: "Yellow",
                    green: "Green",
                    blue: "Blue",
                    purple: "Purple",
                    pink: "Pink",
                    black: "Black",
                    white: "White",
                    grey: "Grey",
                    brown: "Brown",
                    multiple: "Multiple"
                },
                productSize:{

                }
            }
        }
    }

    // generateColoursAvailable = (products) => {
    //     // const colour = product.colour
    //     const coloursAvailable = products.map((product) => {const colour = product.colour
    //     if(!coloursAvailable[colour]){
    //         coloursAvailable[colour] = false
    //     }
    //
    //     })
    //     return coloursAvailable
    // }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/products`).then((res) => {
            if (res.data) {
                if (res.data.errorMessage) {
                    console.log(res.data.errorMessage)
                } else {
                    console.log("Product read")
                    const individualSizes = [...new Set(res.data.map(product => product.size))]
                    // const productSize = res.data.map(product => {
                    //     return product.size
                    // })
                    // const productColour = res.data.map(product => {
                    //     return product.colour
                    // })
                    console.log("individualSizes: ", individualSizes)
                    // console.log("productColour: ", productColour)
                    this.setState({ products: res.data })
                }

            } else {
                console.log("Product not found")
            }
        })
    }

    handleColourCheckBoxChange = (attribute) => {
        this.setState((prevState) => ({
            isChecked: {
                ...prevState.isChecked,
                colours: {
                    ...prevState.isChecked.colours,
                    [attribute]: !prevState.isChecked.colours[attribute]
                }
            }
        }))
    }

    applyFilters = () => {
        let filteredProducts = [...this.state.products]

        const colourFilters = this.state.isChecked.colours;

        for (const colour in colourFilters) {
            if (colourFilters[colour] === true) {
                filteredProducts = filteredProducts.filter((product) =>
                    product.colour === colour
                )
            }
        }

        console.log(filteredProducts)
        return filteredProducts
    }

    render() {

       let filteredProducts = this.applyFilters();
       // console.log("individualSizes: ", individualSizes)
       console.log(filteredProducts)
        return (
            <div>
                <Navbar/>
                <Sidebar/>
                <ProductTable products={filteredProducts} />
            <div className="form-container">
                {/*{localStorage.accessLevel > ACCESS_LEVEL_GUEST ? (*/}
                {/*    <div className="logout">*/}
                {/*        <Logout />*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    <div>*/}
                {/*        <Link className="green-button" to={"/Login"}>*/}
                {/*            Login*/}
                {/*        </Link>*/}
                {/*        <Link className="blue-button" to={"/Register"}>*/}
                {/*            Register*/}
                {/*        </Link>*/}
                {/*        /!*<Link className="red-button" to={"/ShoppingCart"}>*!/*/}
                {/*        /!*    Shopping Cart*!/*/}
                {/*        /!*</Link>*!/*/}
                {/*    </div>*/}
                {/*)}*/}
                <div className="table-container">
                    <p>Red</p>
                    <input
                        id={"Red"}
                        type="checkbox"
                        checked={this.state.isChecked.colours.red}
                        onChange={() => this.handleColourCheckBoxChange("Red")}
                    />
                    {/*<ProductTable products={filteredProducts} />*/}
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? (
                        <div className="add-new-products">
                            <Link className="blue-button" to={"/AddProduct"}>
                                Add New Product
                            </Link>
                        </div>
                    ) : null}
                </div>
            </div>
            </div>
        )
    }
}