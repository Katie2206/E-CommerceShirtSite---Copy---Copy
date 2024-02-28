import React, {Component} from "react"


export default class Sizes extends Component{

    constructor(props) {
        super(props);
        this.state = {

        };
    }



    render() {

        const { handleSizeCheckBoxChange, isChecked } = this.props;
        return(
            <div className="sizeFilter1">
                <div className="selection">
                    <input type="radio" name="size" id="xlarge" value="XLARGE"/>
                    <label   htmlFor="xlarge">X Large</label>
                </div>

                <div className="selection">
                    <input type="radio" name="size" id="large" value="LARGE"></input>
                    <label htmlFor="large">Large</label>
                </div>

                <div className="selection">
                    <input type="radio" name="size" id="medium" value="MEDIUM"></input>
                    <label htmlFor="medium">Medium</label>
                </div>

                <div className="selection">
                    <input type="radio" name="size" id="small" value="SMALL"></input>
                    <label htmlFor="small">Small</label>
                </div>

                <div className="selection">
                    <input type="radio" name="size" id="xsmall" value="XSMALL"></input>
                    <label htmlFor="xsmall">X Small</label>
                </div>
            </div>
        );
    }
}