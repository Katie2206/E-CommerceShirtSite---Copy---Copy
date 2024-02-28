import React, {Component} from "react"
import ProductTableRow from "./ProductTableRow"


export default class ProductTable extends Component
{
    render()
    {
        return (
            <div className="product-container">
                {this.props.products.map((product) => <ProductTableRow key={product._id} product={product}/>)}
            </div>
            // <table>
            //     <thead>
            //         <tr>
            //             {/*<th>Product Name</th>*/}
            //             {/*<th>Product Code</th>*/}
            //             {/*<th>Size</th>*/}
            //             {/*<th>Colour</th>*/}
            //             {/*<th>Material</th>*/}
            //             {/*<th>Gender</th>*/}
            //             {/*<th>Category</th>*/}
            //             {/*<th>Stock</th>*/}
            //             {/*<th>Price</th>*/}
            //             {/*<th> </th>*/}
            //         </tr>
            //     </thead>
            //
            //     <tbody>
            //         {this.props.products.map((product) => <ProductTableRow key={product._id} product={product}/>)}
            //     </tbody>
            // </table>
        )
    }
    // render()
    // {
    //     return (
    //         <div>
    //             <div>
    //                 <div>
    //                     <div>Product Name</div>
    //                     <div>Product Code</div>
    //                     <div>Size</div>
    //                     <div>Colour</div>
    //                     <div>Material</div>
    //                     <div>Gender</div>
    //                     <div>Category</div>
    //                     <div>Stock</div>
    //                     <div>Price</div>
    //                     <div> </div>
    //                 </div>
    //             </div>
    //
    //             <div>
    //                 {this.props.products.map((product) => <ProductTableRow key={product._id} product={product}/>)}
    //             </div>
    //         </div>
    //     )
    // }
}