import apildm from '../apis/apildm';
import history from '../history';

import {ADD_MESSAGE, CREATE_USER, EDIT_USER, FETCH_USERS} from './type';

const config = {
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'Application/json'
    }
}

export const fetchUsers = (size, page) => async dispatch => {
    const response = await apildm.get(`/user?size=${size}&page=${page}`);
    dispatch({
        type: FETCH_USERS,
        payload: response.data.values
    });
}

export const createUser = data => async distpatch => {
    const response = await apildm.post('/user', {...data}, config);
    if(response.data.resCode === '201'){
        distpatch({
            type: CREATE_USER,
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
        history.push('/users');
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
        history.push('/add-user');
    }
}

export const editUser = (data, id) => async distpatch => {
    const response = await apildm.put(`/user/${id}`, {...data}, config);
    if(response.data.resCode === '204'){
        console.log('sukses update')
        distpatch({
            type: EDIT_USER,
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
        history.push(`/users`);
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
        history.push(`/edit-user/${id}`);
    }
}

