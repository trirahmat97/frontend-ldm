import React, { Component } from 'react';

class PageCount extends Component {
    render(){
        return (
            <div className="row">
                <div className="col-xl-6 col-md-6 mb-4">
                    <div className="card border-start-lg border-start-primary h-100">
                        <div className="card-body bg-success text-white">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <div className="small fw-bold text-white mb-1">PRODUCT IN</div>
                                    <div className="h5">Rp. 4.000.000</div>
                                    <div className="text-xs fw-bold d-inline-flex align-items-center">
                                        12 PRD &emsp;<i className="fas fa-arrow-alt-circle-up text-white"></i>
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
                                    <div className="h5">Rp. 4.000.000</div>
                                    <div className="text-xs fw-bold d-inline-flex align-items-center">
                                        12 PRD &emsp;<i className="fas fa-arrow-alt-circle-down"></i>
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