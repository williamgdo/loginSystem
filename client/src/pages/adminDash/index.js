import React, { Component } from 'react';
import './styles.css'
import Header from '../../components/header';

export default class UserDash extends Component {
    render() {
        return (
            <div>
                <Header />
                <h1>Usuários da Empresa</h1>
                <table>
                    <tr>
                        <th>Nome Completo</th>
                        <th>CPF</th>
                        <th>Email</th> 
                    </tr>
                    <tr>
                        <td>Alfreds Futterkiste</td>
                        <td>123456789-09</td>
                        <td>william@gmail.com<button>Detalhes</button><button>Desativar</button></td>
                        
                    </tr>
                    <tr>
                        <td>Centro comercial Moctezuma</td>
                        <td>Francisco Chang</td>
                        <td>Mexico</td>
                    </tr>
                    <tr>
                        <td>Ernst Handel</td>
                        <td>Roland Mendel</td>
                        <td>Austria</td>
                    </tr>
                    <tr>
                        <td>Island Trading</td>
                        <td>Helen Bennett</td>
                        <td>UK</td>
                    </tr>
                    <tr>
                        <td>Laughing Bacchus Winecellars</td>
                        <td>Yoshi Tannamuri</td>
                        <td>Canada</td>
                    </tr>
                    <tr>
                        <td>Magazzini Alimentari Riuniti</td>
                        <td>Giovanni Rovelli</td>
                        <td>Italy</td>
                    </tr>
                </table>
            </div>
        );
    }
}