import React from 'react';
import './Search.css';
class FindingResult extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const engrave_format = this.props.engrave_list.map((attr) => {
            const sign = attr.value < 0 ? '-' : '+';
            const value = attr.value < 0 ? attr.value * -1 : attr.value;

            return (
                <div>
                    {attr.name} {sign} {value}
                </div>
            )
        })

        const battle_format = this.props.battle_list.map((attr) => {
            return (
                <div>
                    {attr.name} + {attr.value}
                </div>
            )
        })

        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.grade}</td>
                <td>{this.props.quality}</td>
                <td>{engrave_format}</td>
                <td>{battle_format}</td>
                <td>{this.props.price} G</td>
                <td>
                    <div>
                        <button class="confirm" onClick={() => {
                            this.props.addButtonCallback(this.props.name, this.props.grade, this.props.engrave_list, this.props.battle_list)
                        }}>
                            추가
                        </button>
                    </div>            
                </td>
            </tr>
        )
    }
}

export default FindingResult;