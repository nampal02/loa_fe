import React from 'react';
import AccessoryFindingBoard from '../../Components/Search/AccessoryFindingBoard';
import ConditionModal from '../../Components/Search/ConditionModal';
import EngraveBoard from '../../Components/Search/EngraveBoard';
import AccessoryBoard from '../../Components/Search/AccessoryBoard';
import '../../Components/Search/Search.css';
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