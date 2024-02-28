import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"


import "./css/styles2.css"
import "./css/App.css"
import "./css/main.css"
import "./css/styles.css"
import {ACCESS_LEVEL_GUEST} from "./config/global_constants";
import LoggedIn from "./components/LoggedIn"
// import AdminLoggedIn from "./components/AdminLoggedIn"
import Logout from "./components/Logout"
import Register from "./components/Register"
import Login from "./components/Login"
import AddProduct from "./components/AddProduct"
import EditProduct from "./components/EditProduct"
import DeleteProduct from "./components/DeleteProduct"
import DisplayAllProduct from "./components/DisplayAllProduct"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Sizes from "./components/Sizes"
import DisplayAllCustomers from "./components/DisplayAllCustomers"
import AddToCart from "./components/AddToCart"


if(typeof localStorage.accessLevel === "undefined"){
    localStorage.name = "Guest"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.token = null
    localStorage.profilePhoto = null
}

export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="/" component={DisplayAllProduct} />
                    {/*<Route exact path="/ShoppingCart" component={ShoppingCart} />*/}
                    <LoggedIn exact path="/Logout" component={Logout} />
                    <Route exact path="/AddProduct" component={AddProduct} />
                    <Route exact path="/DisplayAllCustomers" component={DisplayAllCustomers} />
                    <Route exact path="/EditProduct/:id" component={EditProduct} />
                    <Route exact path="/DeleteProduct/:id" component={DeleteProduct} />
                    <Route exact path="/DisplayAllProduct" component={DisplayAllProduct}/>
                    <Route path="*" component={DisplayAllProduct}/>
                    <Route exact path="/Navbar" component={Navbar}/>
                    <Route exact path="/Sidebar" component={Sidebar}/>
                    <Route exact path="/Size" component={Sizes}/>
                    <Route exact="/AddToCart" component={AddToCart}/>
                </Switch>
            </BrowserRouter>
        )
    }
}