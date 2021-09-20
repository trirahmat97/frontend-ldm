import React from 'react';

import PageJob from './dashboard/PageJob';
import PageCount from './dashboard/PageCount';
import PageGrafik from './dashboard/PageGrafik';

const Dashboard = () => {
    return (
        <main>
            <div className="container-fluid px-4">
                <br/>
                <div className="row">
                    <div className="col-6">
                        <PageGrafik/>
                    </div>
                    <div className="col-6">
                        <PageCount/>
                        <PageJob/>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Dashboard;