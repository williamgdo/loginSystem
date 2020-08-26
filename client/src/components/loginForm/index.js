import React from 'react';
import './styles.css';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            buttonDisabled: false,
        }
    }

    setInputValue(property, val) {
        val = val.trim(); // remove spaces for less error
        if (val.length > 12)
            return;

        this.setState({ [property]: val })
    }

    resetForm() {
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false
        })
    }

    render() {
        return (
            <div className="loginForm">
                Login
                <div className="data">
                    <input
                        type='text'
                        placeholder='Username'
                        value={this.state.username ? this.state.username : ''}
                        onChange={(val) => this.setInputValue('username', val)}
                    />
                    <input
                        type='password'
                        placeholder='password'
                        value={this.state.password ? this.state.password : ''}
                        onChange={(val) => this.setInputValue('password', val)}
                    />

                    <button disabled={this.state.buttonDisabled}>
                        Entrar
                    </button>
                </div>
                <a href="#">Cadastrar</a>
            </div>
        );
    }
}

export default LoginForm;