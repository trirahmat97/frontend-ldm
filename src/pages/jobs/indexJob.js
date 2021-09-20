import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {getJobs, deleteJob} from '../../actions/jobAction';
import {addMessage} from '../../actions/message';

import HeaderBody from '../../components/HeaderBody';
import MessageComp from '../../components/Message';
import apildm from '../../apis/apildm';


class IndexJob extends Component {
    constructor(){
        super();
        this.state = {
            currentPage: 1,
            todosPerPage: 5,
        }
    }

    componentDidMount(){
        this.props.getJobs(this.state.currentPage, this.state.todosPerPage);
    }

    handleDelete(id){
        this.props.deleteJob(id);
        this.handleDeleteChange();
    }

    handleEdit(id){
        this.props.history.push(`/edit-job/${id}`);
    }

    renderAction(id){
        const handleDelete = (id) => {
            apildm.delete(`job/${id}`)
            .then(res => {
                if(res.data.resCode === '200'){
                    this.props.addMessage({
                        message: res.data.resDesc, 
                        colorMessage: 'success', 
                        infoMessage:'Success!'
                    })
                    this.props.getJobs(this.state.todosPerPage, this.state.currentPage);
                }else{
                    this.props.addMessage({message: res.data.resDesc, colorMessage: 'danger', infoMessage:'Error!'})
                }
            })
        }
        return (
            <>
                <button className="btn btn-primary btn-sm mx-1" onClick={() => {this.handleEdit(id)}}><i className="fas fa-edit"></i></button>
                <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDelete(id)}><i className="fas fa-trash"></i></button>
            </>
        )
    }

    renderDataJob(){
        return this.props.jobs.data.map((res, index) => {
            return(
                <tbody key={res.id}>
                    <tr>
                        <td rowSpan={2}>{index + 1}</td>
                        <td>{res.deskripsi}</td>
                        <td>{res.alamat}</td>
                        <td>{res.pic_gedung}</td>
                        <td>{res.no_telpon_pic}</td>
                        <td>{res.tanggal_pemasangan}</td>
                        <td>
                            {this.renderAction(res.id)}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={6}>
                            <div className="progress" style={{height: '15px'}}>
                                <div className="progress-bar progress-bar-striped bg-success progress-bar-animated" style={{width: `${res.progress}%`}} role="progressbar" aria-valuenow={res.progress} aria-valuemin="0" aria-valuemax="100">{res.progress}%</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            )
        })
    }

    handlePage(page){
        this.setState({
            currentPage: page
        });
        this.props.getJobs(this.state.currentPage, this.state.todosPerPage);
    }

    renderPaginantion() {
        const totalPage = this.props.jobs.totalPages;
        const pageActive = this.props.jobs.currentPage;
        var numberPage = [];
        for (let i = 1; i <= totalPage; i++) {
            numberPage.push(i);
        }

        return (
            <nav aria-label="...">
                <ul className="pagination">
                    <li className={pageActive - 1 === 0 ? "page-item disabled" : "page-item"} key="li">
                        <Link className="page-link" to="#" onClick={() =>this.handlePage(pageActive - 1)}>Previous</Link>
                    </li>
                    {
                        numberPage.map(pag => {
                            return (
                                <li className={pageActive === pag ? "page-item active" : "page-item"} aria-current="page" key={pag}>
                                    <Link className="page-link" to="/jobs" onClick={() =>this.handlePage(pag)}>{pag}</Link>
                                </li>
                            )
                        })
                    }
                    <li className={pageActive ===  this.props.jobs.totalPages ? "page-item disabled" : "page-item"} key="ko">
                        <Link className="page-link" to="#" onClick={() =>this.handlePage(pageActive + 1)}>Next</Link>
                    </li>
                </ul>
            </nav>
        )
    }
    render(){
        return (
            <main>
                <div className="container-fluid px-4">
                    <HeaderBody
                        data = {{
                            title: 'Jobs',
                            pageLink: '/jobs',
                        }}
                    />

                    <MessageComp/>

                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-table me-1"></i>
                            Data Jobs
                            <div className="float-end">
                                <Link to="/add-job" className="btn btn-success mt-10">
                                    <i className="fas fa-plus-square"></i> Create Job
                                </Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Description</th>
                                        <th>Alamat</th>
                                        <th>PIC</th>
                                        <th>NO PIC</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {this.renderDataJob()}
                            </table>
                            {this.renderPaginantion()}
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

const mapStateToProps = state => {
    return {
        jobs: state.jobs
    }
}

export default connect(mapStateToProps, {getJobs, deleteJob, addMessage})(IndexJob);