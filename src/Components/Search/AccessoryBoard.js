import React from 'react';
import Accessory from './Accessory';
import './Search.css';
class AccessoryBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            accessory_list: []
        }
    }

    id = 0;
    addEngraveFunction = null;
    removeEngraveFunction = null;

    addAccessory(name, grade, engrave_list, battle_list) {
        const element = {
            id: this.id++,
            name: name,
            grade: grade,
            engrave_list: engrave_list,
            battle_list: battle_list,
        }

        const newArray = this.state.accessory_list.concat(element)
        this.setState({accessory_list: newArray});
        //addEngraves(engrave_list);
        this.addEngraveFunction(engrave_list);
    }

    removeEngrave(engraves) {

    }

    removeAccessory(id) {
        const target = this.state.accessory_list.find(accessory => accessory.id === id)
        const newArray = this.state.accessory_list.filter(accessory => accessory.id !== id)
        this.removeEngraveFunction(target.engrave_list);
        this.setState({accessory_list: newArray});
    }

    render() {
        const accessories = this.state.accessory_list.map((accessory, idx) => (<Accessory id={accessory.id} name={accessory.name} grade={accessory.grade} engrave_attributes={accessory.engrave_list} battle_attributes={accessory.battle_list} removeFunction={this.removeAccessory.bind(this)}/>));

        return (
            <div>
                {accessories}
            </div>
        )
    }
}

export default AccessoryBoard;