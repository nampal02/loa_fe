import React from 'react';
import DropdownMenu from './Menu';
import './Search.css';
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

export default AccessoryFindingBoard;