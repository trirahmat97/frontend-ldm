import React, { Component } from 'react';
import apildm from '../../apis/apildm';

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
    
    componentDidMount(){
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

    render(){
        return (
            <div className="row">
                <div className="col-xl-6 col-md-6 mb-4">
                    <div className="card border-start-lg border-start-primary h-100">
                        <div className="card-body bg-success text-white">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <div className="small fw-bold text-white mb-1">PRODUCT IN</div>
                                    <div className="h5">Rp. {this.state.totalIn}</div>
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
                                    <div className="h5">Rp. {this.state.nominalOut}</div>
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
            </div>
        )
    }
}

export default PageCount;