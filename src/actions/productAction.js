import {GET_PRODUCT, ADD_MESSAGE, ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT} from './type';
import apildm from '../apis/apildm';
import history from '../history';

const config = {
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'Application/json'
    }
}

export const getProduct = (size, page) => async dispatch => {
    const response = await apildm.get(`/produk?size=${size}&page=${page}`, config);
    if(response.data.resCode === '200'){
        dispatch({
            type: GET_PRODUCT,
            payload: response.data.values
        });
    }else{
        dispatch({
            type: ADD_MESSAGE,
            payload: {
                message: response.data.resDesc,
                infoMessage: 'Error!',
                colorMessage: 'warning',
                isSubmiting: false
            }
        });
        history.push('/products');
    }
}

export const createProduct = (data) => async distpatch => {
    const response = await apildm.post('/produk', data, config);
    if(response.data.resCode === '201'){
        distpatch({
            type: ADD_PRODUCT,
            payload: response.data.value
        });
        distpatch({
            type: ADD_MESSAGE,
            payload: {
                message: response.data.resDesc,
                infoMessage: 'Success!',
                colorMessage: 'success',
                isSubmiting: false
            }
        });
    }else{
        distpatch({
            type: ADD_MESSAGE,
            payload: {
                message: response.data.resDesc,
                infoMessage: 'Error!',
                colorMessage: 'danger',
                isSubmiting: false
            }
        });
    }
    history.push('/products');
}

export const deleteProduct = (id) => async dispatch => {
    const response = await apildm.delete(`/produk/${id}`, config);
    if(response.data.resCode === '200'){
        dispatch({
            type: DELETE_PRODUCT
        });
        dispatch({
            type: ADD_MESSAGE,
            payload: {
                message: response.data.resDesc,
                infoMessage: 'Delete Success!',
                colorMessage: 'success',
                isSubmiting: false
            }
        });
    }else{
        dispatch({
            type: ADD_MESSAGE,
            payload: {
                message: response.data.resDesc,
                infoMessage: 'Error!',
                colorMessage: 'danger',
                isSubmiting: false
            }
        })
    }
    history.push('/products');
}

export const editProduct = (data, id) => async distpatch => {
    const response = await apildm.put(`/produk/${id}`, data, config);
    if(response.data.resCode === '204'){
        distpatch({
            type: EDIT_PRODUCT,
            payload: response.data
        })
        distpatch({
            type: ADD_MESSAGE,
            payload: {
                message: response.data.resDesc,
                infoMessage: 'Update Success!',
                colorMessage: 'info',
                isSubmiting: false
            }
        });
    }else{
        distpatch({
            type: ADD_MESSAGE,
            payload: {
                message: response.data.resDesc,
                infoMessage: 'Error!',
                colorMessage: 'danger',
                isSubmiting: false
            }
        });
    }
    history.push(`/products`);
}