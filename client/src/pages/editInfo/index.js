import React, { Component } from 'react';
import './styles.css'
import Header from '../../components/header';
import decode from 'jwt-decode';
import { getToken, getServer } from '../../services/auth';
import api from '../../services/api';

class editInfo extends Component {

    state = {
        imageChanged: false,
        imgPath: '',
        error: '',
        newProfilePic: null
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
            console.log(this.state);
        } catch (err) {
            console.log(err);
        }
    };

    fileSelectedHandler = event => {
        this.setState({
            newProfilePic: event.target.files[0],
            imageChanged: true
        });
    }

    handleCancel = () => {
        this.props.history.push("/userDash");
    }

    handleSave = async e => {
        const { name, cpf, email, password } = this.state;
        if (!name || !cpf || !email || !password) {
            this.setState({ error: "Preencha todos os campos e selecione uma imagem para cadastrar" });
        }   
        else {
            if(this.state.imageChanged) {
                try {
                    const FDimg = new FormData()
                    FDimg.append('profile_pic', this.state.newProfilePic);
                    await api.post(`/updatePic/${this.state.id}`, FDimg);

                    const FD = new FormData()
                    FD.append('name', this.state.name);
                    FD.append('cpf', this.state.cpf);
                    FD.append('email', this.state.email);
                    FD.append('password', this.state.password  );
                    await api.put(`/users/${this.state.id}`, FD);

                    this.props.history.push("/userDash");
                } catch (err) {
                    console.warn(err);
                    this.setState({ error: "Ocorreu um erro ao editar os dados."});
                }
            } else {
                try {
                    const FD = new FormData()
                    FD.append('name', this.state.name);
                    FD.append('cpf', this.state.cpf);
                    FD.append('email', this.state.email);
                    FD.append('password', this.state.password  );
                    await api.put(`/users/${this.state.id}`, FD);
                    this.props.history.push("/userDash");
                } catch (err) {
                    console.warn(err);
                    this.setState({ error: "Ocorreu um erro ao editar os dados."});
                } 
            }
        }
    };

    render() {
        return (
            <div>
                <Header fullname={this.state.name} picSrc={`${getServer()}/download/${this.state.imgName}`}/>
                <h1>Editar Perfil</h1>
                <hr id="title"/>
                    <div className="gridEditUser">
                        <div className="dataEditUser">
                            <input
                                type='text'
                                placeholder='Digite seu nome completo'
                                value={this.state.name}
                                onChange={e => this.setState({ name: e.target.value})}
                            />
                            <input
                                type='text'
                                placeholder='Digite seu CPF (apenas números, ex: 12345678909)'
                                value={this.state.cpf}
                                onChange={e => this.setState({ cpf: e.target.value})}  
                            />
                            <input
                                type='email'
                                placeholder='Digite seu email'
                                value={this.state.email}
                                onChange={e => this.setState({ email: e.target.value})} 
                            />
                            <input
                                type='password'
                                placeholder='Digite sua senha'
                                onChange={e => this.setState({ password: e.target.value})}  
                            />
                        </div>
                        <div className="imageEditUser">
                            <img src={`${this.state.imgPath}?${Date.now()}`} alt={"Foto de perfil de " + this.state.name}></img>
                            <input
                                className='imgInputEditUser'
                                type='file'
                                onChange={this.fileSelectedHandler}
                            />
                        </div>
                    </div>
                    <hr/>
                    <div className="buttonsEditUser">
                        <button onClick={this.handleSave}>Salvar Edição</button>
                        <button onClick={this.handleCancel}>Cancelar</button>
                    </div>
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        );
    }
}

export default editInfo;