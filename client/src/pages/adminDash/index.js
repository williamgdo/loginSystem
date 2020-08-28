import React, { Component } from 'react';
import './styles.css'
import Header from '../../components/header';
import api from '../../services/api';
import { getServer, logout, getToken } from '../../services/auth';
import decode from 'jwt-decode';

class AdminDash extends Component {
    state = {
        users: []
    }
    
    componentDidMount() {
        this.loadData();
    }
      
    loadData = async () => {
        const { uid } = decode(getToken());
        try {
            let response = await api.get(`/users/${uid}`);
            this.setState({ ...response.data });
            response = await api.get(`/users/`);
            this.setState({ users: response.data });
            console.log(this.state);
        } catch (err) {
            console.log(err);
        }
    };

    handleLogout = () => {
        logout();
        this.props.history.push("/");
    }

    levelToString = (level) => {
        if(level === 0)
            return 'Desativado';
        if(level === 1)
            return 'Usuário Comum';
        if(level === 999)
            return 'Administrador';
    } 

    fetchUserDetails = (selectedId) => {
        this.props.history.push(`/editAdmin/?id=${selectedId}`);
    }

    renderTableData() {
        return this.state.users.map((user) => {
            const { id, name, cpf, email, level} = user 
            return (
                <tr key={id} onClick={() => this.fetchUserDetails(id)}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{cpf}</td>
                    <td>{email}</td>
                    <td>{this.levelToString(level)}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="divAD">
                <Header fullname={this.state.name} picSrc={`${getServer()}/download/${this.state.imgName}`}/>
                <h1>Usuários da Empresa</h1>
                <table className="tableAD">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Nome Completo</th>
                            <th>CPF</th>
                            <th>Email</th> 
                            <th>Acesso</th> 
                        </tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
                <button className="btnSairAD" onClick={this.handleLogout}>Sair</button>
            </div>
        );
    }
}

export default AdminDash;