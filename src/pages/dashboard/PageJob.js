import React, { Component } from 'react';

class PageJob extends Component {
    render(){
        return (
            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    Data Jobs iN Progress {new Date().getFullYear()}
                </div>
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Description</th>
                                <th>Teknisi</th>
                                <th>Super Visior</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowSpan={2}>1</td>
                                <td>Test air pad</td>
                                <td>Test air pad</td>
                                <td>Test air pad</td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    <div className="progress">
                                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: "75%"}}>75%</div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default PageJob;