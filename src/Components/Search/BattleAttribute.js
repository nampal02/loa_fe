import React from 'react';
import './Search.css';
class BattleAttribute extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let format = ''
        format += this.props.name;
        format += ' ';
        let printValue = this.props.value;
        if(this.props.value < 0) {
            format += '- ';
            printValue = printValue * -1;
        } else {
            format += '+ '
        }

        format += printValue
        return (
            <div className="Board-indent2">
                {format}
            </div>
        );
    }
}

export default BattleAttribute;