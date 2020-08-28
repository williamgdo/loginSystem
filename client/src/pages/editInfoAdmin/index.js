import React, { Component } from 'react';
import './styles.css'
import Header from '../../components/header';
import decode from 'jwt-decode';
import { getToken, getServer } from '../../services/auth';
import api from '../../services/api';

class editInfoAdmin extends Component {
    state = {
        imageChanged: false,
        imgPath: '',
        error: '',
        newProfilePic: null,
        user_info: {}
    }
    
    componentDidMount() {
        this.loadData();
    }
    
    loadData = async () => {
        const { uid } = decode(getToken());
        try {
            let response = await api.get(`/users/${uid}`);
            this.setState({ ...response.data });
            this.setState({ imgPath: `${getServer()}/download/${this.state.imgName}`})

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            response = await api.get(`/users/${urlParams.get('id')}`);
            this.setState({ user_info: response.data });
            this.setState({ user_info: {...this.state.user_info, imgPath: `${getServer()}/download/${this.state.user_info.imgName}`}})

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
        this.props.history.push("/adminDash");
    }

    handleSave = async e => {
        const { name, cpf, email, password, level } = this.state.user_info;
        if (!name || !cpf || !email || !password || !level) {
            this.setState({ error: "Preencha todos os campos e selecione uma imagem para cadastrar" });
        }   
        else {
            if(this.state.imageChanged) {
                try {
                    const FDimg = new FormData()
                    FDimg.append('profile_pic', this.state.newProfilePic);
                    await api.post(`/updatePic/${this.state.user_info.id}`, FDimg);

                    const FD = new FormData()
                    FD.append('name', this.state.user_info.name);
                    FD.append('cpf', this.state.user_info.cpf);
                    FD.append('email', this.state.user_info.email);
                    FD.append('password', this.state.user_info.password);
                    FD.append('level', this.state.user_info.level);
                    await api.put(`/users/${this.state.user_info.id}`, FD);

                    this.props.history.push("/adminDash");
                } catch (err) {
                    console.warn(err);
                    this.setState({ error: "Ocorreu um erro ao editar os dados."});
                }
            } else {
                try {
                    const FD = new FormData()
                    FD.append('name', this.state.user_info.name);
                    FD.append('cpf', this.state.user_info.cpf);
                    FD.append('email', this.state.user_info.email);
                    FD.append('password', this.state.user_info.password);
                    FD.append('level', this.state.user_info.level);
                    await api.put(`/users/${this.state.user_info.id}`, FD);
                    this.props.history.push("/adminDash");
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
                <h1>Editar Usuário</h1>
                <hr id="title"/>
                <div className="gridEA">
                    <div className="dataEA">
                        <input
                            type='text'
                            placeholder='Digite seu nome completo'
                            value={this.state.user_info.name}
                            onChange={e => this.setState({user_info : {...this.state.user_info, name: e.target.value}})}
                        />
                        <input
                            type='text'
                            placeholder='Digite seu CPF (apenas números, ex: 12345678909)'
                            value={this.state.user_info.cpf}
                            onChange={e => this.setState({user_info : {...this.state.user_info, cpf: e.target.value}})}  
                        />
                        <input
                            type='email'
                            placeholder='Digite seu email'
                            value={this.state.user_info.email}
                            onChange={e => this.setState({ user_info : {...this.state.user_info, email: e.target.value}})} 
                        />
                        <input
                            type='password'
                            placeholder='Digite sua senha'
                            onChange={e => this.setState({ password: e.target.value})}  
                        />
                        <select className="selectEA" id="level" onChange={e => this.setState({ user_info : {...this.state.user_info, level: e.target.value}})} >
                            <option value="" selected disabled hidden>Selecione um Cargo</option>
                            <option value="999">Administrador</option>
                            <option value="1">Usuário comum</option>
                            <option value="0">Desativado</option>
                        </select>
                    </div>
                    <div className="imageEA">
                            <img src={`${this.state.user_info.imgPath}?${Date.now()}`} alt={"Foto de perfil de " + this.state.user_info.name}></img>
                            <input
                                className='imgInputEA'
                                type='file'
                                onChange={this.fileSelectedHandler}
                            />
                    </div>
                </div>
                <hr/>
                <div className="buttonsEA">
                    <button onClick={this.handleSave}>Salvar Alterações</button>
                    <button onClick={this.handleCancel}>Cancelar</button>
                </div>
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        );
    }
}

export default editInfoAdmin;