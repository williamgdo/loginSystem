import React, { Component } from 'react';
import './styles.css'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <header id="main-header">
                <div className="grid">
                    <p className="username">{this.props.fullname}</p>
                    <img className="avatar" id="avatar" src={this.props.picSrc} alt="Avatar"/>
                </div>
            </header>
        )
    }
}

export default Header;