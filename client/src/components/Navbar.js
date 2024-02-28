import React, {Component} from "react"
import {Link} from "react-router-dom"
// import Login from "./Login";
import Logout from "./Logout";
import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN} from "../config/global_constants"
import brand from "../images/img.png"
import logo from "../images/logo3.png"

 export default class Navbar extends Component{
    render(){
        return(
            <nav>

                <ul className="navbar">
                    <img className="logo" src={logo} alt=""></img>
                    <img className="" src={brand} alt=""></img>
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?
                        <div className="">
                            <Link className="blue-button" to={"/DisplayAllCustomers"}>Display All Customers</Link>
                        </div>
                        :
                        null
                    }
                    {localStorage.accessLevel > ACCESS_LEVEL_GUEST ? (
                        <>
                            <li className="logout"><Logout /></li>
                            {
                                localStorage.profilePhoto !== "null"
                                    ? <img id="profilePic" src={`data:;base64,${localStorage.profilePic}`} alt=""/>
                                    : null
                            }
                        </>

                    ) : (
                        <>
                            <li className="signIn"><Link className="green-button" to={"/Login"}>Sign In</Link></li>
                            <li className="register"><Link className="blue-button" to={"/Register"}>Register</Link></li>
                        </>
                    )}
                    <li className="cart">Cart</li>

                </ul>
            </nav>
        );
    }
}