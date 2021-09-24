import {GET_JOB, ADD_MESSAGE, ADD_JOB, DELETE_JOB, EDIT_JOB, GET_REPORT} from './type';
import apildm from '../apis/apildm';
import history from '../history';

const config = {
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'Application/json'
    }
}

export const getJobs = (page, size) => async dispatch => {
    const response = await apildm.get(`/job?size=${size}&page=${page}`, config);
    if(response.data.resCode === '200'){
        dispatch({
            type: GET_JOB,
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
    }
}

export const getReport = (page, size) => async dispatch => {
    const response = await apildm.get(`/job/report?size=${size}&page=${page}`, config);
    if(response.data.resCode === '200'){
        dispatch({
            type: GET_REPORT,
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
    }
}

export const createJob = (data) => async distpatch => {
    const response = await apildm.post('/job', {...data}, config);
    if(response.data.resCode === '201'){
        distpatch({
            type: ADD_JOB,
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
        history.push('/jobs');
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
        history.push('/add-job');
    }
}

export const editJob = (data, id) => async distpatch => {
    const response = await apildm.put(`/job/${id}`, {...data}, config);
    if(response.data.resCode === '204'){
        distpatch({
            type: EDIT_JOB,
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
        history.push(`/jobs`);
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
        history.push(`/edit-job/${id}`);
    }
}

export const deleteJob = (id) => async dispatch => {
    const response = await apildm.delete(`/job/${id}`, config);
    if(response.data.resCode === '200'){
        dispatch({
            type: DELETE_JOB
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
    history.push('/jobs');
}

export const sendJob = (data, id) => async distpatch => {
    const response = await apildm.post('/job/sendjob', {...data}, config);
    if(response.data.resCode === '201'){
        distpatch({
            type: ADD_MESSAGE,
            payload: {
                message: response.data.resDesc,
                infoMessage: 'Success!',
                colorMessage: 'success',
                isSubmiting: false
            }
        });
        history.push(`/edit-job/${id}`);
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
        history.push(`/edit-job/${id}`);
    }
}


export const deleteJobUser = (id, userId) => async dispatch => {
    const response = await apildm.delete(`/job/deleteUsertoJob/${userId}`, config);
    if(response.data.resCode === '200'){
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
    history.push(`/edit-job/${id}`);
}

export const deleteJobProduct = (id, productId) => async dispatch => {
    const response = await apildm.delete(`/job/deleteProductToJobById/${productId}`, config);
    if(response.data.resCode === '200'){
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
    history.push(`/edit-job/${id}`);
}

export const sendProduct = (data, id) => async distpatch => {
    const response = await apildm.post('/job/sendProduct', {...data}, config);
    if(response.data.resCode === '201'){
        distpatch({
            type: ADD_MESSAGE,
            payload: {
                message: response.data.resDesc,
                infoMessage: 'Success!',
                colorMessage: 'success',
                isSubmiting: false
            }
        });
        history.push(`/edit-job/${id}`);
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
        history.push(`/edit-job/${id}`);
    }
}

export const editProductJob = (data, id) => async distpatch => {
    const response = await apildm.patch(`/job/editProductToJob`, {...data}, config);
    if(response.data.resCode === '204'){
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
    history.push(`/edit-job/${id}`);
}