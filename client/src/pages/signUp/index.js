import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import api from '../../services/api';

import './styles.css'

class SignUp extends Component {

    state = {
        name: '',
        cpf: '', 
        email: '',
        password: '',
        profile_pic: null,
        passwordConfirm: '',
        buttonDisabled: false,
    }

    resetForm() {
        this.setState({
            name: '',
            cpf: '', 
            email: '',
            password: '',
            profile_pic: null,
            passwordConfirm: '',
            buttonDisabled: false,
        })
    }

    fileSelectedHandler = event => {
        this.setState({
            profile_pic: event.target.files[0],
        });
    }

    handleSignUp = async e => {
        e.preventDefault();
        const { name, cpf, email, password, profile_pic } = this.state;
        if (!name || !cpf || !email || !password || !profile_pic) {
            this.setState({ error: "Preencha todos os campos e selecione uma imagem para cadastrar" });
        }   
        else {
            try {
                const FD = new FormData()
                FD.append('profile_pic', this.state.profile_pic);
                FD.append('name', this.state.name);
                FD.append('cpf', this.state.cpf);
                FD.append('email', this.state.email);
                FD.append('password', this.state.password  );
                console.log(FD)
                await api.post("/users", FD);
                this.props.history.push("/");
            } catch (err) {
                console.warn(err);
                this.setState({ error: "Ocorreu um erro ao registrar sua conta."});
            }
        }
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSignUp}>
                    Cadastrar
                    <div className="data">
                        <input
                            type='file'
                            onChange={this.fileSelectedHandler}
                        >
                        </input>
                        <input
                            type='text'
                            placeholder='Digite seu nome completo'
                            onChange={e => this.setState({ name: e.target.value})}
                        />
                        <input
                            type='text'
                            placeholder='Digite seu CPF (apenas números, ex: 12345678909)'
                            onChange={e => this.setState({ cpf: e.target.value})}
                        />
                        <input
                            type='email'
                            placeholder='Digite seu email'
                            onChange={e => this.setState({ email: e.target.value})}                        
                        />
                        <input
                            type='password'
                            placeholder='Digite sua senha'
                            onChange={e => this.setState({ password: e.target.value})} 
                        />
                        <input
                            type='password'
                            placeholder='Digite novamente a senha'
                            onChange={e => this.setState({ passwordConfirm: e.target.value})}      
                        />
                        <button disabled={this.state.buttonDisabled} type="submit">
                            Cadastrar dados
                        </button>
                    </div>
                </form>
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        );
    }
}

export default withRouter(SignUp);