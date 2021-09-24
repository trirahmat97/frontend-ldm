import React, { Component } from 'react';
import apildm from '../../apis/apildm';
import {connect} from 'react-redux';
import {fetchUsers} from '../../actions/users';
import {getJobs} from '../../actions/jobAction';
import {getProduct} from '../../actions/productAction';
import {getReport} from '../../actions/reportAction';

const thouSep = ".";
const decSep = ",";

class PageCount extends Component {
    constructor(props){
        super(props);
        this.state = {
            totalIn: 0,
            totalOut: 0,
            nominalIn: 0,
            nominalOut: 0
        }
    }
    
    toMoney = (num) => { return (Math.round(num * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/[,.]/g, function (m) { return m === ',' ? thouSep:decSep; })};

    componentDidMount(){
        this.countDataProduct();
        this.countDataUserProductJob();
    }

    countDataProduct(){
        apildm.get('/produk/all')
        .then(res => {
            const data = res.data.values.map(dat => {
                return {
                    nominalIn: dat.price * dat.totalIn,
                    nominalOut: dat.price * dat.totalOut,
                    totalIn: dat.totalIn,
                    totalOut: dat.totalOut
                }
            });
            let nominalIn = 0;
            let nominalOut = 0;
            let totalIn = 0;
            let totalOut = 0;
            for (let i = 0; i < data.length; i++) {
                nominalIn += data[i].nominalIn;
                nominalOut += data[i].nominalOut;
                totalIn += data[i].totalIn;
                totalOut += data[i].totalOut;
            }
            this.setState({
                totalIn,
                totalOut,
                nominalIn,
                nominalOut
            })
        })
    }

    countDataUserProductJob(){
        this.props.fetchUsers(1, 5);
        this.props.getProduct(1, 5);
        this.props.getJobs(1, 10);
        this.props.getReport(1, 10);
    }


    render(){
        return (
            <div className="row">
                <div className="col-xl-6 col-md-6 mb-4">
                    <div className="card border-start-lg border-start-primary h-100">
                        <div className="card-body bg-success text-white">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <div className="small fw-bold text-white mb-1">PRODUCT IN</div>
                                    <div className="h5">Rp. {this.toMoney(this.state.totalIn)}</div>
                                    <div className="text-xs fw-bold d-inline-flex align-items-center">
                                        {this.state.totalIn} PRD &emsp;<i className="fas fa-arrow-alt-circle-up text-white"></i>
                                    </div>
                                </div>
                                <div className="ms-2">
                                    <i className="fas fa-dollar-sign fa-2x text-gray-200"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-md-6 mb-4">
                    <div className="card border-start-lg border-start-primary h-100">
                        <div className="card-body bg-danger text-white">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <div className="small fw-bold text-white mb-1">PRODUCT OUT</div>
                                    <div className="h5">Rp. {this.toMoney(this.state.nominalOut)}</div>
                                    <div className="text-xs fw-bold d-inline-flex align-items-center">
                                        {this.state.totalOut} PRD &emsp;<i className="fas fa-arrow-alt-circle-down"></i>
                                    </div>
                                </div>
                                <div className="ms-2">
                                    <i className="fas fa-dollar-sign fa-2x text-gray-200"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-md-6 mb-4">
                    <div className="card border-start-lg border-start-primary h-100">
                        <div className="card-body bg-primary text-white">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <div className="small fw-bold text-white mb-1">TOTAL USERS</div>
                                    <div className="h5">{this.props.users.totalItems}</div>
                                    <div className="text-xs fw-bold d-inline-flex align-items-center">
                                        {this.props.users.totalItems} USR &emsp;<i className="fas fa-user"></i>
                                    </div>
                                </div>
                                <div className="ms-2">
                                    <i className="fas fa-users fa-2x text-gray-200"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-md-6 mb-4">
                    <div className="card border-start-lg border-start-warning h-100">
                        <div className="card-body bg-warning text-white">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <div className="small fw-bold text-white mb-1">TOTAL PRODUCTS</div>
                                    <div className="h5">{this.props.products.totalItems}</div>
                                    <div className="text-xs fw-bold d-inline-flex align-items-center">
                                        {this.props.products.totalItems} PRD &emsp;<i className="fas fa-user"></i>
                                    </div>
                                </div>
                                <div className="ms-2">
                                    <i className="fas fa-envelope-open-text fa-2x text-gray-200"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-md-6 mb-4">
                    <div className="card border-start-lg border-start-dark h-100">
                        <div className="card-body bg-dark text-white">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <div className="small fw-bold text-white mb-1">TOTAL JOBS DONE</div>
                                    <div className="h5">{this.props.reports.totalItems}</div>
                                    <div className="text-xs fw-bold d-inline-flex align-items-center">
                                        {this.props.reports.totalItems} / {this.props.reports.totalItems + this.props.jobs.totalItems} JB &emsp;<i className="fas fa-user"></i>
                                    </div>
                                </div>
                                <div className="ms-2">
                                    <i className="fas fa-archive fa-2x text-gray-200"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-md-6 mb-4">
                    <div className="card border-start-lg border-start-secondary h-100">
                        <div className="card-body bg-secondary text-white">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <div className="small fw-bold text-white mb-1">TOTAL JOBS IN PROGRESS</div>
                                    <div className="h5">{this.props.jobs.totalItems}</div>
                                    <div className="text-xs fw-bold d-inline-flex align-items-center">
                                        {this.props.jobs.totalItems} / {this.props.jobs.totalItems + this.props.reports.totalItems} JB &emsp;<i className="fas fa-user"></i>
                                    </div>
                                </div>
                                <div className="ms-2">
                                    <i className="fas fa-archive fa-2x text-gray-200"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = state => {
    return {
        users: state.users,
        jobs: state.jobs,
        products: state.products,
        reports: state.reports
    }
}

export default connect(mapStatetoProps, {fetchUsers, getJobs, getProduct, getReport})(PageCount);