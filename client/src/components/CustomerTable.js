import React, {Component} from "react"
import CustomerTableRow from "./CustomerTableRow"


export default class CustomerTable extends Component
{
    render()
    {
        return (
            <div className="product-container">
                {this.props.users.map((user) => <CustomerTableRow key={user._id} user={user}/>)}
            </div>

        )
    }

}