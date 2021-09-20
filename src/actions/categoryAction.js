import apildm from "../apis/apildm"
import {ADD_CATEGORY, ADD_MESSAGE, DELETE_CATEGORY, EDIT_CATEGORY, GET_CATEGORY } from "./type";
import history from '../history';

const config = {
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'Application/json'
    }
}

export const getCategory =(size, page) => async dispatch => {
    const response = await apildm.get(`/kategori?size=${size}&page=${page}`, config);
    if(response.data.resCode === '200'){
        dispatch({
            type: GET_CATEGORY,
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
        history.push('/categories');
    }
}

export const deleteCategory = (id) => async dispatch => {
    const response = await apildm.delete(`/kategori/${id}`, config);
    if(response.data.resCode === '200'){
        dispatch({
            type: DELETE_CATEGORY
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
    history.push('/categories');
}

export const createCategory = (data) => async distpatch => {
    const response = await apildm.post('/kategori', {...data}, config);
    if(response.data.resCode === '201'){
        distpatch({
            type: ADD_CATEGORY,
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
        history.push('/categories');
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
        history.push('/categories');
    }
}

export const editCategory = (data, id) => async distpatch => {
    const response = await apildm.patch(`/kategori/${id}`, {...data}, config);
    if(response.data.resCode === '204'){
        distpatch({
            type: EDIT_CATEGORY,
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
        history.push(`/categories`);
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
        history.push(`/categories`);
    }
}