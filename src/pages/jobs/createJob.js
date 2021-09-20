import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createJob} from '../../actions/jobAction';

import MessageComp from '../../components/Message';
import HeaderBody from '../../components/HeaderBody';
import { Link } from 'react-router-dom';

class CreateJob extends Component {
    constructor(){
        super();
        this.state = {
            deskripsi: '',
            alamat: '',
            pic_gedung: '',
            no_telpon_pic: '',
            catatan: '',
            detail: '',
            tanggal_pemasangan: ''
        };
    }

    componentDidMount(){
    }

    handeChange = event => {
        this.setState({
            ...this.state,
            [event.target.name]: [event.target.value]
        })
    }

    handleFormSubmit = e => {
        e.preventDefault();
        const dataBody = {
            deskripsi: Array.isArray(this.state.deskripsi) ? this.state.deskripsi[0] :'',
            alamat: Array.isArray(this.state.alamat) ? this.state.alamat[0] :'',
            pic_gedung: Array.isArray(this.state.pic_gedung) ? this.state.pic_gedung[0] :'',
            no_telpon_pic: Array.isArray(this.state.no_telpon_pic) ? this.state.no_telpon_pic[0] :'',
            catatan: Array.isArray(this.state.catatan) ? this.state.catatan[0] :'',
            detail: Array.isArray(this.state.detail) ? this.state.detail[0] :'',
            tanggal_pemasangan: Array.isArray(this.state.tanggal_pemasangan) ? this.state.tanggal_pemasangan[0] :'',
            status_teknisi: "Pending",
            status_supervisor: "Pending",
        }
        this.props.createJob(dataBody);
    }

    render(){
        return(
            <main>
                <div className="container-fluid px-4">
                    <HeaderBody
                        data = {{
                            title: 'Add Job',
                            pageLink: '/add-job',
                        }}
                    />

                    <MessageComp/>


                    <div className="card mb-4">
                        <div className="card-body">
                            <form onSubmit={this.handleFormSubmit}>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Deskripsi Job</label>
                                            <input type="text" required name="deskripsi" value={this.state.deskripsi} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Detail Jon</label>
                                            <input type="text" name="detail" value={this.state.detail} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Catatan Job</label>
                                            <input type="text" name="catatan" value={this.state.catatan} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Nama PIC</label>
                                            <input type="text" required name="pic_gedung" value={this.state.pic_gedung} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">No PIC</label>
                                            <input type="text" name="no_telpon_pic" value={this.state.no_telpon_pic} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Tanggal Pemasangan</label>
                                            <input type="date" name="tanggal_pemasangan" value={this.state.tanggal_pemasangan} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Alamat Job</label>
                                    <input type="text" name="alamat" value={this.state.alamat} onChange={this.handeChange} className="form-control"></input>
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-primary me-2" disabled={this.props.messages.isSubmiting}>
                                        {
                                            this.props.messages.isSubmiting ? ("Saving Data") : ("Create")
                                        }
                                    </button>
                                    <Link to="/jobs" className="btn btn-secondary">Cancel</Link>
                                </div>
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

export default connect(mapStateToProps, {createJob})(CreateJob);