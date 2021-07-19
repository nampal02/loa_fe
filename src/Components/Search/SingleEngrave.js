import React from 'react';
import './Search.css';
class SingleEngrave extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let printValue = this.props.value;
        if(this.props.value < 0) {
            printValue = printValue * -1;
        }
        let print_color = printValue > 15 ? 15 : printValue;
        let color_list = '';

        for(let i = 0; i < print_color; i++) {
            if(i%5 === 0) {
                color_list += "II"
            }
            color_list += "●"
        }
        for(let i = print_color; i < 15; i++) {
            if(i%5 === 0) {
                color_list += "II"
            }
            color_list += "○"
        }
        color_list += "II"

        return (
            <div>
                <div>
                =======================================================================
                </div>
                <div>
                {this.props.name}
                </div>
                <div>
                각인 수치 : {this.props.value}, {color_list}
                </div>
                <div>
                =======================================================================
                </div>
            </div>
        )
    }
}

export default SingleEngrave;