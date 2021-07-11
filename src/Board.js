import React from 'react';
import './Board.css';

// class PriceBoard extends React.Component {

// }

class AccessoryEngrave extends React.Component {
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
        )
    }
}

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

class EngraveBoard extends React.Component {  
    id = 0;
    processing = false;
    constructor(props) {
        super(props);

        this.state = {
            engraves: [],
            engrave_num: 0,
        }

        this.addEngraves = this.addEngraves.bind(this);
        this.addEngrave = this.addEngrave.bind(this);
        this.removeEngrave = this.removeEngrave.bind(this);
        this.removeEngraves = this.removeEngraves.bind(this);
    }

    async addEngraves(engraves) {
        for(let i = 0; i < engraves.length; i++) {
            await this.addEngrave(engraves[i].name, engraves[i].value)
        }
    }

    async removeEngraves(engraves) {
        for(let i = 0; i < engraves.length; i++) {
            await this.removeEngrave(engraves[i].name, engraves[i].value)
        }
    }

    addEngrave(newName, newValue) {
        //while(this.processing === true);
        return new Promise((resolve, reject) => {
            this.processing = true;
            let temp_engraves = this.state.engraves.slice();
            let finished = false;
            for(let i = 0; i < temp_engraves.length; i++) {
                if(temp_engraves[i].name !== newName) {
                    continue;
                }
    
                if(temp_engraves[i].name === newName) {
                    temp_engraves[i].value = temp_engraves[i].value + newValue;
                    finished = true;
                    // this.setState({engrave_num: this.state.engrave_num})
                    this.setState({engraves: temp_engraves}, () => {resolve('Updated')})
                    break;
                }
            }
            if(finished === false) {
                // for(let i = 0; i < 100; i++) {
                //     if(engraves[i] == null) {
                //         engraves[i] = new SingleEngrave({name: newName, value: newValue});
                //         this.setState({engraves: engraves, engrave_num: this.state.engrave_num + 1}, () => alert("FUCKING"));
                //         break;
                //     }
                // }
                temp_engraves = temp_engraves.concat({id: this.id++, name: newName, value: newValue})
                this.setState({engraves: temp_engraves, engrave_num: this.state.engrave_num+1}, () => {resolve('Updated')})
            }
        });
    }

    removeEngrave(newName, newValue) {
        return new Promise((resolve, reject) => {
            let temp_engraves = this.state.engraves.slice();
            let finished = false;
            for(let i = 0; i < temp_engraves.length; i++) {
                if(temp_engraves[i].name != newName) {
                    continue;
                }

                if(temp_engraves[i].name == newName) {
                    let result = temp_engraves[i].value - newValue;
                    if(result = 0) {
                        let removed_array = temp_engraves.filter(engrave => engrave.name !== newName)
                        finished = true;
                        this.setState({engraves: removed_array, engrave_num: this.state.engrave_num - 1}, () => {resolve('Updated')});
                        break;
                    } else {
                        temp_engraves[i].value = result;
                        finished = true;
                        this.setState({engraves: temp_engraves}, () => {resolve('Updated')});
                    }
                }
            }
            if(finished === false) {
                resolve('Updated');
                alert('Error : No engrave!')
            }  
        });     
    }

    
    render() {
        const sortedList = this.state.engraves.sort((engrave1, engrave2) => {
            let e1_value = engrave1.value;
            let e2_value = engrave2.value;
            if(e1_value < 0) {
                e1_value = e1_value * -1;
            }
            if(e2_value < 0) {
                e2_value = e2_value * -1;
            }

            return e1_value - e2-value;
        })

        const engraveList = sorted.map((engrave) => (<SingleEngrave key={engrave.id} name={engrave.name} value={engrave.value}/>));
    
        //alert(this.state.engraves)
        return (
            <div>
                <div className="engrave-list">
                    {engraveList}
                </div>
                <div className="button-list">
                    <button onClick={() => this.addEngrave("예리한 둔기", 5)}>
                        AddEngrave Test
                    </button>
                    <button onClick={() => this.removeEngrave("예리한 둔기", 5)}>
                        RemoveEngrave Test
                    </button>
                    <p>
                        {this.state.engrave_num}
                    </p>
                </div>
            </div>
        )
    }
}

class MainBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    engraveBoardRef = React.createRef();
    accessoryBoardRef = React.createRef();

    componentDidMount() {
        this.accessoryBoardRef.current.addEngraveFunction = this.engraveBoardRef.current.addEngraves;
        this.accessoryBoardRef.current.removeEngraveFunction = this.engraveBoardRef.current.removeEngraves;
    }

    render() {
        return (
            <div>
                <EngraveBoard ref={this.engraveBoardRef}/>
                <AccessoryBoard ref={this.accessoryBoardRef}/>
                <div className="button-list">
                    <button onClick={() => {
                        this.accessoryBoardRef.current.addAccessory("크와아앙", "유물", [{name: "예리한 둔기", value: 5}, {name: "원한", value: 3}, {name: "공격력 감소", value: -1}], [{name: "치명", value: 200}, {name: "특화", value: 200}])
                        //this.refs.engraveboard.addEngraves([{name: "예리한 둔기", value: 5}, {name: "원한", value: 3}])
                    }}>
                        AddAccessory Test
                    </button>
                </div>
            </div>
        )
    }
}
// class EngraveBoard extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             count: 0,
//         }

//         this.increaseCount = this.increaseCount.bind(this);
//     }

//     increaseCount() {
//         this.setState({count: this.state.count+1});
//     }

//     render() {
//         return (
//             <div>
//                 <div>
//                     {this.state.count}
//                 </div>
//                 <div>
//                     <button onClick={this.increaseCount}>
//                         Click me
//                     </button>
//                 </div>
//             </div>
//         )
//     }
// }
export default MainBoard