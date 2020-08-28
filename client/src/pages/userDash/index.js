import React, { Component } from 'react';
import './styles.css'
import Header from '../../components/header';
import decode from 'jwt-decode';
import { getToken } from '../../services/auth';
import api from '../../services/api';
const SERVER = 'http://127.0.0.1:3333';

class UserDash extends Component {
    state = {
        cpf: '',
        created_at: '',
        email: '',
        id: '',
        name: '',
        updated_at: '',
        imgPath: ''
    }
    
    componentDidMount() {
        this.loadData();
    }
      
    loadData = async () => {
        const { uid } = decode(getToken());
        try {
            const response = await api.get(`/users/${uid}`);
            this.setState({ ...response.data });
            console.log(this.state)
        } catch (err) {
            console.log(err);
        }
    };


    render() {
        return (
            <div>
                <Header />
                <h1>Meu Perfil</h1>
                <hr id="title"/>
                <div className="grid">
                    <div className="image">
                        <img src={`${SERVER}/download/${this.state.imgPath}`} alt={"Foto de perfil de " + this.state.name}></img>
                    </div>
                    <div className="data">
                        <p><strong>Nome: </strong>{this.state.name}</p>
                        <p><strong>CPF: </strong>{this.state.cpf}</p>
                        <p><strong>E-mail: </strong>{this.state.email}</p>
                    </div>
                </div>
                <hr/>
                <div className="buttons">
                    <button>Editar Informações</button>
                    <button>Sair</button>
                </div>
            </div>
        );
    }
}

export default UserDash;