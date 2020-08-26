import React, { Component } from 'react';
import LoginForm from '../../components/loginForm'
import RegisterForm from '../../components/registerForm'
import './styles.css'

export default class Main extends Component {
    render() {
        return (
            <div>
                < LoginForm/>
                <div>Bom dia grupo</div>
            </div>
        );
    }
}