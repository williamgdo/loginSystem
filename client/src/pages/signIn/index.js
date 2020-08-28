import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import api from '../../services/api';
import { login } from "../../services/auth";
import decode from 'jwt-decode';

import './styles.css'

class SignIn extends Component {

    state = {
        email: '',
        password: '',
        buttonDisabled: false,
        error: ""
    }

    resetForm() {
        this.setState({
            email: '',
            password: '',
            buttonDisabled: false,
        })
    }

    handleSignIn = async e => {
        e.preventDefault();
        const { email, password } = this.state;

        if (!email || !password) {
            this.setState({ error: "Preencha todos os campos para entrar" });
        } 
        else {
            try {
                let response = await api.post("/sessions", { email, password });
                login(response.data.token);

                const { uid } = decode(response.data.token);
                response = await api.get(`/users/${uid}`);

                if (response.data.level === 999)
                    this.props.history.push("/adminDash");
                else if (response.data.level === 1)
                    this.props.history.push("/userDash");
                else {
                    this.setState({ error: "Você foi desativado da empresa."});
                }
            } catch (err) {
                console.warn(err);
                this.setState({ error: "Houve um problema com o login, verifique suas credenciais."});
            }
        }
    };
    
    render() {
        return (
            <div className='formSignIn'>
                <form onSubmit={this.handleSignIn}>
                    Login
                    <div className="dataSignIn">
                        <input
                            className="inputSignIn"
                            type='email'
                            placeholder='Digite seu email'
                            onChange={e => this.setState({ email: e.target.value})}                        
                        />
                        <input
                            className="inputSignIn"
                            type='password'
                            placeholder='Digite sua senha'
                            onChange={e => this.setState({ password: e.target.value})} 
                        />
                        <button 
                            className="btnSignIn"
                            disabled={this.state.buttonDisabled} 
                            type="submit">
                            Entrar
                        </button>
                    </div>
                    <Link to="/signup">Criar conta grátis</Link>
                </form>
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        );
    }
}

export default withRouter(SignIn);