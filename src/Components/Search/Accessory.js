import React from 'react';
import AccessoryEngrave from './AccessirtEngrave';
import BattleAttribute from './BattleAttribute';
import './Search.css';
class Accessory extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const engrave_attributes = this.props.engrave_attributes.map((engrave, idx) => (<AccessoryEngrave key={idx} name={engrave.name} value={engrave.value}/>));
        const battle_attributes = this.props.battle_attributes.map((attribute, idx) => (<BattleAttribute key={idx} name={attribute.name} value={attribute.value}/>));

        return (
            <div>
                <div>
                    {this.props.name}   {this.props.grade}   <button onClick={() => {this.props.removeFunction(this.props.id)}}>삭제</button>
                </div>
                <div>
                    <div className="Board-indent1">각인</div>
                    {engrave_attributes}
                    <div className="Board-indent1">전투 특성</div>
                    {battle_attributes}
                </div>
            </div>
        )
    }
}

export default Accessory;