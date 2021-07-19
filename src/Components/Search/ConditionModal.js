import React from 'react';
import FindingResult from './FindingResult';
import './Search.css';
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
        }, () => {
            // 데이터 조회
            // 데이터 추출
            // this.setState({finding_result: finding_result})
            const data = [{
                name: "울부짖는 공간의 귀걸이",
                grade: "유물",
                quality: 80,
                engrave_list: [
                    {name: "예리한 둔기", value: 5},
                    {name: "원한", value: 3},
                    {name: "이동속도 감소", value: -2}
                ],
                battle_list: [
                    {name: "치명", value: 300},
                    {name: "특화", value: 300}
                ],
                price: 100000
            }, {
                name: "울부짖는 시간의 귀걸이",
                grade: "유물",
                quality: 80,
                engrave_list: [
                    {name: "예리한 둔기", value: 5},
                    {name: "원한", value: 3},
                    {name: "이동속도 감소", value: -2}
                ],
                battle_list: [
                    {name: "치명", value: 300},
                    {name: "특화", value: 300}
                ],
                price: 100000
            }]
            this.setState({finding_result: data})
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


export default ConditionModal;