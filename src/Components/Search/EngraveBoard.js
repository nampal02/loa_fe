import React from 'react';
import SingleEngrave from './SingleEngrave';
import './Search.css';

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
                if(temp_engraves[i].name !== newName) {
                    continue;
                }

                if(temp_engraves[i].name === newName) {
                    let result = temp_engraves[i].value - newValue;
                    if(result === 0) {
                        let removed_array = temp_engraves.filter(engrave => engrave.name !== newName)
                        finished = true;
                        this.setState({engraves: removed_array, engrave_num: this.state.engrave_num - 1}, () => {resolve('Updated')});
                        break;
                    } else {
                        temp_engraves[i].value = result;
                        finished = true;
                        this.setState({engraves: temp_engraves}, () => {resolve('Updated')});
                        break;
                    }
                }
            }
            if(finished === false) {
                resolve('Updated');
                // alert('Error : No engrave!')
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

            return e2_value - e1_value;
        })

        const engraveList = sortedList.map((engrave) => (<SingleEngrave key={engrave.id} name={engrave.name} value={engrave.value}/>));
    
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
                </div>
            </div>
        )
    }
}

export default EngraveBoard;