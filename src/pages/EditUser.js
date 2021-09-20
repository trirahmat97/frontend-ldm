import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser, editUser } from '../actions/users';
import {addMessage, deleteMessage, getMessage} from '../actions/message';
import apildm from '../apis/apildm';

class EditUser extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            email: '',
            nama: '',
            nomor_telpon: '',
            alamat: '',
            jenis_kelamin: '',
            tempat_lahir: '',
            tanggal_lahir: '',
            level: '',
            id: ''
        }
    }

    componentDidMount(){
        let id = this.props.match.params.id;
        this.props.getMessage();
        apildm.get(`user/${id}`)
        .then(res => {
            if(res.data.resCode === '200'){
                this.setState({
                    ...this.state,
                    ...res.data.values
                })
            }else{
                this.props.addMessage({
                    message: res.data.resDesc,
                    infoMessage: 'Error!',
                    colorMessage: 'danger',
                    isSubmiting: true
                });
            }
        });
    }

    handeChange = event => {
        console.log(event);
        this.setState({
            ...this.state,
            [event.target.name]: [event.target.value]
        })
    }

    handleFormSubmit = e => {
        e.preventDefault();
        const dataBody = {
            username: Array.isArray(this.state.username) ? this.state.username[0] : this.state.username,
            email: Array.isArray(this.state.email) ? this.state.email[0] : this.state.email,
            nama: Array.isArray(this.state.nama) ? this.state.nama[0] : this.state.nama,
            nomor_telpon: Array.isArray(this.state.nomor_telpon) ? this.state.nomor_telpon[0] : this.state.nomor_telpon,
            alamat: Array.isArray(this.state.alamat) ? this.state.alamat[0] : this.state.alamat,
            tempat_lahir: Array.isArray(this.state.tempat_lahir) ? this.state.tempat_lahir[0] : this.state.tempat_lahir,
            tanggal_lahir: Array.isArray(this.state.tanggal_lahir) ? this.state.tanggal_lahir[0] : this.state.tanggal_lahir,
            jenis_kelamin: Array.isArray(this.state.jenis_kelamin) ? this.state.jenis_kelamin[0] : this.state.jenis_kelamin,
            level: Array.isArray(this.state.level) ? this.state.level[0] : this.state.level
        };
        this.props.editUser(dataBody, this.state.id);
    }

    render(){
        return (
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Form Edit User</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><Link to="/users">Users</Link></li>
                        <li className="breadcrumb-item active">Add User</li>
                    </ol>
                    <div className="card mb-4">
                        {
                            this.props.messages.message && (
                            <div className={`alert alert-${this.props.messages.colorMessage} alert-dismissible fade show`} role="alert">
                                <strong>{this.props.messages.infoMessage}</strong> {this.props.messages.message}.
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => this.props.deleteMessage()}></button>
                            </div>
                            )
                        }
                        <div className="card-body">
                            <form onSubmit={this.handleFormSubmit}>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Username</label>
                                            <input readOnly type="text" required name="username" value={this.state.username} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input type="email" name="email" value={this.state.email} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                    </div>
                                   
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Nama Lengkap</label>
                                            <input type="text" name="nama" value={this.state.nama} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">No Telphon</label>
                                            <input type="text" name="nomor_telpon" value={this.state.nomor_telpon} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="row">
                                        <div className="mb-3">
                                            <label className="form-label">Alamat</label>
                                            <input type="text" name="alamat" value={this.state.alamat} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Tempat Lahir</label>
                                                    <input type="text" name="tempat_lahir" value={this.state.tempat_lahir} onChange={this.handeChange} className="form-control"></input>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Tanggal Lahir</label>
                                                    <input type="date" name="tanggal_lahir" value={this.state.tanggal_lahir} onChange={this.handeChange} className="form-control"></input>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Jenis Kelamin</label>
                                                    <select name="jenis_kelamin" className="form-select" aria-label="Default select example" value={this.state.jenis_kelamin} onChange={this.handeChange}>
                                                        <option>Choose...</option>
                                                        <option value="L">Laki - Laki</option>
                                                        <option value="P">Perempuan</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Role</label>
                                                    <select name="level" className="form-select" aria-label="Default select example" value={this.state.level} onChange={this.handeChange}>
                                                        <option>Choose...</option>
                                                        <option value="Admin">Admin</option>
                                                        <option value="Super-Visior">Super-Visior</option>
                                                        <option value="QC">QC</option>
                                                        <option value="Teknisi">Teknisi</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-primary me-2" disabled={this.props.messages.isSubmiting}>
                                    Edit
                                </button>
                                <Link to="/users" className="btn btn-secondary">Cancel</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages
    }
}

export default connect(mapStateToProps, { createUser, editUser, addMessage, deleteMessage, getMessage })(EditUser);