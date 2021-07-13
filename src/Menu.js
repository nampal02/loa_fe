import React from 'react';
import './Menu.css';

class DropdownMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            selectedItem: this.props.children,
            selected: false,
        }

        this.onClick = this.onClick.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
        this.pageClickEvent = this.pageClickEvent.bind(this);
    }

    menuRef = React.createRef();
    dropdownRef = React.createRef();

    pageClickEvent(e) {
        if(this.state.isActive === true) {
            if(this.dropdownRef.current !== null && !this.dropdownRef.current.contains(e.target) && !this.menuRef.current.contains(e.target)) {
                this.setState({isActive: false});
                window.removeEventListener('click', this.pageClickEvent);
            }
        }
    }
    onClick() {
        const nextState = !this.state.isActive;
        this.setState({isActive: nextState}, () => {
            if(nextState === true) {
                window.addEventListener('click', this.pageClickEvent);
            }
        });
    }

    onItemClick(name, value) {
        if(this.state.isActive === true && value !== false) {
            if(value === true) {
                this.setState({isActive: false, selectedItem: name, selected: false});
            } else {
                this.setState({isActive: false, selectedItem: name, selected: true});
            }
            window.removeEventListener('click', this.pageClickEvent);
        }
    }

    render() {
        const menuItems = this.props.items.map((item) => (
            <li style={{'background-color': item.value === null || item.value === undefined || item.value === true ? '#FFFFFF' : 'rgba(0, 0, 0, 0.2)'}}>
                <a onClick={() => this.onItemClick(item.name, item.value)}>
                    {item.name}
                </a>
            </li>
        ))
        return (
            <div className="menu-container">
                <button ref={this.menuRef} onClick={this.onClick} className="menu-trigger">
                    {this.state.selectedItem}
                </button>
                <nav ref={this.dropdownRef} className={`menu ${this.state.isActive ? 'active' : 'inactive'}`}>
                    <ul>
                        {menuItems}
                    </ul>
                </nav>
            </div>
        )
    }
}

export default DropdownMenu;