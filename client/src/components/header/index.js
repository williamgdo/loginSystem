import React, { Component } from 'react';
import './styles.css'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <header id="mainHeader">
                <div className="gridHeader">
                    <p className="usernameHeader">{this.props.fullname}</p>
                    <img className="avatarHeader" id="avatar" src={this.props.picSrc} alt="Avatar"/>
                </div>
            </header>
        )
    }
}

export default Header;