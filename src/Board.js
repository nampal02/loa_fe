import React from 'react';
import './Board.css';
import DropdownMenu from './Menu';
import axios from 'axios';


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

class AccessoryFindingBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showCategoryMenu: false,
            showGradeMenu: false,
            showQualityMenu: false,
            showQualityInequalityMenu: false,
            showEngraveMenu1: false,
            showEngraveMenu2: false,
            showBattleAttrMenu1: false,
            showBattleAttrMenu2: false,
        }

        this.openModalWithConditions = this.openModalWithConditions.bind(this);
    }

    itemTypeRef = React.createRef();
    gradeRef = React.createRef();
    engrave1Ref = React.createRef();
    engrave2Ref = React.createRef();
    battleAttr1Ref = React.createRef();
    battleAttr2Ref = React.createRef();

    openModalWithConditions() {
        if(this.itemTypeRef.current.state.selected === false){
            alert("장신구 종류를 선택해주세요.")
            return;
        }
        if(this.gradeRef.current.state.selected === false){
            alert("등급을 선택해주세요.")
            return;
        }
        if(this.engrave1Ref.current.state.selected === false && this.engrave2Ref.current.state.selected === false){
            alert("각인을 최소 1가지 선택해주세요.")
            return;
        }
        if(this.battleAttr1Ref.current.state.selected === false && this.battleAttr2Ref.current.state.selected === false){
            alert("전투 특성을 최소 1가지 선택해주세요.")
            return;
        }

        const itemType = this.itemTypeRef.current.state.selectedItem;
        const gradeType = this.gradeRef.current.state.selectedItem;
        const engrave1 = this.engrave1Ref.current.state.selectedItem;
        const engrave2 = this.engrave2Ref.current.state.selectedItem;
        const battleAttr1 = this.battleAttr1Ref.current.state.selectedItem;
        const battleAttr2 = this.battleAttr2Ref.current.state.selectedItem;

        let engrave_list = []
        if(this.engrave1Ref.current.state.selected === true) {
            engrave_list = engrave_list.concat({name: engrave1});
        }
        if(this.engrave2Ref.current.state.selected === true) {
            engrave_list = engrave_list.concat({name: engrave2});
        }

        let battle_list = []
        if(this.battleAttr1Ref.current.state.selected === true) {
            battle_list = battle_list.concat({name: battleAttr1});
        }
        if(this.battleAttr2Ref.current.state.selected === true) {
            battle_list = battle_list.concat({name: battleAttr2});
        }

        this.props.openModal(itemType, gradeType, 80, engrave_list, battle_list);
    }

    render() {
        return (
            <div style={{'min-height': 500+'px'}}>
                <table style={{width: 100+'%', 'text-align': 'center', 'align-items': 'center', 'border-collapse': 'collapse'}} border="0">
                    <th style={{width: 10+'%', 'font-weight': 'normal'}}>
                        <DropdownMenu ref={this.itemTypeRef} items={[
                            {name: "목걸이"},
                            {name: "귀걸이"},
                            {name: "반지"},
                        ]}>
                            장신구 종류
                        </DropdownMenu>
                    </th>
                    <th style={{width: 10+'%', 'font-weight': 'normal'}}>
                        <DropdownMenu ref={this.gradeRef} items={[
                            {name: "희귀"},
                            {name: "영웅"},
                            {name: "전설"},
                            {name: "유물"},
                        ]}>
                            등급
                        </DropdownMenu>
                    </th>
                    <th style={{width: 25+'%', 'font-weight': 'normal'}}>
                        <DropdownMenu ref={this.engrave1Ref} items={[
                            {name: "전체", value: true},
                            {name: "직업 각인 (직업 순)", value: false},
                            {name: "광기"},
                            {name: "광전사의 비기"},
                            {name: "고독한 기사"},
                            {name: "전투 태세"},
                            {name: "분노의 망치"},
                            {name: "중력 수련"},
                            {name: "심판자"},
                            {name: "축복의 오라"},
                            {name: "오의 강화"},
                            {name: "초심"},
                            {name: "극의: 체술"},
                            {name: "충격 단련"},
                            {name: "세맥타통"},
                            {name: "역천지체"},
                            {name: "절정"},
                            {name: "절제"},
                            {name: "강화 무기"},
                            {name: "핸드거너"},
                            {name: "연속포격"},
                            {name: "화력 강화"},
                            {name: "두 번째 동료"},
                            {name: "죽음의 습격"},
                            {name: "아르데타인의 기술"},
                            {name: "진화의 유산"},
                            {name: "절실한 구원"},
                            {name: "진실된 용맹"},
                            {name: "넘치는 교감"},
                            {name: "상급 소환사"},
                            {name: "황제의 칙령"},
                            {name: "황후의 은총"},
                            {name: "버스트"},
                            {name: "잔재된 기운"},
                            {name: "멈출 수 없는 충동"},
                            {name: "완벽한 억제"},
                            {name: "갈증"},
                            {name: "달의 소리"},
                            {name: "사냥의 시간"},
                            {name: "피스메이커"},
                            {name: "오의난무"},
                            {name: "일격필살"},
                            {name: "일반 전투 각인 (가나다 순)", value: false},
                            {name: "각성"},
                            {name: "강령술"},
                            {name: "강화 방패"},
                            {name: "결투의 대가"},
                            {name: "구슬동자"},
                            {name: "굳은 의지"},
                            {name: "급소 타격"},
                            {name: "기습의 대가"},
                            {name: "달인의 저력"},
                            {name: "돌격대장"},
                            {name: "마나의 흐름"},
                            {name: "마나 회복 증가"},
                            {name: "바리케이드"},
                            {name: "번개의 분노"},
                            {name: "부러진 뼈"},
                            {name: "분쇄의 주먹"},
                            {name: "불굴"},
                            {name: "선수필승"},
                            {name: "슈퍼 차지"},
                            {name: "승부사"},
                            {name: "실드 관통"},
                            {name: "안정된 상태"},
                            {name: "약자 무시"},
                            {name: "여신의 가호"},
                            {name: "에테르 강화"},
                            {name: "예리한 둔기"},
                            {name: "원한"},
                            {name: "위기 모면"},
                            {name: "저주받은 인형"},
                            {name: "정기 흡수"},
                            {name: "중갑 착용"},
                            {name: "최대 마나 증가"},
                            {name: "탈출의 명수"},
                            {name: "폭발물 전문가"},
                        ]}>
                            각인 1
                        </DropdownMenu>
                    </th>
                    <th style={{width: 25+'%', 'font-weight': 'normal'}}>
                        <DropdownMenu ref={this.engrave2Ref} items={[
                            {name: "전체", value: true},
                            {name: "직업 각인 (직업 순)", value: false},
                            {name: "광기"},
                            {name: "광전사의 비기"},
                            {name: "고독한 기사"},
                            {name: "전투 태세"},
                            {name: "분노의 망치"},
                            {name: "중력 수련"},
                            {name: "심판자"},
                            {name: "축복의 오라"},
                            {name: "오의 강화"},
                            {name: "초심"},
                            {name: "극의: 체술"},
                            {name: "충격 단련"},
                            {name: "세맥타통"},
                            {name: "역천지체"},
                            {name: "절정"},
                            {name: "절제"},
                            {name: "강화 무기"},
                            {name: "핸드거너"},
                            {name: "연속포격"},
                            {name: "화력 강화"},
                            {name: "두 번째 동료"},
                            {name: "죽음의 습격"},
                            {name: "아르데타인의 기술"},
                            {name: "진화의 유산"},
                            {name: "절실한 구원"},
                            {name: "진실된 용맹"},
                            {name: "넘치는 교감"},
                            {name: "상급 소환사"},
                            {name: "황제의 칙령"},
                            {name: "황후의 은총"},
                            {name: "버스트"},
                            {name: "잔재된 기운"},
                            {name: "멈출 수 없는 충동"},
                            {name: "완벽한 억제"},
                            {name: "갈증"},
                            {name: "달의 소리"},
                            {name: "사냥의 시간"},
                            {name: "피스메이커"},
                            {name: "오의난무"},
                            {name: "일격필살"},
                            {name: "일반 전투 각인 (가나다 순)", value: false},
                            {name: "각성"},
                            {name: "강령술"},
                            {name: "강화 방패"},
                            {name: "결투의 대가"},
                            {name: "구슬동자"},
                            {name: "굳은 의지"},
                            {name: "급소 타격"},
                            {name: "기습의 대가"},
                            {name: "달인의 저력"},
                            {name: "돌격대장"},
                            {name: "마나의 흐름"},
                            {name: "마나 회복 증가"},
                            {name: "바리케이드"},
                            {name: "번개의 분노"},
                            {name: "부러진 뼈"},
                            {name: "분쇄의 주먹"},
                            {name: "불굴"},
                            {name: "선수필승"},
                            {name: "슈퍼 차지"},
                            {name: "승부사"},
                            {name: "실드 관통"},
                            {name: "안정된 상태"},
                            {name: "약자 무시"},
                            {name: "여신의 가호"},
                            {name: "에테르 강화"},
                            {name: "예리한 둔기"},
                            {name: "원한"},
                            {name: "위기 모면"},
                            {name: "저주받은 인형"},
                            {name: "정기 흡수"},
                            {name: "중갑 착용"},
                            {name: "최대 마나 증가"},
                            {name: "탈출의 명수"},
                            {name: "폭발물 전문가"},
                        ]}>
                            각인 2
                        </DropdownMenu>
                    </th>
                    <th style={{width: 10+'%', 'font-weight': 'normal'}}>
                        <DropdownMenu ref={this.battleAttr1Ref} items={
                            [
                                {name: "전체", value: true},
                                {name: "치명"},
                                {name: "특화"},
                                {name: "제압"},
                                {name: "신속"},
                                {name: "숙련"},
                                {name: "인내"},
                            ]
                        }>
                            전투 특성 1
                        </DropdownMenu>
                    </th>
                    <th style={{width: 10+'%', 'font-weight': 'normal'}}>
                        <DropdownMenu ref={this.battleAttr2Ref} items={
                            [
                                {name: "전체", value: true},
                                {name: "치명"},
                                {name: "특화"},
                                {name: "제압"},
                                {name: "신속"},
                                {name: "숙련"},
                                {name: "인내"},
                            ]
                        }>
                            전투 특성 2
                        </DropdownMenu>
                    </th>
                </table>
                <div style={{'margin-top': 10+'px'}}>
                    <button onClick={this.openModalWithConditions}>조회</button>
                </div>
            </div>
        );
    }
}

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
class ConditionModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemType: '목걸이',
            grade: '일반',
            quality: 0,
            quality_inequality: 'over',
            engrave_list: [],
            battle_list: [],
            finding_result: [],
        }
    }

    accessoryBoardRef = null;

    updateRequest(datas) {
        this.setState({
            itemType: datas.itemType,
            grade: datas.grade,
            quality: datas.quality,
            quality_inequality: datas.quality_ineqaulity,
            engrave_list: datas.engrave_list,
            battle_list: datas.battle_list,
        }, async () => {
            // 데이터 조회

            const response = await axios({
              method: 'post',
              url: 'http://localhost:20080/api/v1/query/accessories',
              data: {
                itemType: datas.itemType,
                grade: datas.grade,
                quality: datas.quality,
                engraveList: datas.engrave_list,
                battleAttrList: datas.battle_list,
              }
            });

            this.setState({finding_result: response.data});


            // 데이터 추출
            // this.setState({finding_result: finding_result})
            //   this.setState({finding_result: response.data});
        })

    }

    render() {
        const {open, close, header } = this.props;
        const finding_result_datas = this.state.finding_result.map((result) => (
            <FindingResult
                name={result.name}
                grade={result.grade}
                quality={result.quality}
                engrave_list={result.engrave_list}
                battle_list={result.battle_list}
                price={result.price}
                addButtonCallback={this.accessoryBoardRef.current.addAccessory.bind(this.accessoryBoardRef.current)}>
            </FindingResult>
        ));

        let headerFormat = ''
        headerFormat += header;
        headerFormat += " : ";
        headerFormat += this.state.itemType;
        headerFormat += ", ";
        headerFormat += this.state.grade;
        headerFormat += ", 품질 : ";
        headerFormat += this.state.quality;
        headerFormat += ", 각인 : ";
        this.state.engrave_list.map((data) => {
            headerFormat += data.name
            headerFormat += '  '
        })
        headerFormat += ", 전투 특성 : ";
        this.state.battle_list.map((data) => {
            headerFormat += data.name
            headerFormat += '  '
        })

        return (
            <div class={open ? 'openModal modal': 'modal'}>
                {open ? (
                    <section>
                        <header>
                            { headerFormat }
                            <button className="close" onClick={close}>&times;</button>
                        </header>
                        <main>
                            <div style={{height: 700+'px', 'overflow': 'auto'}}>
                                <table style={{width: 100+'%', 'text-align': 'center', 'align-items': 'center', 'border-collapse': 'collapse'}} border="1">
                                    <th style={{'border-bottom': '2px double #000000'}}>이름</th>
                                    <th style={{'border-bottom': '2px double #000000'}}>등급</th>
                                    <th style={{'border-bottom': '2px double #000000'}}>품질</th>
                                    <th style={{'border-bottom': '2px double #000000'}}>각인</th>
                                    <th style={{'border-bottom': '2px double #000000'}}>특성</th>
                                    <th style={{'border-bottom': '2px double #000000'}}>가격</th>
                                    <th></th>
                                    { finding_result_datas }
                                </table>
                            </div>
                        </main>
                        <footer>
                            <button className="close" onClick={close}>Close</button>
                        </footer>
                    </section>
                ) : null}
            </div>
        );
    }
}
class MainBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            condition_modal_open: false,
        }
    }

    engraveBoardRef = React.createRef();
    accessoryBoardRef = React.createRef();
    accessoryFindingBoardRef = React.createRef();
    conditionModalRef = React.createRef();

    openConditionModal(itemType, grade, quality, engrave_list, battle_list) {
        this.conditionModalRef.current.updateRequest({
            itemType: itemType,
            grade: grade,
            quality: quality,
            quality_inequality: '>',
            engrave_list: engrave_list,
            battle_list: battle_list,
        })
        this.setState({condition_modal_open: true});
    }

    closeConditionModal() {
        this.setState({condition_modal_open: false});
    }

    componentDidMount() {
        this.accessoryBoardRef.current.addEngraveFunction = this.engraveBoardRef.current.addEngraves;
        this.accessoryBoardRef.current.removeEngraveFunction = this.engraveBoardRef.current.removeEngraves;
        this.conditionModalRef.current.accessoryBoardRef = this.accessoryBoardRef;
    }

    render() {
        return (
            <div class="two-separated">
                <div class="left">
                    <p> 검색 조건 </p>
                    <AccessoryFindingBoard ref={this.accessoryFindingBoardRef} openModal={this.openConditionModal.bind(this)}/>
                    <ConditionModal ref={this.conditionModalRef} open={this.state.condition_modal_open} close={this.closeConditionModal.bind(this)} header="조건 검색 결과창">
                        조건 검색 창입니다.
                    </ConditionModal>
                </div>
                <div class="right">
                    <EngraveBoard ref={this.engraveBoardRef}/>
                    <AccessoryBoard ref={this.accessoryBoardRef}/>
                    <div className="button-list">
                        <button onClick={() => {
                            this.accessoryBoardRef.current.addAccessory("타락한 시간의 반지", "유물", [{name: "예리한 둔기", value: 5}, {name: "원한", value: 3}, {name: "공격력 감소", value: -1}], [{name: "치명", value: 200}, {name: "특화", value: 200}])
                            //this.refs.engraveboard.addEngraves([{name: "예리한 둔기", value: 5}, {name: "원한", value: 3}])
                        }}>
                            AddAccessory Test
                        </button>
                    </div>
                </div>            
            </div>
        )
    }
}

export default MainBoard