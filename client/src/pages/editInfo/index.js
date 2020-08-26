import React, { Component } from 'react';
import './styles.css'
import Header from '../../components/header';

export default class editInfo extends Component {
    render() {
        return (
            <div>
                <Header />
                <h1>Editar Perfil</h1>
                <hr id="title"/>
                <div class="grid">
                    <div class="data">
                        <input
                            type='text'
                            placeholder='Digite seu nome completo'
                            value="William Giacometti"
                            // onChange={(val) => this.setInputValue('fullname', val)}
                        />
                        <input
                            type='text'
                            placeholder='Digite seu CPF (apenas números, ex: 12345678909)'
                            value="123456789"
                            // onChange={(val) => this.setInputValue('cpf', val)}
                        />
                        <input
                            type='email'
                            placeholder='Digite seu email'
                            value="email.com"
                            // onChange={(val) => this.setInputValue('email', val)}
                        />
                        <input
                            type='password'
                            placeholder='Digite sua senha'
                            value="1234"
                            // onChange={(val) => this.setInputValue('password', val)}
                        />
                    </div>
                    <div class="image">placeholder de foto</div>
                </div>
                <hr/>
                <div class="buttons">
                    <button>Salvar Edição</button>
                    <button>Cancelar</button>
                </div>
            </div>
        );
    }
}