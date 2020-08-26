import React, { Component } from 'react';
import './styles.css'
import Header from '../../components/header';

export default class UserDash extends Component {
    render() {
        return (
            <div>
                <Header />
                <h1>Meu Perfil</h1>
                <hr id="title"/>
                <div class="grid">
                    <div class="image">placeholder de foto</div>
                    <div class="data">
                        <p><strong>Nome: </strong>William Giacometti Dutra de Oliveira</p>
                        <p><strong>CPF: </strong>123.456.789-09</p>
                        <p><strong>E-mail: </strong>williamgdo@email.com</p>
                    </div>
                </div>
                <hr/>
                <div class="buttons">
                    <button>Editar Informações</button>
                    <button>Sair</button>
                </div>
            </div>
        );
    }
}