import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getProduct} from '../../actions/productAction';

import HeaderBody from '../../components/HeaderBody';
import MessageComp from '../../components/Message';

class IndexProducts extends Component {
    constructor(){
        super();
        this.state = {
            currentPage: 1,
            todosPerPage: 2,
        }
    }

    componentDidMount(){
        this.props.getProduct(this.state.todosPerPage, this.state.currentPage);
    }

    renderAction(id){
        return (
            <>
                <button className="btn btn-primary btn-sm mx-1" onClick={() => this.handleDelete(id)}><i className="fas fa-edit"></i></button>
                <button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(id)}><i className="fas fa-trash"></i></button>
            </>
        )
    }

    handleDelete(id){
        this.props.deleteCategory(id);
        this.props.getProduct(this.props.currentPage, this.state.todosPerPage);
    }

    renderDataProduct(){
        return this.props.products.data.map((res, index) => {
            return(
                <tbody key={res.id}>
                    <tr>
                        <td>{index + 1}</td>
                        <td>{res.title}</td>
                        <td></td>
                        <td>{res.weight}</td>
                        <td>{res.stock}</td>
                        <td>{res.price}</td>
                        <td><span className="badge bg-success">{res.category ? res.category.name: ''}</span></td>
                        <td>{res.description}</td>
                        <td>
                            {this.renderAction(res.id)}
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
        this.props.getProduct(this.state.todosPerPage, this.state.currentPage);
    }

    renderPaginantion() {
        const totalPage = this.props.products.totalPages;
        const pageActive = this.props.products.currentPage;
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
                                    <Link className="page-link" to="/products" onClick={() =>this.handlePage(pag)}>{pag}</Link>
                                </li>
                            )
                        })
                    }
                    <li className={pageActive ===  this.props.products.totalPages ? "page-item disabled" : "page-item"} key="ko">
                        <Link className="page-link" to="#" onClick={() =>this.handlePage(pageActive + 1)}>Next</Link>
                    </li>
                </ul>
            </nav>
        )
    }

    render(){
        return(
            <main>
                <div className="container-fluid px-4">
                    {/* header body */}
                    <HeaderBody
                        data = {{
                            title: 'Products',
                            pageLink: '/products',
                        }}
                    />

                    <MessageComp/>

                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-table me-1"></i>
                            Data Product
                            <div className="float-end">
                                <Link to="/add-user" className="btn btn-success mt-10">
                                    <i className="fas fa-plus-square"></i> Create Product
                                </Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Title</th>
                                        <th>Image</th>
                                        <th>Weight</th>
                                        <th>Stock</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {this.renderDataProduct()}
                            </table>
                            {this.renderPaginantion()}
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps, {getProduct})(IndexProducts);