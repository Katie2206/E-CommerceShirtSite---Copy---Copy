import React, {Component} from "react"
import Sizes from "./Sizes";



export default class Sidebar extends Component{
    render() {
        return(
            <div className="sidebar">
                    <div>
                        <h2>Sizes</h2>
                        <Sizes/>
                    </div>
            </div>
        );
    }
}

