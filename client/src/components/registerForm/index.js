import React from 'react';
import './styles.css';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            cpf: '', 
            email: '',
            password: '',
            passwordConfirm: '',
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
            fullname: '',
            cpf: '', 
            email: '',
            password: '',
            passwordConfirm: '',
            buttonDisabled: false,
        })
    }

    render() {
        return (
            <div className="registerForm">
                Cadastrar
                <div className="data">
                    <input
                        type='text'
                        placeholder='Digite seu nome completo'
                        value={this.state.fullname ? this.state.fullname : ''}
                        onChange={(val) => this.setInputValue('fullname', val)}
                    />
                    <input
                        type='text'
                        placeholder='Digite seu CPF (apenas números, ex: 12345678909)'
                        value={this.state.cpf ? this.state.cpf : ''}
                        onChange={(val) => this.setInputValue('cpf', val)}
                    />
                    <input
                        type='email'
                        placeholder='Digite seu email'
                        value={this.state.email ? this.state.email : ''}
                        onChange={(val) => this.setInputValue('email', val)}
                    />
                    <input
                        type='password'
                        placeholder='Digite sua senha'
                        value={this.state.password ? this.state.password : ''}
                        onChange={(val) => this.setInputValue('password', val)}
                    />
                    <input
                        type='password'
                        placeholder='Digite novamente a senha'
                        value={this.state.password ? this.state.password : ''}
                        onChange={(val) => this.setInputValue('passwordConfirm', val)}
                    />

                    <button disabled={this.state.buttonDisabled}>
                        Cadastrar dados
                    </button>
                </div>
            </div>
        );
    }
}

export default RegisterForm;