import React, { Component } from 'react';
import './styles.css'
import Header from '../../components/header';
import decode from 'jwt-decode';
import { getToken, logout, getServer} from '../../services/auth';
import api from '../../services/api';

class UserDash extends Component {
    state = {
        cpf: '',
        created_at: '',
        email: '',
        id: '',
        name: '',
        updated_at: '',
        imgName: '',
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
            this.setState({ imgPath: `${getServer()}/download/${this.state.imgName}`})
        } catch (err) {
            console.log(err);
        }
    };

    handleLogout = () => {
        logout();
        this.props.history.push("/");
    }

    handleEdit = () => {
        this.props.history.push("/edit");
    }

    render() {
        return (
            <div>
                <Header fullname={this.state.name} picSrc={`${getServer()}/download/${this.state.imgName}`}/>
                <h1>Meu Perfil</h1>
                <hr id="title"/>
                <div className="gridUserDash">
                    <div className="imageUserDash">
                        <img 
                            src={`${this.state.imgPath}?${Date.now()}`} 
                            alt={"Foto de perfil de " + this.state.name}
                            className="bigProfileUserDash"
                        />
                    </div>
                    <div className="dataUserDash">
                        <p><strong>Nome: </strong>{this.state.name}</p>
                        <p><strong>CPF: </strong>{this.state.cpf}</p>
                        <p><strong>E-mail: </strong>{this.state.email}</p>
                    </div>
                </div>
                <hr/>
                <div className="buttonsUserDash">
                    <button className="btnUD" onClick={this.handleEdit}>Editar Informações</button>
                    <button className="btnUD" onClick={this.handleLogout}>Sair</button>
                </div>
            </div>
        );
    }
}

export default UserDash;